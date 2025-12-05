import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Package, DollarSign, Truck, Users, BarChart3, Fuel } from "lucide-react"

const iconMap = {
  Package,
  DollarSign,
  Truck,
  Users,
  BarChart3,
  Fuel,
}

export function ReportCard({ report }) {
  const Icon = iconMap[report.icon] || Package
  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-foreground">{report.name}</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">{report.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full border-border text-foreground hover:bg-secondary bg-transparent">
          <Download className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </CardContent>
    </Card>
  )
}
