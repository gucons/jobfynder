import prisma from '@/lib/prisma';
import { AuthCredentialSchema } from '@/schema/AuthCredentialSchema';
import bcrypt from 'bcryptjs';
import NextAuth, { CredentialsSignin, Session } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { z } from 'zod';

// !Update the adaptor once the normal auth flow is done
// const prismaAdapter = PrismaAdapter(prisma);

// prismaAdapter.createUser = async (data) => {
//   return await prisma.user.create({
//     data: {
//       email: data.email as string,
//       image: data.image as string,
//       emailVerified: true,
//     },
//   });
// };

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
          label: 'Email',
          placeholder: 'johndoe@email.com',
          type: 'email',
          required: true,
        },
        password: {
          label: 'Password',
          placeholder: 'Shhhhhhhh!',
          type: 'password',
          required: true,
        },
      },
      authorize: async (credentials) => {
        try {
          // Validate credentials
          const { email, password } = AuthCredentialSchema.parse(credentials);
          if (!email || !password) {
            throw new CustomCredentialsError(
              'invalid_credentials',
              'Please enter your email and password.',
            );
          }

          const [fullUser, pendingUser] = await Promise.all([
            prisma.user.findUnique({
              where: {
                email: email,
              },
              select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                image: true,
                email: true,
                emailVerified: true,
                hashedPassword: true,
              },
            }),
            prisma.pendingUser.findUnique({
              where: {
                email: email,
              },
              select: {
                id: true,
                // username: true,
                // firstName: true,
                // lastName: true,
                image: true,
                email: true,
                emailVerified: true,
                hashedPassword: true,
              },
            }),
          ]);

          if (!fullUser || !pendingUser) {
            throw new CustomCredentialsError(
              'user_not_found',
              'No user found, please register.',
            );
          }

          const isPasswordValid = await bcrypt.compare(
            password,
            (fullUser || pendingUser).hashedPassword as string,
          );

          if (!isPasswordValid) {
            throw new CustomCredentialsError(
              'invalid_credentials',
              'Invalid email or password.',
            );
          }

          if (fullUser) {
            const { hashedPassword, ...userWithoutPassword } = fullUser; // eslint-disable-line @typescript-eslint/no-unused-vars
            return {
              ...userWithoutPassword,
              onboardingComplete: true,
            };
          } else {
            return {
              id: pendingUser.id,
              email: pendingUser.email,
              image: pendingUser.image,
              emailVerified: pendingUser.emailVerified,
              username: 'onboarding_username',
              firstName: 'onboarding_firstName',
              lastName: 'onboarding_lastName',
              onboardingComplete: false,
            };
          }
        } catch (error: unknown) {
          if (error instanceof z.ZodError) {
            throw new CustomCredentialsError(
              'invalid_credentials',
              error.errors[0].message || 'Invalid email or password.',
            );
          } else if (error instanceof CustomCredentialsError) {
            throw error;
          } else {
            console.error(
              'Error during authentication:',
              (error as Error).message || error,
            );
            throw new CustomCredentialsError(
              'internal_server_error',
              'An error occurred during authentication.',
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
        return { ...user };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        return { ...session, ...token };
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login', // Custom signin page
    error: '/error', // Custom error page
  },
  debug: process.env.NODE_ENV === 'development',
});

export async function getSessionServer() {
  const session = await auth();
  if (session?.user || session?.user?.id || session?.user?.email)
    return session as Session;
  return null;
}
