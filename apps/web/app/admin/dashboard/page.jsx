import { StatsCard } from "@/modules/dashboard/components/stats-card"
import { RecentDeliveries } from "@/modules/dashboard/components/recent-deliveries"
import { DeliveryChart } from "@/modules/dashboard/components/delivery-chart"
import { dashboardStats, recentDeliveries, deliveryChartData } from "@/modules/dashboard/data"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to JanFrans Cargo Services</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <DeliveryChart data={deliveryChartData} />
        <RecentDeliveries deliveries={recentDeliveries} />
      </div>
    </div>
  )
}
