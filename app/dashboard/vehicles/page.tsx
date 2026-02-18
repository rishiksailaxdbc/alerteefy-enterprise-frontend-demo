"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Plus, Car, MoreHorizontal, Edit, Trash2, QrCode, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const vehicles = [
  { id: "VH-001", number: "KL 00 PD 8008", type: "Car", brand: "Mahindra", model: "BE6", regDate: "2024-06-15", owner: "Rajesh Kumar", user: "USR-001", sticker: "QR-0156", status: "active" },
  { id: "VH-002", number: "MH 12 AB 3456", type: "Car", brand: "Tata", model: "Nexon", regDate: "2024-08-22", owner: "Rajesh Kumar", user: "USR-001", sticker: "QR-0157", status: "active" },
  { id: "VH-003", number: "DL 04 CD 7890", type: "Bike", brand: "Royal Enfield", model: "Classic 350", regDate: "2024-11-10", owner: "Priya Sharma", user: "USR-002", sticker: "QR-0158", status: "active" },
  { id: "VH-004", number: "KA 01 EF 1234", type: "Truck", brand: "Ashok Leyland", model: "Boss", regDate: "2025-01-10", owner: "Amit Patel", user: "USR-003", sticker: null, status: "inactive" },
  { id: "VH-005", number: "TN 09 GH 5678", type: "Car", brand: "Hyundai", model: "Creta", regDate: "2025-02-05", owner: "Vikram Singh", user: "USR-005", sticker: "QR-0160", status: "active" },
  { id: "VH-006", number: "MH 14 XY 9012", type: "Bus", brand: "Tata", model: "Starbus", regDate: "2025-01-28", owner: "Amit Patel", user: "USR-003", sticker: null, status: "inactive" },
  { id: "VH-007", number: "GJ 05 ZZ 4444", type: "Car", brand: "Maruti", model: "Swift", regDate: "2024-09-14", owner: "Sneha Reddy", user: "USR-004", sticker: "QR-0162", status: "active" },
  { id: "VH-008", number: "UP 32 AA 1111", type: "Truck", brand: "Eicher", model: "Pro 3019", regDate: "2024-07-20", owner: "Mohit Verma", user: "USR-007", sticker: "QR-0163", status: "active" },
]

const vehicleTypes = ["Car", "Bike", "Truck", "Bus", "Van"]

export default function VehiclesPage() {
  const [search, setSearch] = useState("")
  const filteredVehicles = vehicles.filter(v =>
    v.number.toLowerCase().includes(search.toLowerCase()) ||
    v.owner.toLowerCase().includes(search.toLowerCase()) ||
    v.brand.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vehicles</h1>
          <p className="text-sm text-muted-foreground">Manage all vehicles across your enterprise fleet</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add New Vehicle</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-foreground">Vehicle Number *</Label>
                <Input placeholder="XX 00 XX 0000" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-foreground">Vehicle Type *</Label>
                  <Select>
                    <SelectTrigger className="bg-secondary border-border text-foreground">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {vehicleTypes.map(t => <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-foreground">Brand *</Label>
                  <Input placeholder="e.g., Mahindra" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-foreground">Model *</Label>
                  <Input placeholder="e.g., BE6" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-foreground">Registration Date *</Label>
                  <Input type="date" className="bg-secondary border-border text-foreground" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-foreground">Owner Name *</Label>
                <Input placeholder="Vehicle owner name" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-foreground">Assign to User</Label>
                <Select>
                  <SelectTrigger className="bg-secondary border-border text-foreground">
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="USR-001">Rajesh Kumar</SelectItem>
                    <SelectItem value="USR-002">Priya Sharma</SelectItem>
                    <SelectItem value="USR-003">Amit Patel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="border-border text-foreground">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Add Vehicle</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{vehicles.length}</p>
            <p className="text-xs text-muted-foreground">Total Vehicles</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{vehicles.filter(v => v.status === "active").length}</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{vehicles.filter(v => v.sticker).length}</p>
            <p className="text-xs text-muted-foreground">QR Assigned</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">{vehicles.filter(v => !v.sticker).length}</p>
            <p className="text-xs text-muted-foreground">No Sticker</p>
          </CardContent>
        </Card>
      </div>

      {/* Search/Filters */}
      <Card className="border-border bg-card">
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by vehicle no, owner, brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 bg-secondary border-border pl-10 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Select>
            <SelectTrigger className="h-10 w-[140px] bg-secondary border-border text-foreground">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Types</SelectItem>
              {vehicleTypes.map(t => <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="h-10 w-[140px] bg-secondary border-border text-foreground">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
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
              <TableHead className="text-muted-foreground font-semibold">Vehicle No.</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Type</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Brand / Model</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Owner</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Reg. Date</TableHead>
              <TableHead className="text-muted-foreground font-semibold">QR Sticker</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Status</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.map((v) => (
              <TableRow key={v.id} className="border-border hover:bg-secondary/50">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">{v.number}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{v.type}</TableCell>
                <TableCell>
                  <p className="text-sm text-foreground">{v.brand}</p>
                  <p className="text-xs text-muted-foreground">{v.model}</p>
                </TableCell>
                <TableCell className="text-muted-foreground">{v.owner}</TableCell>
                <TableCell className="text-muted-foreground">{v.regDate}</TableCell>
                <TableCell>
                  {v.sticker ? (
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
                      <QrCode className="mr-1 h-3 w-3" /> {v.sticker}
                    </Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">Not assigned</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-xs font-semibold capitalize ${v.status === "active" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
                    {v.status}
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
                        <Edit className="mr-2 h-4 w-4" /> Edit Vehicle
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-foreground hover:bg-secondary cursor-pointer">
                        <QrCode className="mr-2 h-4 w-4" /> Assign Sticker
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-border" />
                      <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 cursor-pointer">
                        <Trash2 className="mr-2 h-4 w-4" /> Remove Vehicle
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">Showing 1-{filteredVehicles.length} of {filteredVehicles.length} vehicles</p>
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
