import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { r2 } from "@/lib/r2";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const EXT: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/avif": "avif",
};

const FIELDS = ["avatar", "background"] as const;
type Field = (typeof FIELDS)[number];

const MAX_SIZE: Record<Field, number> = {
  avatar: 350 * 1024, // 500KB
  background: 1.2 * 1024 * 1024, // 1.2MB
};

function isField(value: unknown): value is Field {
  return FIELDS.includes(value as Field);
}

function matchesSignature(type: string, b: Uint8Array) {
  switch (type) {
    case "image/png":
      return b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47;
    case "image/jpeg":
      return b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;
    case "image/webp":
      return (
        b[0] === 0x52 &&
        b[1] === 0x49 &&
        b[2] === 0x46 &&
        b[3] === 0x46 &&
        b[8] === 0x57 &&
        b[9] === 0x45 &&
        b[10] === 0x42 &&
        b[11] === 0x50 
      );
    case "image/avif":
      return (
        b[4] === 0x66 &&
        b[5] === 0x74 &&
        b[6] === 0x79 &&
        b[7] === 0x70 &&
        b[8] === 0x61 &&
        b[9] === 0x76 &&
        b[10] === 0x69 &&
        (b[11] === 0x66 || b[11] === 0x73)
      );
    default:
      return false;
  }
}

async function deleteFromR2(url: string | null | undefined) {
  const prefix = `${process.env.R2_PUBLIC_URL}/`;
  if (!url || !url.startsWith(prefix)) return;

  try {
    await r2.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: url.slice(prefix.length),
      }),
    );
  } catch (e) {
    console.error("[r2] falha ao apagar objeto:", e);
  }
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return Response.json({ error: "Não autenticado" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  const field = form.get("field");

  if (!(file instanceof File)) {
    return Response.json({ error: "Arquivo ausente" }, { status: 400 });
  }
  if (!isField(field)) {
    return Response.json({ error: "Campo inválido" }, { status: 400 });
  }

  const ext = EXT[file.type];
  if (!ext) {
    return Response.json(
      { error: "Tipo de arquivo inválido" },
      { status: 400 },
    );
  }
  if (file.size > MAX_SIZE[field]) {
    return Response.json(
      { error: `Arquivo muito grande (máx. ${MAX_SIZE[field] / 1024}KB)` },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (!matchesSignature(file.type, buffer)) {
    return Response.json({ error: "Arquivo inválido" }, { status: 400 });
  }

  const key = `${field}s/${session.user.id}-${randomUUID()}.${ext}`;
  const url = `${process.env.R2_PUBLIC_URL}/${key}`;
  let uploaded = false;

  try {
    const current = await db.user.findUnique({
      where: { id: session.user.id },
      select: { avatar: true, background: true },
    });
    const oldUrl = current?.[field];

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      }),
    );
    uploaded = true;

    await db.user.update({
      where: { id: session.user.id },
      data: field === "avatar" ? { avatar: url } : { background: url },
    });

    await deleteFromR2(oldUrl);

    return Response.json({ url });
  } catch (e) {
    console.error("[upload] falha:", e);
    if (uploaded) await deleteFromR2(url);
    return Response.json({ error: "Falha no upload" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return Response.json({ error: "Não autenticado" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const field = body?.field;
  if (!isField(field)) {
    return Response.json({ error: "Campo inválido" }, { status: 400 });
  }

  try {
    const current = await db.user.findUnique({
      where: { id: session.user.id },
      select: { avatar: true, background: true },
    });
    const oldUrl = current?.[field];

    await db.user.update({
      where: { id: session.user.id },
      data: field === "avatar" ? { avatar: null } : { background: null },
    });

    await deleteFromR2(oldUrl);

    return Response.json({ ok: true });
  } catch (e) {
    console.error("[delete] falha:", e);
    return Response.json({ error: "Falha ao remover" }, { status: 500 });
  }
}
