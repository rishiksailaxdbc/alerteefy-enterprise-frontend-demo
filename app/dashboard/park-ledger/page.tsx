"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar, Clock, Car, User, Search, Download, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
}

function formatShort(date: Date) {
  return date.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })
}

function isToday(date: Date) {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const attendanceByDay: Record<string, Array<{
  id: string
  vehicle: string
  owner: string
  entryTime: string
  staff: string
  status: string
  zone: string
}>> = {
  "today": [
    { id: "ATT-001", vehicle: "KL 00 PD 8008", owner: "Rajesh Kumar", entryTime: "08:15 AM", staff: "Suresh M.", status: "Attended", zone: "A-12" },
    { id: "ATT-002", vehicle: "MH 12 AB 3456", owner: "Rajesh Kumar", entryTime: "08:42 AM", staff: "Suresh M.", status: "Attended", zone: "A-14" },
    { id: "ATT-003", vehicle: "DL 04 CD 7890", owner: "Priya Sharma", entryTime: "09:10 AM", staff: "Ramesh K.", status: "Attended", zone: "B-03" },
    { id: "ATT-004", vehicle: "TN 09 GH 5678", owner: "Vikram Singh", entryTime: "09:30 AM", staff: "Ramesh K.", status: "Attended", zone: "B-05" },
    { id: "ATT-005", vehicle: "GJ 05 ZZ 4444", owner: "Sneha Reddy", entryTime: "10:05 AM", staff: "Suresh M.", status: "Attended", zone: "C-01" },
    { id: "ATT-006", vehicle: "UP 32 AA 1111", owner: "Mohit Verma", entryTime: "10:22 AM", staff: "Dinesh P.", status: "Attended", zone: "C-08" },
    { id: "ATT-007", vehicle: "KA 01 EF 1234", owner: "Amit Patel", entryTime: "11:00 AM", staff: "Dinesh P.", status: "Attended", zone: "A-02" },
    { id: "ATT-008", vehicle: "MH 14 XY 9012", owner: "Amit Patel", entryTime: "11:45 AM", staff: "Suresh M.", status: "Attended", zone: "D-11" },
  ],
  "yesterday": [
    { id: "ATT-101", vehicle: "KL 00 PD 8008", owner: "Rajesh Kumar", entryTime: "08:30 AM", staff: "Suresh M.", status: "Attended", zone: "A-12" },
    { id: "ATT-102", vehicle: "DL 04 CD 7890", owner: "Priya Sharma", entryTime: "09:00 AM", staff: "Ramesh K.", status: "Attended", zone: "B-03" },
    { id: "ATT-103", vehicle: "GJ 05 ZZ 4444", owner: "Sneha Reddy", entryTime: "09:45 AM", staff: "Dinesh P.", status: "Attended", zone: "C-01" },
    { id: "ATT-104", vehicle: "TN 09 GH 5678", owner: "Vikram Singh", entryTime: "10:20 AM", staff: "Suresh M.", status: "Attended", zone: "B-05" },
    { id: "ATT-105", vehicle: "UP 32 AA 1111", owner: "Mohit Verma", entryTime: "11:10 AM", staff: "Ramesh K.", status: "Attended", zone: "C-08" },
  ],
  "day_before": [
    { id: "ATT-201", vehicle: "MH 12 AB 3456", owner: "Rajesh Kumar", entryTime: "08:10 AM", staff: "Suresh M.", status: "Attended", zone: "A-14" },
    { id: "ATT-202", vehicle: "KA 01 EF 1234", owner: "Amit Patel", entryTime: "09:30 AM", staff: "Dinesh P.", status: "Attended", zone: "A-02" },
    { id: "ATT-203", vehicle: "DL 04 CD 7890", owner: "Priya Sharma", entryTime: "10:00 AM", staff: "Ramesh K.", status: "Attended", zone: "B-03" },
  ],
}

export default function ParkLedgerPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [search, setSearch] = useState("")

  const goBack = () => {
    const prev = new Date(selectedDate)
    prev.setDate(prev.getDate() - 1)
    setSelectedDate(prev)
  }

  const goForward = () => {
    if (!isToday(selectedDate)) {
      const next = new Date(selectedDate)
      next.setDate(next.getDate() + 1)
      setSelectedDate(next)
    }
  }

  // Determine which data to show
  const today = new Date()
  const diffDays = Math.floor((today.getTime() - selectedDate.getTime()) / (1000 * 60 * 60 * 24))
  let currentData = diffDays === 0 ? attendanceByDay["today"] : diffDays === 1 ? attendanceByDay["yesterday"] : diffDays === 2 ? attendanceByDay["day_before"] : []

  const filteredData = currentData.filter(r =>
    r.vehicle.toLowerCase().includes(search.toLowerCase()) ||
    r.owner.toLowerCase().includes(search.toLowerCase()) ||
    r.staff.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Park Ledger</h1>
          <p className="text-sm text-muted-foreground">Vehicle attendance records - View only</p>
        </div>
        <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Date Navigation */}
      <Card className="border-border bg-card">
        <CardContent className="flex items-center justify-between p-4">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-border text-foreground hover:bg-secondary"
            onClick={goBack}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3 text-center">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-lg font-bold text-foreground">{formatDate(selectedDate)}</p>
              {isToday(selectedDate) && (
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs mt-1">Today</Badge>
              )}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-border text-foreground hover:bg-secondary"
            onClick={goForward}
            disabled={isToday(selectedDate)}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{currentData.length}</p>
            <p className="text-xs text-muted-foreground">Total Vehicles</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">
              {[...new Set(currentData.map(d => d.staff))].length}
            </p>
            <p className="text-xs text-muted-foreground">Staff Active</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-400">
              {currentData.length}
            </p>
            <p className="text-xs text-muted-foreground">Attended</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {[...new Set(currentData.map(d => d.zone.charAt(0)))].length}
            </p>
            <p className="text-xs text-muted-foreground">Zones Used</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-border bg-card">
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by vehicle no, owner, staff..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 bg-secondary border-border pl-10 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      {filteredData.length > 0 ? (
        <Card className="border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground font-semibold">#</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Vehicle No.</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Owner</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Entry Time</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Parking Staff</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Zone</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((record, index) => (
                <TableRow key={record.id} className="border-border hover:bg-secondary/50">
                  <TableCell className="text-muted-foreground text-sm">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-primary" />
                      <span className="font-medium text-foreground">{record.vehicle}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{record.owner}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {record.entryTime}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <User className="h-3 w-3" />
                      {record.staff}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-primary" />
                      <span className="text-sm text-foreground font-medium">{record.zone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs font-semibold">
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="border-t border-border px-4 py-3">
            <p className="text-xs text-muted-foreground">
              Showing {filteredData.length} vehicle{filteredData.length !== 1 ? "s" : ""} for {formatShort(selectedDate)}
            </p>
          </div>
        </Card>
      ) : (
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary mb-4">
              <Car className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">No vehicles attended on this date</h3>
            <p className="mt-1 text-sm text-muted-foreground">Try selecting a different date using the navigation arrows.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
