import "./global.css";
import { Geist } from "next/font/google";
import { Josefin_Sans, Saira, Kanit, Mitr, Sigmar_One } from "next/font/google";
import { cn } from "@/lib/utils";

export { metadata } from "./metaData";   // <- adicione isso




const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const josefin = Josefin_Sans({ subsets: ["latin"], variable: "--font-josefin-sans" });

const saira = Saira({ subsets: ["latin"], variable: "--font-saira-var" });

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-kanit-var",
});

const mitr = Mitr({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mitr-var",
});

const sigmar = Sigmar_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sigmar-var",
});




export default function EnterLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={cn(
        "font-sans",
        geist.variable,
        josefin.variable,
        saira.variable,
        kanit.variable,
        mitr.variable,
        sigmar.variable
      )}
    >
      <body>{children}</body>
    </html>
  );
}