"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Search, MoreHorizontal, Ban, Power } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getUserType, getUserStatus } from "@/modules/accounts/data" 

const typeColors = {
  5: "bg-teal-500/20 text-teal-700 border-teal-500/30",
  6: "bg-indigo-500/20 text-indigo-700 border-indigo-500/30",
}

const statusStyles = {
  1: "bg-emerald-500/20 text-emerald-700 border-emerald-500/30", 
  0: "bg-red-500/20 text-red-700 border-red-500/30", 
}

export function ClientsTable({ clients = [] }) {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.fullName.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === "all" || client.userType === Number.parseInt(typeFilter)
    
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex items-center gap-2 flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 max-w-sm bg-card border-border"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[150px] bg-card border-border">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="5">Individual</SelectItem>
            <SelectItem value="6">Corporate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-x-auto text-center">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground text-center">Name</TableHead>
              <TableHead className="text-muted-foreground text-center">Mobile No.</TableHead>
              <TableHead className="text-muted-foreground text-center">Type</TableHead>
              <TableHead className="text-muted-foreground text-center">Status</TableHead>
              <TableHead className="text-muted-foreground text-center w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  No clients found
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
                <TableRow key={client.id} className="border-border">
                  <TableCell className="font-medium text-foreground">{client.fullName}</TableCell>
                  <TableCell className="text-muted-foreground">{client.mobile}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={typeColors[client.userType] || "border-border"}>
                      {getUserType(client.userType)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusStyles[client.status] || "border-border"}>
                      {getUserStatus(client.status)}
                    </Badge>
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
                          <Pencil className="mr-2 h-4 w-4" />
                          Update
                        </DropdownMenuItem>
                        {client.status === 1 ? (
                          <DropdownMenuItem className="text-destructive">
                            <Ban className="mr-2 h-4 w-4" />
                            Disable
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-emerald-600">
                            <Power className="mr-2 h-4 w-4" />
                            Enable
                          </DropdownMenuItem>
                        )}
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