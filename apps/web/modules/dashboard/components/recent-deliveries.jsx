import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const statusStyles = {
  delivered: "bg-primary/20 text-primary border-primary/30",
  "in-transit": "bg-chart-2/20 text-chart-2 border-chart-2/30",
  pending: "bg-chart-3/20 text-chart-3 border-chart-3/30",
}

export function RecentDeliveries({ deliveries }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Deliveries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {deliveries.map((delivery) => (
            <div key={delivery.id} className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
              <div>
                <p className="font-medium text-foreground">{delivery.id}</p>
                <p className="text-sm text-muted-foreground">{delivery.destination}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{delivery.date}</span>
                <Badge variant="outline" className={statusStyles[delivery.status]}>
                  {delivery.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
