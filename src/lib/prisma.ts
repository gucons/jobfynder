// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  // In production, always use a new PrismaClient instance.
  prisma = new PrismaClient();
} else {
  // In development, use a global variable to preserve the instance across hot reloads.
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export default prisma;
