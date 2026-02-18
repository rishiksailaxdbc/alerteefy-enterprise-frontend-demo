"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft, KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email")
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-10 flex flex-col items-center">
          <div className="relative mb-4 h-16 w-16">
            <Image src="/logo.png" alt="Alerteefy" fill className="object-contain rounded-full" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Alerteefy</h1>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">Enterprise Panel</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8">
          {step === "email" && (
            <>
              <div className="mb-6 flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Forgot Password?</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {"Enter your registered email and we'll send you a verification code."}
                </p>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium text-foreground">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="email" placeholder="admin@company.com" className="h-11 bg-secondary border-border pl-10 text-foreground placeholder:text-muted-foreground" />
                  </div>
                </div>
                <Button className="h-11 w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-[0_0_20px_rgba(200,230,0,0.2)]" onClick={() => setStep("otp")}>
                  Send OTP
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          )}

          {step === "otp" && (
            <>
              <div className="mb-6 flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <KeyRound className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Verify OTP</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enter the 6-digit code sent to your email and phone.
                </p>
              </div>
              <div className="flex flex-col items-center gap-5">
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="h-12 w-12 bg-secondary border-border text-foreground text-lg" />
                    <InputOTPSlot index={1} className="h-12 w-12 bg-secondary border-border text-foreground text-lg" />
                    <InputOTPSlot index={2} className="h-12 w-12 bg-secondary border-border text-foreground text-lg" />
                    <InputOTPSlot index={3} className="h-12 w-12 bg-secondary border-border text-foreground text-lg" />
                    <InputOTPSlot index={4} className="h-12 w-12 bg-secondary border-border text-foreground text-lg" />
                    <InputOTPSlot index={5} className="h-12 w-12 bg-secondary border-border text-foreground text-lg" />
                  </InputOTPGroup>
                </InputOTP>
                <p className="text-xs text-muted-foreground">
                  {"Didn't receive code?"}{" "}
                  <button className="text-primary font-medium hover:underline">Resend</button>
                </p>
                <Button className="h-11 w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-[0_0_20px_rgba(200,230,0,0.2)]" onClick={() => setStep("reset")}>
                  Verify
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          )}

          {step === "reset" && (
            <>
              <div className="mb-6 flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Reset Password</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enter your new password below.
                </p>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium text-foreground">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min 8 chars, alphanumeric + special"
                      className="h-11 bg-secondary border-border pl-10 pr-10 text-foreground placeholder:text-muted-foreground"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium text-foreground">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="password" placeholder="Re-enter new password" className="h-11 bg-secondary border-border pl-10 text-foreground placeholder:text-muted-foreground" />
                  </div>
                </div>
                <Link href="/">
                  <Button className="h-11 w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-[0_0_20px_rgba(200,230,0,0.2)]">
                    Reset Password
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
