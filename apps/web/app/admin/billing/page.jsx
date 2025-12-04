"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search, Zap, Ship, Bike } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExpressBillingTable } from "@/modules/billing/components/express-billing-table"
import { ForwardBillingTable } from "@/modules/billing/components/forward-billing-table"
import { MotorcycleBillingTable } from "@/modules/billing/components/motorcycle-billing-table"
import { PaginationControls } from "@/components/custom/pagination-controls" 
import { expressBillingData, forwardBillingData, motorcycleBillingData, billingStats } from "@/modules/billing/data"
import { usePagination } from "@/hooks/use-pagination" 

const serviceTypes = {
  express: { label: "Express Billing", icon: Zap, data: expressBillingData },
  forward: { label: "Forward Billing", icon: Ship, data: forwardBillingData },
  motorcycle: { label: "Motorcycle Billing", icon: Bike, data: motorcycleBillingData },
}

export default function BillingPage() {
  const [serviceType, setServiceType] = useState("express")
  const [search, setSearch] = useState("")

  const currentService = serviceTypes[serviceType]
  const ServiceIcon = currentService.icon

  const filteredData = currentService.data.filter((item) => {
    const searchLower = search.toLowerCase()
    if (serviceType === "express") {
      return (
        item.exp?.toLowerCase().includes(searchLower) ||
        item.driver?.toLowerCase().includes(searchLower) ||
        item.plateNo?.toLowerCase().includes(searchLower)
      )
    } else if (serviceType === "forward") {
      return (
        item.seriesNo?.toLowerCase().includes(searchLower) ||
        item.driver?.toLowerCase().includes(searchLower) ||
        item.plateNo?.toLowerCase().includes(searchLower)
      )
    } else {
      return (
        item.mcId?.toLowerCase().includes(searchLower) ||
        item.driver?.toLowerCase().includes(searchLower) ||
        item.couriersCode?.toLowerCase().includes(searchLower)
      )
    }
  })

  const { 
    currentData, 
    currentPage, 
    totalPages, 
    next, 
    previous, 
    reset 
  } = usePagination(filteredData, 8)
  useEffect(() => {
    reset()
  }, [search, serviceType])

  const renderTable = () => {
    switch (serviceType) {
      case "express":
        return <ExpressBillingTable data={currentData} />
      case "forward":
        return <ForwardBillingTable data={currentData} />
      case "motorcycle":
        return <MotorcycleBillingTable data={currentData} />
      default:
        return <ExpressBillingTable data={currentData} />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Billing</h1>
          <p className="text-muted-foreground">Manage billing records</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={serviceType} onValueChange={setServiceType}>
            <SelectTrigger className="w-[200px] bg-card">
              <div className="flex items-center gap-2">
                <ServiceIcon className="h-4 w-4 text-primary" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="express">Express</SelectItem>
              <SelectItem value="forward">Forward</SelectItem>
              <SelectItem value="motorcycle">Motorcycle</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {billingStats.map((stat) => (
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
      <div className="flex items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Series No., Driver, Courier, Plate No., or Tracking ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>
        <PaginationControls 
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={next}
          onPrevious={previous}
        />
        
      </div>
      {renderTable()}
    </div>
  )
}