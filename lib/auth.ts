import { betterAuth, date } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
import { nextCookies } from 'better-auth/next-js'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
        birthDate: { type: 'date', required: true},
        opt1: { type: 'boolean', required: true, defaultValue: false},
        opt2: { type: 'boolean', required: true, defaultValue: false}
    }
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://compends.com",
    "https://www.compends.com",
    "www.compends.com"
  ],
  plugins: [nextCookies()],
});
