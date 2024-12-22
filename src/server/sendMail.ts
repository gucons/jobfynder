import { env } from "@/env";
import AWS from "aws-sdk";
import { SendEmailRequest } from "aws-sdk/clients/ses";

// Configure AWS SDK
AWS.config.update({
  accessKeyId: env.SES_ACCESS_KEY_ID,
  secretAccessKey: env.SES_SECRET_ACCESS_KEY,
  region: env.SES_REGION,
});

// Configure AWS SES
const ses = new AWS.SES();

interface SendMailParams {
  toEmail: string;
  subject: string;
  htmlBody: string;
}

export const sendMail = async ({
  toEmail,
  subject,
  htmlBody,
}: SendMailParams) => {
  const params: SendEmailRequest = {
    Destination: {
      ToAddresses: [toEmail],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlBody,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: env.SES_FROM_EMAIL,
    ReplyToAddresses: [env.SES_FROM_EMAIL],
  };

  try {
    return await ses.sendEmail(params).promise();
  } catch (error: unknown) {
    // Handle error in route for ERROR Response
    console.error(`Failed to send email to ${toEmail}:`, error);
    throw new Error(`Failed to send email: ${(error as Error).message}`);
  }
};
