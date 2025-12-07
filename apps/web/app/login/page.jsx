"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/admin/dashboard")
    }, 1000)
  }

  return (
        <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 flex">
        <div
          className="absolute inset-0 bg-linear-to-br from-red-500 via-red-400 to-orange-400 blur-3xl opacity-60"
          style={{ clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0 100%)' }}
        ></div>
        
        <Image
          src="/cargo-pic.jpg"
          alt="Background Image"
          fill
          className="object-cover object-center opacity-80"
          style={{ clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0 100%)' }}
        />

        <div
          className="absolute inset-0 bg-linear-to-br from-red-600 via-green-500 to-red-500"
          style={{ clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)' }}
        ></div>

        <Image
          src="/trucks.jpg"
          alt="Background Image"
          fill
          className="object-cover object-center opacity-80"
          style={{ clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)' }}
        />

        <div className="absolute inset-0 backdrop-blur-xs"></div>
      </div>


    <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <Card className="border-border shadow-xl bg-card">
          <CardHeader className="text-center pb-4">
            {/* Logo Section */}
        <div className="flex flex-col items-center mb-2">
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src="/janfrans.png"
                  alt="Janfrans Logo"
                  width={300}
                  height={30}
                  className="object-contain"
                />
          </div>
        </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 bg-background border-border"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-11 bg-background border-border"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  Remember me
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        {/* <p className="text-center text-sm text-muted-foreground mt-6">
          2025 JanFrans Cargo Services. All rights reserved.
        </p> */}
      </div>
      </div>
    </div>
  )
}
