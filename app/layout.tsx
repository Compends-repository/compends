import './global.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default async function enterPage({ children }: {children: React.ReactNode}) {
  return (
    <html className={cn("font-sans", geist.variable)}>
      <body>
        {children}
      </body>
    </html>
  );
}
