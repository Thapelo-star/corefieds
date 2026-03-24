"use client"

import { PackageCheck, Truck, ShieldCheck, Clock3 } from "lucide-react"
import { TopBar, PageHeader, SurfaceCard, EmptyState } from "@/components/ui/AppChrome"

const orders = [
  { id: "CF1021", item: "Wireless earbuds", date: "24 Mar 2026", status: "Delivered", amount: "R899" },
  { id: "CF1016", item: "Kitchen blender", date: "20 Mar 2026", status: "In transit", amount: "R1,299" },
  { id: "CF1009", item: "Copper bracelet", date: "18 Mar 2026", status: "Held in escrow", amount: "R420" },
]

const icons = {
  Delivered: PackageCheck,
  "In transit": Truck,
  "Held in escrow": ShieldCheck,
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <TopBar />
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Orders"
          title="Your order activity"
          subtitle="Track progress, delivery updates, and escrow release status from one clean view."
        />

        {orders.length === 0 ? (
          <EmptyState title="No orders yet" text="Once purchases are made, they will appear here with delivery and escrow updates." />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const Icon = icons[order.status as keyof typeof icons] || Clock3
              return (
                <SurfaceCard key={order.id}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--green-ghost)] text-[var(--green-primary)]">
                        <Icon size={22} />
                      </div>
                      <div>
                        <div className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--muted)]">{order.id}</div>
                        <h3 className="mt-1 text-lg font-extrabold text-[var(--charcoal)]">{order.item}</h3>
                        <div className="mt-2 text-sm text-[var(--muted)]">Ordered on {order.date}</div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:items-end">
                      <div className="rounded-full bg-[var(--green-ghost)] px-4 py-2 text-sm font-extrabold text-[var(--green-primary)]">
                        {order.status}
                      </div>
                      <div className="brand text-2xl text-[var(--green-primary)]">{order.amount}</div>
                    </div>
                  </div>
                </SurfaceCard>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}