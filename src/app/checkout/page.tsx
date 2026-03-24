"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Lock, MapPin, Truck, WalletCards } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { TopBar, PageHeader, SurfaceCard, EmptyState } from "@/components/ui/AppChrome"

export default function CheckoutPage() {
  const { items, total } = useCart()
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [province, setProvince] = useState("")
  const [placed, setPlaced] = useState(false)

  const shipping = total > 0 ? 80 : 0
  const escrowFee = Math.round(total * 0.01)
  const grandTotal = total + shipping + escrowFee

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--surface)]">
        <TopBar backHref="/cart" />
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <EmptyState
            title="No items to check out"
            text="Your checkout summary appears here once you add products to your cart."
            action={<Link href="/home" className="btn-primary">Go shopping</Link>}
          />
        </div>
      </div>
    )
  }

  if (placed) {
    return (
      <div className="min-h-screen bg-[var(--surface)]">
        <TopBar />
        <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <SurfaceCard className="py-14 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--green-ghost)] text-[var(--green-primary)]">
              <CheckCircle2 size={36} />
            </div>
            <h1 className="brand mt-6 text-3xl text-[var(--charcoal)]">Order placed successfully</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
              Your payment is protected in escrow until delivery is confirmed. You can track updates from your orders page.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/orders" className="btn-primary">View orders</Link>
              <Link href="/home" className="btn-soft">Continue shopping</Link>
            </div>
          </SurfaceCard>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <TopBar backHref="/cart" backLabel="Back to cart" />
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PageHeader
          eyebrow="Checkout"
          title="Secure checkout"
          subtitle="Complete your delivery details and review your protected order summary."
        />

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            <SurfaceCard className="bg-[linear-gradient(135deg,#edfdf4,#d4f5e6)]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--green-mid)] text-white">
                  <Lock size={18} />
                </div>
                <div>
                  <div className="font-extrabold text-[#14532d]">Trade-Safe escrow protection</div>
                  <div className="mt-1 text-sm leading-6 text-[#166534]">Payment is held securely until the order is delivered successfully.</div>
                </div>
              </div>
            </SurfaceCard>

            <SurfaceCard>
              <div className="mb-5 flex items-center gap-2">
                <MapPin size={16} className="text-[var(--green-primary)]" />
                <span className="font-extrabold text-[var(--charcoal)]">Delivery details</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label-ui">Full name</label>
                  <input className="input-ui" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div>
                  <label className="label-ui">Phone</label>
                  <input className="input-ui" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className="label-ui">Address</label>
                  <input className="input-ui" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div>
                  <label className="label-ui">City</label>
                  <input className="input-ui" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div>
                  <label className="label-ui">Province</label>
                  <input className="input-ui" value={province} onChange={(e) => setProvince(e.target.value)} />
                </div>
              </div>
            </SurfaceCard>

            <SurfaceCard>
              <div className="mb-5 flex items-center gap-2">
                <WalletCards size={16} className="text-[var(--green-primary)]" />
                <span className="font-extrabold text-[var(--charcoal)]">Payment method</span>
              </div>
              <div className="rounded-[24px] border border-[var(--border)] bg-[var(--green-ghost)] p-4">
                <div className="font-extrabold text-[var(--charcoal)]">Card payment into escrow</div>
                <div className="mt-2 text-sm leading-6 text-[var(--muted)]">For now this is a premium UI flow. Connect your real payment gateway next.</div>
              </div>
            </SurfaceCard>
          </div>

          <div className="space-y-4">
            <SurfaceCard>
              <h3 className="text-lg font-extrabold text-[var(--charcoal)]">Order summary</h3>
              <div className="mt-5 space-y-4">
                {items.map((item) => (
                  <div key={item.id + item.size + item.color} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate font-bold text-[var(--charcoal)]">{item.title}</div>
                      <div className="text-sm text-[var(--muted)]">Qty {item.quantity}</div>
                    </div>
                    <div className="font-extrabold text-[var(--green-primary)]">R{(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-[var(--border)] pt-4 text-sm">
                <div className="flex justify-between"><span className="text-[var(--muted)]">Subtotal</span><span className="font-bold">R{total.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-[var(--muted)]">Delivery</span><span className="font-bold">R{shipping}</span></div>
                <div className="flex justify-between"><span className="text-[var(--muted)]">Escrow fee</span><span className="font-bold">R{escrowFee}</span></div>
                <div className="flex justify-between pt-2">
                  <span className="font-extrabold text-[var(--charcoal)]">Total</span>
                  <span className="brand text-2xl text-[var(--green-primary)]">R{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button onClick={() => setPlaced(true)} className="btn-primary mt-6 flex w-full cursor-pointer">
                Place secure order
              </button>
            </SurfaceCard>

            <SurfaceCard>
              <div className="mb-3 flex items-center gap-2">
                <Truck size={16} className="text-[var(--green-primary)]" />
                <span className="font-extrabold text-[var(--charcoal)]">Delivery note</span>
              </div>
              <p className="text-sm leading-7 text-[var(--muted)]">Delivery timing and tracking updates can be surfaced next through real courier integrations.</p>
            </SurfaceCard>
          </div>
        </div>
      </div>
    </div>
  )
}