import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import {
    Building,
    Calendar,
    Clock,
    DollarSign,
    MapPin,
    Users,
} from "lucide-react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  type: string;
  isRemote: boolean;
  description: string;
  salary: number;
  deadline: Date;
  skillsets: string[];
  duration?: number;
  maxPositions: number;
  activeApplications: number;
}

export function JobCard({
  title,
  company,
  location,
  type,
  isRemote,
  description,
  salary,
  deadline,
  skillsets,
  duration,
  maxPositions,
  activeApplications,
}: JobCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              <span>{company}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>
        <div className="space-x-2">
          <Badge>{type}</Badge>
          {isRemote && <Badge variant="secondary">Remote</Badge>}
        </div>
      </div>
      <p className="mt-4 text-muted-foreground">{description}</p>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <DollarSign className="h-4 w-4" />
          <span>${salary.toLocaleString()}/year</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>Deadline: {format(deadline, "MMM dd, yyyy")}</span>
        </div>
        {duration && (
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration} months</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>
            {activeApplications}/{maxPositions} applications
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {skillsets.map((skill) => (
          <Badge key={skill} variant="outline">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <Button>Apply Now</Button>
        <Button variant="outline">Save Job</Button>
      </div>
    </Card>
  );
}
