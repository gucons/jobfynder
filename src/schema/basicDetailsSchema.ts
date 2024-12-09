import { z } from "zod";

const BasicDetailsSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  contactEmail: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Please enter a valid phone number.",
  }),
//   location: z.string().min(1, { message: "Please select your location." }),
  linkedinUrl: z
    .string()
    .url({ message: "Please enter a valid LinkedIn URL." }),
  bio: z.string().max(500, { message: "Bio must not exceed 500 characters." }),
});

export default BasicDetailsSchema;
