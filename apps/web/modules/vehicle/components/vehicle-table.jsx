"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { MoreHorizontal, Eye, Pencil, Wrench } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "sonner"

const statusStyles = {
  active: "bg-primary/20 text-primary border-primary/30",
  maintenance: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  inactive: "bg-destructive/20 text-destructive border-destructive/30",
}

export function VehicleTable({ vehicles, onRefresh, loading }) { // Added loading prop
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isActionLoading, setIsActionLoading] = useState(false); // New state for action buttons
  const [editForm, setEditForm] = useState({})

  // 1. Schedule Maintenance Logic
  const handleMaintenance = async (vehicle) => {
    setIsActionLoading(true);
    try {
        const token = localStorage.getItem('token');
        const newStatus = vehicle.status === 'maintenance' ? 'active' : 'maintenance';
        
        const res = await fetch(`http://localhost:5000/api/vehicles/${vehicle.id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ 
                status: newStatus,
                // Automatically update lastService field when maintenance is finished
                lastService: newStatus === 'active' ? new Date().toLocaleDateString() : vehicle.lastService
            })
        });
        
        if(res.ok) {
            toast.success(`Vehicle marked as ${newStatus}`);
            if (onRefresh) onRefresh();
        } else {
            toast.error("Failed to update status");
        }
    } catch (e) {
        toast.error("Error updating status");
    } finally {
        setIsActionLoading(false);
    }
  }

  // 2. Open Edit Dialog
  const openEdit = (vehicle) => {
    setEditForm({ 
        id: vehicle.id,
        vehicleName: vehicle.name, 
        plateNumber: vehicle.plateNumber,
        model: vehicle.model,
        vehicleType: vehicle.type 
    })
    setIsEditOpen(true)
  }

  // 3. Submit Edit
  const handleEditSubmit = async () => {
     setIsActionLoading(true);
     try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/vehicles/${editForm.id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            // Only send the fields that were edited
            body: JSON.stringify({
                vehicleName: editForm.vehicleName,
                plateNumber: editForm.plateNumber,
                model: editForm.model,
                vehicleType: editForm.vehicleType,
            })
        });
        
        if(res.ok) {
            toast.success("Vehicle updated successfully");
            setIsEditOpen(false);
            if (onRefresh) onRefresh();
        } else {
            toast.error("Failed to update vehicle");
        }
     } catch(e) {
        toast.error("Error connecting to server");
     } finally {
        setIsActionLoading(false);
     }
  }

  return (
    <>
    <div className="rounded-lg border border-border bg-card overflow-x-auto text-center">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground text-center">Name</TableHead>
            <TableHead className="text-muted-foreground text-center">Vehicle Type</TableHead>
            <TableHead className="text-muted-foreground text-center">Plate Number</TableHead>
            <TableHead className="text-muted-foreground text-center">Mileage</TableHead>
            <TableHead className="text-muted-foreground text-center">Status</TableHead>
            <TableHead className="text-muted-foreground text-center">Last Service</TableHead>
            <TableHead className="text-muted-foreground text-center w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
             <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">Loading vehicles...</TableCell>
             </TableRow>
          ) : vehicles.length === 0 ? (
             <TableRow>
                <TableCell colSpan={7} className="text-center py-4">No vehicles found. Add one above.</TableCell>
             </TableRow>
          ) : (
             vehicles.map((vehicle) => (
            <TableRow key={vehicle.id} className="border-border">
              <TableCell className="font-medium text-primary">{vehicle.name}</TableCell>
              <TableCell className="text-muted-foreground">{vehicle.type}</TableCell>
              <TableCell className="text-foreground font-mono">{vehicle.plateNumber}</TableCell>
              <TableCell className="text-muted-foreground">{vehicle.mileage?.toLocaleString() || 0} km</TableCell>
              <TableCell>
                <Badge variant="outline" className={statusStyles[vehicle.status] || statusStyles.active}>
                  {vehicle.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{vehicle.lastService}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={isActionLoading}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => { setSelectedVehicle(vehicle); setIsViewOpen(true); }}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openEdit(vehicle)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMaintenance(vehicle)} disabled={isActionLoading}>
                      <Wrench className="mr-2 h-4 w-4" />
                      {vehicle.status === 'maintenance' ? 'Finish Maintenance' : 'Schedule Maintenance'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )))}
        </TableBody>
      </Table>
    </div>

    {/* VIEW DETAILS DIALOG */}
    <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
            <DialogHeader><DialogTitle>Vehicle Details</DialogTitle></DialogHeader>
            {selectedVehicle && (
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                        <span className="font-bold">Name:</span> <span>{selectedVehicle.name}</span>
                        <span className="font-bold">Plate:</span> <span>{selectedVehicle.plateNumber}</span>
                        <span className="font-bold">Vehicle Type:</span> <span>{selectedVehicle.type}</span>
                        <span className="font-bold">Model:</span> <span>{selectedVehicle.model}</span>
                        <span className="font-bold">Status:</span> <span className="capitalize">{selectedVehicle.status}</span>
                        <span className="font-bold">Last Service:</span> <span>{selectedVehicle.lastService}</span>
                        <span className="font-bold">Mileage:</span> <span>{selectedVehicle.mileage} km</span>
                    </div>
                </div>
            )}
        </DialogContent>
    </Dialog>

    {/* EDIT DIALOG */}
    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
            <DialogHeader><DialogTitle>Edit Vehicle</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label>Name</Label>
                    <Input 
                        value={editForm.vehicleName || ''} 
                        onChange={e => setEditForm({...editForm, vehicleName: e.target.value})} 
                    />
                </div>
                <div className="grid gap-2">
                    <Label>Type</Label>
                    <Select 
                        value={editForm.vehicleType} 
                        onValueChange={(val) => setEditForm({...editForm, vehicleType: val})}
                    >
                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Express">Express</SelectItem>
                            <SelectItem value="Forward">Forward</SelectItem>
                            <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label>Plate Number</Label>
                    <Input 
                        value={editForm.plateNumber || ''} 
                        onChange={e => setEditForm({...editForm, plateNumber: e.target.value})} 
                    />
                </div>
                 <div className="grid gap-2">
                    <Label>Model</Label>
                    <Input 
                        value={editForm.model || ''} 
                        onChange={e => setEditForm({...editForm, model: e.target.value})} 
                    />
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditOpen(false)} disabled={isActionLoading}>Cancel</Button>
                <Button onClick={handleEditSubmit} disabled={isActionLoading}>
                    {isActionLoading ? 'Saving...' : 'Save Changes'}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  )
}