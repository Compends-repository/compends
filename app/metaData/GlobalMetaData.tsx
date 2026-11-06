import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://compends.com"),
  title: {
    default: "Compends",
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
    images: ["/og.png"],
  },
};
