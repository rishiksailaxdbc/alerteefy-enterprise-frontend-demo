"use client"

import { useState } from "react"
import { Search, ShoppingCart, RotateCcw, QrCode, Car, Calendar, Clock, MoreHorizontal, Link2, Unlink, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

const stickers = [
  { id: "QR-0156", purchaseDate: "2024-06-10", expiryDate: "2025-06-10", status: "active", vehicle: "KL 00 PD 8008", owner: "Rajesh Kumar", daysLeft: 112 },
  { id: "QR-0157", purchaseDate: "2024-08-15", expiryDate: "2025-08-15", status: "active", vehicle: "MH 12 AB 3456", owner: "Rajesh Kumar", daysLeft: 178 },
  { id: "QR-0158", purchaseDate: "2024-11-05", expiryDate: "2025-11-05", status: "active", vehicle: "DL 04 CD 7890", owner: "Priya Sharma", daysLeft: 260 },
  { id: "QR-0159", purchaseDate: "2024-04-20", expiryDate: "2025-04-20", status: "expired", vehicle: null, owner: null, daysLeft: 0 },
  { id: "QR-0160", purchaseDate: "2025-02-01", expiryDate: "2026-02-01", status: "active", vehicle: "TN 09 GH 5678", owner: "Vikram Singh", daysLeft: 348 },
  { id: "QR-0161", purchaseDate: "2025-01-15", expiryDate: "2026-01-15", status: "inactive", vehicle: null, owner: null, daysLeft: 331 },
  { id: "QR-0162", purchaseDate: "2024-09-10", expiryDate: "2025-09-10", status: "active", vehicle: "GJ 05 ZZ 4444", owner: "Sneha Reddy", daysLeft: 204 },
  { id: "QR-0163", purchaseDate: "2024-07-18", expiryDate: "2025-07-18", status: "active", vehicle: "UP 32 AA 1111", owner: "Mohit Verma", daysLeft: 150 },
  { id: "QR-0164", purchaseDate: "2024-03-10", expiryDate: "2025-03-10", status: "expired", vehicle: null, owner: null, daysLeft: 0 },
  { id: "QR-0165", purchaseDate: "2025-01-20", expiryDate: "2026-01-20", status: "inactive", vehicle: null, owner: null, daysLeft: 336 },
]

const statusStyles: Record<string, string> = {
  active: "bg-green-500/10 text-green-400 border-green-500/20",
  inactive: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  expired: "bg-red-500/10 text-red-400 border-red-500/20",
}

export default function LicensesPage() {
  const [search, setSearch] = useState("")
  const filteredStickers = stickers.filter(s =>
    s.id.toLowerCase().includes(search.toLowerCase()) ||
    (s.vehicle && s.vehicle.toLowerCase().includes(search.toLowerCase())) ||
    (s.owner && s.owner.toLowerCase().includes(search.toLowerCase()))
  )

  const activeCount = stickers.filter(s => s.status === "active").length
  const inactiveCount = stickers.filter(s => s.status === "inactive").length
  const expiredCount = stickers.filter(s => s.status === "expired").length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">License / QR Stickers</h1>
          <p className="text-sm text-muted-foreground">Manage purchased licenses and QR stickers</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Order More
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">Order Additional Stickers</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-foreground">Quantity</Label>
                <Input type="number" min={1} placeholder="Number of stickers" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="rounded-lg bg-secondary/50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Price per sticker</span>
                  <span className="text-foreground font-medium">Rs. 299/year</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-foreground font-semibold">Estimated Total</span>
                  <span className="text-primary font-bold">Rs. 299</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="border-border text-foreground">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Proceed to Payment
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{stickers.length}</p>
            <p className="text-xs text-muted-foreground">Total Stickers</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{activeCount}</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">{inactiveCount}</p>
            <p className="text-xs text-muted-foreground">Inactive</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-400">{expiredCount}</p>
            <p className="text-xs text-muted-foreground">Expired</p>
          </CardContent>
        </Card>
      </div>

      {/* License Usage Bar */}
      <Card className="border-border bg-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">License Utilization</span>
            <span className="font-semibold text-primary">{activeCount}/{stickers.length} active</span>
          </div>
          <Progress value={(activeCount / stickers.length) * 100} className="h-2 bg-secondary [&>div]:bg-primary" />
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="border-border bg-card">
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by sticker ID, vehicle, owner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 bg-secondary border-border pl-10 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Select>
            <SelectTrigger className="h-10 w-[140px] bg-secondary border-border text-foreground">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-semibold">Sticker ID</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Purchase Date</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Expiry Date</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Status</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Assigned Vehicle</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Owner</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Validity</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStickers.map((s) => (
              <TableRow key={s.id} className="border-border hover:bg-secondary/50">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <QrCode className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">{s.id}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{s.purchaseDate}</TableCell>
                <TableCell className="text-muted-foreground">{s.expiryDate}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-xs font-semibold capitalize ${statusStyles[s.status]}`}>
                    {s.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {s.vehicle ? (
                    <div className="flex items-center gap-1">
                      <Car className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm text-foreground">{s.vehicle}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Unassigned</span>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{s.owner || "—"}</TableCell>
                <TableCell>
                  {s.daysLeft > 0 ? (
                    <span className={`text-xs font-medium ${s.daysLeft <= 30 ? "text-red-400" : s.daysLeft <= 90 ? "text-yellow-400" : "text-green-400"}`}>
                      {s.daysLeft} days left
                    </span>
                  ) : (
                    <span className="text-xs text-red-400">Expired</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border">
                      {s.status === "inactive" && (
                        <DropdownMenuItem className="text-foreground hover:bg-secondary cursor-pointer">
                          <Link2 className="mr-2 h-4 w-4" /> Assign to Vehicle
                        </DropdownMenuItem>
                      )}
                      {s.status === "active" && (
                        <DropdownMenuItem className="text-foreground hover:bg-secondary cursor-pointer">
                          <Unlink className="mr-2 h-4 w-4" /> Unassign
                        </DropdownMenuItem>
                      )}
                      {(s.status === "expired" || s.daysLeft <= 30) && (
                        <DropdownMenuItem className="text-primary hover:bg-primary/10 cursor-pointer">
                          <RotateCcw className="mr-2 h-4 w-4" /> Renew
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">Showing 1-{filteredStickers.length} of {filteredStickers.length} stickers</p>
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
