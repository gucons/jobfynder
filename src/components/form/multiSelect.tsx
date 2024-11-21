"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ControllerRenderProps } from "react-hook-form";

interface MultiSelectProps {
  options: Array<{
    label: string;
    value: string;
  }>;
  label: string;
  field: ControllerRenderProps<any, string>;
}

export default function MultiSelect({
  options,
  label,
  field,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (optionValue: string) => {
    field.onChange(
      field.value.includes(optionValue)
        ? field.value.filter((item: string) => item !== optionValue)
        : [...field.value, optionValue]
    );
  };

  const handleRemove = (optionValue: string) => {
    field.onChange(field.value.filter((item: string) => item !== optionValue));
  };

  // console.log("field", field);

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {field.value && field.value.length > 0
              ? `${field.value && field.value.length} selected`
              : label}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${label}`} className="h-9" />
            <CommandList>
              <CommandEmpty>No results found</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        field.value.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="mt-3 flex flex-wrap gap-2">
        {field.value.map((value: string) => {
          const option = options.find((opt) => opt.value === value);
          return (
            option && (
              <Badge key={option.value} variant="secondary" className="gap-1">
                {option.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleRemove(option.value);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleRemove(option.value)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          );
        })}
      </div>
    </div>
  );
}
