"use client"

import Link from "next/link"
import { ArrowLeft, User, Mail, Phone, Lock, Eye, EyeOff, AlertCircle, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

export default function AddUserPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/users">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Add New User</h1>
          <p className="text-sm text-muted-foreground">Create a new user account in your enterprise</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium text-foreground">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Enter full name" className="h-11 bg-secondary border-border pl-10 text-foreground placeholder:text-muted-foreground" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium text-foreground">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="email" placeholder="user@company.com" className="h-11 bg-secondary border-border pl-10 text-foreground placeholder:text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium text-foreground">Country Code *</Label>
                  <Select>
                    <SelectTrigger className="h-11 bg-secondary border-border text-foreground">
                      <SelectValue placeholder="+91" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="+91">+91 IN</SelectItem>
                      <SelectItem value="+1">+1 US</SelectItem>
                      <SelectItem value="+44">+44 UK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium text-foreground">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="9876543210" className="h-11 bg-secondary border-border pl-10 text-foreground placeholder:text-muted-foreground" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium text-foreground">Emergency Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Emergency contact" className="h-11 bg-secondary border-border pl-10 text-foreground placeholder:text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium text-foreground">Gender *</Label>
                  <Select>
                    <SelectTrigger className="h-11 bg-secondary border-border text-foreground">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer_not">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium text-foreground">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Set initial password"
                      className="h-11 bg-secondary border-border pl-10 pr-10 text-foreground placeholder:text-muted-foreground"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <Separator className="bg-border" />

              <div className="flex justify-end gap-3">
                <Link href="/dashboard/users">
                  <Button variant="outline" className="border-border text-foreground hover:bg-secondary">Cancel</Button>
                </Link>
                <Link href="/dashboard/users">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Create User
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="flex flex-col gap-4">
          <Card className="border-border bg-card">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Verification Required</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    After creation, a verification email will be sent to the user. The account will remain in Pending status until email and phone are verified.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Password Policy</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground">
                    <li>Minimum 8 characters</li>
                    <li>At least one uppercase letter</li>
                    <li>At least one lowercase letter</li>
                    <li>At least one number</li>
                    <li>At least one special character</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Unique Fields</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Email and phone number must be unique across the system. Duplicate entries will be rejected.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
