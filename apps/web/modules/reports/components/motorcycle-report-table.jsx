"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function MotorcycleReportTable({ data }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value || 0)
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-CA")
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-x-auto text-center">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Series No.</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Date</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Port Code</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Driver`s Name</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Courier`s Code/Plate No.</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Manifest #</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Supplier Name</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Fleet Type</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Service Type 1</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Service Type</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Cost/Trip</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Overtime</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">BYOD Load</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Gas Subsidy</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Excess Incentives</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Total Final Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={16} className="text-center py-10 text-muted-foreground">
                No data found
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow key={row.id} className="border-border">
                <TableCell className="font-medium text-primary whitespace-nowrap">{row.mcId}</TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">{formatDate(row.date)}</TableCell>
                <TableCell className="text-foreground whitespace-nowrap">{row.portCode}</TableCell>
                <TableCell className="text-foreground whitespace-nowrap">{row.driver}</TableCell>
                <TableCell className="text-muted-foreground font-mono whitespace-nowrap">{row.couriersCode}</TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">{row.manifestNoFeOfd}</TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">{row.supplierName}</TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">{row.fleetType}</TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">{row.serviceType1}</TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">{row.serviceType}</TableCell>
                <TableCell className="text-foreground whitespace-nowrap">{formatCurrency(row.deliveryPickupCostTrip)}</TableCell>
                <TableCell className="text-foreground whitespace-nowrap">{formatCurrency(row.overtime)}</TableCell>
                <TableCell className="text-foreground whitespace-nowrap">{formatCurrency(row.byodLoadAllowance)}</TableCell>
                <TableCell className="text-foreground whitespace-nowrap">{formatCurrency(row.gasSubsidy)}</TableCell>
                <TableCell className="text-foreground whitespace-nowrap">{formatCurrency(row.excessIncentives)}</TableCell>
                <TableCell className="font-bold text-foreground whitespace-nowrap">{formatCurrency(row.totalFinalCost)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}