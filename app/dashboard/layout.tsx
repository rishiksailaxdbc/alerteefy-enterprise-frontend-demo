"use client"

import { AppSidebar, TopBar } from "@/components/app-sidebar"
import SetUp from "@/components/setUp"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()

  const [open, setOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)

  useEffect(() => {
    if (
      pathname !== "/dashboard" && // not dashboard
      !hasOpened                  // not already opened
    ) {
      setOpen(true)
      setHasOpened(true)
    }
  }, [pathname, hasOpened])

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      <SetUp open={open} setOpen={setOpen} />
    </div>
  )
}