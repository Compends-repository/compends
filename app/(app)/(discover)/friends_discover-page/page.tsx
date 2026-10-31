import User_Informations_List from "../features/listRendering/userInformations";
import { supabase } from "@/lib/supabase";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Discover_new_preople() {
  const session = await auth.api.getSession({ headers: await headers() });

  const [usersRes, meRes] = await Promise.all([
    supabase.from("user").select(),
    session
      ? supabase
          .from("user")
          .select("background")
          .eq("id", session.user.id)
          .single()
      : Promise.resolve({ data: null, error: null }),
  ]);

  if (usersRes.error) {
    console.log("Erro DB (lista): ", usersRes.error);
  }
  if (meRes.error) {
    console.log("Erro DB (background): ", meRes.error);
  }

  const users = usersRes.data ?? [];
  const background = meRes.data?.background ?? "/perfilBackExample.png";

  return (
    <div className="relative isolate">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat brightness-78"
        style={{ backgroundImage: `url('${background}')` }}
      />

      <div>
        <User_Informations_List GETusers={users} />
      </div>
    </div>
  );
}