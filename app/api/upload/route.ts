import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { r2 } from "@/lib/r2";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db"; // ajuste para o caminho do seu client

const EXT: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};
const FIELDS = ["avatar", "background"] as const;

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
  if (!FIELDS.includes(field as (typeof FIELDS)[number])) {
    return Response.json({ error: "Campo inválido" }, { status: 400 });
  }
  const ext = EXT[file.type];
  if (!ext || file.size > 500 * 1024) {
    return Response.json({ error: "Arquivo inválido" }, { status: 400 });
  }

  const key = `${field}s/${session.user.id}-${randomUUID()}.${ext}`;

  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: key,
      Body: Buffer.from(await file.arrayBuffer()),
      ContentType: file.type,
    }),
  );

  const url = `${process.env.R2_PUBLIC_URL}/${key}`;

  await db.user.update({
    where: { id: session.user.id },
    data: { [field as string]: url },
  });

  return Response.json({ url });
}