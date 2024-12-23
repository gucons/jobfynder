'use client';

import ButtonLoading from '@/components/form/loading-button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { VerifyOtpValues, VerifyOtpSchema } from '@/schema/VerifyEmailSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveRight } from 'lucide-react';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';

const OtpInputForm = () => {
  // states
  const [isPending, startTransition] = useTransition();

  // React Hook form steps
  const form = useForm<VerifyOtpValues>({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: {
      activation_code: '',
    },
  });

  const onSubmit = async (
    values: VerifyOtpValues,
    e?: React.BaseSyntheticEvent,
  ) => {
    e?.preventDefault();
    startTransition(async () => {
      // // Login using next-auth
      // const signInResponse = await signIn('credentials', {
      //   email: values.email,
      //   // password: values.password,
      //   password: 'password',
      //   redirect: false, // Handle errors on this page
      // });
      // // Second check if someone bypasses client side validation
      // if (signInResponse?.error) {
      //   toast.error('Log in failed', {
      //     description: signInResponse.code, // Get error message from server
      //   });
      //   return;
      // }
      // toast.success('Login successful! Redirecting you to your dashboard...', {
      //   description: 'You are now logged in.',
      // });
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center gap-4"
      >
        <FormField
          control={form.control}
          name="activation_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-[7px] text-sm font-medium text-brand-secondary">
                Verification Code
              </FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                  pattern="\d*"
                  inputMode="numeric"
                  onKeyDown={(e) => {
                    if (
                      !/^\d$/.test(e.key) &&
                      ![
                        'Backspace',
                        'Delete',
                        'ArrowLeft',
                        'ArrowRight',
                        'Tab',
                      ].includes(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                >
                  <InputOTPGroup className="gap-4">
                    <InputOTPSlot index={0} className="input-otp text-black" />
                    <InputOTPSlot index={1} className="input-otp text-black" />
                    <InputOTPSlot index={2} className="input-otp text-black" />
                    <InputOTPSlot index={3} className="input-otp text-black" />
                    <InputOTPSlot index={4} className="input-otp text-black" />
                    <InputOTPSlot index={5} className="input-otp text-black" />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h3 className="cursor-pointer text-end text-sm font-medium text-[#AEB7CA]">
          Resend Code
        </h3>
        <ButtonLoading
          loading={isPending}
          staticText="Verify and Continue"
          loaderText="Verifying"
          type="submit"
          icon={<MoveRight />}
          className="bg-brand-primary text-white transition-colors hover:bg-brand-primary/90 hover:text-white"
        />
      </form>
    </Form>
  );
};

export default OtpInputForm;
