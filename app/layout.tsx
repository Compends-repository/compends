"use server"
//import Home from "./page";
import Image from "next/image";

import "./bar.css"

export default async function enterPage({ children }: {children: React.ReactNode}) {
  return (
    <html>
      <body>
        <div className="logo">
          <nav>
            <ul>
              <li>
                <a href="../loja">Store</a>
              </li>
              <li>
                <a href="../social">Social</a>
              </li>
              <li>
                <a href="#">People to know</a>
              </li>
              <li>
                <a href="#">Perfil</a>
              </li>
            </ul>
          </nav>
        </div>
        {children}
      </body>
    </html>
  );
}
