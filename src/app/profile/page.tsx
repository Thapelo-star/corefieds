"use client"

import { useState } from "react"
import { Bell, CreditCard, MapPin, ShieldCheck, User2 } from "lucide-react"
import { useAuth } from "@/components/auth/AuthProvider"
import { TopBar, PageHeader, SurfaceCard } from "@/components/ui/AppChrome"

export default function ProfilePage() {
  const { profile } = useAuth()
  const [name, setName] = useState(profile?.full_name || "")
  const [phone, setPhone] = useState(profile?.phone || "")
  const [location, setLocation] = useState(profile?.location || "")

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <TopBar />
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Profile"
          title="Your account settings"
          subtitle="Manage your personal details, trust status, and account preferences."
        />

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <SurfaceCard>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0f5c35,#22a063)] text-white text-3xl font-extrabold">
                {(profile?.full_name || "U").slice(0,1)}
              </div>
              <h2 className="mt-5 text-xl font-extrabold text-[var(--charcoal)]">{profile?.full_name || "User profile"}</h2>
              <div className="mt-2 text-sm text-[var(--muted)]">{profile?.email || "you@email.co.za"}</div>
              <div className="mt-4 rounded-full bg-[var(--green-ghost)] px-4 py-2 text-sm font-extrabold text-[var(--green-primary)]">
                {profile?.role || "buyer"}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {[
                [ShieldCheck, profile?.is_verified ? "Verified account" : "Verification pending"],
                [Bell, "Notifications enabled"],
                [CreditCard, "Escrow-ready checkout"],
              ].map(([Icon, text], idx) => {
                const Cmp = Icon as any
                return (
                  <div key={idx} className="flex items-center gap-3 rounded-2xl bg-[var(--green-ghost)] px-4 py-3 text-sm font-bold text-[var(--charcoal)]">
                    <Cmp size={16} className="text-[var(--green-primary)]" />
                    {text}
                  </div>
                )
              })}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="label-ui">Full name</label>
                <input className="input-ui" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label className="label-ui">Email</label>
                <input className="input-ui" value={profile?.email || ""} disabled />
              </div>
              <div>
                <label className="label-ui">Phone</label>
                <input className="input-ui" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <label className="label-ui">Location</label>
                <input className="input-ui" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[22px] bg-[var(--green-ghost)] p-4">
                <div className="mb-2 text-[var(--green-primary)]"><User2 size={18} /></div>
                <div className="font-extrabold text-[var(--charcoal)]">Account details</div>
                <div className="mt-2 text-sm text-[var(--muted)]">Core identity and contact information.</div>
              </div>
              <div className="rounded-[22px] bg-[var(--green-ghost)] p-4">
                <div className="mb-2 text-[var(--green-primary)]"><MapPin size={18} /></div>
                <div className="font-extrabold text-[var(--charcoal)]">Delivery readiness</div>
                <div className="mt-2 text-sm text-[var(--muted)]">Keep location details current for smooth checkout.</div>
              </div>
              <div className="rounded-[22px] bg-[var(--green-ghost)] p-4">
                <div className="mb-2 text-[var(--green-primary)]"><ShieldCheck size={18} /></div>
                <div className="font-extrabold text-[var(--charcoal)]">Trust layer</div>
                <div className="mt-2 text-sm text-[var(--muted)]">Verification can strengthen marketplace confidence.</div>
              </div>
            </div>

            <div className="mt-8">
              <button className="btn-primary cursor-pointer">Save changes</button>
            </div>
          </SurfaceCard>
        </div>
      </div>
    </div>
  )
}