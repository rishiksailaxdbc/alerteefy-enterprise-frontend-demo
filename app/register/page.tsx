"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Phone, Building2, FileText, MapPin, Hash, ArrowRight, ArrowLeft, Upload, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

const steps = [
  { title: "Account Info", description: "Basic details" },
]

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();


  return (
    <div className="flex min-h-screen bg-background">
      {/* Left panel */}
      <div className="relative hidden w-[400px] flex-col items-center justify-center overflow-hidden lg:flex">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center bottom, rgba(200,230,0,0.3) 0%, rgba(200,230,0,0.05) 40%, transparent 70%)",
          }}
        />
        <div className="relative z-10 flex flex-col items-center px-8 text-center">
          <div className="relative mb-8 h-20 w-20">
            <Image src="/logo.png" alt="Alerteefy" fill className="object-contain rounded-full" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Join Alerteefy</h2>
          <p className="mt-2 text-sm text-muted-foreground">Enterprise vehicle management platform</p>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-lg">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="relative h-10 w-10">
              <Image src="/logo.png" alt="Alerteefy" fill className="object-contain rounded-full" />
            </div>
            <span className="text-xl font-bold text-foreground">Alerteefy</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground">Enterprise Registration</h2>
          </div>

        
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-foreground">Full Name (Account Admin)</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="John Doe" className="h-11 bg-secondary border-border pl-10 text-foreground placeholder:text-muted-foreground" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-foreground">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input type="email" placeholder="admin@company.com" className="h-11 bg-secondary border-border pl-10 text-foreground placeholder:text-muted-foreground" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium text-foreground">Country Code</Label>
                  <Select>
                    <SelectTrigger className="h-11 bg-secondary border-border text-foreground">
                      <SelectValue placeholder="+91" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="+91">+91 IN</SelectItem>
                      <SelectItem value="+1">+1 US</SelectItem>
                      <SelectItem value="+44">+44 UK</SelectItem>
                      <SelectItem value="+61">+61 AU</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                  <Label className="text-sm font-medium text-foreground">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="9876543210" className="h-11 bg-secondary border-border pl-10 text-foreground placeholder:text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 8 chars, alphanumeric + special"
                    className="h-11 bg-secondary border-border pl-10 pr-10 text-foreground placeholder:text-muted-foreground"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
         

        

          {/* Navigation */}
          <div className="mt-8 flex gap-3">
           
              <Button
                className="h-11 flex-1 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-[0_0_20px_rgba(200,230,0,0.2)]"
                onClick={()=> router.push("/dashboard")}
              >
                Register
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
           
          </div>

          <Separator className="my-6 bg-border" />

          <div className="flex gap-3">
            <Button variant="outline" className="h-11 flex-1 border-border bg-secondary text-foreground hover:bg-secondary/80">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="h-11 flex-1 border-border bg-secondary text-foreground hover:bg-secondary/80">
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/" className="font-semibold text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
