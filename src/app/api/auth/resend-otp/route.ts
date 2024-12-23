import OTPCodeEmail from '@/emails/OTPTemplate';
import prisma from '@/lib/prisma';
import { generateOTP } from '@/server/generateOTP';
import handleRouteWithAuth from '@/server/handleAPIRouteAuth';
import { sendSuccessResponse } from '@/server/handleRouteResponse';
import { sendMail } from '@/server/sendMail';
import { render } from '@react-email/components';

export const GET = handleRouteWithAuth(async (req, session) => {
  // Generate new OTP
  const { code, expiresAt } = generateOTP();

  // Update or create OTP record
  await prisma.oTP.upsert({
    where: {
      userId_purpose: {
        userId: session.user.id,
        purpose: 'EMAIL_VERIFICATION',
      },
    },
    update: {
      code: code,
      expiry: expiresAt,
      used: false,
      usageCount: 0,
    },
    create: {
      userId: session.user.id,
      code: code,
      expiry: expiresAt,
      purpose: 'EMAIL_VERIFICATION',
    },
  });

  const EmailHTML = await render(OTPCodeEmail({ code }), {
    pretty: true,
  });

  // Send mail with new OTP
  await sendMail({
    toEmail: session.user.email,
    subject: 'Verify your email',
    htmlBody: EmailHTML,
  });

  return sendSuccessResponse({
    message: 'Verification code sent successfully',
    status: 200,
  });
});
