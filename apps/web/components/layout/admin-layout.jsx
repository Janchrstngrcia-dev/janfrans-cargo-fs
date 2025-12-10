"use client"

import { useRouter } from "next/navigation"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { Loader2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { verifyToken } from "@/lib/api"

export function AdminLayout({ children, requiredRole }) {
  const router = useRouter()
  const hasCheckedAuth = useRef(false)
  const [isVerifying, setIsVerifying] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (hasCheckedAuth.current) return
    hasCheckedAuth.current = true

    const checkAuth = async () => {
      const token = localStorage.getItem("token")
      
      if (!token) {
        router.push("/login")
        return
      }

      const userData = await verifyToken()
      
      if (!userData) {
        localStorage.removeItem("token")
        router.push("/login")
        return
      }

      if (requiredRole && userData.role !== requiredRole) {
        switch (userData.role) {
          case 'admin':
            router.push('/admin/dashboard')
            break
          case 'staff':
            router.push('/staff/dashboard')
            break
          case 'driver':
            router.push('/driver/dashboard')
            break
          default:
            router.push('/login')
            break
        }
        return
      }

      setUser(userData)
      setIsVerifying(false)
    }

    checkAuth()
  }, [router, requiredRole])

  if (isVerifying) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar user={user} />
      <Header user={user} />
      <main className="ml-64 pt-16">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}