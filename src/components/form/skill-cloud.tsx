"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "../ui/badge";

export interface Skill {
  name: string;
  category: string;
}

export interface SkillCloudProps {
  skills: Skill[];
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
  className?: string;
}

export default function SkillCloud({
  skills,
  selectedSkills,
  onChange,
  className,
}: SkillCloudProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = useMemo(() => {
    return skills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, skills]);

  const skillsByCategory = useMemo(() => {
    return filteredSkills.reduce(
      (acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
      },
      {} as Record<string, Skill[]>
    );
  }, [filteredSkills]);

  const toggleSkill = (skillName: string) => {
    const updatedSkills = selectedSkills.includes(skillName)
      ? selectedSkills.filter((s) => s !== skillName)
      : [...selectedSkills, skillName];
    onChange(updatedSkills);
  };

  return (
    <div
      className={cn(
        "grid h-[300px] grid-cols-1 gap-6 md:grid-cols-12",
        className
      )}
    >
      {/* Skill search and viewing */}
      <div className="col-span-4 flex flex-col space-y-4">
        <Input
          type="search"
          placeholder="Search skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />

        <div className="flex min-h-0 flex-1 flex-col">
          <h3 className="mb-2 text-sm font-medium">Selected Skills</h3>
          <ScrollArea className="flex-1 rounded-md border">
            <div className="flex flex-wrap gap-x-2 gap-y-3 p-4">
              {selectedSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-1">
                  {skill}
                  <button
                    className={cn(
                      "ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        toggleSkill(skill);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => toggleSkill(skill)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                  </button>
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Right Panel */}
      <div className="col-span-8 flex min-h-0 flex-col rounded-lg border">
        <ScrollArea className="flex-1">
          <div className="px-4 pb-2">
            <Accordion type="multiple" className="w-full">
              {Object.entries(skillsByCategory).map(
                ([category, categorySkills]) => (
                  <AccordionItem value={category} key={category}>
                    <AccordionTrigger className="hover:no-underline">
                      <span className="text-sm font-medium">{category}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2 px-2 py-1">
                        {categorySkills.map((skill) => (
                          <Label
                            key={skill.name}
                            htmlFor={skill.name}
                            className={`cursor-pointer rounded-md border px-2 py-1 text-xs transition-colors hover:bg-accent ${
                              selectedSkills.includes(skill.name)
                                ? "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80"
                                : "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            }`}
                            onClick={() => toggleSkill(skill.name)}
                          >
                            {skill.name}
                          </Label>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              )}
            </Accordion>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
