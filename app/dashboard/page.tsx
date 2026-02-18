"use client"

import { Car, Users, QrCode, Bell, AlertTriangle, CheckCircle2, Clock, TrendingUp, ArrowUpRight, BarChart3, Shield, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { DashboardCharts } from "@/components/dashboard-charts"

const stats = [
  {
    title: "Total Vehicles",
    value: "248",
    change: "+12 this month",
    icon: Car,
    trend: "up",
  },
  {
    title: "Active Users",
    value: "42",
    change: "+3 this week",
    icon: Users,
    trend: "up",
  },
  {
    title: "Active Licenses",
    value: "186",
    change: "62 remaining",
    icon: QrCode,
    trend: "neutral",
  },
  {
    title: "Total Alerts",
    value: "1,247",
    change: "23 pending",
    icon: Bell,
    trend: "up",
  },
]

const recentAlerts = [
  { id: "ALT-001", vehicle: "KL 00 PD 8008", type: "Wrong Parking", severity: "high", time: "5 min ago", status: "pending" },
  { id: "ALT-002", vehicle: "MH 12 AB 3456", type: "Damage Report", severity: "high", time: "12 min ago", status: "pending" },
  { id: "ALT-003", vehicle: "DL 04 CD 7890", type: "Theft Attempt", severity: "urgent", time: "25 min ago", status: "resolved" },
  { id: "ALT-004", vehicle: "KA 01 EF 1234", type: "Emergency Contact", severity: "medium", time: "1 hr ago", status: "resolved" },
  { id: "ALT-005", vehicle: "TN 09 GH 5678", type: "Wrong Parking", severity: "low", time: "2 hrs ago", status: "resolved" },
]

const recentActivities = [
  { action: "Vehicle registered", detail: "MH 14 XY 9012 added by Rajesh Kumar", time: "10 min ago" },
  { action: "Alert resolved", detail: "Wrong parking alert for KL 00 PD 8008", time: "15 min ago" },
  { action: "QR sticker assigned", detail: "Sticker #QR-0248 to TN 09 GH 5678", time: "30 min ago" },
  { action: "New user added", detail: "Priya Sharma (Fleet Manager)", time: "1 hr ago" },
  { action: "License renewed", detail: "5 licenses renewed for Q2 2026", time: "2 hrs ago" },
]

const severityColors: Record<string, string> = {
  urgent: "bg-red-500/10 text-red-400 border-red-500/20",
  high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  low: "bg-green-500/10 text-green-400 border-green-500/20",
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border bg-card">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
              {stat.trend === "up" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Link href="/dashboard/users/add">
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> Add User
          </Button>
        </Link>
        <Link href="/dashboard/vehicles">
          <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-secondary">
            <Car className="mr-2 h-4 w-4" /> Register Vehicle
          </Button>
        </Link>
        <Link href="/dashboard/licenses">
          <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-secondary">
            <QrCode className="mr-2 h-4 w-4" /> Generate Stickers
          </Button>
        </Link>
        <Link href="/dashboard/park-ledger">
          <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-secondary">
            <BarChart3 className="mr-2 h-4 w-4" /> Park Ledger
          </Button>
        </Link>
      </div>

      {/* Charts */}
      <DashboardCharts />

      {/* License Usage */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            License Usage
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">186 of 248 licenses used</span>
            <span className="font-semibold text-primary">75%</span>
          </div>
          <Progress value={75} className="h-2 bg-secondary [&>div]:bg-primary" />
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-secondary p-3 text-center">
              <p className="text-xl font-bold text-foreground">186</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
            <div className="rounded-lg bg-secondary p-3 text-center">
              <p className="text-xl font-bold text-foreground">47</p>
              <p className="text-xs text-muted-foreground">Inactive</p>
            </div>
            <div className="rounded-lg bg-secondary p-3 text-center">
              <p className="text-xl font-bold text-foreground">15</p>
              <p className="text-xs text-muted-foreground">Expired</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Alerts */}
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Recent Alerts
            </CardTitle>
            <Link href="/dashboard/licenses">
              <Button variant="ghost" size="sm" className="text-xs text-primary hover:bg-primary/10">
                View all <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
                  <Badge variant="outline" className={`text-[10px] font-semibold uppercase ${severityColors[alert.severity]}`}>
                    {alert.severity}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{alert.type}</p>
                    <p className="text-xs text-muted-foreground">{alert.vehicle}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                    {alert.status === "resolved" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                    ) : (
                      <Clock className="h-4 w-4 text-yellow-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg bg-secondary/50 p-3">
                  <div className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.detail}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            System Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 rounded-lg bg-primary/5 border border-primary/10 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Bell className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">15 licenses expiring this month</p>
                <p className="text-xs text-muted-foreground">Renew before March 1, 2026 to avoid service interruption.</p>
              </div>
              <Link href="/dashboard/licenses">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Renew</Button>
              </Link>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">System update v2.4 deployed</p>
                <p className="text-xs text-muted-foreground">New features: Bulk vehicle import, improved analytics.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
