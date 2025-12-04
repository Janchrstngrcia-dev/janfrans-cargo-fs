import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DeliveriesTable } from "@/modules/deliveries/components/deliveries-table"
import { deliveries } from "@/modules/deliveries/data"

export default function DeliveriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Deliveries</h1>
          <p className="text-muted-foreground">Track and manage all cargo deliveries</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          New Delivery
        </Button>
      </div>
      <DeliveriesTable deliveries={deliveries} />
    </div>
  )
}
