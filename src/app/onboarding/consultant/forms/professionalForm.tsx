import MultiSelect from "@/components/form/multiSelect";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// File limit constants
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
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

function handleProfessionalFormSubmit(
  values: z.infer<typeof professionalFormSchema>
) {
  console.log(values);
}

export default function ProfessionalForm() {
  const professionalHookForm = useForm<z.infer<typeof professionalFormSchema>>({
    resolver: zodResolver(professionalFormSchema),
    defaultValues: {
      linkedinUrl: "",
      portfolioUrl: "",
      skills: [],
      resume: undefined,
    },
  });

  return (
    <Form {...professionalHookForm}>
      <form
        onSubmit={professionalHookForm.handleSubmit(
          handleProfessionalFormSubmit
        )}
        className="space-y-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>Professional Profile</CardTitle>
            <CardDescription>
              Provide links to your professional profiles and upload your resume
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={professionalHookForm.control}
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
              control={professionalHookForm.control}
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
              control={professionalHookForm.control}
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
              control={professionalHookForm.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume/CV</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload your resume in PDF, DOC, or DOCX format (max 5MB).
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
  );
}
