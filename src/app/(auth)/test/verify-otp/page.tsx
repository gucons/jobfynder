import VerifyOtpForm from '@/components/auth/signup/VerifyOtpForm';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Verify-OTP',
};

const VerifyOtpPage = () => {
  return (
    <div className="flex-center h-screen w-screen flex-col gap-7">
      <VerifyOtpForm />
      <div className="flex items-center justify-center">
        <span className="mr-1 text-sm font-medium text-[#AEB7CA]">
          Need help?
        </span>
        <Link
          href="#"
          className="text-sm font-medium text-[#21252A] hover:underline"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
