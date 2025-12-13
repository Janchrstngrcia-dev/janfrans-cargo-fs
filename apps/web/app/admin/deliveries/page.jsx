import { DeliveriesTable } from "@/modules/deliveries/components/deliveries-table"
import { AddDeliveryDialog } from "@/modules/deliveries/components/add-deliveries-dialog"
import { deliveries } from "@/modules/deliveries/data"

export default function DeliveriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Deliveries</h1>
          <p className="text-muted-foreground">Track and manage all cargo deliveries</p>
        </div>
        <AddDeliveryDialog />
      </div>
      <DeliveriesTable deliveries={deliveries} />
    </div>
  )
}