"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
    firstName: z
        .string()
        .min(2, { message: "First name must be at least 2 characters." }),
    lastName: z
        .string()
        .min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z
        .string()
        .min(10, { message: "Please enter a valid phone number." }),
    city: z.string().min(2, { message: "City must be at least 2 characters." }),
    state: z
        .string()
        .min(2, { message: "State/Province must be at least 2 characters." }),
    country: z
        .string()
        .min(2, { message: "Country must be at least 2 characters." }),
    timezone: z.string({ required_error: "Please select a timezone." }),
    title: z.string().min(2, {
        message: "Professional title must be at least 2 characters.",
    }),
    experience: z.string({
        required_error: "Please select years of experience.",
    }),
    workHours: z.string({
        required_error: "Please select preferred working hours.",
    }),
    linkedIn: z.string().url({ message: "Please enter a valid LinkedIn URL." }),
    skills: z
        .array(z.string())
        .min(1, { message: "Please select at least one skill." }),
    summary: z
        .string()
        .min(50, { message: "Summary must be at least 50 characters." }),
    consent: z.boolean().refine((val) => val === true, {
        message: "You must agree to the terms.",
    }),
});

const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "C#",
    "DevOps",
    "AWS",
    "Azure",
    "Data Science",
    "Machine Learning",
    "UI/UX Design",
];

export default function ConsultantOnboarding() {
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(0);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            city: "",
            state: "",
            country: "",
            timezone: "",
            title: "",
            experience: "",
            workHours: "",
            linkedIn: "",
            skills: [],
            summary: "",
            consent: false,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        // Handle form submission
    }

    const nextStep = () => {
        setStep(step + 1);
        setProgress(progress + 33.33);
    };

    const prevStep = () => {
        setStep(step - 1);
        setProgress(progress - 33.33);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="container mx-auto max-w-3xl bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">
                    Consultant Onboarding
                </h1>
                <Progress value={progress} className="mb-6" />
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        {step === 1 && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    First Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="John"
                                                        {...field}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Doe"
                                                        {...field}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="john.doe@example.com"
                                                    {...field}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="tel"
                                                    placeholder="+1 (555) 123-4567"
                                                    {...field}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="New York"
                                                        {...field}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="state"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    State/Province
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="NY"
                                                        {...field}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Country</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="USA"
                                                        {...field}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="timezone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Time Zone</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900">
                                                        <SelectValue placeholder="Select your timezone" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="America/New_York">
                                                        Eastern Time (ET)
                                                    </SelectItem>
                                                    <SelectItem value="America/Chicago">
                                                        Central Time (CT)
                                                    </SelectItem>
                                                    <SelectItem value="America/Denver">
                                                        Mountain Time (MT)
                                                    </SelectItem>
                                                    <SelectItem value="America/Los_Angeles">
                                                        Pacific Time (PT)
                                                    </SelectItem>
                                                    <SelectItem value="Europe/London">
                                                        British Time (BST)
                                                    </SelectItem>
                                                    <SelectItem value="Europe/Paris">
                                                        Central European Time
                                                        (CET)
                                                    </SelectItem>
                                                    <SelectItem value="Asia/Tokyo">
                                                        Japan Standard Time
                                                        (JST)
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Professional Title
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g., Senior Full Stack Developer"
                                                    {...field}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="experience"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Years of Experience
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900">
                                                        <SelectValue placeholder="Select years of experience" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="0-2">
                                                        0-2 years
                                                    </SelectItem>
                                                    <SelectItem value="3-5">
                                                        3-5 years
                                                    </SelectItem>
                                                    <SelectItem value="6-10">
                                                        6-10 years
                                                    </SelectItem>
                                                    <SelectItem value="11+">
                                                        11+ years
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="workHours"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Preferred Working Hours
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900">
                                                        <SelectValue placeholder="Select preferred working hours" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="full-time">
                                                        Full-time (40
                                                        hours/week)
                                                    </SelectItem>
                                                    <SelectItem value="part-time">
                                                        Part-time (20-30
                                                        hours/week)
                                                    </SelectItem>
                                                    <SelectItem value="flexible">
                                                        Flexible hours
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="linkedIn"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                LinkedIn Profile URL
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="https://www.linkedin.com/in/johndoe"
                                                    {...field}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="skills"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Skills</FormLabel>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                {skills.map((skill) => (
                                                    <FormField
                                                        key={skill}
                                                        control={form.control}
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
                                                                    <FormLabel className="font-normal text-gray-700">
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
                            </>
                        )}

                        {step === 4 && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="summary"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Professional Summary
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Write a brief summary of your professional experience and skills..."
                                                    className="resize-none bg-gray-50 border border-gray-300 text-gray-900"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="consent"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    I agree to the terms of
                                                    service and privacy policy
                                                </FormLabel>
                                                <FormDescription>
                                                    You must agree to our terms
                                                    of service and privacy
                                                    policy to continue.
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        <div className="flex justify-between">
                            {step > 1 && (
                                <Button
                                    type="button"
                                    onClick={prevStep}
                                    variant="outline"
                                >
                                    Previous
                                </Button>
                            )}
                            {step < 4 ? (
                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    className="ml-auto bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="ml-auto bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                    Submit
                                </Button>
                            )}
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
