// next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      image?: string;
      email: string;
      emailVerified: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name?: string;
    image?: string;
    email: string;
    emailVerified: boolean;
  }
}
