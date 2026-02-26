"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Crown,
  CalendarDays,
  Key,
  AlertTriangle,
  ArrowUpRight,
  RefreshCw,
  Clock,
  Shield,
} from "lucide-react"
import Link from "next/link"

interface SubscriptionData {
  planName: string
  totalLicenses: number
  activeLicenses: number
  startDate: string
  expiryDate: string
  status: "active" | "expired" | "suspended"
  daysRemaining: number
}

interface SubscriptionOverviewProps {
  subscription: SubscriptionData
}

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
    case "expired":
      return "bg-red-500/15 text-red-400 border-red-500/20"
    case "suspended":
      return "bg-amber-500/15 text-amber-400 border-amber-500/20"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function SubscriptionOverview({
  subscription,
}: SubscriptionOverviewProps) {
  const licenseUsage = Math.round(
    (subscription.activeLicenses / subscription.totalLicenses) * 100
  )
  const isExpiringSoon =
    subscription.status === "active" && subscription.daysRemaining <= 7
  const isExpired = subscription.status === "expired"

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Crown className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Subscription Overview</CardTitle>
              <CardDescription>
                Your current plan details and license usage
              </CardDescription>
            </div>
          </div>
          <Badge className={getStatusColor(subscription.status)}>
            {subscription.status.charAt(0).toUpperCase() +
              subscription.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Warning banners */}
        {isExpiringSoon && (
          <div className="flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <div>
              <p className="text-sm font-medium text-amber-400">
                Subscription Expiring Soon
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Your plan expires in {subscription.daysRemaining} days. Renew
                now to avoid service interruption.
              </p>
            </div>
            <Button
              size="sm"
              className="ml-auto shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <Link href="/verification">
                <RefreshCw className="h-3 w-3" />
                Renew
              </Link>
            </Button>
          </div>
        )}

        {isExpired && (
          <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
            <div>
              <p className="text-sm font-medium text-red-400">
                Subscription Expired
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Your plan has expired. Renew to restore access to all features.
              </p>
            </div>
            <Button
              size="sm"
              className="ml-auto shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <Link href="/verification">
                <RefreshCw className="h-3 w-3" />
                Renew Now
              </Link>
            </Button>
          </div>
        )}

        {/* Plan Info Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">
                Current Plan
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {subscription.planName}
            </p>
          </div>
          <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Key className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">
                Total Licenses
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {subscription.totalLicenses}
            </p>
          </div>
          <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Start Date</span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {subscription.startDate}
            </p>
          </div>
          <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Expiry Date</span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {subscription.expiryDate}
            </p>
          </div>
        </div>

        {/* License Usage */}
        <div className="rounded-lg border border-border/50 bg-muted/30 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                License Usage
              </span>
            </div>
            <span className="text-sm font-mono text-muted-foreground">
              {subscription.activeLicenses} / {subscription.totalLicenses}
            </span>
          </div>
          <Progress value={licenseUsage} className="h-2.5" />
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{subscription.activeLicenses} Active</span>
            <span>
              {subscription.totalLicenses - subscription.activeLicenses}{" "}
              Available
            </span>
          </div>
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          {(isExpired || isExpiringSoon) && (
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <Link href="/verification">
                <RefreshCw className="h-4 w-4" />
                Renew Subscription
              </Link>
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link href="/verification">
              <ArrowUpRight className="h-4 w-4" />
              Upgrade Plan
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
