"use client"

import { useState, useMemo } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FileText,
  Download,
  Search,
  Filter,
  Receipt,
} from "lucide-react"

interface Invoice {
  id: string
  invoiceNumber: string
  planName: string
  licenseQuantity: number
  amountPaid: number
  paymentDate: string
  status: "paid" | "failed" | "refunded"
}

const SAMPLE_INVOICES: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2026-0042",
    planName: "Enterprise Annual",
    licenseQuantity: 50,
    amountPaid: 124950,
    paymentDate: "2026-01-15",
    status: "paid",
  },
  {
    id: "2",
    invoiceNumber: "INV-2025-0038",
    planName: "Enterprise Annual",
    licenseQuantity: 50,
    amountPaid: 124950,
    paymentDate: "2025-01-15",
    status: "paid",
  },
  {
    id: "3",
    invoiceNumber: "INV-2025-0025",
    planName: "Enterprise Quarterly",
    licenseQuantity: 30,
    amountPaid: 37485,
    paymentDate: "2025-07-01",
    status: "paid",
  },
  {
    id: "4",
    invoiceNumber: "INV-2025-0018",
    planName: "Enterprise Monthly",
    licenseQuantity: 10,
    amountPaid: 24990,
    paymentDate: "2025-04-01",
    status: "refunded",
  },
  {
    id: "5",
    invoiceNumber: "INV-2024-0012",
    planName: "Enterprise Annual",
    licenseQuantity: 25,
    amountPaid: 62475,
    paymentDate: "2024-12-15",
    status: "paid",
  },
  {
    id: "6",
    invoiceNumber: "INV-2024-0009",
    planName: "Enterprise Monthly",
    licenseQuantity: 15,
    amountPaid: 0,
    paymentDate: "2024-09-01",
    status: "failed",
  },
]

function getStatusBadge(status: Invoice["status"]) {
  switch (status) {
    case "paid":
      return (
        <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/20">
          Paid
        </Badge>
      )
    case "failed":
      return (
        <Badge className="bg-red-500/15 text-red-400 border-red-500/20">
          Failed
        </Badge>
      )
    case "refunded":
      return (
        <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/20">
          Refunded
        </Badge>
      )
  }
}

export function InvoiceHistory() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredInvoices = useMemo(() => {
    return SAMPLE_INVOICES.filter((invoice) => {
      const matchesSearch =
        invoice.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
        invoice.planName.toLowerCase().includes(search.toLowerCase())
      const matchesStatus =
        statusFilter === "all" || invoice.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

  const handleDownload = (invoiceNumber: string) => {
    alert(`Downloading ${invoiceNumber}.pdf`)
  }

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Receipt className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Invoice History</CardTitle>
              <CardDescription>
                View and download your previous invoices
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-background/50 pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-44 bg-background/50">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Invoice Table */}
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                  Invoice
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                  Plan
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground text-center">
                  Licenses
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground text-right">
                  Amount
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                  Date
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground text-center">
                  Status
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-24 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="h-8 w-8 text-muted-foreground/50" />
                      <p className="text-sm">No invoices found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-mono text-sm font-medium text-foreground">
                          {invoice.invoiceNumber}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-foreground">
                        {invoice.planName}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm font-mono text-foreground">
                        {invoice.licenseQuantity}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-sm font-mono text-foreground">
                        {invoice.amountPaid > 0
                          ? `₹${invoice.amountPaid.toLocaleString("en-IN")}`
                          : "---"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {new Date(invoice.paymentDate).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(invoice.status)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        disabled={invoice.status !== "paid"}
                        onClick={() => handleDownload(invoice.invoiceNumber)}
                        title="Download Invoice"
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">
                          Download {invoice.invoiceNumber}
                        </span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Summary */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <span>
            Showing {filteredInvoices.length} of {SAMPLE_INVOICES.length}{" "}
            invoices
          </span>
          <span>
            Total Paid:{" "}
            <span className="font-mono text-foreground font-medium">
              {"₹"}
              {SAMPLE_INVOICES.filter((i) => i.status === "paid")
                .reduce((sum, i) => sum + i.amountPaid, 0)
                .toLocaleString("en-IN")}
            </span>
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
