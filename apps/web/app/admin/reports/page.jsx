"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExpressReportTable } from "@/modules/reports/components/express-report-table"
import { ForwardReportTable } from "@/modules/reports/components/forward-report-table"
import { MotorcycleReportTable } from "@/modules/reports/components/motorcycle-report-table"
import { expressReportData, forwardReportData, motorcycleReportData } from "@/modules/reports/data"
import { Printer, Search, Zap, Ship, Bike } from "lucide-react"

const reportTypes = {
  express: { label: "Express Report", icon: Zap, data: expressReportData },
  forward: { label: "Forward Report", icon: Ship, data: forwardReportData },
  motorcycle: { label: "Motorcycle Report", icon: Bike, data: motorcycleReportData },
}

export default function ReportsPage() {
  const [reportType, setReportType] = useState("express")
  const [searchId, setSearchId] = useState("")
  const [searchCustomer, setSearchCustomer] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const currentReport = reportTypes[reportType]
  const ReportIcon = currentReport.icon

  const filteredData = useMemo(() => {
    return currentReport.data.filter((item) => {
      const idField = reportType === "motorcycle" ? item.mcId : item.seriesNo
      const customerField = reportType === "motorcycle" ? item.driver : item.driver

      const matchesId = searchId === "" || idField?.toLowerCase().includes(searchId.toLowerCase())
      const matchesCustomer =
        searchCustomer === "" || customerField?.toLowerCase().includes(searchCustomer.toLowerCase())

      let matchesDate = true
      if (startDate && endDate) {
        const itemDate = new Date(item.date)
        const start = new Date(startDate)
        const end = new Date(endDate)
        matchesDate = itemDate >= start && itemDate <= end
      } else if (startDate) {
        const itemDate = new Date(item.date)
        const start = new Date(startDate)
        matchesDate = itemDate >= start
      } else if (endDate) {
        const itemDate = new Date(item.date)
        const end = new Date(endDate)
        matchesDate = itemDate <= end
      }

      return matchesId && matchesCustomer && matchesDate
    })
  }, [currentReport.data, searchId, searchCustomer, startDate, endDate, reportType])

  const handlePrint = () => {
    window.print()
  }

  // Render the appropriate table based on report type
  const renderTable = () => {
    switch (reportType) {
      case "express":
        return <ExpressReportTable data={filteredData} />
      case "forward":
        return <ForwardReportTable data={filteredData} />
      case "motorcycle":
        return <MotorcycleReportTable data={filteredData} />
      default:
        return <ExpressReportTable data={filteredData} />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">View and print billing reports</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[200px] bg-card">
              <div className="flex items-center gap-2">
                <ReportIcon className="h-4 w-4 text-primary" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="express">
                <div className="flex items-center gap-2">
                  Express Report
                </div>
              </SelectItem>
              <SelectItem value="forward">
                <div className="flex items-center gap-2">
                  Forward Report
                </div>
              </SelectItem>
              <SelectItem value="motorcycle">
                <div className="flex items-center gap-2">
                  Motorcycle Report
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handlePrint} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Printer className=" h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      {/* Search Filters */}
      <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg border border-border bg-card">
        <div className=" flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Search:</span>
        </div>
        <div className="relative flex-1 min-w-[150px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by ID/Series No..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>
        <div className="relative flex-1 min-w-[150px]">
           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Driver/Customer..."
            value={searchCustomer}
            onChange={(e) => setSearchCustomer(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">From:</span>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-background w-[150px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">To:</span>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-background w-[150px]"
          />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Total Records</p>
            <p className="text-xl font-bold text-foreground">{filteredData.length}</p>
          </div>
          <div className="h-10 w-px bg-border" />
          <div>
            <p className="text-sm text-muted-foreground">Showing</p>
            <p className="text-xl font-bold text-primary">
              {filteredData.length} of {currentReport.data.length}
            </p>
          </div>
        </div>
      </div>

      {renderTable()}
    </div>
  )
}
