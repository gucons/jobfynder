import { JobPosting, JobType, WorkLocation } from "@prisma/client";
import { z } from "zod";

const JobSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be less than 100 characters long" }),
  company: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters long" })
    .max(50, { message: "Company name must be less than 50 characters long" }),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters long" }),
  type: z.nativeEnum(JobType, {
    required_error: "Please select a job type",
  }),
  workLocation: z.nativeEnum(WorkLocation, {
    required_error: "Please select a remote option",
  }),
  salary: z.object({
    currency: z.string({
      required_error: "Currency is required",
    }),
    min: z.number({
      required_error: "Minimum salary is required",
    }),
    max: z.number({
      required_error: "Maximum salary is required",
    }),
  }),
  duration: z.date({
    required_error: "Duration is required",
  }),
  positions: z.coerce
    .number()
    .min(1, "At least 1 position is required")
    .max(100, "Maximum 100 positions allowed"),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(5000, "Description must be less than 5000 characters"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  deadline: z.date({
    required_error: "Application deadline is required",
  }),
});

export type JobSchemaType = z.infer<typeof JobSchema>;

// Ensure the types of JobSchema match with the DB type
// export const assertTypeMatch: JobSchemaType = {} as JobPosting;

export default JobSchema;
