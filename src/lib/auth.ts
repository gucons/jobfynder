import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import NextAuth, {
  CredentialsSignin,
  DefaultSession,
  Session,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { z } from "zod";

const prismaAdapter = PrismaAdapter(prisma);

// @ts-ignore
prismaAdapter.createUser = async (data) => {
  return await prisma.user.create({
    data: {
      name: data.name as string,
      email: data.email as string,
      image: data.image as string,
      role: "PENDING",
      emailVerified: true,
    },
  });
};

class CustomCredentialsError extends CredentialsSignin {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: prismaAdapter,
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          placeholder: "johndoe@email.com",
          type: "email",
          required: true,
        },
        password: {
          label: "Password",
          placeholder: "Shhhhhhhh!",
          type: "password",
          required: true,
        },
      },
      authorize: async (credentials, request) => {
        const { email, password } = await z
          .object({
            email: z
              .string({
                message: "Please enter a valid email address.",
              })
              .email({
                message: "Please enter a valid email address.",
              }),
            password: z.string({
              message: "Please enter your password.",
            }),
          })
          .parseAsync(credentials);

        if (!email || !password) {
          throw new Error("Please enter your email and password.");
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
            select: {
              id: true,
              email: true,
              name: true,
              emailVerified: true,
              role: true,
              hashedPassword: true,
            },
          });

          if (!user) throw new Error("No user found, please register.");

          const isPasswordValid = await bcrypt.compare(
            password,
            user.hashedPassword as string
          );

          if (!isPasswordValid) throw new Error("Invalid email or password.");

          // Return user if credentials are valid
          const { hashedPassword, ...userWithoutPassword } = user;
          return userWithoutPassword;
        } catch (error: any) {
          if (error instanceof z.ZodError) {
            throw new Error(
              error.errors[0].message || "Invalid email or password."
            );
          } else {
            console.error(
              "Error during authentication:",
              error.message || error
            );
            throw new CustomCredentialsError(
              "An error occurred during authentication.",
              error.message || "An error occurred during authentication."
            );
          }
        }
      },
    }),
    Github,
    Google,
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          role: token.role as UserRole,
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // Custom signin page
    // error: "/error", // Error page
  },
  debug: process.env.NODE_ENV === "development",
});

export async function getSessionServer() {
  const session = await auth();
  if (session?.user) return session as Session;
  return null;
}
