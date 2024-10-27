import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        role: UserRole;
    }

    interface Session {
        user: {
            role?: UserRole;
        } & DefaultSession["user"];
    }
}
