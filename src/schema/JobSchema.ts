import { JobPosting, JobType } from "@prisma/client";
import { z } from "zod";

const JobSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(1000),
  location: z.string().min(2).max(100),
  maxApplicants: z.string().transform((val) => parseInt(val)),
  maxPositions: z.string().transform((val) => parseInt(val)),
  deadline: z.string().transform((val) => new Date(val)),
  skillsets: z.array(z.string()),
  jobType: z.nativeEnum(JobType),
  duration: z
    .string()
    .transform((val) => parseInt(val))
    .nullable()
    .optional(),
  salary: z.string().transform((val) => parseInt(val)),
});

export type JobSchemaType = z.infer<typeof JobSchema>;

// Ensure the types of JobSchema match with the DB type
export const assertTypeMatch: JobSchemaType = {} as JobPosting;

export default JobSchema;
