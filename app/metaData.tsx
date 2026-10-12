import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://seudominio.com.br"),
  title: {
    default: "Compends - Rede social de jogos",
    template: "%s | Compends",
  },
  description:
    "Conecte-se com outros jogadores, compartilhe suas conquistas e descubra novos jogos.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Compends",
    description: "Conecte-se com outros jogadores.",
    url: "/",
    siteName: "Compends",
    locale: "pt_BR",
    type: "website",
    images: ["/og.png"], // 1200x630, aparece ao compartilhar em redes/WhatsApp
  },
};