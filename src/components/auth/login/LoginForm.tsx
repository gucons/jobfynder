"use client";

import ButtonLoading from "@/components/form/loading-button";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  AuthCredentialSchema,
  AuthCredentialValues,
} from "@/schema/AuthCredentialSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import ImageGallery from "./ImageGallery";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

const LoginForm = () => {
  // states
  const [isPending, startTransition] = useTransition();

  // React Hook Form Steps
  const form = useForm<AuthCredentialValues>({
    resolver: zodResolver(AuthCredentialSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Submit Handler for Form
  const onSubmit = async (
    values: AuthCredentialValues,
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();
    // Login using next-auth
    const signInResponse = await signIn("credentials", {
      email: values.email,
      // password: values.password,
      password: "password",
      redirect: false, // Handle errors on this page
    });

    // Second check if someone bypasses client side validation
    if (signInResponse?.error) {
      toast.error("Log in failed", {
        description: signInResponse.code, // Get error message from server
      });
      return;
    }
    toast.success("Login successful! Redirecting you to your dashboard...", {
      description: "You are now logged in.",
    });
    startTransition(() => {});
  };
  return (
    <div className="mb-[12px] flex h-[680px] w-[500px] flex-col rounded-[10px] bg-white shadow-md">
      <div className="flex-center h-[40%] flex-col bg-brand-secondary">
        <Image
          src="/assets/icons/JF.svg"
          alt="SVG Example"
          width={44}
          height={45}
          className="mb-[13px]"
        />
        <h2 className="text-[#FFFFFF mb-[6px] text-center text-xl font-semibold">
          Welcome back!
        </h2>
        <h2 className="text-md mb-[15px] text-center font-normal text-[#AEB7CA]">
          Login to your account.
        </h2>
        <ImageGallery />
        <h2 className="text-center text-xs italic text-[#96A0B5]">
          Join 90,571+ peers.
        </h2>
      </div>
      <div className="flex h-[70%] flex-col items-center bg-white p-10">
        <Button className="flex-center mb-[12px] h-[45px] w-[420px] rounded-[5px] border border-solid border-[#E2E7F1] bg-white text-center shadow-sm">
          <Image
            src="/assets/icons/Google.svg"
            alt="SVG Example"
            width={20}
            height={20}
            className="mr-[9px]"
          />
          <span className="text-sm font-medium text-brand-secondary">
            Continue with Google
          </span>
        </Button>
        <Button className="flex-center mb-[10px] h-[45px] w-[420px] rounded-[5px] border border-solid border-[#E2E7F1] bg-white text-center shadow-sm">
          <Image
            src="/assets/icons/Github.svg"
            alt="SVG Example"
            width={20}
            height={20}
            className="mr-[9px]"
          />
          <span className="text-sm font-medium text-brand-secondary">
            Continue with Github
          </span>
        </Button>
        <div className="mb-[10px] flex w-full items-center text-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-[10px] text-sm font-normal text-[#AEB7CA]">
            or continue with email
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative w-full space-y-[6px]"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-[7px] text-sm font-medium text-brand-secondary">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@yourgmail.com"
                      {...field}
                      className="mb-[27px] h-[45px] w-full rounded-[8px] border border-solid border-[#E2E7F1] bg-transparent p-2 text-brand-secondary shadow-sm placeholder:text-start placeholder:text-sm placeholder:text-[#AEB7CA]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-[7px] text-sm font-medium text-brand-secondary">
                    Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="At least 8 characters."
                      {...field}
                      className="mb-[12px] h-[45px] w-full rounded-[8px] border border-solid border-[#E2E7F1] bg-transparent p-2 text-brand-secondary shadow-sm placeholder:text-start placeholder:text-sm placeholder:text-[#AEB7CA]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mb-[20px] flex w-full items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  // checked={clickedRemember}
                  // onCheckedChange={handleRememberMeChange}
                />
                <label
                  htmlFor="remember-me"
                  className="text-sm font-normal text-[#AEB7CA]"
                >
                  Remember me
                </label>
              </div>
              <Link
                href={"/forgot-password"}
                className="flex text-sm font-normal text-[#AEB7CA] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <ButtonLoading
              loading={isPending}
              staticText="Login"
              loaderText="Submitting"
              type="submit"
              icon={<MoveRight />}
              className="bg-brand-primary text-white transition-colors hover:bg-brand-primary/90 hover:text-white"
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
