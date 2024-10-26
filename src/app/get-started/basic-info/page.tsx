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
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const formSchema = z.object({
    fullName: z
        .string()
        .min(2, { message: "Full name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    location: z.string().min(1, { message: "Please select your location." }),
    linkedinUrl: z
        .string()
        .url({ message: "Please enter a valid LinkedIn URL." })
        .optional()
        .or(z.literal("")),
    phoneNumber: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, {
            message: "Please enter a valid phone number.",
        })
        .optional()
        .or(z.literal("")),
    bio: z
        .string()
        .max(500, { message: "Bio must not exceed 500 characters." })
        .optional(),
    // professionalTitle: z.string().min(2, {
    //     message: "Professional title must be at least 2 characters.",
    // }),
    // yearsOfExperience: z
    //     .string()
    //     .min(1, { message: "Please select your years of experience." }),
});

export default function BasicInformationPage() {
    const session = useSession();
    console.log("Session:", session);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: session.data?.user?.name as string, // This could be pre-filled if available from registration
            email: session.data?.user?.email as string, // This could be pre-filled if available from registration
            location: "",
            linkedinUrl: "",
            phoneNumber: "",
            bio: "",
            // professionalTitle: "",
            // yearsOfExperience: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        //todo: Handle form submission
        toast.success("Basic information saved successfully!");
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-3xl font-extrabold text-gray-900">
                    Tell us about yourself
                </h1>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Let&apos;s get to know you better to personalize your
                    <br />
                    Jobfynder experience.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>
                            Please fill in your details below
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John Doe"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
                                                />
                                            </FormControl>
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
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your location" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="us">
                                                        United States
                                                    </SelectItem>
                                                    <SelectItem value="ca">
                                                        Canada
                                                    </SelectItem>
                                                    <SelectItem value="uk">
                                                        United Kingdom
                                                    </SelectItem>
                                                    <SelectItem value="au">
                                                        Australia
                                                    </SelectItem>
                                                    <SelectItem value="other">
                                                        Other
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="linkedinUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                LinkedIn Profile URL (Optional)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="https://www.linkedin.com/in/johndoe"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Recommended for verification and
                                                better job matches.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Phone Number (Optional)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="tel"
                                                    placeholder="+1 (555) 123-4567"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Encouraged for recruiters and
                                                direct communications.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Professional Bio (Optional)
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us about your professional background and aspirations..."
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                A brief summary about yourself
                                                (max 500 characters).
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">
                                    Next
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
