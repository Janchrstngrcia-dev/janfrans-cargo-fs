"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Eye, Pencil, Trash2, MapPin, Search } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { deliveryStatusMap, deliveryStatusOptions, payModeOptions, deliveryCategoryOptions } from "@/modules/deliveries/data"

const statusStyles = {
  1: "bg-blue-500/20 text-blue-600 border-blue-500/30",
  2: "bg-amber-500/20 text-amber-600 border-amber-500/30",
  3: "bg-green-500/20 text-green-600 border-green-500/30",
  4: "bg-red-500/20 text-red-600 border-red-500/30",
  5: "bg-purple-500/20 text-purple-600 border-purple-500/30",
}

export function DeliveriesTable({ deliveries }) {
  const [searchValue, setSearchValue] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [itemsPerPage] = useState("10")

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-CA")
  }

  // Restored: Used for the "Delivered" column
  const formatDateTime = (dateString) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getLabel = (options, value) => {
    const found = options.find((opt) => opt.value === value)
    return found ? found.label : value
  }

  // Restored: Used for the "Location" column
  const openMap = (lat, lng) => {
    if (lat && lng) {
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank")
    }
  }

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      searchValue === "" ||
      delivery.trackingNo.toLowerCase().includes(searchValue.toLowerCase()) ||
      delivery.shipperName.toLowerCase().includes(searchValue.toLowerCase()) ||
      delivery.consigneeName.toLowerCase().includes(searchValue.toLowerCase())

    const matchesStatus =
      statusFilter === "" || statusFilter === "0" || delivery.deliveryStatus.toString() === statusFilter

    return matchesSearch && matchesStatus
  })

  const displayedDeliveries = filteredDeliveries.slice(0, Number.parseInt(itemsPerPage))

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 bg-card border-border">
              <SelectValue placeholder="Select Filter" />
            </SelectTrigger>
            <SelectContent>
              {deliveryStatusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-9 w-[200px] bg-card border-border"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-x-auto text-center">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground text-center">Tracking No.</TableHead>
              <TableHead className="text-muted-foreground text-center">Date</TableHead>
              <TableHead className="text-muted-foreground text-center">Shipper</TableHead>
              <TableHead className="text-muted-foreground text-center">Consignee</TableHead>
              <TableHead className="text-muted-foreground text-center">Pay Mode</TableHead>
              <TableHead className="text-muted-foreground text-center">Amount</TableHead>
              <TableHead className="text-muted-foreground text-center">Status</TableHead>
              {/* Restored Columns */}
              <TableHead className="text-muted-foreground text-center">Delivered</TableHead>
              <TableHead className="text-muted-foreground text-center">Remarks</TableHead>
              <TableHead className="text-muted-foreground text-center">Location</TableHead>
              
              <TableHead className="text-muted-foreground text-center w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedDeliveries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-10 text-muted-foreground">
                  No Data Found
                </TableCell>
              </TableRow>
            ) : (
              displayedDeliveries.map((delivery) => (
                <TableRow key={delivery.id} className="border-border">
                  <TableCell className="font-medium text-primary">{delivery.trackingNo}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(delivery.createdAt)}</TableCell>
                  <TableCell className="text-foreground">{delivery.shipperName}</TableCell>
                  <TableCell className="text-foreground">{delivery.consigneeName}</TableCell>
                  <TableCell className="text-muted-foreground">{getLabel(payModeOptions, delivery.payMode)}</TableCell>
                  <TableCell className="text-muted-foreground">{delivery.totalAmount}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusStyles[delivery.deliveryStatus]}>
                      {deliveryStatusMap[delivery.deliveryStatus]}
                    </Badge>
                  </TableCell>
                  
                  {/* Restored Cells */}
                  <TableCell className="text-muted-foreground text-sm">
                    {formatDateTime(delivery.estimatedTime)}
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-[150px] truncate">
                    {delivery.remarks || "-"}
                  </TableCell>
                  <TableCell>
                    {delivery.latitude && delivery.longitude ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-muted-foreground hover:text-white"
                        onClick={() => openMap(delivery.latitude, delivery.longitude)}
                      >
                        <MapPin className="h-3 w-3 mr-1" />
                        Map
                      </Button>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </TableCell>

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
    </div>
  )
}