"use client";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import JobSchema from "@/schema/JobSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExperienceLevel, JobType, WorkLocation } from "@prisma/client";
import { Tag, TagInput } from "emblor";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import ButtonLoading from "../form/loading-button";
import { AutosizeTextarea } from "../ui/auto-resize-testarea";

type JobFormData = z.infer<typeof JobSchema>;

export function PostJobForm() {
  const [loading, setLoading] = useState(false);

  // EMBLOR
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const form = useForm<JobFormData>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      salaryRange: {},
      skills: [],
    },
  });

  const { setValue } = form;

  const onSubmit = async (data: JobFormData) => {
    setLoading(true);
    try {
      toast("Success!", {
        description: "Job has been posted successfully.",
      });
    } catch (error) {
      toast.error("Error", {
        description: "Failed to post job. Please try again.",
      });
    } finally {
      setLoading(false);
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Senior Frontend Developer" {...field} />
                  </FormControl>
                  <FormDescription>
                    Be specific and include the job level (e.g. Senior, Junior)
                  </FormDescription>
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
                      minHeight={100}
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

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the name of the company hiring for this position
                  </FormDescription>
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

            <FormField
              control={form.control}
              name="workLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Location</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={String(field.value)}
                      className="flex space-x-0.5"
                    >
                      {Object.keys(WorkLocation).map((value) => (
                        <Label
                          key={value}
                          htmlFor={value}
                          className={`cursor-pointer rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${field.value === value ? "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80" : "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
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
              name="employmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Type</FormLabel>
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
                          className={`cursor-pointer rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${field.value === value ? "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80" : "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
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
              name="experienceLevel"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Experience Level</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex space-x-0.5"
                    >
                      {Object.keys(ExperienceLevel).map((value) => (
                        <Label
                          key={value}
                          htmlFor={value}
                          className={`cursor-pointer rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${field.value === value ? "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80" : "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
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
              name="salaryRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Range</FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <Input
                        type="number"
                        placeholder="Minimum salary"
                        value={field.value?.min || ""}
                        onChange={(e) =>
                          field.onChange({
                            ...field.value,
                            min: Number(e.target.value),
                          })
                        }
                      />
                      <Input
                        type="number"
                        placeholder="Maximum salary"
                        value={field.value?.max || ""}
                        onChange={(e) =>
                          field.onChange({
                            ...field.value,
                            max: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Specify the salary range for this job
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="visaSponsorship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visa Sponsorship Available</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={field.value?.toString()}
                      className="flex space-x-0.5"
                    >
                      <Label
                        htmlFor="true"
                        className={`cursor-pointer rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                          field.value === true
                            ? "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80"
                            : "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        <RadioGroupItem
                          value="true"
                          id="true"
                          className="hidden"
                        />
                        Yes
                      </Label>
                      <Label
                        htmlFor="false"
                        className={`cursor-pointer rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                          field.value === false
                            ? "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80"
                            : "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        <RadioGroupItem
                          value="false"
                          id="false"
                          className="hidden"
                        />
                        No
                      </Label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <TagInput
                      tags={tags}
                      setTags={(newTags) => {
                        setTags(newTags);
                        setValue("skills", newTags as [Tag, ...Tag[]]);
                      }}
                      placeholder="Add a skill"
                      styleClasses={{
                        tagList: {
                          container: "gap-1",
                        },
                        input:
                          "rounded-lg transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20",
                        tag: {
                          body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
                          closeButton:
                            "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground",
                        },
                      }}
                      activeTagIndex={activeTagIndex}
                      setActiveTagIndex={setActiveTagIndex}
                      inlineTags={false}
                      inputFieldPosition="top"
                    />
                  </FormControl>
                  <FormDescription>
                    Add skills required for this job.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ButtonLoading
              loading={loading}
              staticText="Submit"
              loaderText="Submitting"
            />
          </div>
        </form>
      </Form>
    </Card>
  );
}
