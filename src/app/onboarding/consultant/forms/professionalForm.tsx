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
import { UploadDropzone } from "@/lib/uploadThingComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
  resume: z.string({ message: "Please upload a resume" }),
});

async function handleProfessionalFormSubmit(
  values: z.infer<typeof professionalFormSchema>
) {
  localStorage.setItem("professionalFormData", JSON.stringify(values));

  // Retrieve data from all forms
  const coreFormData = JSON.parse(localStorage.getItem("coreFormData") || "{}");
  const educationalFormData = JSON.parse(
    localStorage.getItem("educationFormData") || "{}"
  );
  const professionalFormData = values;

  // Combine all form data
  const combinedData = {
    ...coreFormData,
    ...educationalFormData,
    ...professionalFormData,
  };

  // Upload combined data to the database
  // try {
  //   const response = await fetch("/api/upload", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(combinedData),
  //   });

  //   if (!response.ok) {
  //     throw new Error("Failed to upload data");
  //   }

  //   console.log("Data uploaded successfully");
  // } catch (error) {
  //   console.error("Error uploading data:", error);
  // }
  console.log("Combined data:", combinedData);
}

export default function ProfessionalForm() {
  const previousData = localStorage.getItem("professionalFormData");

  const professionalHookForm = useForm<z.infer<typeof professionalFormSchema>>({
    resolver: zodResolver(professionalFormSchema),
    defaultValues: previousData
      ? JSON.parse(previousData)
      : {
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
                    <UploadDropzone
                      endpoint="resume"
                      onClientUploadComplete={(res) => {
                        field.onChange(res[0].key);
                        toast.success("Resume uploaded successfully");
                      }}
                      onUploadError={() => {
                        toast.error(
                          "An error occurred while uploading the resume"
                        );
                      }}
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
  );
}
