"use client"

import { useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  CreditCard,
  Tag,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Minus,
  Plus,
  Receipt,
} from "lucide-react"

import { Dispatch, SetStateAction } from "react"


interface PaymentStepProps {
  onBack: () => void
  setOpen: Dispatch<SetStateAction<boolean>>
}

const PRICE_PER_LICENSE = 2499



export function PaymentStep({ onBack, setOpen }: PaymentStepProps) {
  const [licenseCount, setLicenseCount] = useState(3)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [applyingPromo, setApplyingPromo] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [planType, setPlanType] = useState("annual")
  const router = useRouter();


  const discount = promoApplied ? 0.1 : 0
  const netPrice = PRICE_PER_LICENSE
  const grossPrice = useMemo(
    () => netPrice * licenseCount,
    [netPrice, licenseCount]
  )
  const discountAmount = useMemo(
    () => grossPrice * discount,
    [grossPrice, discount]
  )
  const totalPayable = useMemo(
    () => grossPrice - discountAmount,
    [grossPrice, discountAmount]
  )
  const gst = useMemo(() => totalPayable * 0.18, [totalPayable])
  const grandTotal = useMemo(() => totalPayable + gst, [totalPayable, gst])

  const handleApplyPromo = useCallback(async () => {
    setApplyingPromo(true)
    await new Promise((r) => setTimeout(r, 1200))
    setPromoApplied(true)
    setApplyingPromo(false)
  }, [])

  const handleCheckout = useCallback(async () => {
    setProcessing(true)
    await new Promise((r) => setTimeout(r, 2500))
    setProcessing(false)
    alert("Payment processed successfully! Invoice has been generated.")
    setOpen(false);
    router.push("/dashboard");


  }, [])

  const incrementLicense = useCallback(() => {
    setLicenseCount((prev) => prev + 1)
  }, [])

  const decrementLicense = useCallback(() => {
    setLicenseCount((prev) => Math.max(3, prev - 1))
  }, [])

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Payment & Checkout</CardTitle>
            <CardDescription>
              Select licenses, review pricing, and proceed to payment
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Plan Selection */}
        <div className="space-y-1.5">
          <Label className="text-sm">Subscription Plan</Label>
          <Select value={planType} onValueChange={setPlanType}>
            <SelectTrigger className="w-full bg-background/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly Plan</SelectItem>
              <SelectItem value="quarterly">Quarterly Plan</SelectItem>
              <SelectItem value="annual">
                Annual Plan (Save 20%)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* License Count */}
        <div className="space-y-1.5">
          <Label className="text-sm">
            Number of Licenses{" "}
            <span className="text-muted-foreground">(Minimum 3)</span>
          </Label>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={decrementLicense}
              disabled={licenseCount <= 3}
            >
              <Minus className="h-4 w-4" />
              <span className="sr-only">Decrease licenses</span>
            </Button>
            <div className="flex h-10 w-20 items-center justify-center rounded-md border border-border bg-background/50 font-mono text-lg font-semibold text-foreground">
              {licenseCount}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={incrementLicense}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Increase licenses</span>
            </Button>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="rounded-lg border border-border/50 bg-muted/30 p-5 space-y-3">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Receipt className="h-4 w-4 text-primary" />
            Price Summary
          </h4>
          <Separator />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Net Price (per license)
              </span>
              <span className="font-mono text-foreground">
                {"₹"}{netPrice.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quantity</span>
              <span className="font-mono text-foreground">
                {licenseCount}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gross Price</span>
              <span className="font-mono text-foreground">
                {"₹"}{grossPrice.toLocaleString("en-IN")}
              </span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-emerald-400">
                <span className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  Promo Discount (10%)
                </span>
                <span className="font-mono">
                  {"-₹"}{discountAmount.toLocaleString("en-IN")}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">GST (18%)</span>
              <span className="font-mono text-foreground">
                {"₹"}{gst.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-semibold">
              <span className="text-foreground">Total Payable</span>
              <span className="font-mono text-primary">
                {"₹"}{grandTotal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>

        {/* Promo Code */}
        <div className="space-y-1.5">
          <Label className="text-sm">Promo Code (Optional)</Label>
          <div className="flex gap-3">
            <Input
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => {
                setPromoCode(e.target.value.toUpperCase())
                setPromoApplied(false)
              }}
              className="bg-background/50 flex-1 font-mono uppercase"
            />
            <Button
              onClick={handleApplyPromo}
              disabled={
                promoCode.trim() === "" || promoApplied || applyingPromo
              }
              variant={promoApplied ? "secondary" : "outline"}
            >
              {applyingPromo ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : promoApplied ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              ) : (
                <Tag className="h-4 w-4" />
              )}
              {promoApplied ? "Applied" : "Apply"}
            </Button>
          </div>
          {promoApplied && (
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Promo code applied - 10% discount
            </p>
          )}
        </div>

        {/* Security Badge */}
        <div className="flex items-center gap-2 rounded-lg bg-primary/5 border border-primary/10 p-3">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs font-medium text-foreground">
              Secure Payment
            </p>
            <p className="text-xs text-muted-foreground">
              256-bit SSL encryption. Your payment info is safe.
            </p>
          </div>
          <Badge variant="outline" className="ml-auto text-xs border-primary/20 text-primary">
            PCI DSS
          </Badge>
        </div>

        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button
            onClick={handleCheckout}
            disabled={processing}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          >
            {processing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4" />
                Checkout - {"₹"}{grandTotal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
