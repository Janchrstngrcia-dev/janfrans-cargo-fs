"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import
{
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { toast } from "sonner" 

export function AddUserDialog ({ onSuccess })
{
  const [ open, setOpen ] = useState( false )
  const [ loading, setLoading ] = useState( false )
  const [ formData, setFormData ] = useState( {
    role: "",
    fullName: "",
    mobile: "",
    email: "",
    secretQuestion: "",
    secretAnswer: "",
    password: "",
    confirmPassword: ""
  } )

  const handleChange = ( e ) =>
  {
    setFormData( { ...formData, [ e.target.id ]: e.target.value } )
  }

  const handleValueChange = ( field, value ) =>
  {
    setFormData( { ...formData, [ field ]: value } )
  }

  const validateForm = () => {
    const requiredFields = [
      'role', 'fullName', 'mobile', 'email', 
      'secretQuestion', 'secretAnswer', 'password', 'confirmPassword'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      toast.error("Missing Required Fields", {
        description: `Please fill in all the required fields`
      });
      return false;
    }
    return true;
  };

const handleSubmit = async () =>
  {
    if (!validateForm()) {
        return;
    }
    if ( formData.password !== formData.confirmPassword )
    {
      toast.error( "Validation Error", {
        description: "Passwords do not match!"
      } )
      return
    }

    const token = localStorage.getItem( 'token' )

    if ( !token )
    {
      toast.error( "Authentication Error", {
        description: "Admin token not found. Please log in first."
      } )
      return
    }

    setLoading( true )
    try
    {
      const res = await fetch( 'http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify( formData ),
      } )

      const data = await res.json()

      if ( !res.ok )
      {
        let errorMessage = data.message || data.error || 'Failed to create user';
        
        if (errorMessage.includes("Path")) {
            errorMessage = "Please review all fields. Some input is invalid or missing.";
        }
        
        throw new Error(errorMessage)
      }
      toast.success( "User created successfully!", {
        description: `${formData.fullName} has been added to the system.`
      } )
      
      setOpen( false )
      setFormData( {
        role: "", fullName: "", mobile: "", email: "",
        secretQuestion: "", secretAnswer: "", password: "", confirmPassword: ""
      } )
      
      if (onSuccess) onSuccess(true); 

    } catch ( error )
    {
      toast.error( "Error creating user", {
        description: error.message 
      } )
    } finally
    {
      setLoading( false )
    }
  }
  const password = formData.password
  const validations = {
    length: password.length >= 8,
    caseChange: /[a-z]/.test( password ) && /[A-Z]/.test( password ) && !/^[A-Z]/.test( password ),
    number: /\d/.test( password ) && !/\d$/.test( password ),
    special: /[^a-zA-Z0-9]/.test( password ) && !/[^a-zA-Z0-9]$/.test( password ),
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Add a new user account to the system.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="role">User Type</Label>
            <Select onValueChange={( val ) => handleValueChange( "role", val )}>
              <SelectTrigger>
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="driver">Driver</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-full gap-4">
            <div className="space-y-2 flex-1">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="Enter full name" onChange={handleChange} value={formData.fullName} />
            </div>
            <div className="space-y-2 flex-1">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input id="mobile" placeholder="Enter mobile number" onChange={handleChange} value={formData.mobile} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter email address" onChange={handleChange} value={formData.email} />
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="secretQuestion">Secret Question</Label>
            <Select onValueChange={( val ) => handleValueChange( "secretQuestion", val )}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a secret question" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">What was your childhood nickname?</SelectItem>
                <SelectItem value="2">What is the name of your favorite childhood friend?</SelectItem>
                <SelectItem value="3">What was your dream job as a child?</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="secretAnswer">Secret Answer</Label>
            <Input id="secretAnswer" placeholder="Enter secret answer" onChange={handleChange} value={formData.secretAnswer} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter password" onChange={handleChange} value={formData.password} />
          </div>
        </div>

        {/* Validation UI */}
        <div className="mt-2 space-y-1 text-sm">
          <div className="flex items-center gap-2">
            {validations.length ? (
              <CheckCircle className="text-green-600 h-4 w-4" />
            ) : (
              <XCircle className="text-red-600 h-4 w-4" />
            )}
            <span>Password must have at least 8 characters</span>
          </div>

          <div className="flex items-center gap-2">
            {validations.caseChange ? (
              <CheckCircle className="text-green-600 h-4 w-4" />
            ) : (
              <XCircle className="text-red-600 h-4 w-4" />
            )}
            <span>Password must include upper & lower case, not at the start.</span>
          </div>

          <div className="flex items-center gap-2">
            {validations.number ? (
              <CheckCircle className="text-green-600 h-4 w-4" />
            ) : (
              <XCircle className="text-red-600 h-4 w-4" />
            )}
            <span>Password must include a number, not at the end.</span>
          </div>

          <div className="flex items-center gap-2">
            {validations.special ? (
              <CheckCircle className="text-green-600 h-4 w-4" />
            ) : (
              <XCircle className="text-red-600 h-4 w-4" />
            )}
            <span>Password must include a special character, not at the end.</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" placeholder="Confirm password" onChange={handleChange} value={formData.confirmPassword} />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen( false )}>
            Cancel
          </Button>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Add User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}