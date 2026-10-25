import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const ALLOWED = ["image/png", "image/jpeg", "image/webp"];
const MAX_SIZE = 4 * 1024 * 1024; // 4MB

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File) || !ALLOWED.includes(file.type) || file.size > MAX_SIZE) {
    return Response.json({ error: "Arquivo inválido" }, { status: 400 });
  }

  // TODO: salvar o arquivo (R2, UploadThing...) e gravar a URL no avatar

  return Response.json({ url: `pendente-${Date.now()}` });
}