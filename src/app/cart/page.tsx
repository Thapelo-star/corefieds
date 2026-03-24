"use client"

import Link from "next/link"
import { useState } from "react"
import { Minus, Plus, ShoppingBag, Tag, Trash2, Truck, Lock, ArrowRight } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { TopBar, PageHeader, SurfaceCard, EmptyState } from "@/components/ui/AppChrome"

export default function CartPage() {
  const { items, removeItem, updateQty, total, count, clearCart } = useCart()
  const [coupon, setCoupon] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)

  const shipping = total > 0 ? 80 : 0
  const escrowFee = Math.round(total * 0.01)
  const discount = couponApplied ? Math.round(total * 0.1) : 0
  const grandTotal = total + shipping + escrowFee - discount

  function applyCoupon() {
    if (coupon.toUpperCase() === "COREFIEDS10") setCouponApplied(true)
  }

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <TopBar />
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PageHeader
          eyebrow="Cart"
          title="Your cart"
          subtitle={`${count} item${count === 1 ? "" : "s"} ready for checkout with Trade-Safe protection.`}
          actions={count > 0 ? <button onClick={clearCart} className="btn-soft cursor-pointer">Clear cart</button> : null}
        />

        {items.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            text="Start browsing products and add the ones you want to buy. Your secure checkout summary will appear here."
            action={<Link href="/home" className="btn-primary">Browse marketplace <ArrowRight size={16} /></Link>}
          />
        ) : (
          <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              <SurfaceCard className="bg-[linear-gradient(135deg,#edfdf4,#d4f5e6)]">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--green-mid)] text-white">
                    <Lock size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-[#14532d]">Trade-Safe escrow protection active</div>
                    <div className="mt-1 text-sm leading-6 text-[#166534]">Your payment stays protected until delivery is confirmed successfully.</div>
                  </div>
                </div>
              </SurfaceCard>

              {items.map((item) => (
                <SurfaceCard key={item.id + item.size + item.color}>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex h-24 w-24 items-center justify-center rounded-[22px] border border-[var(--border)] bg-[var(--green-ghost)] text-4xl">
                      {item.image || "🛍️"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-lg font-extrabold text-[var(--charcoal)]">{item.title}</h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {item.size ? <span className="rounded-full bg-[var(--green-ghost)] px-3 py-1 text-xs font-bold text-[var(--green-primary)]">Size: {item.size}</span> : null}
                            {item.color ? <span className="rounded-full bg-[var(--green-ghost)] px-3 py-1 text-xs font-bold text-[var(--green-primary)]">Colour: {item.color}</span> : null}
                            {item.vendorName ? <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-bold text-[var(--muted)]">by {item.vendorName}</span> : null}
                          </div>
                        </div>
                        <div className="brand text-2xl text-[var(--green-primary)]">R{(item.price * item.quantity).toLocaleString()}</div>
                      </div>

                      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="inline-flex items-center rounded-2xl border border-[var(--border)] bg-[var(--green-ghost)] p-1">
                          <button onClick={() => updateQty(item.id, item.quantity - 1)} className="flex h-10 w-10 items-center justify-center rounded-xl text-[var(--green-primary)]">
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center text-sm font-extrabold text-[var(--charcoal)]">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, item.quantity + 1)} className="flex h-10 w-10 items-center justify-center rounded-xl text-[var(--green-primary)]">
                            <Plus size={16} />
                          </button>
                        </div>

                        <button onClick={() => removeItem(item.id)} className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-bold text-red-500">
                          <Trash2 size={15} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </SurfaceCard>
              ))}

              <SurfaceCard>
                <div className="mb-4 flex items-center gap-2 text-[var(--charcoal)]">
                  <Tag size={16} className="text-[var(--green-primary)]" />
                  <span className="font-extrabold">Coupon code</span>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    className="input-ui"
                    placeholder="Enter code, try COREFIEDS10"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button onClick={applyCoupon} className="btn-primary cursor-pointer sm:!w-auto">
                    {couponApplied ? "Applied" : "Apply code"}
                  </button>
                </div>
              </SurfaceCard>
            </div>

            <div className="space-y-4">
              <SurfaceCard>
                <h3 className="text-lg font-extrabold text-[var(--charcoal)]">Order summary</h3>
                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-[var(--muted)]">Subtotal</span><span className="font-bold">R{total.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--muted)]">Delivery</span><span className="font-bold">R{shipping}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--muted)]">Escrow fee</span><span className="font-bold">R{escrowFee}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--muted)]">Discount</span><span className="font-bold text-emerald-600">-R{discount}</span></div>
                  <div className="mt-4 border-t border-[var(--border)] pt-4">
                    <div className="flex justify-between">
                      <span className="font-extrabold text-[var(--charcoal)]">Grand total</span>
                      <span className="brand text-2xl text-[var(--green-primary)]">R{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout" className="btn-primary mt-6 flex w-full">
                  Continue to checkout
                  <ArrowRight size={16} />
                </Link>
              </SurfaceCard>

              <SurfaceCard>
                <div className="mb-3 flex items-center gap-2">
                  <Truck size={16} className="text-[var(--green-primary)]" />
                  <span className="font-extrabold text-[var(--charcoal)]">Delivery partners</span>
                </div>
                <div className="space-y-3">
                  {[
                    ["The Courier Guy", "2 to 4 business days"],
                    ["Fastway Couriers", "3 to 5 business days"],
                  ].map(([name, time]) => (
                    <div key={name} className="rounded-2xl border border-[var(--border)] bg-[var(--green-ghost)] px-4 py-3">
                      <div className="font-bold text-[var(--charcoal)]">{name}</div>
                      <div className="text-sm text-[var(--muted)]">{time}</div>
                    </div>
                  ))}
                </div>
              </SurfaceCard>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}