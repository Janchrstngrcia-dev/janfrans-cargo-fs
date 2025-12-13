"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { payModeOptions, deliveryCategoryOptions } from "@/modules/deliveries/data"

export function AddDeliveryDialog({ onSuccess }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    
    // Initialize form with default values
    const [formData, setFormData] = useState({
        trackingNo: "JANFRANS2512130001", // Example static or auto-generated value
        shipperName: "",
        consigneeName: "",
        totalAmount: "",
        payMode: "",
        chargeableWeight: "",
        deliveryCategory: "",
        attemptCount: "0"
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleValueChange = (field, value) => {
        setFormData({ ...formData, [field]: value })
    }

    const validateForm = () => {
        const requiredFields = [
            'shipperName', 
            'consigneeName', 
            'totalAmount', 
            'payMode', 
            'chargeableWeight', 
            'deliveryCategory'
        ];
        
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            toast.error("Missing Required Fields", {
                description: "Please fill in all mandatory shipping information."
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        const token = localStorage.getItem('token')
        if (!token) {
            toast.error("Authentication Error", {
                description: "Admin token not found. Please log in first."
            })
            return
        }

        setLoading(true)
        try {
            // Placeholder API call - ensure this matches your backend route
            const res = await fetch('http://localhost:5000/api/deliveries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || 'Failed to create delivery')
            }

            toast.success("Delivery created successfully!", {
                description: `Tracking No: ${formData.trackingNo} has been added.`
            })

            setOpen(false)
            // Reset form (keep tracking no logic dynamic if needed)
            setFormData({
                trackingNo: "JANFRANS2512130002", // Simulate next ID
                shipperName: "",
                consigneeName: "",
                totalAmount: "",
                payMode: "",
                chargeableWeight: "",
                deliveryCategory: "",
                attemptCount: "0"
            })

            if (onSuccess) onSuccess();

        } catch (error) {
            toast.error("Error creating delivery", {
                description: error.message
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    New Delivery
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle>Shipping Information</DialogTitle>
                    <DialogDescription>
                        Enter the details for the new delivery consignment.
                    </DialogDescription>
                </DialogHeader>
                
                <div className="flex flex-col gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="trackingNo">Tracking No.</Label>
                            <Input
                                id="trackingNo"
                                value={formData.trackingNo}
                                readOnly
                                className="bg-muted text-muted-foreground"
                            />
                        </div>
                    {/* Consignee */}
                    <div className="flex gap-4">
                        <div className="space-y-2 flex-1">
                            <Label htmlFor="shipperName">Shipper Name</Label>
                            <Input
                                id="shipperName"
                                placeholder="Enter shipper name"
                                value={formData.shipperName}
                                onChange={handleChange}
                            />
                        </div>
                    <div className="space-y-2 flex-1">
                        <Label htmlFor="consigneeName">Consignee Name</Label>
                        <Select onValueChange={(val) => handleValueChange("consigneeName", val)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select or search for consignee" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="abc">ABC Corporation</SelectItem>
                                <SelectItem value="xyz">XYZ Industries</SelectItem>
                                <SelectItem value="juan">Juan Dela Cruz</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    </div>
                    <div className="space-y-2 flex-1">
                            <Label htmlFor="totalAmount">Total Amount</Label>
                            <Input
                                id="totalAmount"
                                type="number"
                                placeholder="0.00"
                                value={formData.totalAmount}
                                onChange={handleChange}
                            />
                        </div>
                    {/* Amount & Pay Mode Row */}
                    <div className="flex w-full gap-4">
                        <div className="space-y-2 flex-1">
                            <Label htmlFor="payMode">Pay Mode</Label>
                            <Select onValueChange={(val) => handleValueChange("payMode", val)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select pay mode" />
                                </SelectTrigger>
                                <SelectContent>
                                    {payModeOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2 flex-1">
                            <Label htmlFor="chargeableWeight">Weight (kg)</Label>
                            <Input
                                id="chargeableWeight"
                                type="number"
                                placeholder="0.00"
                                value={formData.chargeableWeight}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Weight & Category Row */}
                    <div className="flex gap-4">
                        <div className="space-y-2 flex-1">
                            <Label htmlFor="deliveryCategory">Category</Label>
                            <Select onValueChange={(val) => handleValueChange("deliveryCategory", val)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {deliveryCategoryOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2 flex-1">
                        <Label htmlFor="attemptCount">Attempt Count</Label>
                        <Input
                            id="attemptCount"
                                value={formData.attemptCount}
                                readOnly
                        />
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                        Cancel
                    </Button>
                    <Button 
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Save Delivery
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}