"use client";

import MultiSelect from "@/components/form/multiSelect";
import { AutosizeTextarea } from "@/components/ui/auto-resize-testarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const coreFormSchema = z.object({
  professionalSummary: z
    .string()
    .min(10, "Professional summary must be at least 10 characters long")
    .max(500, "Professional summary must not exceed 500 characters"),
  yearsOfExperience: z
    .number()
    .min(0, "Years of experience must be a positive number"),
  industriesOfInterest: z
    .array(z.string())
    .min(1, "Please select at least one industry of interest"),
  desiredJobTitles: z
    .array(z.string())
    .min(1, "Please enter at least one desired job title"),
  currentEmploymentStatus: z.enum([
    "Employed",
    "Looking",
    "Open to opportunities",
  ]),
});

const educationFormSchema = z.object({
  education: z
    .array(
      z.object({
        institution: z.string().min(1, "Institution name is required"),
        year: z
          .number()
          .min(1900, "Year must be after 1900")
          .max(new Date().getFullYear(), "Year cannot be in the future"),
        major: z.string().min(1, "Major is required"),
      })
    )
    .min(1, "Please add at least one education entry"),
  certifications: z.string().optional(),
});

const professionalFormSchema = z.object({
  linkedinUrl: z
    .string()
    .url("Please enter a valid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  portfolioUrl: z
    .string()
    .url("Please enter a valid portfolio URL")
    .optional()
    .or(z.literal("")),
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
  resume: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      "Only .pdf, .doc, and .docx files are accepted."
    ),
});

const industries: {
  label: string;
  value: string;
}[] = [
  { label: "IT", value: "it" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Finance", value: "finance" },
  { label: "Education", value: "education" },
  { label: "Manufacturing", value: "manufacturing" },
  { label: "Retail", value: "retail" },
  { label: "Telecommunications", value: "telecommunications" },
  { label: "Energy", value: "energy" },
  { label: "Transportation", value: "transportation" },
  { label: "Entertainment", value: "entertainment" },
];

const skills: {
  label: string;
  value: string;
}[] = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C#", value: "csharp" },
  { label: "React", value: "react" },
  { label: "Angular", value: "angular" },
  { label: "Vue.js", value: "vuejs" },
  { label: "Node.js", value: "nodejs" },
  { label: "AWS", value: "aws" },
  { label: "Azure", value: "azure" },
  { label: "Docker", value: "docker" },
  { label: "Kubernetes", value: "kubernetes" },
  { label: "Machine Learning", value: "machine-learning" },
  { label: "Data Analysis", value: "data-analysis" },
  { label: "Project Management", value: "project-management" },
  { label: "Agile Methodologies", value: "agile-methodologies" },
  { label: "DevOps", value: "devops" },
  { label: "UI/UX Design", value: "ui-ux-design" },
];

const jobTitles: {
  label: string;
  value: string;
}[] = [
  { label: "Software Engineer", value: "software-engineer" },
  { label: "Product Manager", value: "product-manager" },
  { label: "Data Scientist", value: "data-scientist" },
  { label: "UX Designer", value: "ux-designer" },
  { label: "Marketing Specialist", value: "marketing-specialist" },
  { label: "Sales Representative", value: "sales-representative" },
  { label: "Human Resources Manager", value: "human-resources-manager" },
  { label: "Financial Analyst", value: "financial-analyst" },
  { label: "Operations Manager", value: "operations-manager" },
  {
    label: "Customer Support Specialist",
    value: "customer-support-specialist",
  },
];

export default function ConsultantOnboarding() {
  const searchParams = useSearchParams();

  // Get the current step from the URL
  const step = searchParams.get("step");

  // React Hook Form for each form
  const coreForm = useForm<z.infer<typeof coreFormSchema>>({
    resolver: zodResolver(coreFormSchema),
    defaultValues: {
      professionalSummary: "",
      yearsOfExperience: 0,
      currentEmploymentStatus: undefined,
      desiredJobTitles: [],
      industriesOfInterest: [],
    },
  });

  const educationForm = useForm<z.infer<typeof educationFormSchema>>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      education: [
        { institution: "", year: new Date().getFullYear(), major: "" },
      ],
      certifications: "",
    },
  });

  const professionalForm = useForm<z.infer<typeof professionalFormSchema>>({
    resolver: zodResolver(professionalFormSchema),
    defaultValues: {
      linkedinUrl: "",
      portfolioUrl: "",
      skills: [],
      resume: undefined,
    },
  });

  // onSubmit functions for each form
  function handleCoreSubmit(values: z.infer<typeof coreFormSchema>) {
    console.log(values);
  }

  function handleEducationSubmit(values: z.infer<typeof educationFormSchema>) {
    console.log(values);
  }

  function handleProfessionalSubmit(
    values: z.infer<typeof professionalFormSchema>
  ) {
    console.log(values);
  }

  return (
    <div className="h-full flex-grow px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center text-3xl font-extrabold text-gray-900">
          Consultant Onboarding
        </h1>
        {step === "core" && (
          <Form {...coreForm}>
            <form
              onSubmit={coreForm.handleSubmit(handleCoreSubmit)}
              className="space-y-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Core Information</CardTitle>
                  <CardDescription>
                    Tell us about your professional background and goals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={coreForm.control}
                    name="professionalSummary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Summary</FormLabel>
                        <FormControl>
                          <AutosizeTextarea
                            placeholder="Briefly describe your key skills, experiences, and career goals"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This summary will help potential employers understand
                          your background quickly.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-4 gap-3">
                    <FormField
                      control={coreForm.control}
                      name="yearsOfExperience"
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <FormLabel>Experience</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (value >= 0 || e.target.value === "") {
                                  field.onChange(value);
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={coreForm.control}
                      name="desiredJobTitles"
                      render={({ field }) => (
                        <FormItem className="col-span-3">
                          <FormLabel>Desired Job Titles</FormLabel>
                          <FormControl>
                            <MultiSelect
                              field={field}
                              options={jobTitles}
                              label="Job Titles"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    <FormField
                      control={coreForm.control}
                      name="currentEmploymentStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employment Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Employed">Employed</SelectItem>
                              <SelectItem value="Looking">Looking</SelectItem>
                              <SelectItem value="Open to opportunities">
                                Open
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={coreForm.control}
                      name="industriesOfInterest"
                      render={() => (
                        <FormItem className="col-span-3">
                          <FormLabel>Industries of Interest</FormLabel>
                          <FormField
                            control={coreForm.control}
                            name="industriesOfInterest"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <MultiSelect
                                    field={field}
                                    options={industries}
                                    label="Industries"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        )}

        {step === "education" && (
          <Form {...educationForm}>
            <form
              onSubmit={educationForm.handleSubmit(handleEducationSubmit)}
              className="space-y-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Education and Certifications</CardTitle>
                  <CardDescription>
                    Tell us about your academic background and professional
                    certifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {educationForm.watch("education").map((_, index) => (
                    <div
                      key={index}
                      className="space-y-3 rounded-md border border-dashed border-gray-300 p-2"
                    >
                      <FormField
                        control={educationForm.control}
                        name={`education.${index}.institution`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Institution</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-4 gap-3">
                        <FormField
                          control={educationForm.control}
                          name={`education.${index}.major`}
                          render={({ field }) => (
                            <FormItem className="col-span-3">
                              <FormLabel>Major</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={educationForm.control}
                          name={`education.${index}.year`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Year</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(parseInt(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      educationForm.setValue("education", [
                        ...educationForm.watch("education"),
                        {
                          institution: "",
                          year: new Date().getFullYear(),
                          major: "",
                        },
                      ])
                    }
                  >
                    Add Education
                  </Button>
                  <FormField
                    control={educationForm.control}
                    name="certifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certifications</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        )}

        {step === "professional" && (
          <Form {...professionalForm}>
            <form
              onSubmit={professionalForm.handleSubmit(handleProfessionalSubmit)}
              className="space-y-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Professional Profile</CardTitle>
                  <CardDescription>
                    Provide links to your professional profiles and upload your
                    resume
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={professionalForm.control}
                    name="linkedinUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn Profile URL</FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="https://www.linkedin.com/in/yourprofile"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={professionalForm.control}
                    name="portfolioUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Portfolio URL</FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="https://www.yourportfolio.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={professionalForm.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills and Expertise</FormLabel>
                        <FormControl>
                          <MultiSelect
                            field={field}
                            options={skills}
                            label="Choose your skills"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={professionalForm.control}
                    name="resume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resume/CV</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Upload your resume in PDF, DOC, or DOCX format (max
                          5MB).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
