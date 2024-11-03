import { Consultant, Education } from "@prisma/client";
import { z } from "zod";

// Define the Zod schema
const ConsultantSchema = z.object({
  professionalSummary: z.string(),
  experienceYears: z.number().int().default(0),
  desiredJobTitles: z.array(z.string()).default([]),
  employmentStatus: z.string(),
  industriesOfInterest: z.array(z.string()).default([]),
  education: z
    .array(
      z.object({
        institution: z.string(),
        major: z.string(),
        year: z.number().int(),
      })
    )
    .default([]),
  certifications: z.array(z.string()).default([]),
  linkedinURL: z.string(),
  portfolioURL: z.string(),
  skillsAndExpertise: z.array(z.string()).default([]),
  resumeCV: z.string(),
});

// Infer the type from the Zod schema
type ConsultantType = z.infer<typeof ConsultantSchema>;

// Ensure the types match by asserting Consultant against ConsultantType
export const assertTypeMatch: ConsultantType = {} as Consultant & {
  education: Education[];
};

export default ConsultantSchema;
