"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function PostJobForm() {
  const [isRemote, setIsRemote] = useState(false)

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Post a New Job</h2>
      <form className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input id="title" placeholder="e.g. Senior Frontend Developer" />
          </div>

          <div>
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" placeholder="Your company name" />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="e.g. San Francisco, CA" />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="remote"
              checked={isRemote}
              onCheckedChange={setIsRemote}
            />
            <Label htmlFor="remote">Remote Position</Label>
          </div>

          <div>
            <Label htmlFor="type">Job Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FULLTIME">Full-time</SelectItem>
                <SelectItem value="PARTTIME">Part-time</SelectItem>
                <SelectItem value="CONTRACT">Contract</SelectItem>
                <SelectItem value="INTERNSHIP">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="salary">Annual Salary ($)</Label>
            <Input id="salary" type="number" placeholder="e.g. 120000" />
          </div>

          <div>
            <Label htmlFor="duration">Duration (months)</Label>
            <Input id="duration" type="number" placeholder="e.g. 12" />
          </div>

          <div>
            <Label htmlFor="positions">Number of Positions</Label>
            <Input id="positions" type="number" placeholder="e.g. 2" />
          </div>

          <div>
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              placeholder="Enter detailed job description..."
              rows={5}
            />
          </div>

          <div>
            <Label htmlFor="skills">Required Skills</Label>
            <Input
              id="skills"
              placeholder="e.g. React, TypeScript, Node.js (comma separated)"
            />
          </div>

          <div>
            <Label htmlFor="deadline">Application Deadline</Label>
            <Input id="deadline" type="date" />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Post Job
        </Button>
      </form>
    </Card>
  )
}