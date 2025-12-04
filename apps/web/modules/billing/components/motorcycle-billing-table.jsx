"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function MotorcycleBillingTable({ data }) {
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
    <div className="rounded-lg border border-border bg-card overflow-x-auto text-center w-full">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Series No.</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Date</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Port Code</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Driver</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Courier Code/Plate</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Manifest #</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Supplier</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Fleet Type</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Service Type 1</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Service Type</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Cost/Trip</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Overtime</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">BYOD Load</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Gas Subsidy</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Excess Incentives</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Total Final Cost</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={17} className="text-center py-10 text-muted-foreground">
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
                <TableCell className="text-foreground whitespace-nowrap">₱{formatCurrency(row.deliveryPickupCostTrip)}</TableCell>
                <TableCell className="text-foreground whitespace-nowrap">₱{formatCurrency(row.overtime)}</TableCell>
                <TableCell className="text-foreground whitespace-nowrap">₱{formatCurrency(row.byodLoadAllowance)}</TableCell>
                <TableCell className="text-foreground whitespace-nowrap">₱{formatCurrency(row.gasSubsidy20)}</TableCell>
                <TableCell className="text-foreground whitespace-nowrap">₱{formatCurrency(row.excessIncentives)}</TableCell>
                <TableCell className="font-bold text-foreground whitespace-nowrap">₱{formatCurrency(row.totalFinalCost)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}