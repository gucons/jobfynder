import { ExperienceLevel, JobType, WorkLocation } from "@prisma/client";
import { z } from "zod";

const JobSchema = z.object({
  title: z
    .string({
      required_error: "Job title is required",
    })
    .min(3, { message: "Job title must be at least 3 characters long" })
    .max(100, { message: "Job title must be less than 100 characters long" }),
  description: z
    .string()
    .min(50, { message: "Description must be at least 50 characters" })
    .max(5000, { message: "Description must be less than 5000 characters" }),
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
  workLocation: z.nativeEnum(WorkLocation, {
    required_error: "Please select a remote option",
    invalid_type_error: "Invalid remote option",
  }),
  employmentType: z.nativeEnum(JobType, {
    required_error: "Please select a job type",
    invalid_type_error: "Invalid job type",
  }),
  experienceLevel: z.nativeEnum(ExperienceLevel, {
    required_error: "Please select an experience level",
    invalid_type_error: "Invalid experience level",
  }),
  salaryRange: z
    .object({
      min: z
        .number({
          required_error: "Minimum salary is required",
          invalid_type_error: "Minimum salary must be a number",
        })
        .nonnegative({ message: "Minimum salary must be non-negative" }),
      max: z
        .number({
          required_error: "Maximum salary is required",
          invalid_type_error: "Maximum salary must be a number",
        })
        .nonnegative({ message: "Maximum salary must be non-negative" }),
    })
    .refine((data) => data.min <= data.max, {
      message: "Minimum salary must be less than or equal to maximum salary",
      path: ["max"],
    }),
  visaSponsorship: z.boolean({
    required_error: "Visa sponsorship is required",
    invalid_type_error: "Invalid visa sponsorship option",
  }),
  skills: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    )
    .min(1, { message: "At least one skill is required" }),
});

export type JobSchemaType = z.infer<typeof JobSchema>;

// Ensure the types of JobSchema match with the DB type
// * Salary is not included in the assertion, make sure to propery spread in the db
// export const assertTypeMatch: Omit<JobSchemaType, "salary"> = {} as Omit<
//   JobPosting,
//   "salary"
// >;

export default JobSchema;
