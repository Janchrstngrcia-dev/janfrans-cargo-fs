"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersTable } from "@/modules/accounts/components/users-table"
import { ClientsTable } from "@/modules/accounts/components/clients-table"
import { AddUserDialog } from "@/modules/accounts/components/add-user-dialog"
import { AddClientDialog } from "@/modules/accounts/components/add-client-dialog"
import { Users, Building2, Loader2 } from "lucide-react" // Removed RefreshCw
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function AccountsPage() {
  const [activeTab, setActiveTab] = useState("users")
  const [users, setUsers] = useState([]) 
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [clients, setClients] = useState([])
  const [loadingClients, setLoadingClients] = useState(true)
  const loadedRef = useRef({ users: false, clients: false });

  const getRoleId = (role) => {
    const roleMap = { 'admin': 2, 'staff': 3, 'driver': 4, 'user': 3 };
    return roleMap[role] || 3;
  }

  const fetchUsers = useCallback(async (isManualRefresh = false) => {
    if (!isManualRefresh && loadedRef.current.users) {
        setLoadingUsers(false);
        return;
    }

    if (activeTab === 'users') setLoadingUsers(true);
    
    const token = localStorage.getItem('token');
    if (!token) { setLoadingUsers(false); return; }

    try {
      const res = await fetch('http://localhost:5000/api/auth/users', { 
        headers: { 'Authorization': `Bearer ${token}` },
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

        loadedRef.current.users = true; 

        if (isManualRefresh) toast.success("Users Updated");
      }
    } catch (error) {
      console.error(error);
      if (isManualRefresh) toast.error("Network Error: Could not fetch users");
    } finally {
      if (activeTab === 'users') setLoadingUsers(false);
    }
  }, [activeTab]); 

  const fetchClients = useCallback(async (isManualRefresh = false) => {
    if (!isManualRefresh && loadedRef.current.clients) {
        setLoadingClients(false);
        return;
    }

    if (activeTab === 'clients') setLoadingClients(true);
    
    const token = localStorage.getItem('token');
    if (!token) { setLoadingClients(false); return; }

    try {
      const res = await fetch('http://localhost:5000/api/clients', { 
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json(); 

      if (res.ok && data.clients) {
        const mappedClients = data.clients.map(client => ({
            id: client._id,
            fullName: client.fullName,
            mobile: client.mobile,
            userType: client.userType,
            status: client.status,
            createdAt: client.createdAt
        }));
        setClients(mappedClients);
        
        loadedRef.current.clients = true;

        if (isManualRefresh) toast.success("Clients Updated");
      } else {
         if (isManualRefresh) toast.error("Failed to load clients");
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
      if (isManualRefresh) toast.error("Network Error: Could not fetch clients");
    } finally {
      if (activeTab === 'clients') setLoadingClients(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers(false); 
    } else if (activeTab === "clients") {
      fetchClients(false);
    }
  }, [activeTab, fetchUsers, fetchClients]);

  const isLoading = activeTab === "users" ? loadingUsers : loadingClients;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Accounts</h1>
          <p className="text-muted-foreground">Manage users and clients</p>
        </div>
        
        <div className="flex gap-2">
            {activeTab === "users" ? (
                <AddUserDialog onSuccess={() => fetchUsers(true)} /> 
            ) : (
                <AddClientDialog onSuccess={() => fetchClients(true)} />
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
          {loadingUsers ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4 border rounded-lg bg-card">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading users...</p>
            </div>
          ) : (
            <UsersTable users={users} />
          )}
        </TabsContent>
        
        <TabsContent value="clients">
          {loadingClients ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4 border rounded-lg bg-card">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading clients...</p>
            </div>
          ) : (
             <ClientsTable clients={clients} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}