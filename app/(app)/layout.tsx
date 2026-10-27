import { auth } from "@/lib/auth";
import PrincipalLayout from "./principal-layout";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { name, image, email, id } = session.user;

  const user = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
      avatar: true,
      background: true,
      image: true,
    },
  });
  if (!user) redirect("/login");

  return (
    <PrincipalLayout session={{ name, image, email, id }} user={user}>
      {children}
    </PrincipalLayout>
  );
}