import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function StatsCard({ title, value, change, trend }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {trend === "up" ? (
          <TrendingUp className="h-4 w-4 text-primary" />
        ) : (
          <TrendingDown className="h-4 w-4 text-destructive" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className={cn("text-xs mt-1", trend === "up" ? "text-primary" : "text-destructive")}>
          {change} from last month
        </p>
      </CardContent>
    </Card>
  )
}
