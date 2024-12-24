// next-auth.d.ts
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      emailVerified: boolean;
      username: string;
      firstName: string;
      lastName: string;
      image: string | null;
      onboardingComplete: boolean;
    } & Omit<DefaultSession['user'], 'name' | 'email' | 'image'>;
  }

  interface User {
    id: string;
    email: string;
    emailVerified: boolean;
    username: string;
    firstName: string;
    lastName: string;
    image: string | null;
    onboardingComplete: boolean;
  }

  interface JWT {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    bio: string;
    image: string | null;
    onboardingComplete: boolean;
  }
}
