"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Pencil, Wrench } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const statusStyles = {
  active: "bg-primary/20 text-primary border-primary/30",
  maintenance: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  inactive: "bg-destructive/20 text-destructive border-destructive/30",
}

export function VehicleTable({ vehicles }) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-x-auto text-center">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground text-center">ID</TableHead>
            <TableHead className="text-muted-foreground text-center">Name</TableHead>
            <TableHead className="text-muted-foreground text-center">Type</TableHead>
            <TableHead className="text-muted-foreground text-center">Plate Number</TableHead>
            <TableHead className="text-muted-foreground text-center">Driver</TableHead>
            <TableHead className="text-muted-foreground text-center">Mileage</TableHead>
            <TableHead className="text-muted-foreground text-center">Status</TableHead>
            <TableHead className="text-muted-foreground text-center">Last Service</TableHead>
            <TableHead className="text-muted-foreground text-center w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id} className="border-border">
              <TableCell className="font-medium text-primary">{vehicle.id}</TableCell>
              <TableCell className="text-foreground">{vehicle.name}</TableCell>
              <TableCell className="text-muted-foreground">{vehicle.type}</TableCell>
              <TableCell className="text-foreground font-mono">{vehicle.plateNumber}</TableCell>
              <TableCell className="text-muted-foreground">{vehicle.driver || "-"}</TableCell>
              <TableCell className="text-muted-foreground">{vehicle.mileage.toLocaleString()} km</TableCell>
              <TableCell>
                <Badge variant="outline" className={statusStyles[vehicle.status]}>
                  {vehicle.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{vehicle.lastService}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wrench className="mr-2 h-4 w-4" />
                      Schedule Maintenance
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
