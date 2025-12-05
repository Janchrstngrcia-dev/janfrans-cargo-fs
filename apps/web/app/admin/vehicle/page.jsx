import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VehicleTable } from "@/modules/vehicle/components/vehicle-table"
import { vehicles, vehicleStats } from "@/modules/vehicle/data"

export default function VehiclePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vehicle Fleet</h1>
          <p className="text-muted-foreground">Manage and monitor your vehicle fleet</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4"/>
          Add Vehicle
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {vehicleStats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-primary mt-1">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <VehicleTable vehicles={vehicles} />
    </div>
  )
}
