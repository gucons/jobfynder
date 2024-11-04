"use client";

import ButtonLoading from "@/components/form/buttonLoading";
import MultiSelect from "@/components/form/multiSelect";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import showToastError from "@/lib/toastError";
import { UploadDropzone } from "@/lib/uploadThingComponent";
import ConsultantSchema from "@/schema/consultantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CoreFormFields } from "./coreForm";
import { EducationFormFields } from "./educationForm";
import usePersistentForm from "@/lib/usePersistentForm";

const skillsAndExpertise: {
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
  linkedinURL: z.string().url("Please enter a valid LinkedIn URL"),
  portfolioURL: z.string().url("Please enter a valid portfolio URL"),
  skillsAndExpertise: z
    .array(z.string())
    .min(1, "Please select at least one skill"),
  resumeCV: z.string().min(1, "Please upload a resume"),
});

export type ProfessionalFormFields = z.infer<typeof professionalFormSchema>;

export default function ProfessionalForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const defaultValues: ProfessionalFormFields = {
    linkedinURL: "",
    portfolioURL: "",
    skillsAndExpertise: [],
    resumeCV: "",
  };

  const professionalHookForm = usePersistentForm(
    professionalFormSchema,
    "professionalFormData",
    defaultValues
  );

  async function handleProfessionalFormSubmit(
    values: z.infer<typeof professionalFormSchema>
  ) {
    localStorage.setItem("professionalFormData", JSON.stringify(values));

    // Retrieve data from all forms
    const coreFormData: CoreFormFields = JSON.parse(
      localStorage.getItem("coreFormData") || "{}"
    );
    const educationalFormData: EducationFormFields = JSON.parse(
      localStorage.getItem("educationFormData") || "{}"
    );
    const professionalFormData = values;

    // Combine all form data
    const combinedData: z.infer<typeof ConsultantSchema> = {
      ...coreFormData,
      ...educationalFormData,
      ...professionalFormData,
    };

    // Upload combined data to the database
    try {
      const response = await axios.post("/api/user/profile/role", combinedData);
      if (response.status === 200) {
        toast.success("Role updated successfully");

        router.push("/onboarding/basic-info");
      }
    } catch (error) {
      showToastError(error);
    } finally {
      setLoading(false);
    }
  }

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
              name="linkedinURL"
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
              name="portfolioURL"
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
              name="skillsAndExpertise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills and Expertise</FormLabel>
                  <FormControl>
                    <MultiSelect
                      field={field}
                      options={skillsAndExpertise}
                      label="Choose your skillsAndExpertise"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={professionalHookForm.control}
              name="resumeCV"
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
            <ButtonLoading type="submit" loading={loading} />
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
