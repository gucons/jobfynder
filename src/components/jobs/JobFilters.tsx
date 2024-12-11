import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

export function JobFilters() {
  const jobTypes = ["Full-time", "Part-time", "Contract", "Remote"];
  const commonSkills = ["React", "Node.js", "Python", "Java", "DevOps"];

  return (
    <Card className="p-4">
      <h3 className="mb-4 font-semibold">Filters</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Salary Range</label>
          <Slider defaultValue={[50000]} max={200000} step={1000} />
          <div className="mt-1 flex justify-between text-sm text-muted-foreground">
            <span>$50k</span>
            <span>$200k</span>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <label className="text-sm font-medium">Duration</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any</SelectItem>
              <SelectItem value="3">3 months</SelectItem>
              <SelectItem value="6">6 months</SelectItem>
              <SelectItem value="12">12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <div className="space-y-2">
          <label className="text-sm font-medium">Skills</label>
          <div className="flex flex-wrap gap-2">
            {commonSkills.map((skill) => (
              <Button key={skill} variant="outline" size="sm" className="h-7">
                {skill}
              </Button>
            ))}
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <label className="text-sm font-medium">Job Type</label>
          {jobTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={type} />
              <label htmlFor={type} className="text-sm">
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
