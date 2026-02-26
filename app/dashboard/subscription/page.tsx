"use client"

import Link from "next/link"
import { SubscriptionOverview } from "@/components/subscription/subscription-overview"
import { InvoiceHistory } from "@/components/subscription/invoice-history"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

const MOCK_SUBSCRIPTION = {
  planName: "Enterprise Annual",
  totalLicenses: 248,
  activeLicenses: 186,
  startDate: "15 Jan 2026",
  expiryDate: "14 Jan 2027",
  status: "active" as const,
  daysRemaining: 322,
}

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">A</span>
              </div>
              <span className="text-lg font-bold text-foreground">Alerteefy</span>
            </Link>
            <span className="text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">Subscription</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/verification">
                Account Verification
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        {/* Back Link */}
        <Button variant="ghost" size="sm" className="mb-6 text-muted-foreground" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground text-balance">
            Manage Subscription
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View your active plan, manage licenses, and access invoice history.
          </p>
        </div>

        <div className="space-y-6">
          <SubscriptionOverview subscription={MOCK_SUBSCRIPTION} />
          <InvoiceHistory />
        </div>
      </main>
    </div>
  )
}
