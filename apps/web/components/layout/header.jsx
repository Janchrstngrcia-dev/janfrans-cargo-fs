"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import api from "@/lib/api" 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Settings, User, ChevronDown } from "lucide-react"

export function Header() {
  const router = useRouter()
  const [user, setUser] = useState({ name: "", role: "", email: "" })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await api.get('/auth/me'); 
        if (data.success) {
           setUser(data.user); 
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    router.push('/login');
  }

  const getInitials = (name) => {
    return name ? name.substring(0, 2).toUpperCase() : "U";
  };

  return (
    <header className="fixed left-64 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-3">
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 px-2 hover:bg-secondary">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/admin-user-avatar.png" />
                <AvatarFallback className="bg-red-700 text-primary-foreground">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                {loading ? (
                  <span className="text-sm text-muted-foreground">Loading...</span>
                ) : (
                  <>
                    <span className="text-sm font-medium text-foreground">{user.name}</span>
                    <span className="text-xs text-primary capitalize">{user.role}</span>
                  </>
                )}
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground pt-0">
                {user.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/profile" className="flex items-center cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/settings" className="flex items-center cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="flex items-center text-destructive focus:text-destructive cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}