// app/(principal)/layout.tsx
import Link from "next/link";

export default function PrincipalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="fixed z-50 top-[1.7%] left-1/2 -translate-x-1/2 h-[55] w-[60%] flex gap-4 p-4 backdrop-blur-[-70px] backdrop-contrast-125 backdrop-brightness-95 backdrop-opacity-65 bg-black/20 rounded-[20px] text-white border border-[#cccdc76d] border-b-1.5">
      <img src='/logo/logo3.svg' className="w-[180] h-[50] mt-[-1.2%]"/>
        <Link href="/user_perfil-page" className="text-white ml-[200]">
          Perfil
        </Link>
        <Link href="/all_social-page" className="text-white">
          Social
        </Link>
      </nav>
      {children}
    </>
  );
}
