import { JobSearchBar } from "@/components/jobs/JobSearchBar";
import { JobCard } from "@/components/jobs/JobCard";

export default function JobsPage() {
  const jobs = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      type: "FULLTIME",
      isRemote: true,
      description: "We are looking for an experienced Frontend Developer...",
      salary: 120000,
      deadline: new Date("2024-03-01"),
      skillsets: ["React", "TypeScript", "Node.js"],
      duration: 12,
      maxPositions: 2,
      activeApplications: 0,
    },
    {
      title: "Senior Backend Developer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      type: "FULLTIME",
      isRemote: true,
      description: "We are looking for an experienced Backend Developer...",
      salary: 120000,
      deadline: new Date("2024-03-01"),
      skillsets: ["Node.js", "TypeScript", "MongoDB"],
      duration: 12,
      maxPositions: 2,
      activeApplications: 0,
    },
    {
      title: "Senior DevOps Engineer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      type: "FULLTIME",
      isRemote: true,
      description: "We are looking for an experienced DevOps Engineer...",
      salary: 120000,
      deadline: new Date("2024-03-01"),
      skillsets: ["Kubernetes", "Docker", "AWS"],
      duration: 12,
      maxPositions: 2,
      activeApplications: 0,
    },
  ];

  return (
    <div className="space-y-6">
      <JobSearchBar />
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
}
