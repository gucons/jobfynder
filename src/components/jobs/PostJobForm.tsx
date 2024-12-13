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
import { skills } from "@/data/skills";
import { cn } from "@/lib/utils";
import JobSchema from "@/schema/JobSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobType, WorkLocation } from "@prisma/client";
import { format, formatDistanceToNowStrict } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Session } from "next-auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import SkillCloud from "../form/skill-cloud";
import { AutosizeTextarea } from "../ui/auto-resize-testarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ButtonLoading from "../form/loading-button";

type JobFormData = z.infer<typeof JobSchema>;

export function PostJobForm({ session }: { session: Session }) {
  const [loading, setLoading] = useState(false);

  const form = useForm<JobFormData>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      type: "FULL_TIME",
      workLocation: "ON_SITE",
      salary: {
        currency: "USD",
      },
      positions: 5,
      skills: [],
      description: "",
    },
  });

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
            {/* Basic Information */}
            <div className="grid gap-4 sm:grid-cols-11">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-3">
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
                  <FormItem className="col-span-3">
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
                  <FormItem className="col-span-3">
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
                name="positions"
                render={({ field }) => (
                  <FormItem className="col-span-2">
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

            {/* Duration and Deadline */}
            <div className="grid gap-4 sm:grid-cols-11">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="col-span-3 flex flex-col space-y-3">
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  formatDistanceToNowStrict(field.value)
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
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="col-span-3 flex flex-col space-y-3">
                    <FormLabel>Application Deadline</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
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
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem className="col-span-5 flex flex-col space-y-3">
                    <FormLabel>Salary Range</FormLabel>
                    {/* <div className="relative flex rounded-lg shadow-sm shadow-black/5"> */}
                    <div className="grid grid-cols-5 rounded-lg shadow-sm shadow-black/5">
                      <Select
                        value={field.value.currency}
                        onValueChange={(value) => {
                          field.onChange({
                            ...field.value,
                            currency: value,
                          });
                        }}
                      >
                        <SelectTrigger className="col-span-1 inline-flex appearance-none items-center rounded-none rounded-s-lg border border-input bg-background text-center text-sm text-muted-foreground transition-shadow hover:bg-accent hover:text-accent-foreground focus:z-10 focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50">
                          <SelectValue
                            placeholder="Currency"
                            className="capatilize"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="INR">INR</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        onChange={(e) => {
                          field.onChange({
                            ...field.value,
                            amount: Number(e.target.value),
                          });
                        }}
                        value={field.value.min}
                        className="col-span-2 -ms-px rounded-e-none rounded-s-none shadow-none focus-visible:z-10"
                        placeholder="28,00,000"
                        type="number"
                      />
                      <Input
                        className="col-span-2 -ms-px flex-1 rounded-r-lg rounded-s-none border-l border-gray-300 shadow-none"
                        placeholder="80,000"
                        type="number"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Type of job */}
            <div className="flex gap-10 pt-2">
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
                name="workLocation"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Remote Position</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex space-x-0.5"
                      >
                        {Object.keys(WorkLocation).map((value) => (
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
            </div>

            {/* Skills selection */}
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem className="col-span-4 pt-2">
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
