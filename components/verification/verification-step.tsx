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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  CheckCircle2,
  Send,
  ShieldCheck,
  Loader2,
} from "lucide-react"

interface VerificationStepProps {
  onComplete: () => void
}

export function VerificationStep({ onComplete }: VerificationStepProps) {
  const [emailOtpSent, setEmailOtpSent] = useState(false)
  const [phoneOtpSent, setPhoneOtpSent] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [emailOtp, setEmailOtp] = useState("")
  const [phoneOtp, setPhoneOtp] = useState("")
  const [sendingEmail, setSendingEmail] = useState(false)
  const [sendingPhone, setSendingPhone] = useState(false)
  const [verifyingEmail, setVerifyingEmail] = useState(false)
  const [verifyingPhone, setVerifyingPhone] = useState(false)

  const handleSendEmailOtp = useCallback(async () => {
    setSendingEmail(true)
    await new Promise((r) => setTimeout(r, 1500))
    setEmailOtpSent(true)
    setSendingEmail(false)
  }, [])

  const handleSendPhoneOtp = useCallback(async () => {
    setSendingPhone(true)
    await new Promise((r) => setTimeout(r, 1500))
    setPhoneOtpSent(true)
    setSendingPhone(false)
  }, [])

  const handleVerifyEmail = useCallback(async () => {
    setVerifyingEmail(true)
    await new Promise((r) => setTimeout(r, 1200))
    setEmailVerified(true)
    setVerifyingEmail(false)
  }, [])

  const handleVerifyPhone = useCallback(async () => {
    setVerifyingPhone(true)
    await new Promise((r) => setTimeout(r, 1200))
    setPhoneVerified(true)
    setVerifyingPhone(false)
  }, [])

  const bothVerified = emailVerified && phoneVerified

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">
                Identity Verification
              </CardTitle>
              <CardDescription>
                Verify your email and phone number to proceed
              </CardDescription>
            </div>
          </div>
          {bothVerified && (
            <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/20">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Verified
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email Verification */}
        <div className="rounded-lg border border-border/50 bg-muted/30 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-4 w-4 text-primary" />
            <Label className="text-sm font-semibold text-foreground">
              Email Verification
            </Label>
            {emailVerified && (
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            )}
          </div>
          <div className="space-y-3">
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <Label
                  htmlFor="email"
                  className="text-xs text-muted-foreground mb-1.5"
                >
                  Registered Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@company.com"
                  defaultValue="admin@alerteefy.com"
                  readOnly
                  className="bg-background/50"
                />
              </div>
              <Button
                onClick={handleSendEmailOtp}
                disabled={emailOtpSent || sendingEmail || emailVerified}
                size="default"
                variant={emailOtpSent ? "secondary" : "default"}
                className={
                  emailOtpSent
                    ? ""
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }
              >
                {sendingEmail ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {emailOtpSent ? "Sent" : "Send OTP"}
              </Button>
            </div>

            {emailOtpSent && !emailVerified && (
              <div className="flex gap-3 items-end pt-2">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5">
                    Enter OTP
                  </Label>
                  <InputOTP
                    maxLength={6}
                    value={emailOtp}
                    onChange={setEmailOtp}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <Button
                  onClick={handleVerifyEmail}
                  disabled={emailOtp.length < 6 || verifyingEmail}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {verifyingEmail ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  Verify
                </Button>
              </div>
            )}

            {emailVerified && (
              <p className="text-xs text-emerald-400 flex items-center gap-1 pt-1">
                <CheckCircle2 className="h-3 w-3" />
                Email verified successfully
              </p>
            )}
          </div>
        </div>

        {/* Phone Verification */}
        <div className="rounded-lg border border-border/50 bg-muted/30 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Phone className="h-4 w-4 text-primary" />
            <Label className="text-sm font-semibold text-foreground">
              Phone Verification
            </Label>
            {phoneVerified && (
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            )}
          </div>
          <div className="space-y-3">
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <Label
                  htmlFor="phone"
                  className="text-xs text-muted-foreground mb-1.5"
                >
                  Registered Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXXXXXXXX"
                  defaultValue="+91 98765 43210"
                  readOnly
                  className="bg-background/50"
                />
              </div>
              <Button
                onClick={handleSendPhoneOtp}
                disabled={phoneOtpSent || sendingPhone || phoneVerified}
                size="default"
                variant={phoneOtpSent ? "secondary" : "default"}
                className={
                  phoneOtpSent
                    ? ""
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }
              >
                {sendingPhone ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {phoneOtpSent ? "Sent" : "Send OTP"}
              </Button>
            </div>

            {phoneOtpSent && !phoneVerified && (
              <div className="flex gap-3 items-end pt-2">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5">
                    Enter OTP
                  </Label>
                  <InputOTP
                    maxLength={6}
                    value={phoneOtp}
                    onChange={setPhoneOtp}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <Button
                  onClick={handleVerifyPhone}
                  disabled={phoneOtp.length < 6 || verifyingPhone}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {verifyingPhone ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  Verify
                </Button>
              </div>
            )}

            {phoneVerified && (
              <p className="text-xs text-emerald-400 flex items-center gap-1 pt-1">
                <CheckCircle2 className="h-3 w-3" />
                Phone number verified successfully
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={onComplete}
            // disabled={!bothVerified}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          >
            Continue to Company Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
