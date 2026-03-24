"use client"

import { Copy, DollarSign, MousePointerClick, Users } from "lucide-react"
import { TopBar, PageHeader, SurfaceCard, MetricCard } from "@/components/ui/AppChrome"

const links = [
  { product: "Wireless earbuds", clicks: 118, conversions: 9, earnings: "R342" },
  { product: "Copper bracelet", clicks: 76, conversions: 6, earnings: "R126" },
  { product: "Kitchen blender", clicks: 51, conversions: 3, earnings: "R195" },
]

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <TopBar />
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Affiliate"
          title="Affiliate performance"
          subtitle="Track link activity, conversions, and commission earnings with a cleaner dashboard."
          actions={<button className="btn-primary"><Copy size={15} /> Copy referral link</button>}
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Total earnings" value="R663" helper="Current visible total" />
          <MetricCard label="Clicks" value="245" helper="Across tracked links" />
          <MetricCard label="Conversions" value="18" helper="Estimated successful actions" />
          <MetricCard label="Referral reach" value="32" helper="People engaged this month" />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <SurfaceCard>
            <h3 className="text-lg font-extrabold text-[var(--charcoal)]">Top performing product links</h3>
            <div className="mt-5 space-y-4">
              {links.map((item) => (
                <div key={item.product} className="rounded-[24px] border border-[var(--border)] bg-[var(--green-ghost)] p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="font-extrabold text-[var(--charcoal)]">{item.product}</div>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-[var(--muted)]">
                        <span className="rounded-full bg-white px-3 py-1">{item.clicks} clicks</span>
                        <span className="rounded-full bg-white px-3 py-1">{item.conversions} conversions</span>
                      </div>
                    </div>
                    <div className="brand text-2xl text-[var(--green-primary)]">{item.earnings}</div>
                  </div>
                </div>
              ))}
            </div>
          </SurfaceCard>

          <div className="space-y-4">
            <SurfaceCard>
              <div className="space-y-3">
                {[
                  [DollarSign, "Commissions", "Payout visibility and earnings summary"],
                  [MousePointerClick, "Clicks", "Understand what content is drawing interest"],
                  [Users, "Reach", "Know how many people are engaging with your links"],
                ].map(([Icon, title, text], idx) => {
                  const Cmp = Icon as any
                  return (
                    <div key={idx} className="rounded-[22px] bg-[var(--green-ghost)] p-4">
                      <div className="mb-2 text-[var(--green-primary)]"><Cmp size={18} /></div>
                      <div className="font-extrabold text-[var(--charcoal)]">{title}</div>
                      <div className="mt-2 text-sm text-[var(--muted)]">{text}</div>
                    </div>
                  )
                })}
              </div>
            </SurfaceCard>
          </div>
        </div>
      </div>
    </div>
  )
}