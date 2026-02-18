"use client"

import { useState } from "react"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Key, ChevronLeft, ChevronRight, User, Mail, Shield, Lock, Eye, EyeOff } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

const staffMembers = [
  { id: "STF-001", name: "Suresh Menon", email: "suresh@sailax-parking.com", role: "parking_staff", status: "active", joinedDate: "2025-01-15", vehiclesAttended: 342 },
  { id: "STF-002", name: "Ramesh Kumar", email: "ramesh@sailax-parking.com", role: "parking_staff", status: "active", joinedDate: "2025-02-01", vehiclesAttended: 287 },
  { id: "STF-003", name: "Dinesh Patel", email: "dinesh@sailax-parking.com", role: "parking_staff", status: "active", joinedDate: "2025-03-10", vehiclesAttended: 198 },
  { id: "STF-004", name: "Anil Sharma", email: "anil@sailax-parking.com", role: "parking_staff", status: "inactive", joinedDate: "2024-11-20", vehiclesAttended: 456 },
  { id: "STF-005", name: "Vijay Reddy", email: "vijay@sailax-parking.com", role: "parking_staff", status: "active", joinedDate: "2025-04-05", vehiclesAttended: 124 },
  { id: "STF-006", name: "Kiran Das", email: "kiran@sailax-parking.com", role: "parking_staff", status: "active", joinedDate: "2025-05-12", vehiclesAttended: 89 },
]

const statusStyles: Record<string, string> = {
  active: "bg-green-500/10 text-green-400 border-green-500/20",
  inactive: "bg-red-500/10 text-red-400 border-red-500/20",
}

export default function StaffPage() {
  const [search, setSearch] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const filteredStaff = staffMembers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Parking Staff</h1>
          <p className="text-sm text-muted-foreground">Manage parking staff accounts and access</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add New Parking Staff</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-foreground">Staff Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Full name" className="bg-secondary border-border pl-10 text-foreground placeholder:text-muted-foreground" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-foreground">Email / Username *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input type="email" placeholder="staff@company.com" className="bg-secondary border-border pl-10 text-foreground placeholder:text-muted-foreground" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-foreground">Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 8 chars, alphanumeric + special"
                    className="bg-secondary border-border pl-10 pr-10 text-foreground placeholder:text-muted-foreground"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">Role will be auto-assigned as Parking Staff</p>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="border-border text-foreground">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Create Account</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{staffMembers.length}</p>
            <p className="text-xs text-muted-foreground">Total Staff</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{staffMembers.filter(s => s.status === "active").length}</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-400">{staffMembers.filter(s => s.status === "inactive").length}</p>
            <p className="text-xs text-muted-foreground">Inactive</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">
              {staffMembers.reduce((sum, s) => sum + s.vehiclesAttended, 0).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Total Attendances</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-border bg-card">
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 bg-secondary border-border pl-10 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card className="border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-semibold">Name</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Email / Username</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Role</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Joined</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-center">Vehicles Attended</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Status</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.map((staff) => (
              <TableRow key={staff.id} className="border-border hover:bg-secondary/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-bold text-primary">{staff.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{staff.name}</p>
                      <p className="text-xs text-muted-foreground">{staff.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{staff.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-border text-foreground text-xs capitalize">
                    <Shield className="mr-1 h-3 w-3" />
                    {staff.role.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{staff.joinedDate}</TableCell>
                <TableCell className="text-center text-sm font-medium text-foreground">{staff.vehiclesAttended}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-xs font-semibold capitalize ${statusStyles[staff.status]}`}>
                    {staff.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border">
                      <DropdownMenuItem className="text-foreground hover:bg-secondary cursor-pointer">
                        <Edit className="mr-2 h-4 w-4" /> Edit Info
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-foreground hover:bg-secondary cursor-pointer">
                        <Key className="mr-2 h-4 w-4" /> Reset Password
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-border" />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 cursor-pointer" onSelect={(e) => e.preventDefault()}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Account
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-card border-border">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-foreground">Delete Staff Account?</AlertDialogTitle>
                            <AlertDialogDescription className="text-muted-foreground">
                              This will permanently remove {staff.name}&apos;s account from the system. They will no longer have access to mark vehicle attendance. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="border-border text-foreground hover:bg-secondary">Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">Showing 1-{filteredStaff.length} of {filteredStaff.length} staff members</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 border-border text-muted-foreground" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="icon" className="h-8 w-8 bg-primary text-primary-foreground">1</Button>
            <Button variant="outline" size="icon" className="h-8 w-8 border-border text-muted-foreground" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
