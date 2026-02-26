"use client"

import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react"
import Link from "next/link"
import { VerificationStep } from "@/components/verification/verification-step"
import { CompanyDetailsStep } from "@/components/verification/company-details-step"
import { PaymentStep } from "@/components/verification/payment-step"
import { CheckCircle2, ShieldCheck, Building2, CreditCard, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
  // 1. Create a reference for the top element
  const topRef = useRef<HTMLDivElement>(null)

  // 2. Trigger scroll whenever currentStep changes
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [currentStep])

  return (
    <div className="min-h-screen bg-[#242322]">
      {/* Header commented out... */}

      <main className="mx-auto max-w-3xl px-6 py-8" ref={topRef}>
        {/* Back Link commented out... */}

        {/* 3. Attach the ref to the title container */}
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
          <PaymentStep onBack={() => setCurrentStep(2)} setOpen={setOpen} />
        )}
      </main>
    </div>
  )
}

export default Verification;