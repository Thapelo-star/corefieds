"use client"

import { useState } from "react"
import { Plus, Upload } from "lucide-react"
import { TopBar, PageHeader, SurfaceCard } from "@/components/ui/AppChrome"

const categories = ["fashion", "electronics", "beauty", "kitchen", "home-garden", "sports", "farming", "lighting"]

export default function AddProductPage() {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState(categories[0])
  const [description, setDescription] = useState("")
  const [saved, setSaved] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <TopBar backHref="/vendor/dashboard" backLabel="Dashboard" />
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Vendor"
          title="Add a new product"
          subtitle="Create cleaner listings with stronger product structure, pricing clarity, and better mobile presentation."
        />

        <SurfaceCard>
          <div className="grid gap-5">
            <div>
              <label className="label-ui">Product title</label>
              <input className="input-ui" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Example: Bluetooth speaker" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label-ui">Price</label>
                <input className="input-ui" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="R0.00" />
              </div>
              <div>
                <label className="label-ui">Category</label>
                <select className="input-ui" value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="label-ui">Description</label>
              <textarea className="input-ui min-h-[160px]" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the product clearly for buyers." />
            </div>

            <div className="rounded-[24px] border border-dashed border-[var(--border)] bg-[var(--green-ghost)] p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[var(--green-primary)] shadow-sm">
                <Upload size={22} />
              </div>
              <div className="mt-4 font-extrabold text-[var(--charcoal)]">Image upload area</div>
              <div className="mt-2 text-sm text-[var(--muted)]">You can wire real upload flow next without changing this UI shell.</div>
            </div>

            <button onClick={() => setSaved(true)} className="btn-primary w-full cursor-pointer sm:w-auto">
              <Plus size={16} />
              Save product
            </button>

            {saved ? <div className="rounded-2xl bg-[var(--green-ghost)] px-4 py-3 text-sm font-bold text-[var(--green-primary)]">Product draft saved.</div> : null}
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}