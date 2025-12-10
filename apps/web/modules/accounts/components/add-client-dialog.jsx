"use client"

import { useState } from "react" 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Loader2 } from "lucide-react"
import { toast } from "sonner"

export function AddClientDialog({ onSuccess }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [clientType, setClientType] = useState("")
  const [name, setName] = useState("")
  const [street, setStreet] = useState("")
  // ADDED: Mobile state
  const [mobile, setMobile] = useState("") 
  
  const [city, setCity] = useState(""); 
  const [barangay, setBarangay] = useState(""); 
  
  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
        setClientType("");
        setName("");
        setStreet("");
        setMobile("");
        setCity("");
        setBarangay("");
    }
  }
  
  const handleSubmit = async () => {
    if (!clientType || !name || !city || !barangay) { 
        toast.error("Validation Error", { description: "Please fill in Client Type, Name, City, and Barangay." });
        return;
    }

    if (clientType === "6" && !mobile) {
        toast.error("Validation Error", { description: "Corporate Accounts require a Mobile No." });
        return;
    }

    setLoading(true);
    const token = localStorage.getItem('token');

    try {
        const res = await fetch('http://localhost:5000/api/clients/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                fullName: name,
                userType: clientType,
                street: street, 
                city: city, 
                barangay: barangay,
                mobile: mobile 
            })
        });

        const data = await res.json();

        if (res.ok) {
            toast.success("Client Added", { description: `${name} has been added successfully.` });
            handleOpenChange(false); 
            if (onSuccess) onSuccess(); 
        } else {
            toast.error("Submission Failed", { description: data.message || "Failed to add client" });
        }
    } catch (error) {
        console.error(error);
        toast.error("Network Error", { description: "Could not connect to server." });
    } finally {
        setLoading(false);
    }
  }

  const isFormDisabled = loading;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>Add a new client (Individual or Corporate) and their address.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          
          <div className="space-y-2">
            <Label htmlFor="type">Client Type <span className="text-red-500">*</span></Label>
            <Select value={clientType} onValueChange={setClientType} disabled={isFormDisabled}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent side="bottom">
                <SelectItem value="5">Individual</SelectItem>
                <SelectItem value="6">Corporate Account</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">{clientType === "6" ? "Company Name" : "Full Name"} <span className="text-red-500">*</span></Label>
            <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder={clientType === "6" ? "Enter company name" : "Enter full name"} 
                disabled={isFormDisabled}
            />
          </div>
          {clientType === "6" && (
            <div className="space-y-2">
                <Label htmlFor="mobile">Mobile No. <span className="text-red-500">*</span></Label>
                <Input 
                    id="mobile" 
                    value={mobile} 
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter mobile number" 
                    disabled={isFormDisabled}
                />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="street">Street Address (Optional)</Label>
            <Input 
                id="street" 
                value={street} 
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Ex: 123 Main St" 
                disabled={isFormDisabled}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City/Municipality <span className="text-red-500">*</span></Label>
            <Input 
                id="city" 
                value={city} 
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city/municipality" 
                disabled={isFormDisabled}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="barangay">Barangay <span className="text-red-500">*</span></Label>
            <Input 
                id="barangay" 
                value={barangay} 
                onChange={(e) => setBarangay(e.target.value)}
                placeholder="Enter barangay" 
                disabled={isFormDisabled}
            />
          </div>
          
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90" 
            onClick={handleSubmit}
            disabled={isFormDisabled}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Adding..." : "Add Client"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}