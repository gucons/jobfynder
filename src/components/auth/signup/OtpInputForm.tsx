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
import axios, { AxiosError } from 'axios';
import { MoveRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const OtpInputForm = () => {
  // states
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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
      // Register the user
      try {
        const response = await axios.post<{
          success: boolean;
          message: string;
        }>('/api/auth/verify-email', values);

        if (response.data.success) {
          toast.success('Email verified successfully', {});
          router.push('/');
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error('Email verification failed', {
            description: error.response?.data.message,
          });
          return;
        } else {
          toast.error('Email verification failed', {
            description: 'An error occurred. Please try again.',
          });
          return;
        }
      }
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
