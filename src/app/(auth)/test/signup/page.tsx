import SignupForm from '@/components/auth/signup/SignupForm';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Signup',
};

const TestSignup = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <SignupForm />
      <div className="flex items-center justify-center">
        <span className="mr-1 text-sm font-medium text-[#AEB7CA]">
          Already have a profile?
        </span>
        <Link
          href="/test/login"
          className="text-sm font-medium text-[#21252A] hover:underline"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default TestSignup;
