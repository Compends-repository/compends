import { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

type Props = {
    session: Session | null
}

export default function FriendsList({ session }: Props) {
    return (
        
        <h2>Amigos: </h2>
    )
}