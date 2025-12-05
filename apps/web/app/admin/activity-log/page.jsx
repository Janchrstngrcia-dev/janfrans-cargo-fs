import { Button } from "@/components/ui/button"
import { Download, Filter } from "lucide-react"
import { ActivityList } from "@/modules/activity-log/components/activity-list"
import { activityLogs } from "@/modules/activity-log/data"

export default function ActivityLogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Activity Log</h1>
          <p className="text-muted-foreground">Track all system activities and user actions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <ActivityList logs={activityLogs} />
    </div>
  )
}
