"use client"

import { useState, useEffect, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersTable } from "@/modules/accounts/components/users-table"
import { ClientsTable } from "@/modules/accounts/components/clients-table"
import { AddUserDialog } from "@/modules/accounts/components/add-user-dialog"
import { AddClientDialog } from "@/modules/accounts/components/add-client-dialog"
import { clientAccounts } from "@/modules/accounts/data" 
import { Users, Building2, Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function AccountsPage() {
  const [activeTab, setActiveTab] = useState("users")
  const [users, setUsers] = useState([]) 
  const [loading, setLoading] = useState(true)

  const getRoleId = (role) => {
    const roleMap = {
      'admin': 2,
      'staff': 3,
      'driver': 4,
      'user': 3 
    };
    return roleMap[role] || 3;
  }

  const fetchUsers = useCallback(async (isManualRefresh = false) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    if (!token) {
        console.error("No auth token found");
        setLoading(false);
        toast.error("Authentication Required", { description: "Please log in to view user data." });
        return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/users', { 
        headers: {
          'Authorization': `Bearer ${token}`
        },
        cache: 'no-store' 
      });
      
      const data = await res.json();

      if (res.ok && data.users) {
        const mappedUsers = data.users.map(user => ({
          id: user._id,              
          fullName: user.name,       
          username: user.email,      
          mobile: user.mobile,       
          userType: getRoleId(user.role), 
          status: 1,                 
          createdAt: user.createdAt
        }));
        setUsers(mappedUsers);

        if (isManualRefresh) {
            toast.success("List Updated", {
                description: "User list has been refreshed successfully."
            })
        }
      } else {
        console.error("Failed to fetch:", data.message);
        if (isManualRefresh) {
            toast.error("Refresh Failed", {
                description: data.message || "Could not fetch users."
            })
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      if (isManualRefresh) {
        toast.error("Network Error", {
            description: "Please check your connection."
        })
      }
    } finally {
      setLoading(false);
    }
  }, []); 

  const handleManualRefresh = () => {
      fetchUsers(true);
  }

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers(false); 
    }
  }, [activeTab, fetchUsers]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Accounts</h1>
          <p className="text-muted-foreground">Manage users and clients</p>
        </div>
        
        <div className="flex gap-2">
            {activeTab === "users" && (
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleManualRefresh} 
                    disabled={loading} 
                    title="Refresh Table"
                >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
            )}
            {activeTab === "users" ? (
                <AddUserDialog onSuccess={() => fetchUsers(true)} /> 
            ) : (
                <AddClientDialog />
            )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-card">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="clients" className="flex items-center gap-2 data-[state=active]:bg-card">
            <Building2 className="h-4 w-4" />
            Clients
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4 border rounded-lg bg-card">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading users...</p>
            </div>
          ) : (
            <UsersTable users={users} />
          )}
        </TabsContent>
        
        <TabsContent value="clients">
          <ClientsTable clients={clientAccounts} />
        </TabsContent>
      </Tabs>
    </div>
  )
}