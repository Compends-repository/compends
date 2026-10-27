import User_Informations_List from "../features/listRendering/userInformations";
import { supabase } from "@/lib/supabase";

export default async function Discover_new_preople() {
  // { Bimg }: userInformations
  const { data, error } = await supabase.from("user").select();

  if (error) {
    console.log("Erro DB: ", error);
  }

  return (
    <div className="relative isolate">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat brightness-78"
        style={{ backgroundImage: "url('/perfilBackExample.png')", zIndex: -1 }}
      ></div>

      <div>
        <User_Informations_List GETusers={data ?? []} />
      </div>
    </div>
  );
}
