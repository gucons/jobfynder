import LoginForm from "@/components/auth/login/LoginForm";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Login",
};

const TestLogin = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <LoginForm />
      <div className="flex items-center justify-center">
        <span className="mr-1 text-sm font-medium text-[#AEB7CA]">
          Don’t have a Job finder profile?
        </span>
        <Link
          href="/signup"
          className="text-sm font-medium text-[#21252A] hover:underline"
        >
          Create One!
        </Link>
      </div>
    </div>
  );
};

export default TestLogin;
