"use client"

import { useState } from "react"
import { Search, Send } from "lucide-react"
import { TopBar, PageHeader, SurfaceCard } from "@/components/ui/AppChrome"

const categories = ["Fashion", "Electronics", "Beauty", "Kitchen", "Home & Garden", "Sports", "Farming"]

export default function RequestPage() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState(categories[0])
  const [budget, setBudget] = useState("")
  const [details, setDetails] = useState("")
  const [posted, setPosted] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <TopBar />
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Request"
          title="Post a product request"
          subtitle="Let sellers know exactly what you are looking for and what budget range you have in mind."
        />

        <SurfaceCard>
          <div className="grid gap-5">
            <div>
              <label className="label-ui">What are you looking for?</label>
              <input className="input-ui" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Example: 13-inch laptop for design work" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label-ui">Category</label>
                <select className="input-ui" value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label-ui">Budget range</label>
                <input className="input-ui" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Example: R3,000 to R5,000" />
              </div>
            </div>

            <div>
              <label className="label-ui">Extra details</label>
              <textarea className="input-ui min-h-[140px]" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Brand preferences, colour, condition, delivery area, and anything else useful." />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] bg-[var(--green-ghost)] p-4">
                <div className="mb-2 text-[var(--green-primary)]"><Search size={18} /></div>
                <div className="font-extrabold text-[var(--charcoal)]">Better seller matching</div>
                <div className="mt-2 text-sm text-[var(--muted)]">Specific requests can improve relevance and response quality.</div>
              </div>
              <div className="rounded-[24px] bg-[var(--green-ghost)] p-4">
                <div className="mb-2 text-[var(--green-primary)]"><Send size={18} /></div>
                <div className="font-extrabold text-[var(--charcoal)]">Cleaner demand signal</div>
                <div className="mt-2 text-sm text-[var(--muted)]">Requests help the marketplace show active buyer intent.</div>
              </div>
            </div>

            <button onClick={() => setPosted(true)} className="btn-primary w-full cursor-pointer sm:w-auto">
              Submit request
            </button>

            {posted ? <div className="rounded-2xl bg-[var(--green-ghost)] px-4 py-3 text-sm font-bold text-[var(--green-primary)]">Request posted successfully.</div> : null}
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}