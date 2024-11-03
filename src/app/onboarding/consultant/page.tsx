"use client";

import { useSearchParams } from "next/navigation";
import CoreForm from "./forms/coreForm";
import EducationForm from "./forms/educationForm";
import ProfessionalForm from "./forms/professionalForm";

export default function ConsultantOnboarding() {
  const searchParams = useSearchParams();

  // Get the current step from the URL
  const step = searchParams.get("step");

  return (
    <div className="h-full flex-grow px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center text-3xl font-extrabold text-gray-900">
          Consultant Onboarding
        </h1>
        {step === "core" && <CoreForm />}

        {step === "education" && <EducationForm />}

        {step === "professional" && <ProfessionalForm />}
      </div>
    </div>
  );
}
