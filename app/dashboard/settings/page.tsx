"use client"

import { useState } from "react"
import Link from "next/link"
import {
  HelpCircle,
  Info,
  Headphones,
  MessageSquare,
  ClipboardList,
  FileQuestion,
  FileText,
  ShieldCheck,
  Bell,
  Globe,
  Moon,
  ChevronRight,
  Star,
  Send,
  CheckCircle2,
  Search,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const settingsMenu = [
  { id: "preferences", label: "Preferences", icon: Moon },
  { id: "help", label: "Help", icon: HelpCircle },
  { id: "about", label: "About Us", icon: Info },
  { id: "support", label: "Customer Support", icon: Headphones },
  { id: "feedback", label: "Feedback", icon: MessageSquare },
  { id: "survey", label: "Survey Form", icon: ClipboardList },
  { id: "faq", label: "FAQs", icon: FileQuestion },
  { id: "terms", label: "Terms & Conditions", icon: FileText },
  { id: "privacy", label: "Privacy Policy", icon: ShieldCheck },
]

const helpTopics = [
  { title: "User Management", desc: "Learn how to add, edit, and manage users in your enterprise.", articles: 8 },
  { title: "Vehicle Management", desc: "How to register, edit, and remove vehicles from your fleet.", articles: 6 },
  { title: "QR Stickers & Licenses", desc: "Managing QR stickers, assigning to vehicles, renewing licenses.", articles: 10 },
  { title: "Billing & Payments", desc: "Understanding invoices, payment history, and license pricing.", articles: 5 },
  { title: "Park Ledger", desc: "How parking attendance works and viewing daily records.", articles: 4 },
  { title: "Security & Privacy", desc: "Account security, data handling, and privacy settings.", articles: 7 },
]

const faqData = [
  {
    category: "Account",
    questions: [
      { q: "How do I register my enterprise on Alerteefy?", a: "Navigate to the registration page and follow the 3-step process: Account Info, Company Info, and Verification. You need a minimum of 3 licenses to register." },
      { q: "How do I change my enterprise email?", a: "Go to Enterprise Profile, update the email field, and verify the new email address via the OTP sent." },
      { q: "What happens if I forget my password?", a: "Click 'Forgot Password' on the login page, enter your registered email, verify via OTP, and set a new password." },
    ]
  },
  {
    category: "Vehicles",
    questions: [
      { q: "How do I add a vehicle to the system?", a: "Go to the Vehicles page, click 'Add Vehicle', fill in the required details (vehicle number, type, brand, model, registration date, owner), and submit." },
      { q: "Can I assign a QR sticker to a vehicle?", a: "Yes. Go to the License/QR page, find an inactive sticker, and use the 'Assign to Vehicle' option from the actions menu." },
      { q: "How do I remove a vehicle?", a: "From the Vehicles table, click the actions menu on the vehicle row and select 'Remove Vehicle'. Confirm the deletion." },
    ]
  },
  {
    category: "Billing",
    questions: [
      { q: "How much does a license cost?", a: "Each license/QR sticker costs Rs. 299 per year. A minimum of 3 licenses is required for enterprise registration." },
      { q: "How do I order more stickers?", a: "Go to the License/QR page and click 'Order More'. Select the quantity and proceed to payment." },
      { q: "What payment methods are supported?", a: "We support UPI, credit/debit cards, net banking, and wallets through our Razorpay integration." },
    ]
  },
  {
    category: "Stickers",
    questions: [
      { q: "What happens when a sticker expires?", a: "Expired stickers stop working. You can renew them from the License/QR page before or after expiry." },
      { q: "Can I unassign a sticker from a vehicle?", a: "Yes. Go to the License/QR page, find the active sticker, and select 'Unassign' from the actions menu." },
    ]
  },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("preferences")
  const [feedbackRating, setFeedbackRating] = useState(0)
  const [surveyRating, setSurveyRating] = useState(0)
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [supportSent, setSupportSent] = useState(false)
  const [surveySent, setSurveySent] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage preferences, get help, and access resources</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar menu */}
        <Card className="border-border bg-card lg:col-span-1 h-fit">
          <CardContent className="p-2">
            <nav className="flex flex-col gap-1">
              {settingsMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveSection(item.id); setFeedbackSent(false); setSupportSent(false); setSurveySent(false) }}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all text-left ${
                    activeSection === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Content area */}
        <div className="lg:col-span-3">
          {/* Preferences */}
          {activeSection === "preferences" && (
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Moon className="h-5 w-5 text-primary" />
                  Application Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Push Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive push notifications for alerts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive email alerts for critical events</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">SMS Notifications</p>
                    <p className="text-xs text-muted-foreground">Get SMS for high-priority alerts</p>
                  </div>
                  <Switch />
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Language</p>
                    <p className="text-xs text-muted-foreground">Interface language</p>
                  </div>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-[160px] bg-secondary border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                      <SelectItem value="te">Telugu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Dark Mode</p>
                    <p className="text-xs text-muted-foreground">Always enabled for Alerteefy</p>
                  </div>
                  <Switch defaultChecked disabled />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Help */}
          {activeSection === "help" && (
            <div className="flex flex-col gap-4">
              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search help articles..." className="h-10 bg-secondary border-border pl-10 text-foreground placeholder:text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {helpTopics.map((topic) => (
                  <Card key={topic.title} className="border-border bg-card hover:border-primary/30 transition-colors cursor-pointer">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-foreground">{topic.title}</h3>
                          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{topic.desc}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      </div>
                      <p className="mt-3 text-xs text-primary font-medium">{topic.articles} articles</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* About Us */}
          {activeSection === "about" && (
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  About Alerteefy
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Company Overview</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Alerteefy is a digital sticker-based solution that enables individuals to contact vehicle owners by scanning a unique QR code displayed on the vehicle. The system facilitates secure, privacy-protected communication without revealing the owner&apos;s personal contact details.
                  </p>
                </div>
                <Separator className="bg-border" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Our Mission</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    To provide enterprises with a smart, secure, and scalable vehicle management solution that protects privacy while enabling instant communication.
                  </p>
                </div>
                <Separator className="bg-border" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Our Vision</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    To become the leading digital vehicle identification and alert platform for enterprises globally, enabling smart fleet management through innovative QR-based technology.
                  </p>
                </div>
                <Separator className="bg-border" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Contact</h3>
                  <div className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
                    <p>Email: support@alerteefy.com</p>
                    <p>Phone: +91 1800-ALERT-00</p>
                    <p>Website: www.alerteefy.com</p>
                  </div>
                </div>
                <div className="rounded-lg bg-secondary p-3 text-center">
                  <p className="text-xs text-muted-foreground">Platform Version: 2.4.0 | Last Updated: February 2026</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Customer Support */}
          {activeSection === "support" && (
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Headphones className="h-5 w-5 text-primary" />
                  Customer Support
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                {supportSent ? (
                  <div className="flex flex-col items-center py-12">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Ticket Submitted</h3>
                    <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
                      Your support ticket #TKT-2026-0892 has been created. Our team will get back to you within 24 hours.
                    </p>
                    <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setSupportSent(false)}>
                      Submit Another
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-medium text-foreground">Issue / Enquiry Type *</Label>
                      <Select>
                        <SelectTrigger className="bg-secondary border-border text-foreground">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="billing">Billing</SelectItem>
                          <SelectItem value="account">Account</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-medium text-foreground">Select Topic *</Label>
                      <Select>
                        <SelectTrigger className="bg-secondary border-border text-foreground">
                          <SelectValue placeholder="Select related module" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="users">User Management</SelectItem>
                          <SelectItem value="vehicles">Vehicles</SelectItem>
                          <SelectItem value="stickers">QR Stickers</SelectItem>
                          <SelectItem value="billing">Billing & Payments</SelectItem>
                          <SelectItem value="park_ledger">Park Ledger</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-medium text-foreground">Message *</Label>
                      <Textarea
                        placeholder="Describe your issue or enquiry in detail..."
                        className="min-h-[120px] bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit" onClick={() => setSupportSent(true)}>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Ticket
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Feedback */}
          {activeSection === "feedback" && (
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                {feedbackSent ? (
                  <div className="flex flex-col items-center py-12">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Thank you for your feedback!</h3>
                    <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
                      Your feedback helps us improve the platform.
                    </p>
                    <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => { setFeedbackSent(false); setFeedbackRating(0) }}>
                      Submit Another
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-medium text-foreground">Overall Rating *</Label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setFeedbackRating(star)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`h-8 w-8 ${star <= feedbackRating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                            />
                          </button>
                        ))}
                        {feedbackRating > 0 && (
                          <span className="ml-2 text-sm text-muted-foreground">
                            {feedbackRating === 1 ? "Poor" : feedbackRating === 2 ? "Fair" : feedbackRating === 3 ? "Good" : feedbackRating === 4 ? "Very Good" : "Excellent"}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-medium text-foreground">Comments (Optional)</Label>
                      <Textarea
                        placeholder="Share your thoughts about the platform..."
                        className="min-h-[120px] bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit" onClick={() => setFeedbackSent(true)}>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Feedback
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Survey */}
          {activeSection === "survey" && (
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  Panel Improvement Survey
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                {surveySent ? (
                  <div className="flex flex-col items-center py-12">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Survey Submitted</h3>
                    <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
                      Your responses help us make the platform better for everyone.
                    </p>
                    <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => { setSurveySent(false); setSurveyRating(0) }}>
                      Retake Survey
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-medium text-foreground">Feature Satisfaction Rating *</Label>
                      <p className="text-xs text-muted-foreground">Rate your overall satisfaction with the platform features (1-10)</p>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <button
                            key={num}
                            onClick={() => setSurveyRating(num)}
                            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                              num <= surveyRating
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-medium text-foreground">Suggestions for Improvement</Label>
                      <Textarea
                        placeholder="What features would you like to see improved? Any new features you'd like?"
                        className="min-h-[120px] bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit" onClick={() => setSurveySent(true)}>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Survey
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* FAQs */}
          {activeSection === "faq" && (
            <div className="flex flex-col gap-4">
              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search FAQs..." className="h-10 bg-secondary border-border pl-10 text-foreground placeholder:text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              <Tabs defaultValue={faqData[0].category} className="w-full">
                <TabsList className="bg-secondary border border-border flex-wrap h-auto gap-1 p-1">
                  {faqData.map((cat) => (
                    <TabsTrigger
                      key={cat.category}
                      value={cat.category}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground text-xs"
                    >
                      {cat.category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {faqData.map((cat) => (
                  <TabsContent key={cat.category} value={cat.category} className="mt-4">
                    <Card className="border-border bg-card">
                      <CardContent className="p-4">
                        <Accordion type="single" collapsible className="w-full">
                          {cat.questions.map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border-border">
                              <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary hover:no-underline py-4">
                                {faq.q}
                              </AccordionTrigger>
                              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                                {faq.a}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}

          {/* Terms & Conditions */}
          {activeSection === "terms" && (
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Terms & Conditions
                  </CardTitle>
                  <Badge variant="outline" className="border-border text-muted-foreground text-xs">
                    Last updated: February 1, 2026
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-5 text-sm text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">1. Acceptance of Terms</h3>
                  <p>By accessing and using the Alerteefy Enterprise Platform, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, you must not use the platform.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">2. Enterprise Account</h3>
                  <p>Each enterprise must register with valid company details including PAN, GST, and incorporation certificate. A minimum of 3 licenses is required for registration. The enterprise admin is responsible for all activities under their account.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">3. License & QR Stickers</h3>
                  <p>Licenses are valid for 12 months from the date of purchase. Each QR sticker is uniquely linked to a vehicle and must not be duplicated or tampered with. Stickers must be affixed to the designated vehicle as per Alerteefy guidelines.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">4. Data Usage</h3>
                  <p>Alerteefy collects vehicle and user data strictly for the purpose of providing alert and notification services. Data is stored securely and is not shared with third parties without explicit consent.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">5. Payment Terms</h3>
                  <p>All payments are processed through Razorpay. Prices are inclusive of applicable taxes. Refunds are subject to our refund policy and are processed within 7-10 business days.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">6. Limitation of Liability</h3>
                  <p>Alerteefy is not liable for any indirect, incidental, or consequential damages arising from the use of the platform. The platform is provided on an as-is basis.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">7. Governing Law</h3>
                  <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Privacy Policy */}
          {activeSection === "privacy" && (
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    Privacy Policy
                  </CardTitle>
                  <Badge variant="outline" className="border-border text-muted-foreground text-xs">
                    Last updated: February 1, 2026
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-5 text-sm text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">1. Information We Collect</h3>
                  <p>We collect personal information (name, email, phone), company information (PAN, GST, address), vehicle details (registration number, type, model), and usage data (alerts, scans, login activity).</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">2. How We Use Your Data</h3>
                  <p>Your data is used to provide vehicle alert services, manage fleet operations, send notifications, process payments, improve our services, and comply with legal obligations.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">3. Data Storage & Security</h3>
                  <p>All data is stored in encrypted PostgreSQL databases hosted on secure cloud infrastructure (AWS/Azure). We implement industry-standard security measures including encryption at rest, in transit, and Redis caching for performance.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">4. Third-Party Sharing</h3>
                  <p>We do not sell or rent your personal data. Data may be shared with payment processors (Razorpay), delivery partners (Shiprocket), and notification services (Twilio, Firebase) strictly for service delivery.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">5. QR Code Privacy</h3>
                  <p>When a QR code is scanned, only the vehicle profile and alert options are visible. Personal contact details of the vehicle owner are never exposed to the scanner. Communication is facilitated through the Alerteefy platform.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">6. Your Rights</h3>
                  <p>You have the right to access, correct, or delete your personal data. You can request data export or account deletion by contacting our support team.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">7. Contact for Privacy Concerns</h3>
                  <p>For privacy-related concerns, contact: privacy@alerteefy.com. We respond to all privacy inquiries within 48 hours.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
