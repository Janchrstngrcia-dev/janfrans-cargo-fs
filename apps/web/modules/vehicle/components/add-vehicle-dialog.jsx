"use client";

import { Dialog, DialogTrigger, DialogDescription, DialogHeader, DialogTitle, DialogContent } from "@radix-ui/react-dialog"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { toast } from "sonner"



export function AddVehicleDialog ( { onSuccess } )
{
    const [ open, setOpen ] = useState( false )
    const [ loading, setLoading ] = useState( false )
    const [ formData, setFormData ] = useState( {}

    )

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="primary" onClick={() => setOpen( true )}>
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
                        <Label htmlFor="plateNumber">Plate Number</Label>
                        <Input
                            id="plateNumber"
                            placeholder="Enter plate number"
                            value={formData.plateNumber || ''}
                            onChange={( e ) => handleValueChange( 'plateNumber', e.target.value )}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="model">Model</Label>
                        <Input
                            id="model"
                            placeholder="Enter vehicle model"
                            value={formData.model || ''}
                            onChange={( e ) => handleValueChange( 'model', e.target.value )}
                        />
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                        <Button variant="secondary" onClick={() => setOpen( false )} disabled={loading}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Vehicle'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}