"use client"

import { useState } from "react"
import { Building2, Mail, Phone, MapPin, Save, CheckCircle2, Upload } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export default function ProfilePage() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Enterprise Profile</h1>
          <p className="text-sm text-muted-foreground">Manage your enterprise account information</p>
        </div>
        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs font-semibold">
          Active
        </Badge>
      </div>

      {/* Profile Header */}
      <Card className="border-border bg-card overflow-hidden">
        <div className="relative h-32 w-full" style={{ background: "radial-gradient(ellipse at center, rgba(200,230,0,0.2) 0%, transparent 70%)" }}>
          <div className="absolute -bottom-10 left-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-card bg-primary shadow-lg">
              <Image src="/logo.png" alt="Enterprise Logo" width={48} height={48} className="rounded-lg" />
            </div>
          </div>
        </div>
        <CardContent className="px-6 pt-14 pb-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">Sailax Pvt Ltd</h2>
              <p className="text-sm text-muted-foreground">admin@Sailax.com</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span>PAN: ABCDE1234F</span>
                <span>GST: 22ABCDE1234F1Z5</span>
                <span>Registered: Jan 2025</span>
              </div>
            </div>
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
              <Upload className="mr-2 h-4 w-4" /> Change Logo
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Company Information */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">Enterprise Name</Label>
              <Input defaultValue="Sailax Pvt Ltd" className="h-11 bg-secondary border-border text-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">PAN Number</Label>
              <Input defaultValue="ABCDE1234F" className="h-11 bg-secondary border-border text-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">GST Number</Label>
              <Input defaultValue="22ABCDE1234F1Z5" className="h-11 bg-secondary border-border text-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">Incorporation Certificate</Label>
              <div className="flex items-center gap-3 rounded-lg border border-dashed border-border bg-secondary p-3">
                <Upload className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">certificate_acme.pdf</p>
                  <p className="text-xs text-muted-foreground">Uploaded on Jan 15, 2025</p>
                </div>
                <Button variant="outline" size="sm" className="border-border text-foreground">
                  Replace
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">Email Address</Label>
              <Input defaultValue="admin@sailax.com" type="email" className="h-11 bg-secondary border-border text-foreground" />
              <p className="text-xs text-muted-foreground">Changing email requires verification</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-foreground">Country Code</Label>
                <Select defaultValue="+91">
                  <SelectTrigger className="h-11 bg-secondary border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="+91">+91 IN</SelectItem>
                    <SelectItem value="+1">+1 US</SelectItem>
                    <SelectItem value="+44">+44 UK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <Label className="text-sm font-medium text-foreground">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input defaultValue="9876543210" className="h-11 bg-secondary border-border pl-10 text-foreground" />
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Changing phone requires OTP verification</p>
          </CardContent>
        </Card>
      </div>

      {/* Address */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Address Details
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-foreground">Street Address</Label>
            <Textarea defaultValue="12, MG Road, Electronic City Phase 1" className="bg-secondary border-border text-foreground min-h-[80px]" />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">City</Label>
              <Input defaultValue="Bengaluru" className="h-11 bg-secondary border-border text-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">State</Label>
              <Input defaultValue="Karnataka" className="h-11 bg-secondary border-border text-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">Country</Label>
              <Input defaultValue="India" className="h-11 bg-secondary border-border text-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">ZIP Code</Label>
              <Input defaultValue="560100" className="h-11 bg-secondary border-border text-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex items-center justify-end gap-3">
        {saved && (
          <div className="flex items-center gap-2 text-sm text-green-400">
            <CheckCircle2 className="h-4 w-4" />
            Changes saved successfully
          </div>
        )}
        <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
          Cancel
        </Button>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
