import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json([]);

  const { data, error } = await supabase
    .from("user")
    .select("id, name, avatar")
    .ilike("name", `%${q}%`)
    .limit(8);

  if (error) {
    console.error("Erro DB (busca):", error);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
  return NextResponse.json(data ?? []);
}