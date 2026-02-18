"use client"

import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, Shield, Car, Clock, Edit, RotateCcw, UserX, QrCode } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const user = {
  id: "USR-001",
  name: "Rajesh Kumar",
  email: "rajesh@sailax.com",
  phone: "+91 98765 43210",
  countryCode: "+91",
  gender: "Male",
  address: "12, MG Road, Bengaluru, Karnataka, India - 560001",
  role: "Admin",
  status: "active",
  totalLicenses: 12,
  usedLicenses: 9,
  remainingLicenses: 3,
  joinedDate: "Jan 15, 2025",
  lastActive: "2 hours ago",
}

const vehicles = [
  { number: "KL 00 PD 8008", type: "Car", brand: "Mahindra", model: "BE6", regDate: "2024-06-15", owner: "Rajesh Kumar" },
  { number: "MH 12 AB 3456", type: "Car", brand: "Tata", model: "Nexon", regDate: "2024-08-22", owner: "Rajesh Kumar" },
  { number: "KA 01 EF 1234", type: "Truck", brand: "Ashok Leyland", model: "Boss", regDate: "2025-01-10", owner: "Rajesh Kumar" },
]

const activityLog = [
  { action: "Vehicle registered", detail: "MH 12 AB 3456", time: "Feb 15, 2026 - 2:30 PM" },
  { action: "Alert resolved", detail: "Wrong parking alert for KL 00 PD 8008", time: "Feb 14, 2026 - 4:15 PM" },
  { action: "QR sticker assigned", detail: "Sticker #QR-0156 to KA 01 EF 1234", time: "Feb 12, 2026 - 11:00 AM" },
  { action: "Login", detail: "Logged in from Chrome (Windows)", time: "Feb 11, 2026 - 9:45 AM" },
  { action: "License renewed", detail: "Renewed 3 licenses", time: "Feb 10, 2026 - 3:00 PM" },
]

export default function UserDetailPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/users">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">User Details</h1>
          <p className="text-sm text-muted-foreground">{user.id}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
            <RotateCcw className="mr-2 h-4 w-4" /> Reset Password
          </Button>
          <Button variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10">
            <UserX className="mr-2 h-4 w-4" /> Deactivate
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <Card className="border-border bg-card">
        <CardContent className="flex flex-col items-start gap-6 p-6 md:flex-row md:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <span className="text-3xl font-bold text-primary">R</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs font-semibold capitalize">
                {user.status}
              </Badge>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> {user.email}</span>
              <span className="flex items-center gap-1"><Phone className="h-4 w-4" /> {user.phone}</span>
              <span className="flex items-center gap-1"><Shield className="h-4 w-4" /> {user.role}</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {user.address}
            </div>
          </div>
          <div className="flex gap-3 text-center">
            <div className="rounded-lg bg-secondary px-4 py-2">
              <p className="text-lg font-bold text-foreground">{user.totalLicenses}</p>
              <p className="text-[10px] text-muted-foreground">Total</p>
            </div>
            <div className="rounded-lg bg-secondary px-4 py-2">
              <p className="text-lg font-bold text-primary">{user.usedLicenses}</p>
              <p className="text-[10px] text-muted-foreground">Used</p>
            </div>
            <div className="rounded-lg bg-secondary px-4 py-2">
              <p className="text-lg font-bold text-foreground">{user.remainingLicenses}</p>
              <p className="text-[10px] text-muted-foreground">Remaining</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="vehicles" className="w-full">
        <TabsList className="bg-secondary border border-border">
          <TabsTrigger value="vehicles" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground">
            <Car className="mr-2 h-4 w-4" /> Vehicles ({vehicles.length})
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" /> Activity Log
          </TabsTrigger>
          <TabsTrigger value="licenses" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground">
            <QrCode className="mr-2 h-4 w-4" /> Licenses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles" className="mt-4">
          <Card className="border-border bg-card overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold text-foreground">Assigned Vehicles</CardTitle>
              <Link href="/dashboard/vehicles">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Add Vehicle
                </Button>
              </Link>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Vehicle No.</TableHead>
                  <TableHead className="text-muted-foreground">Type</TableHead>
                  <TableHead className="text-muted-foreground">Brand</TableHead>
                  <TableHead className="text-muted-foreground">Model</TableHead>
                  <TableHead className="text-muted-foreground">Reg. Date</TableHead>
                  <TableHead className="text-muted-foreground">Owner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((v) => (
                  <TableRow key={v.number} className="border-border hover:bg-secondary/50">
                    <TableCell className="font-medium text-foreground">{v.number}</TableCell>
                    <TableCell className="text-muted-foreground">{v.type}</TableCell>
                    <TableCell className="text-muted-foreground">{v.brand}</TableCell>
                    <TableCell className="text-muted-foreground">{v.model}</TableCell>
                    <TableCell className="text-muted-foreground">{v.regDate}</TableCell>
                    <TableCell className="text-muted-foreground">{v.owner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-4">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-foreground">Activity History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {activityLog.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg bg-secondary/50 p-3">
                    <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{a.action}</p>
                      <p className="text-xs text-muted-foreground">{a.detail}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground flex-shrink-0">{a.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="licenses" className="mt-4">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-foreground">License Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-secondary p-4 text-center">
                  <p className="text-3xl font-bold text-foreground">{user.totalLicenses}</p>
                  <p className="text-sm text-muted-foreground">Total Assigned</p>
                </div>
                <div className="rounded-lg bg-secondary p-4 text-center">
                  <p className="text-3xl font-bold text-primary">{user.usedLicenses}</p>
                  <p className="text-sm text-muted-foreground">Currently Used</p>
                </div>
                <div className="rounded-lg bg-secondary p-4 text-center">
                  <p className="text-3xl font-bold text-foreground">{user.remainingLicenses}</p>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
