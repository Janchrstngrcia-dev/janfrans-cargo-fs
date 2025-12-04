"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Package, Receipt, BarChart3, Truck, Activity } from "lucide-react"
import Image from "next/image"

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Accounts", href: "/admin/accounts", icon: Users },
  { name: "Deliveries", href: "/admin/deliveries", icon: Package },
  { name: "Billing", href: "/admin/billing", icon: Receipt },
  { name: "Reports", href: "/admin/reports", icon: BarChart3 },
  { name: "Vehicle", href: "/admin/vehicle", icon: Truck },
//   { name: "Maintenance", href: "/admin/maintenance", icon: Wrench },
  { name: "Activity Log", href: "/admin/activity-log", icon: Activity },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar">
      <div className="flex h-16 items-center gap-3 border-b border-border px-10">
        <Image
          src="/janfrans.png"
          alt="Janfrans Logo"
          width={200}
          height={40}
          className="object-contain"
        />
      </div>
      <nav className="space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-primary"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
