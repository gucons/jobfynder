import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { JobFilters } from "@/components/jobs/JobFilters"

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto flex gap-6 p-4">
      <aside className="w-72 space-y-6">
        <JobFilters />
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  )
}
