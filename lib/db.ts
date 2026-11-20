import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL não configurada");
  }

  const url = new URL(connectionString);
  // Remove parâmetros SSL da URL para não sobrescrever a config abaixo
  url.searchParams.delete("sslmode");
  url.searchParams.delete("sslrootcert");

  const certPath = resolve(process.cwd(), "prod-ca-2021.crt");

  const adapter = new PrismaPg({
    connectionString: url.toString(),
    ssl: existsSync(certPath)
      ? {
          ca: readFileSync(certPath, "utf8"),
          rejectUnauthorized: false, // Evita erro com certificados intermediários do Supavisor (porta 6543)
        }
      : { rejectUnauthorized: false },
  });

  return new PrismaClient({ adapter });
}

const cached = globalForPrisma.prisma;

export const db =
  cached && "friendship" in cached ? cached : createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}