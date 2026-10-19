/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Libera acesso em dev por qualquer IP da rede local
  allowedDevOrigins: [
    "192.168.*.*",
    "10.*.*.*",
    "172.*.*.*",
    "*.local",
  ],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
};

module.exports = nextConfig;