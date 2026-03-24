"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { TopBar, PageHeader, SurfaceCard, EmptyState } from "@/components/ui/AppChrome"

const seed = [
  { id: "1", title: "Copper bracelet", price: 420, image: "🧿", vendorName: "Mzansi Store" },
  { id: "2", title: "Wireless earbuds", price: 899, image: "🎧", vendorName: "Tech Grid" },
  { id: "3", title: "Kitchen blender", price: 1299, image: "🥤", vendorName: "Home Cartel" },
]

export default function WishlistPage() {
  const [items, setItems] = useState(seed)
  const { addItem } = useCart()

  const total = useMemo(() => items.reduce((sum, i) => sum + i.price, 0), [items])

  function remove(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <TopBar />
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Wishlist"
          title="Saved products"
          subtitle="Keep an eye on products you may want to buy later."
          actions={<div className="badge-soft">Estimated value R{total.toLocaleString()}</div>}
        />

        {items.length === 0 ? (
          <EmptyState
            title="No saved products yet"
            text="Your wishlist will help users keep track of products they are considering."
            action={<Link href="/home" className="btn-primary">Browse marketplace <ArrowRight size={16} /></Link>}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <SurfaceCard key={item.id}>
                <div className="flex h-44 items-center justify-center rounded-[24px] bg-[var(--green-ghost)] text-6xl">
                  {item.image}
                </div>
                <div className="mt-5 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-extrabold text-[var(--charcoal)]">{item.title}</h3>
                    <div className="mt-1 text-sm text-[var(--muted)]">by {item.vendorName}</div>
                  </div>
                  <Heart size={18} className="fill-red-400 text-red-400" />
                </div>
                <div className="brand mt-4 text-2xl text-[var(--green-primary)]">R{item.price.toLocaleString()}</div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => addItem({ ...item, quantity: 1 })}
                    className="btn-primary !px-4"
                  >
                    <ShoppingCart size={15} />
                    Add
                  </button>
                  <button onClick={() => remove(item.id)} className="btn-soft">
                    <Trash2 size={15} />
                    Remove
                  </button>
                </div>
              </SurfaceCard>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}