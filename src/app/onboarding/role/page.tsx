"use client";

import ButtonLoading from "@/components/form/buttonLoading";
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
import { Briefcase, TrendingUp, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const rolesOptions: Array<{
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

const roles: Array<{
  label: UserRole;
  route: string;
}> = [
  {
    label: "CONSULTANT",
    route: "/onboarding/consultant",
  },
  {
    label: "BENCH_SALES",
    route: "/onboarding/bench-sales",
  },
  {
    label: "RECRUITER",
    route: "/onboarding/recruiter",
  },
];

export default function RoleSelectionPage() {
  const router = useRouter();
  const session = useSession();
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
        toast.success("Role updated successfully");

        router.push(
          (roles.find((role) => role.label === session.data?.user?.role)
            ?.route as string) + "?step=core"
        );
      }
    } catch (error) {
      showToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-4 py-4">
      <div className="w-full sm:mx-auto sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Welcome to Jobfynder!
        </h1>
        <p className="mt-2 space-y-4 text-center text-sm text-gray-600">
          We&apos;re here to make sure you have the best experience.
        </p>
      </div>

      <div className="mt-8 w-full sm:max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>Select Your Role</CardTitle>
            <CardDescription>
              Choose the option that best describes your primary role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup onValueChange={handleRoleChange} className="space-y-2">
              {rolesOptions.map((role) => (
                <div key={role.id} className="flex items-center">
                  <RadioGroupItem
                    value={role.id}
                    id={role.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={role.id}
                    className={`m-0 flex w-full cursor-pointer items-center space-x-4 rounded-lg border border-gray-200 p-4 hover:bg-gray-100 peer-checked:border-purple-600 peer-checked:bg-purple-50 [&:has([data-state=checked])]:border-purple-600 [&:has([data-state=checked])]:bg-purple-50 ${
                      selectedRole === role.id
                        ? "border-green-600 bg-green-50 hover:bg-green-50 peer-checked:border-green-600 peer-checked:bg-green-50"
                        : ""
                    } `}
                  >
                    <div className="flex-shrink-0">{role.icon}</div>
                    <div className="flex-grow">
                      <div className="font-semibold">{role.title}</div>
                      <div className="text-sm text-gray-500">
                        {role.description}
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <ButtonLoading
              type="submit"
              onClick={handleContinue}
              className="mt-6 w-full"
              disabled={!selectedRole}
              loading={loading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
