"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import showToastError from "@/lib/toastError";
import BasicDetailsSchema from "@/schema/basicDetailsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import axios from "axios";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

// const locationOptions: Array<{
//   value: string;
//   label: string;
// }> = [
//   { value: "us", label: "United States" },
//   { value: "ca", label: "Canada" },
//   { value: "uk", label: "United Kingdom" },
//   { value: "au", label: "Australia" },
//   { value: "in", label: "India" },
//   { value: "de", label: "Germany" },
//   { value: "fr", label: "France" },
//   { value: "other", label: "Other" },
// ];

export default function BasicInformationPage() {
  const router = useRouter();
  const session = useSession();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof BasicDetailsSchema>>({
    resolver: zodResolver(BasicDetailsSchema),
    defaultValues: {
      fullName: session.data?.user?.name as string, // This could be pre-filled if available from registration
      contactEmail: session.data?.user?.email as string, // This could be pre-filled if available from registration
      linkedinUrl: "",
      phoneNumber: "",
      bio: "",
    },
  });

  async function onSubmit(values: z.infer<typeof BasicDetailsSchema>) {
    setLoading(true);
    try {
      const response = await axios.post("/api/user/profile/basic-info", values);
      if (response.status === 200) {
        toast.success("Information updated successfully");

        router.push("/onboarding/role");
      }
    } catch (error) {
      showToastError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 px-4 py-4 pt-6">
      <div className="w-full sm:mx-auto sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Tell us about yourself
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Let&apos;s get to know you better to personalize your
          <br />
          Jobfynder experience.
        </p>
      </div>

      <div className="mx-auto mt-8 w-full max-w-xl flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Please fill in your details below</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            contentEditable={false}
                            placeholder="john.doe@example.com"
                            disabled
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          {/* <Input
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            {...field}
                          /> */}
                          <PhoneInput
                            type="tel"
                            className=""
                            defaultCountry="IN"
                            international
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                size={"lg"}
                                role="combobox"
                                className={cn(
                                  "w-full justify-between px-4",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? locationOptions.find(
                                      (location) =>
                                        location.value === field.value
                                    )?.label
                                  : "Select location"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search locations..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>No results found</CommandEmpty>
                                <CommandGroup>
                                  {locationOptions.map((location) => (
                                    <CommandItem
                                      value={location.label}
                                      key={location.value}
                                      onSelect={() => {
                                        form.setValue(
                                          "location",
                                          location.value
                                        );
                                      }}
                                    >
                                      {location.label}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          location.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                  <FormField
                    control={form.control}
                    name="linkedinUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn Profile URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="linkedin.com/in/johndoe"
                            {...field}
                          />
                        </FormControl>
                        {/* <FormDescription>
                          Required for verification and better job matches.
                        </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Professional Bio
                        <span className="ml-2 text-xs">(Optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your professional background and aspirations..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A brief summary about yourself (max 500 characters).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <Loader className="mr-2 size-4 animate-spin" />
                      Loading
                    </span>
                  ) : (
                    "Next"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
