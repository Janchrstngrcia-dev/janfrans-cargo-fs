"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersTable } from "@/modules/accounts/components/users-table"
import { ClientsTable } from "@/modules/accounts/components/clients-table"
import { AddUserDialog } from "@/modules/accounts/components/add-user-dialog"
import { AddClientDialog } from "@/modules/accounts/components/add-client-dialog"
import { userAccounts, clientAccounts } from "@/modules/accounts/data"
import { Users, Building2 } from "lucide-react"

export default function AccountsPage() {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Accounts</h1>
          <p className="text-muted-foreground">Manage users and clients</p>
        </div>
        {activeTab === "users" ? <AddUserDialog /> : <AddClientDialog />}
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
          <UsersTable users={userAccounts} />
        </TabsContent>
        <TabsContent value="clients">
          <ClientsTable clients={clientAccounts} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
