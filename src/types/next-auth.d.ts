import { UserRole } from "@prisma/client";
import { AdapterUser as NextAuthAdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: UserRole;
  }

  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  // Extend the AdapterUser type to include the role property
  interface AdapterUser extends NextAuthAdapterUser {
    role: UserRole;
  }
}
