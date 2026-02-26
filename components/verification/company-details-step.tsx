"use client"

import { useState, useCallback } from "react"
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
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  CheckCircle2,
  Upload,
  FileText,
  Loader2,
  X,
} from "lucide-react"

interface CompanyDetailsStepProps {
  onComplete: () => void
  onBack: () => void
}

export function CompanyDetailsStep({
  onComplete,
  onBack,
}: CompanyDetailsStepProps) {
  const [companyName, setCompanyName] = useState("")
  const [panNumber, setPanNumber] = useState("")
  const [gstNumber, setGstNumber] = useState("")
  const [companyAddress, setCompanyAddress] = useState("")
  const [certificateFile, setCertificateFile] = useState<string | null>(null)

  const [panVerified, setPanVerified] = useState(false)
  const [gstVerified, setGstVerified] = useState(false)
  const [verifyingPan, setVerifyingPan] = useState(false)
  const [verifyingGst, setVerifyingGst] = useState(false)

  const handleVerifyPan = useCallback(async () => {
    setVerifyingPan(true)
    await new Promise((r) => setTimeout(r, 1500))
    setPanVerified(true)
    setVerifyingPan(false)
  }, [])

  const handleVerifyGst = useCallback(async () => {
    setVerifyingGst(true)
    await new Promise((r) => setTimeout(r, 1500))
    setGstVerified(true)
    setVerifyingGst(false)
  }, [])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        setCertificateFile(file.name)
      }
    },
    []
  )

  const panValid = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(panNumber.toUpperCase())
  const gstValid = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]{3}$/.test(
    gstNumber.toUpperCase()
  )

  const allComplete =
    companyName.trim() !== "" &&
    panVerified &&
    gstVerified &&
    companyAddress.trim() !== "" &&
    certificateFile !== null

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Company Details</CardTitle>
              <CardDescription>
                Provide your company information for compliance and billing
              </CardDescription>
            </div>
          </div>
          {allComplete && (
            <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/20">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Complete
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Company Name */}
        <div className="space-y-1.5">
          <Label htmlFor="companyName" className="text-sm">
            Company Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="companyName"
            placeholder="Enter registered legal company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="bg-background/50"
          />
        </div>

        {/* PAN Number */}
        <div className="space-y-1.5">
          <Label htmlFor="pan" className="text-sm">
            PAN Number <span className="text-destructive">*</span>
          </Label>
          <div className="flex gap-3">
            <Input
              id="pan"
              placeholder="ABCDE1234F"
              value={panNumber}
              onChange={(e) => {
                setPanNumber(e.target.value.toUpperCase())
                setPanVerified(false)
              }}
              maxLength={10}
              className="bg-background/50 flex-1 font-mono uppercase"
            />
            <Button
              onClick={handleVerifyPan}
              disabled={!panValid || panVerified || verifyingPan}
              variant={panVerified ? "secondary" : "default"}
              className={
                panVerified
                  ? ""
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }
            >
              {verifyingPan ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : panVerified ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              ) : null}
              {panVerified ? "Verified" : "Verify"}
            </Button>
          </div>
          {panNumber && !panValid && (
            <p className="text-xs text-muted-foreground">
              Format: 5 letters + 4 digits + 1 letter (e.g., ABCDE1234F)
            </p>
          )}
          {panVerified && (
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              PAN verified successfully
            </p>
          )}
        </div>

        {/* GST Number */}
        <div className="space-y-1.5">
          <Label htmlFor="gst" className="text-sm">
            GST Number <span className="text-destructive">*</span>
          </Label>
          <div className="flex gap-3">
            <Input
              id="gst"
              placeholder="22ABCDE1234F1Z5"
              value={gstNumber}
              onChange={(e) => {
                setGstNumber(e.target.value.toUpperCase())
                setGstVerified(false)
              }}
              maxLength={15}
              className="bg-background/50 flex-1 font-mono uppercase"
            />
            <Button
              onClick={handleVerifyGst}
              disabled={!gstValid || gstVerified || verifyingGst}
              variant={gstVerified ? "secondary" : "default"}
              className={
                gstVerified
                  ? ""
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }
            >
              {verifyingGst ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : gstVerified ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              ) : null}
              {gstVerified ? "Verified" : "Verify"}
            </Button>
          </div>
          {gstNumber && !gstValid && (
            <p className="text-xs text-muted-foreground">
              Format: 2 digits + 5 letters + 4 digits + 1 letter + 3
              alphanumeric
            </p>
          )}
          {gstVerified && (
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              GST verified successfully
            </p>
          )}
        </div>

        {/* Company Address */}
        <div className="space-y-1.5">
          <Label htmlFor="address" className="text-sm">
            Company Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="address"
            placeholder="Enter registered company address"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            className="bg-background/50"
          />
        </div>

        {/* Incorporation Certificate Upload */}
        <div className="space-y-1.5">
          <Label className="text-sm">
            Incorporation Certificate <span className="text-destructive">*</span>
          </Label>
          {!certificateFile ? (
            <label
              htmlFor="certificate-upload"
              className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border/70 bg-background/30 p-6 transition-colors hover:border-primary/50 hover:bg-muted/50"
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm text-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, JPEG, or PNG (max 10MB)
                </p>
              </div>
              <input
                id="certificate-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="flex items-center justify-between rounded-lg border border-border/50 bg-background/30 p-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-sm text-foreground">
                  {certificateFile}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setCertificateFile(null)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button
            onClick={onComplete}
            // disabled={!allComplete}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          >
            Continue to Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
