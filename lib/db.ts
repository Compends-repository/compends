import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  });
  return new PrismaClient({ adapter });
}

const cached = globalForPrisma.prisma;
export const db =
  cached && "friendship" in cached ? cached : createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;