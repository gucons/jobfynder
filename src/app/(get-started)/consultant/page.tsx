"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSearchParams } from "next/navigation";
import MultiSelect from "@/components/form/multiSelect";
import { AutosizeTextarea } from "@/components/ui/auto-resize-testarea";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// const formSchema = z.object({
//     professionalSummary: z
//         .string()
//         .min(10, "Professional summary must be at least 10 characters long")
//         .max(500, "Professional summary must not exceed 500 characters"),
//     yearsOfExperience: z
//         .number()
//         .min(0, "Years of experience must be a positive number"),
//     industriesOfInterest: z
//         .array(z.string())
//         .min(1, "Please select at least one industry of interest"),
//     desiredJobTitles: z
//         .string()
//         .min(1, "Please enter at least one desired job title"),
//     currentEmploymentStatus: z.enum([
//         "Employed",
//         "Looking",
//         "Open to opportunities",
//     ]),
//     education: z
//         .array(
//             z.object({
//                 institution: z.string().min(1, "Institution name is required"),
//                 year: z
//                     .number()
//                     .min(1900, "Year must be after 1900")
//                     .max(
//                         new Date().getFullYear(),
//                         "Year cannot be in the future"
//                     ),
//                 major: z.string().min(1, "Major is required"),
//             })
//         )
//         .min(1, "Please add at least one education entry"),
//     certifications: z.string().optional(),
//     skills: z.array(z.string()).min(1, "Please select at least one skill"),
//     languages: z
//         .array(
//             z.object({
//                 language: z.string().min(1, "Language name is required"),
//                 proficiency: z.enum([
//                     "Beginner",
//                     "Intermediate",
//                     "Fluent",
//                     "Native",
//                 ]),
//             })
//         )
//         .min(1, "Please add at least one language"),
//     linkedinUrl: z
//         .string()
//         .url("Please enter a valid LinkedIn URL")
//         .optional()
//         .or(z.literal("")),
//     portfolioUrl: z
//         .string()
//         .url("Please enter a valid portfolio URL")
//         .optional()
//         .or(z.literal("")),
//     resume: z
//         .any()
//         .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
//         .refine(
//             (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
//             "Only .pdf, .doc, and .docx files are accepted."
//         ),
// });

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

const skills = [
  "JavaScript",
  "Python",
  "Java",
  "C#",
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "AWS",
  "Azure",
  "Docker",
  "Kubernetes",
  "Machine Learning",
  "Data Analysis",
  "Project Management",
  "Agile Methodologies",
  "DevOps",
  "UI/UX Design",
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
  const step = searchParams.get("step");
  console.log(step);

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

  // const form = useForm<z.infer<typeof formSchema>>({
  //     resolver: zodResolver(formSchema),
  //     defaultValues: {
  //         professionalSummary: "",
  //         yearsOfExperience: 0,
  //         industriesOfInterest: [],
  //         desiredJobTitles: "",
  //         currentEmploymentStatus: "Open to opportunities",
  //         education: [
  //             { institution: "", year: new Date().getFullYear(), major: "" },
  //         ],
  //         certifications: "",
  //         skills: [],
  //         languages: [{ language: "", proficiency: "Intermediate" }],
  //         linkedinUrl: "",
  //         portfolioUrl: "",
  //     },
  // });

  function onSubmit(values: z.infer<typeof coreFormSchema>) {
    console.log(values);
    // Handle form submission
  }

  return (
    <div className="flex-grow px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center text-3xl font-extrabold text-gray-900">
          Consultant Onboarding
        </h1>
        <Form {...coreForm}>
          <form
            onSubmit={coreForm.handleSubmit(onSubmit)}
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

        {/* <Card>
                    <CardHeader>
                        <CardTitle>Education and Certifications</CardTitle>
                        <CardDescription>
                            Tell us about your academic background and
                            professional certifications
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {form.watch("education").map((_, index) => (
                            <div key={index} className="space-y-4">
                                <FormField
                                    control={coreForm.control}
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
                                <FormField
                                    control={coreForm.control}
                                    name={`education.${index}.year`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Year</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            parseInt(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={coreForm.control}
                                    name={`education.${index}.major`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Major</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                form.setValue("education", [
                                    ...form.watch("education"),
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
                            control={coreForm.control}
                            name="certifications"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Certifications</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="List your relevant professional certifications"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter each certification on a new line.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card> */}

        {/* <Card>
                    <CardHeader>
                        <CardTitle>Skills and Expertise</CardTitle>
                        <CardDescription>
                            Tell us about your technical skills and language
                            proficiencies
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={coreForm.control}
                            name="skills"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Skills and Expertise</FormLabel>
                                    <div className="grid grid-cols-2 gap-2">
                                        {skills.map((skill) => (
                                            <FormField
                                                key={skill}
                                                control={coreForm.control}
                                                name="skills"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={skill}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(
                                                                        skill
                                                                    )}
                                                                    onCheckedChange={(
                                                                        checked
                                                                    ) => {
                                                                        return checked
                                                                            ? field.onChange(
                                                                                  [
                                                                                      ...field.value,
                                                                                      skill,
                                                                                  ]
                                                                              )
                                                                            : field.onChange(
                                                                                  field.value?.filter(
                                                                                      (
                                                                                          value
                                                                                      ) =>
                                                                                          value !==
                                                                                          skill
                                                                                  )
                                                                              );
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                {skill}
                                                            </FormLabel>
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {form.watch("languages").map((_, index) => (
                            <div key={index} className="space-y-4">
                                <FormField
                                    control={coreForm.control}
                                    name={`languages.${index}.language`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Language</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={coreForm.control}
                                    name={`languages.${index}.proficiency`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Proficiency</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select proficiency level" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Beginner">
                                                        Beginner
                                                    </SelectItem>
                                                    <SelectItem value="Intermediate">
                                                        Intermediate
                                                    </SelectItem>
                                                    <SelectItem value="Fluent">
                                                        Fluent
                                                    </SelectItem>
                                                    <SelectItem value="Native">
                                                        Native
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                form.setValue("languages", [
                                    ...form.watch("languages"),
                                    {
                                        language: "",
                                        proficiency: "Intermediate",
                                    },
                                ])
                            }
                        >
                            Add Language
                        </Button>
                    </CardContent>
                </Card> */}

        {/* <Card>
                    <CardHeader>
                        <CardTitle>Professional Profile</CardTitle>
                        <CardDescription>
                            Provide links to your professional profiles and
                            upload your resume
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={coreForm.control}
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
                            control={coreForm.control}
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
                            control={coreForm.control}
                            name="resume"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Resume/CV</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.files?.[0]
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Upload your resume in PDF, DOC, or DOCX
                                        format (max 5MB).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card> */}
      </div>
    </div>
  );
}
