"use client";

import { useEffect, useState } from "react";
import { DefaultValues, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodSchema } from "zod";

import { FieldValues } from "react-hook-form";

function usePersistentForm<T extends FieldValues>(
  schema: ZodSchema<T>,
  localStorageKey: string,
  defaultValues: T
): UseFormReturn<T> {
  const [loadedData, setLoadedData] = useState<T | null>(null);

  const formMethods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem(localStorageKey);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setLoadedData(parsedData);
      } catch (error) {
        console.error("Error parsing stored form data:", error);
      }
    }
  }, [localStorageKey]);

  useEffect(() => {
    // Reset form once data is loaded
    if (loadedData) {
      formMethods.reset(loadedData);
    }
  }, [loadedData, formMethods]);

  return formMethods;
}

export default usePersistentForm;
