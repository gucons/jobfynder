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
import { useForm } from "react-hook-form";
import { z } from "zod";

// Data for the core form
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

// Core form schema
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
    "employed",
    "looking",
    "open_to_opportunities",
  ]),
});

const employmentStatusOptions: {
  label: string;
  value: z.infer<typeof coreFormSchema>["currentEmploymentStatus"];
}[] = [
  { label: "Employed", value: "employed" },
  { label: "Looking", value: "looking" },
  { label: "Open to opportunities", value: "open_to_opportunities" },
];

// onSubmit functions for each form
function handleCoreFormSubmit(values: z.infer<typeof coreFormSchema>) {
  localStorage.setItem("coreFormData", JSON.stringify(values));
  window.location.href = "?step=education";
}

export default function CoreForm() {
  const previousData = localStorage.getItem("coreFormData");
  // React Hook Form for core details
  const coreHookForm = useForm<z.infer<typeof coreFormSchema>>({
    resolver: zodResolver(coreFormSchema),
    defaultValues: previousData
      ? JSON.parse(previousData)
      : {
          professionalSummary: "",
          yearsOfExperience: 0,
          currentEmploymentStatus: undefined,
          desiredJobTitles: [],
          industriesOfInterest: [],
        },
  });

  return (
    <Form {...coreHookForm}>
      <form
        onSubmit={coreHookForm.handleSubmit(handleCoreFormSubmit)}
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
              control={coreHookForm.control}
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
                    This summary will help potential employers understand your
                    background quickly.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-4 gap-3">
              <FormField
                control={coreHookForm.control}
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
                control={coreHookForm.control}
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
                control={coreHookForm.control}
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
                        {employmentStatusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={coreHookForm.control}
                name="industriesOfInterest"
                render={() => (
                  <FormItem className="col-span-3">
                    <FormLabel>Industries of Interest</FormLabel>
                    <FormField
                      control={coreHookForm.control}
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
  );
}
