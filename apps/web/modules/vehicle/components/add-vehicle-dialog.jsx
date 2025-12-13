"use client";

import { Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogContent, DialogDescription } from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { toast } from "sonner" 

export function AddVehicleDialog({ onSuccess }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({})

    const handleValueChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            console.log("Submitting:", formData)
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            toast.success("Vehicle added successfully")
            
            setFormData({})
            
            if (onSuccess) onSuccess();
            
            setOpen(false)
        } catch (error) {
            toast.error("Failed to add vehicle")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default"> 
                    <Plus className="mr-2 h-4 w-4" />
                    Add Vehicle
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Add New Vehicle</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to add a new vehicle to the system.
                    </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="vehicleType">Vehicle</Label>
                        <Input
                            id="vehicleName"
                            placeholder="Enter vehicle name"
                            value={formData.vehicleType || ''}
                            onChange={(e) => handleValueChange('vehicleType', e.target.value)}
                            required 
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="space-y-2 flex-1">
                        <Label htmlFor="model">Model</Label>
                        <Input
                            id="model"
                            placeholder="Enter vehicle model"
                            value={formData.model || ''}
                            onChange={(e) => handleValueChange('model', e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2 flex-1">
                        <Label htmlFor="plateNumber">Plate Number</Label>
                        <Input
                            id="plateNumber"
                            placeholder="Enter plate number"
                            value={formData.plateNumber || ''}
                            onChange={(e) => handleValueChange('plateNumber', e.target.value)}
                            required 
                        />
                    </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="vehicleType">Vehicle Type</Label>
                        <Select onChange={(val) => handleValueChange('vehicleCategory', val)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select vehicle type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="truck">Express</SelectItem>
                                <SelectItem value="van">Forward</SelectItem>
                                <SelectItem value="car">Motorcycle</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                        <Button type="button" variant="secondary" onClick={() => setOpen(false)} disabled={loading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Vehicle'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}