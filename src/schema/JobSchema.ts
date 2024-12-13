import { JobPosting, JobType, WorkLocation } from "@prisma/client";
import { z } from "zod";

const JobSchema = z.object({
  title: z
    .string({
      required_error: "Job title is required",
    })
    .min(3, { message: "Job title must be at least 3 characters long" })
    .max(100, { message: "Job title must be less than 100 characters long" }),
  company: z
    .string({
      required_error: "Company name is required",
    })
    .min(2, { message: "Company name must be at least 2 characters long" })
    .max(50, { message: "Company name must be less than 50 characters long" }),
  location: z
    .string({
      required_error: "Location is required",
    })
    .min(2, { message: "Location must be at least 2 characters long" })
    .max(100, { message: "Location must be less than 100 characters long" }),
  type: z.nativeEnum(JobType, {
    required_error: "Please select a job type",
    invalid_type_error: "Invalid job type",
  }),
  workLocation: z.nativeEnum(WorkLocation, {
    required_error: "Please select a remote option",
    invalid_type_error: "Invalid remote option",
  }),
  salary: z
    .object({
      currency: z
        .string({
          required_error: "Currency is required",
        })
        .min(1, { message: "Currency must be at least 1 character long" }),
      min: z
        .number({
          required_error: "Minimum salary is required",
        })
        .nonnegative({ message: "Minimum salary must be non-negative" }),
      max: z
        .number({
          required_error: "Maximum salary is required",
        })
        .nonnegative({ message: "Maximum salary must be non-negative" }),
    })
    .refine((data) => data.min <= data.max, {
      message: "Minimum salary must be less than or equal to maximum salary",
      path: ["max"],
    }),
  duration: z.date({
    required_error: "Duration is required",
    invalid_type_error: "Invalid date format",
  }),
  positions: z
    .number()
    .min(1, { message: "At least 1 position is required" })
    .max(100, { message: "Maximum 100 positions allowed" }),
  description: z
    .string()
    .min(50, { message: "Description must be at least 50 characters" })
    .max(5000, { message: "Description must be less than 5000 characters" }),
  skills: z
    .array(
      z.string().min(1, { message: "Skill must be at least 1 character long" })
    )
    .min(1, { message: "At least one skill is required" }),
  deadline: z.date({
    required_error: "Application deadline is required",
    invalid_type_error: "Invalid date format",
  }),
});

export type JobSchemaType = z.infer<typeof JobSchema>;

// Ensure the types of JobSchema match with the DB type
// * Salary is not included in the assertion, make sure to propery spread in the db
export const assertTypeMatch: Omit<JobSchemaType, "salary"> = {} as Omit<
  JobPosting,
  "salary"
>;

export default JobSchema;
