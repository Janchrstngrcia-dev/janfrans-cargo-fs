import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, CheckCircle, Trash2, LogIn } from "lucide-react"

const typeConfig = {
  create: { icon: Plus, color: "bg-primary/20 text-primary border-primary/30" },
  update: { icon: Pencil, color: "bg-chart-2/20 text-chart-2 border-chart-2/30" },
  complete: { icon: CheckCircle, color: "bg-primary/20 text-primary border-primary/30" },
  delete: { icon: Trash2, color: "bg-destructive/20 text-destructive border-destructive/30" },
  login: { icon: LogIn, color: "bg-chart-3/20 text-chart-3 border-chart-3/30" },
}

export function ActivityList({ logs }) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {logs.map((log) => {
            const config = typeConfig[log.type] || typeConfig.create
            const Icon = config.icon
            return (
              <div key={log.id} className="flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${config.color.split(" ")[0]}`}
                >
                  <Icon className={`h-5 w-5 ${config.color.split(" ")[1]}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{log.user}</span>{" "}
                    <span className="text-muted-foreground">{log.action}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="border-border text-muted-foreground text-xs">
                      {log.target}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                  </div>
                </div>
                <Badge variant="outline" className={config.color}>
                  {log.type}
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
