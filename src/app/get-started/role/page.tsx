"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import showToastError from "@/lib/toastError";
import { UserRole } from "@prisma/client";
import axios from "axios";
import {
    Briefcase,
    Loader,
    TrendingUp,
    Users
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const roles: Array<{
    id: UserRole;
    title: string;
    description: string;
    icon: React.ReactNode;
}> = [
    {
        id: "CONSULTANT",
        title: "Consultant",
        description: "Showcase your skills and find job matches that fit you",
        icon: <Briefcase className="h-6 w-6" />,
    },
    {
        id: "BENCH_SALES",
        title: "Bench Sales",
        description:
            "Manage consultants on the bench, maintain hotlists and sell bench resources to clients",
        icon: <TrendingUp className="h-6 w-6" />,
    },
    {
        id: "RECRUITER",
        title: "Recruiter",
        description:
            "Post jobs, connect with consultants, and find talent that matches your hiring needs",
        icon: <Users className="h-6 w-6" />,
    },
    // {
    //     id: "trainer",
    //     title: "Trainer",
    //     description:
    //         "Create and deliver training programs for IT professionals",
    //     icon: <GraduationCap className="h-6 w-6" />,
    // },
];

export default function RoleSelectionPage() {
    const router = useRouter();

    const [selectedRole, setSelectedRole] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRoleChange = (value: string) => {
        setSelectedRole(value);
    };

    const handleContinue = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/api/user/profile/role", {
                role: selectedRole,
            });
            if (response.status === 200) {
                toast.success("Role updated successfully", {});

                router.push("/get-started/basic-info");
            }
        } catch (error) {
            showToastError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-3xl font-extrabold text-gray-900">
                    Welcome to Jobfynder!
                </h1>
                <p className="mt-2 text-center text-sm text-gray-600 space-y-4">
                    We&apos;re here to make sure you have the best experience.
                    {/* <br /> */}
                    {/* Let&apos;s get started by understanding your role so we can
                    customize your profile. */}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
                <Card>
                    <CardHeader>
                        <CardTitle>Select Your Role</CardTitle>
                        <CardDescription>
                            Choose the option that best describes your primary
                            role
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup
                            onValueChange={handleRoleChange}
                            className="space-y-4"
                        >
                            {roles.map((role) => (
                                <div
                                    key={role.id}
                                    className="flex items-center space-x-2"
                                >
                                    <RadioGroupItem
                                        value={role.id}
                                        id={role.id}
                                        className="peer sr-only"
                                    />
                                    <Label
                                        htmlFor={role.id}
                                        className={`w-full cursor-pointer flex items-center space-x-4 rounded-lg border border-gray-200 p-4 hover:bg-gray-100 peer-checked:border-purple-600 peer-checked:bg-purple-50 [&:has([data-state=checked])]:border-purple-600 [&:has([data-state=checked])]:bg-purple-50
                                            ${
                                                selectedRole === role.id
                                                    ? "border-green-600 bg-green-50 hover:bg-green-50 peer-checked:border-green-600 peer-checked:bg-green-50"
                                                    : ""
                                            }
                                            `}
                                    >
                                        <div className="flex-shrink-0">
                                            {role.icon}
                                        </div>
                                        <div className="flex-grow">
                                            <div className="font-semibold">
                                                {role.title}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {role.description}
                                            </div>
                                        </div>
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                        <Button
                            onClick={handleContinue}
                            className="w-full mt-6"
                            disabled={!selectedRole}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <Loader className="animate-spin size-4 mr-2" />
                                    Loading
                                </span>
                            ) : (
                                "Continue"
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
