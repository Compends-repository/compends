import { auth } from "@/lib/auth";
import PrincipalLayout from "./layout";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


async function getUserInformations({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) redirect('/login')
    
    const { name, image, email, id } = session.user

    return (
    <PrincipalLayout session={{ name, image, email, id }}>
        {children}
    </PrincipalLayout>
    )
}