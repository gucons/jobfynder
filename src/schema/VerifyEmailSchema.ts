import { z } from 'zod';

export const VerifyOtpSchema = z.object({
  activation_code: z.string().min(6, 'Please enter the OTP fully'),
});

export type VerifyOtpValues = z.infer<typeof VerifyOtpSchema>;
