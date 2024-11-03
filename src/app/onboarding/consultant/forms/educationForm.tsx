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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/lib/uploadThingComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

function handleEducationFormSubmit(
  values: z.infer<typeof educationFormSchema>
) {
  localStorage.setItem("educationFormData", JSON.stringify(values));
  window.location.href = "?step=professional";
}

export default function EducationForm() {
  const educationHookForm = useForm<z.infer<typeof educationFormSchema>>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      education: [
        { institution: "", year: new Date().getFullYear(), major: "" },
      ],
      certifications: "",
    },
  });

  return (
    <Form {...educationHookForm}>
      <form
        onSubmit={educationHookForm.handleSubmit(handleEducationFormSubmit)}
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
            {educationHookForm.watch("education").map((_, index) => (
              <div
                key={index}
                className="space-y-3 rounded-md border border-dashed border-gray-300 p-2"
              >
                <FormField
                  control={educationHookForm.control}
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
                    control={educationHookForm.control}
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
                    control={educationHookForm.control}
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
              type="submit"
              variant="outline"
              onClick={() =>
                educationHookForm.setValue("education", [
                  ...educationHookForm.watch("education"),
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
              control={educationHookForm.control}
              name="certifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certifications</FormLabel>
                  <FormControl>
                    {/* <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    /> */}
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        console.log("Files: ", res);
                        alert("Upload Completed");
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
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
