import OTPCodeEmail from '@/emails/OTPTemplate';
import prisma from '@/lib/prisma';
import { AuthCredentialSchema } from '@/schema/AuthCredentialSchema';
import { generateOTP } from '@/server/generateOTP';
import handleRoute from '@/server/handleAPIRoute';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '@/server/handleRouteResponse';
import { sendMail } from '@/server/sendMail';
import { render } from '@react-email/components';
import bcrypt from 'bcryptjs';

export const POST = handleRoute(async (req) => {
  const requestData = await req.json();

  const data = AuthCredentialSchema.parse(requestData);

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
    select: {
      id: true,
    },
  });

  if (existingUser) {
    return sendErrorResponse({
      message: 'User already exists',
    });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  // Create a new user
  const user = await prisma.user.create({
    data: {
      email: data.email,
      hashedPassword,
    },
    select: {
      id: true,
    },
  });

  // Generate OTP for email verification
  const { code, expiresAt } = generateOTP();

  // Create or update OTP for the user
  await prisma.oTP.upsert({
    where: {
      userId_purpose: {
        userId: user.id,
        purpose: 'EMAIL_VERIFICATION',
      },
    },
    update: {
      code: code,
      expiry: expiresAt,
    },
    create: {
      userId: user.id,
      code: code,
      expiry: expiresAt,
      purpose: 'EMAIL_VERIFICATION',
    },
    select: {
      id: true,
    },
  });

  const EmailHTML = await render(OTPCodeEmail({ code }), {
    pretty: true,
  });

  // Send mail to user for email verification
  await sendMail({
    toEmail: data.email,
    subject: 'Verify your email',
    htmlBody: EmailHTML,
  });

  return sendSuccessResponse({
    message: 'User created successfully',
  });
});
