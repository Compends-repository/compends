import "./global.css";
import {
  Changa,
  Geist,
  JetBrains_Mono,
  Josefin_Sans,
  Kanit,
  Mitr,
  Roboto,
  Saira,
  Sigmar_One,
} from "next/font/google";
import { cn } from "@/lib/utils";

export { metadata } from "./metaData/GlobalMetaData";

import localFont from "next/font/local";

import SmoothScroll from "./ReusableFunctions/smoothScroll";

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

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "700"],
  variable: "--font-roboto",
});

const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "800"],
  variable: "--font-jetBrains",
});

const changa = Changa({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-Changa",
});

const author = localFont({
  src: [
    { path: "../public/Fonts/WEB/fonts/Author-Variable.woff2", style: "normal" },
    { path: "../public/Fonts/WEB/fonts/Author-VariableItalic.woff2", style: "italic" },
  ],
  weight: "200 700",
  variable: "--font-author-src",
  display: "swap",
});

const Rajdhani = localFont({
  src: [
    { path: "../public/Fonts/WEB/Rajdhani/fonts/Rajdhani-Variable (1).woff2", style: "normal" },
  ],
  weight: "100 700",
  variable: "--font-Rajdhani-src",
  display: "swap",
});

const Asap = localFont({
  src: [
    { path: "../public/Fonts/WEB/Asap/fonts/Asap-VariableItalic.woff2", style: "normal" },
    { path: "../public/Fonts/WEB/Asap/fonts/Asap-VariableItalic.woff", style: "italic" },
  ],
  weight: "100 700",
  variable: "--font-Asap-src",
  display: "swap",
});

export default function EnterLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={cn(
        "font-sans no-scrollbar scroll-smooth data-scroll-behavior=smooth",
        geist.variable,
        josefin.variable,
        saira.variable,
        kanit.variable,
        mitr.variable,
        sigmar.variable,
        author.variable,
        Rajdhani.variable,
        Asap.variable,
      )}
    >
      <body>
        {children}
        <SmoothScroll />
      </body>
    </html>
  );
}
