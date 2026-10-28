import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return new Response(null, { status: 401 });

  const field =
    new URL(req.url).searchParams.get("field") === "background"
      ? "background"
      : "avatar";

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { avatar: true, background: true },
  });
  const url = user?.[field];
  if (!url) return new Response(null, { status: 404 });

  const upstream = await fetch(url);
  if (!upstream.ok) return new Response(null, { status: 502 });

  return new Response(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") ?? "image/jpeg",
      "Cache-Control": "no-store",
    },
  });
}