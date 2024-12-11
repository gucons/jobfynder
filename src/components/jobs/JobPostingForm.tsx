import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  location: z.string(),
  maxApplicants: z.number().min(1),
  maxPositions: z.number().min(1),
  deadline: z.date(),
  skillsets: z.array(z.string()),
  jobType: z.enum(["FULLTIME", "PARTTIME", "CONTRACT", "REMOTE"]),
  duration: z.number().optional(),
  salary: z.number().min(1),
});

export function JobPostingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Add more form fields for other properties */}

        <Button type="submit">Post Job</Button>
      </form>
    </Form>
  );
}
