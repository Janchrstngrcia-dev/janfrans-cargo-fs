"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ForwardBillingTable({ data }) {
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
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Plate No.</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Driver</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Courier</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Truck Type</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Unit Price Charge</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Additional Courier (OBC)</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Grand Total</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Toll & Parking Fee</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">BYOD</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center">Remarks</TableHead>
            <TableHead className="text-muted-foreground whitespace-nowrap text-center w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={13} className="text-center py-10 text-muted-foreground">
                No data found
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow key={row.id} className="border-border">
                <TableCell className="font-medium text-primary whitespace-nowrap">{row.seriesNo}</TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">{formatDate(row.date)}</TableCell>
                <TableCell className="text-foreground font-mono whitespace-nowrap">{row.plateNo}</TableCell>
                <TableCell className="text-foreground whitespace-nowrap">{row.driver}</TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">{row.courier}</TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">{row.truckType}</TableCell>
                <TableCell className="text-foreground whitespace-nowrap">{formatCurrency(row.unitPriceCharge)}</TableCell>
                <TableCell className="text-foreground whitespace-nowrap">{formatCurrency(row.additionalCourierOBC)}</TableCell>
                <TableCell className="font-bold text-foreground whitespace-nowrap">{formatCurrency(row.grandTotal)}</TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">{formatCurrency(row.tollAndParking)}</TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">{formatCurrency(row.byod)}</TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap max-w-[150px] truncate">{row.remarks}</TableCell>
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