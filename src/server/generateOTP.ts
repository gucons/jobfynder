import crypto from "crypto";

interface OTP {
  code: string;
  expiresAt: Date;
}

// Defaults to 6 digit and 10 min expiration
function generateOTP(length: number = 6, expiresInMinutes: number = 10): OTP {
  const otp = crypto
    .randomInt(0, Math.pow(10, length))
    .toString()
    .padStart(length, "0");

  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes);

  return { code: otp, expiresAt };
}

function verifyOTP(otp: OTP, inputCode: string): boolean {
  const now = new Date();
  if (now > otp.expiresAt) {
    return false;
  }
  return otp.code === inputCode;
}

export { generateOTP, verifyOTP };
