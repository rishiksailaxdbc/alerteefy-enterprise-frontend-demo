"use client"

import { useState } from "react"
import Link from "next/link"
import { VerificationStep } from "@/components/verification/verification-step"
import { CompanyDetailsStep } from "@/components/verification/company-details-step"
import { PaymentStep } from "@/components/verification/payment-step"
import { CheckCircle2, ShieldCheck, Building2, CreditCard, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Dispatch, SetStateAction } from "react"

type VerificationProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
}

const STEPS = [
  { id: 1, label: "Verification", icon: ShieldCheck },
  { id: 2, label: "Company Details", icon: Building2 },
  { id: 3, label: "Payment", icon: CreditCard },
]

function Verification({ setOpen }: VerificationProps) {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div className="min-h-screen bg-[#242322]">
      {/* Header */}
      {/* <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">A</span>
              </div>
              <span className="text-lg font-bold text-foreground">Alerteefy</span>
            </Link>
            <span className="text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">Account Setup</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/subscription">
                Manage Subscription
              </Link>
            </Button>
          </div>
        </div>
      </header> */}

      <main className="mx-auto max-w-3xl px-6 py-8">
        {/* Back Link */}
        {/* <Button variant="ghost" size="sm" className="mb-6 text-muted-foreground" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button> */}

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground text-balance">
            Account Verification & Payment
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Complete verification, provide company details, and subscribe to get started.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              return (
                <div key={step.id} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                        isCompleted
                          ? "border-primary bg-primary"
                          : isActive
                          ? "border-primary bg-primary/10"
                          : "border-border bg-muted/30"
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                      ) : (
                        <Icon
                          className={cn(
                            "h-5 w-5",
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground"
                          )}
                        />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-xs font-medium",
                        isActive
                          ? "text-primary"
                          : isCompleted
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={cn(
                        "mx-4 mt-[-1.5rem] h-0.5 flex-1 rounded-full transition-all",
                        currentStep > step.id
                          ? "bg-primary"
                          : "bg-border"
                      )}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <VerificationStep onComplete={() => setCurrentStep(2)} />
        )}
        {currentStep === 2 && (
          <CompanyDetailsStep
            onComplete={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )}
        {currentStep === 3 && (
          <PaymentStep onBack={() => setCurrentStep(2)}  setOpen={setOpen}/>
        )}
      </main>
    </div>
  )
}

export default Verification;