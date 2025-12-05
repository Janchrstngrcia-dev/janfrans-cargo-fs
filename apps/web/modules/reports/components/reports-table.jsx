"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function ReportsTable({ data }) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">ID</TableHead>
            <TableHead className="text-muted-foreground">Customer</TableHead>
            <TableHead className="text-muted-foreground">Date</TableHead>
            <TableHead className="text-muted-foreground">Destination</TableHead>
            <TableHead className="text-muted-foreground">Amount</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="border-border">
              <TableCell className="font-medium text-primary">{item.id}</TableCell>
              <TableCell className="text-foreground">{item.customer}</TableCell>
              <TableCell className="text-muted-foreground">{item.date}</TableCell>
              <TableCell className="text-muted-foreground">{item.destination}</TableCell>
              <TableCell className="text-foreground font-medium">${item.amount.toLocaleString()}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
