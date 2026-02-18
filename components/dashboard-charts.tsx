"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from "recharts"
import { Activity, PieChart as PieChartIcon } from "lucide-react"

const alertTrendData = [
  { month: "Aug", alerts: 65 },
  { month: "Sep", alerts: 89 },
  { month: "Oct", alerts: 102 },
  { month: "Nov", alerts: 78 },
  { month: "Dec", alerts: 95 },
  { month: "Jan", alerts: 120 },
  { month: "Feb", alerts: 145 },
]

const vehicleActivityData = [
  { day: "Mon", active: 180, scanned: 42 },
  { day: "Tue", active: 195, scanned: 56 },
  { day: "Wed", active: 210, scanned: 38 },
  { day: "Thu", active: 188, scanned: 61 },
  { day: "Fri", active: 220, scanned: 74 },
  { day: "Sat", active: 160, scanned: 32 },
  { day: "Sun", active: 140, scanned: 18 },
]

const alertTypeData = [
  { name: "Wrong Parking", value: 42, color: "#c8e600" },
  { name: "Damage", value: 18, color: "#f97316" },
  { name: "Theft Attempt", value: 8, color: "#ef4444" },
  { name: "Emergency", value: 12, color: "#eab308" },
  { name: "Other", value: 20, color: "#6b7280" },
]

const responseTimeData = [
  { month: "Aug", time: 18 },
  { month: "Sep", time: 15 },
  { month: "Oct", time: 12 },
  { month: "Nov", time: 14 },
  { month: "Dec", time: 10 },
  { month: "Jan", time: 8 },
  { month: "Feb", time: 6 },
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-xl">
        <p className="text-xs font-medium text-foreground">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Alert Trends */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Alert Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={alertTrendData}>
                <defs>
                  <linearGradient id="alertGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c8e600" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#c8e600" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="month" stroke="#555" fontSize={12} />
                <YAxis stroke="#555" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="alerts" stroke="#c8e600" fill="url(#alertGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Activity */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Vehicle Activity (This Week)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vehicleActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="day" stroke="#555" fontSize={12} />
                <YAxis stroke="#555" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="active" fill="#c8e600" radius={[4, 4, 0, 0]} name="Active" />
                <Bar dataKey="scanned" fill="#555" radius={[4, 4, 0, 0]} name="Scanned" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Alert Distribution */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <PieChartIcon className="h-5 w-5 text-primary" />
            Alert Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="h-[200px] w-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={alertTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {alertTypeData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2">
              {alertTypeData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                  <span className="ml-auto text-xs font-semibold text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Response Time */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Avg Response Time (min)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="month" stroke="#555" fontSize={12} />
                <YAxis stroke="#555" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="time" stroke="#c8e600" strokeWidth={2} dot={{ fill: "#c8e600", r: 4 }} name="Minutes" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
