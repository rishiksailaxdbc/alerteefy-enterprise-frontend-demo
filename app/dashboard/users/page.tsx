"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Plus, Filter, MoreHorizontal, ChevronLeft, ChevronRight, Mail, Eye, UserX, UserCheck, RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const users = [
  { id: "USR-001", name: "Rajesh Kumar", email: "rajesh@sailax.com", role: "Admin", phone: "+91 98765 43210", licenses: 12, status: "active" },
  { id: "USR-002", name: "Priya Sharma", email: "priya@sailax.com", role: "Fleet Manager", phone: "+91 87654 32109", licenses: 8, status: "active" },
  { id: "USR-003", name: "Amit Patel", email: "amit@sailax.com", role: "Manager", phone: "+91 76543 21098", licenses: 15, status: "active" },
  { id: "USR-004", name: "Sneha Reddy", email: "sneha@sailax.com", role: "Employee", phone: "+91 65432 10987", licenses: 3, status: "pending" },
  { id: "USR-005", name: "Vikram Singh", email: "vikram@sailax.com", role: "Employee", phone: "+91 54321 09876", licenses: 5, status: "active" },
  { id: "USR-006", name: "Anita Das", email: "anita@sailax.com", role: "Fleet Manager", phone: "+91 43210 98765", licenses: 10, status: "inactive" },
  { id: "USR-007", name: "Mohit Verma", email: "mohit@sailax.com", role: "Employee", phone: "+91 32109 87654", licenses: 2, status: "active" },
  { id: "USR-008", name: "Kavita Joshi", email: "kavita@sailax.com", role: "Manager", phone: "+91 21098 76543", licenses: 7, status: "active" },
]

const statusStyles: Record<string, string> = {
  active: "bg-green-500/10 text-green-400 border-green-500/20",
  inactive: "bg-red-500/10 text-red-400 border-red-500/20",
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
}

export default function UsersPage() {
  const [search, setSearch] = useState("")
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users</h1>
          <p className="text-sm text-muted-foreground">Manage all users in your enterprise</p>
        </div>
        <Link href="/dashboard/users/add">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{users.length}</p>
            <p className="text-xs text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{users.filter(u => u.status === "active").length}</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">{users.filter(u => u.status === "pending").length}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-400">{users.filter(u => u.status === "inactive").length}</p>
            <p className="text-xs text-muted-foreground">Inactive</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
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
          <Select>
            <SelectTrigger className="h-10 w-[140px] bg-secondary border-border text-foreground">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="fleet_manager">Fleet Manager</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="h-10 w-[140px] bg-secondary border-border text-foreground">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-semibold">Name</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Email</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Role</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Phone</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-center">Licenses</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Status</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="border-border hover:bg-secondary/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-bold text-primary">{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-border text-foreground text-xs">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{user.phone}</TableCell>
                <TableCell className="text-center text-sm font-medium text-foreground">{user.licenses}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-xs font-semibold capitalize ${statusStyles[user.status]}`}>
                    {user.status}
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
                      <DropdownMenuItem asChild className="text-foreground hover:bg-secondary cursor-pointer">
                        <Link href={`/dashboard/users/${user.id}`}><Eye className="mr-2 h-4 w-4" /> View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-foreground hover:bg-secondary cursor-pointer">
                        <Mail className="mr-2 h-4 w-4" /> Resend Verification
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-border" />
                      {user.status === "active" ? (
                        <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 cursor-pointer">
                          <UserX className="mr-2 h-4 w-4" /> Deactivate
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-green-400 hover:bg-green-500/10 cursor-pointer">
                          <UserCheck className="mr-2 h-4 w-4" /> Activate
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">Showing 1-{filteredUsers.length} of {filteredUsers.length} users</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 border-border text-muted-foreground" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="icon" className="h-8 w-8 bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 border-border text-muted-foreground" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
