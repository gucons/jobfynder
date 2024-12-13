"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobType } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Session } from "next-auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import SkillCloud, { Skill } from "../form/skill-cloud";
import { AutosizeTextarea } from "../ui/auto-resize-testarea";

const jobFormSchema = z.object({
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
  isRemote: z.enum(["REMOTE", "ON SITE"], {
    required_error: "Please select a remote option",
  }),
  salary: z.string().min(1, "Salary is required"),
  duration: z.string().optional(),
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

const skills: Skill[] = [
  { name: "JavaScript", category: "Programming" },
  { name: "Python", category: "Programming" },
  { name: "React", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "AWS", category: "Cloud/DevOps" },
  { name: "Docker", category: "Cloud/DevOps" },
  { name: "GraphQL", category: "API" },
  { name: "TypeScript", category: "Programming" },
  { name: "SQL", category: "Database" },
  { name: "Git", category: "Version Control" },
  { name: "Figma", category: "Design" },
  { name: "Kubernetes", category: "Cloud/DevOps" },
  { name: "Vue.js", category: "Frontend" },
  { name: "MongoDB", category: "Database" },
  { name: "Java", category: "Programming" },
  { name: "C#", category: "Programming" },
  { name: "Ruby", category: "Programming" },
  { name: "PHP", category: "Programming" },
  { name: "Swift", category: "Programming" },
  { name: "Objective-C", category: "Programming" },
  { name: "Angular", category: "Frontend" },
  { name: "Django", category: "Backend" },
  { name: "Flask", category: "Backend" },
  { name: "Spring", category: "Backend" },
  { name: "MySQL", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Redis", category: "Database" },
  { name: "Terraform", category: "Cloud/DevOps" },
  { name: "Ansible", category: "Cloud/DevOps" },
  { name: "Jenkins", category: "CI/CD" },
  { name: "Travis CI", category: "CI/CD" },
  { name: "CircleCI", category: "CI/CD" },
  { name: "Adobe XD", category: "Design" },
  { name: "Sketch", category: "Design" },
  { name: "Sass", category: "Frontend" },
  { name: "Less", category: "Frontend" },
  { name: "Webpack", category: "Frontend" },
  { name: "Babel", category: "Frontend" },
  { name: "Gulp", category: "Frontend" },
];

type JobFormData = z.infer<typeof jobFormSchema>;

export function PostJobForm({ session }: { session: Session }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      type: "FULL_TIME",
      isRemote: "REMOTE",
      salary: "",
      duration: "",
      positions: 5,
      skills: [],
      description: "",
    },
  });

  const onSubmit = async (data: JobFormData) => {
    setIsSubmitting(true);
    try {
      toast("Success!", {
        description: "Job has been posted successfully.",
      });
    } catch (error) {
      toast.error("Error", {
        description: "Failed to post job. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full p-4 sm:p-6">
      <div className="mb-6 border-b pb-2">
        <h2 className="text-2xl font-bold">Post a New Job</h2>
        <p className="mt-1 text-muted-foreground">
          Fill in the details for your job posting
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid gap-4 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Senior Frontend Developer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="San Francisco, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Compensation and Duration */}
            <div className="grid gap-4 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Range</FormLabel>
                    <div className="relative flex rounded-lg shadow-sm shadow-black/5">
                      <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground">
                        $
                      </span>
                      <FormControl>
                        <Input
                          {...field}
                          className="ps-7 shadow-none"
                          placeholder="50,000 - 80,000"
                          type="text"
                        />
                      </FormControl>
                    </div>
                    <FormDescription>Enter the salary range</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 6 months, 1 year" {...field} />
                    </FormControl>
                    <FormDescription>
                      Optional for contract/temporary positions
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="positions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Positions</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        placeholder="e.g. 2"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Type of job */}
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Job Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex space-x-0.5"
                      >
                        {Object.keys(JobType).map((value) => (
                          <Label
                            key={value}
                            htmlFor={value}
                            className={`cursor-pointer rounded-md border px-2.5 py-1.5 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${field.value === value ? "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80" : "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                          >
                            <RadioGroupItem
                              value={value}
                              id={value}
                              className="hidden"
                            />
                            {value
                              .replace("_", " ")
                              .toLowerCase()
                              .replace(/\b\w/g, (char) => char.toUpperCase())}
                          </Label>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isRemote"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Remote Position</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex space-x-0.5"
                      >
                        {["REMOTE", "ON SITE"].map((value) => (
                          <Label
                            key={value}
                            htmlFor={value}
                            className={`cursor-pointer rounded-md border px-2.5 py-1.5 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${field.value === value ? "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80" : "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                          >
                            <RadioGroupItem
                              value={value}
                              id={value}
                              className="hidden"
                            />
                            {value.charAt(0) + value.slice(1).toLowerCase()}
                          </Label>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-3">
                    <FormLabel>Application Deadline</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Skills selection */}

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormLabel>Required Skills</FormLabel>
                  <FormControl>
                    <SkillCloud
                      skills={skills}
                      selectedSkills={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-8">
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <AutosizeTextarea
                      placeholder="Describe the role, responsibilities, qualifications, and any other important details..."
                      rows={8}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Minimum 50 characters. Include key responsibilities,
                    requirements, and benefits.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
