"use client"

import Link from "next/link"
import { BarChart3, DollarSign, Eye, Package, Plus, ShieldCheck, Store } from "lucide-react"
import { TopBar, PageHeader, SurfaceCard, MetricCard } from "@/components/ui/AppChrome"

const products = [
  { title: "Bluetooth speaker", price: "R799", stock: 12, status: "Active" },
  { title: "Kitchen blender", price: "R1,299", stock: 7, status: "Active" },
  { title: "Smart watch", price: "R1,899", stock: 0, status: "Low stock" },
]

const orders = [
  { id: "CF1021", buyer: "Thando M", item: "Bluetooth speaker", amount: "R799", status: "Paid" },
  { id: "CF1018", buyer: "Lebo K", item: "Kitchen blender", amount: "R1,299", status: "Dispatched" },
]

export default function VendorDashboardPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <TopBar
        right={<Link href="/vendor/add-product" className="btn-primary"><Plus size={15} /> Add product</Link>}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Vendor dashboard"
          title="Store overview"
          subtitle="Track store visibility, product health, orders, and trust signals from one cleaner control surface."
          actions={<div className="badge-soft"><ShieldCheck size={14} /> Verified vendor ready</div>}
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Revenue" value="R14,820" helper="Current visible total" />
          <MetricCard label="Orders" value="24" helper="Across recent activity" />
          <MetricCard label="Views" value="2,847" helper="Product attention this period" />
          <MetricCard label="Products" value="18" helper="Live catalogue count" />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <SurfaceCard>
              <div className="mb-5 flex items-center gap-2">
                <Store size={16} className="text-[var(--green-primary)]" />
                <h3 className="text-lg font-extrabold text-[var(--charcoal)]">Product catalogue</h3>
              </div>
              <div className="space-y-4">
                {products.map((p) => (
                  <div key={p.title} className="rounded-[24px] border border-[var(--border)] bg-[var(--green-ghost)] p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="font-extrabold text-[var(--charcoal)]">{p.title}</div>
                        <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold">
                          <span className="rounded-full bg-white px-3 py-1 text-[var(--green-primary)]">{p.price}</span>
                          <span className="rounded-full bg-white px-3 py-1 text-[var(--muted)]">Stock {p.stock}</span>
                          <span className="rounded-full bg-white px-3 py-1 text-[var(--muted)]">{p.status}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="btn-soft">Edit</button>
                        <button className="btn-soft">View</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SurfaceCard>

            <SurfaceCard>
              <div className="mb-5 flex items-center gap-2">
                <Package size={16} className="text-[var(--green-primary)]" />
                <h3 className="text-lg font-extrabold text-[var(--charcoal)]">Recent orders</h3>
              </div>
              <div className="space-y-4">
                {orders.map((o) => (
                  <div key={o.id} className="rounded-[24px] border border-[var(--border)] bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">{o.id}</div>
                        <div className="mt-1 font-extrabold text-[var(--charcoal)]">{o.item}</div>
                        <div className="mt-2 text-sm text-[var(--muted)]">Buyer: {o.buyer}</div>
                      </div>
                      <div className="flex flex-col gap-2 sm:items-end">
                        <div className="font-extrabold text-[var(--green-primary)]">{o.amount}</div>
                        <div className="rounded-full bg-[var(--green-ghost)] px-3 py-1 text-xs font-bold text-[var(--green-primary)]">{o.status}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SurfaceCard>
          </div>

          <div className="space-y-4">
            <SurfaceCard>
              <div className="space-y-3">
                {[
                  [DollarSign, "Revenue clarity", "Know how much value your catalogue is generating."],
                  [Eye, "Visibility", "Monitor product attention and marketplace discoverability."],
                  [BarChart3, "Performance view", "Use a cleaner dashboard to guide next actions."],
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