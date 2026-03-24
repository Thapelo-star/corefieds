"use client"

import { useState } from "react"
import { MessageCircle, Send, ShieldCheck } from "lucide-react"
import { TopBar, PageHeader, SurfaceCard } from "@/components/ui/AppChrome"

const threads = [
  { id: 1, name: "Mzansi Store", last: "Your order is being prepared.", time: "10:22" },
  { id: 2, name: "Tech Grid", last: "We can confirm available stock.", time: "Yesterday" },
  { id: 3, name: "Home Cartel", last: "Thanks for your request.", time: "Mon" },
]

const messages = [
  { from: "them", text: "Hi, thanks for reaching out about the order update." },
  { from: "me", text: "Thank you. I wanted to confirm delivery timing." },
  { from: "them", text: "It should move to dispatch later today." },
]

export default function ChatPage() {
  const [value, setValue] = useState("")

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <TopBar />
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Chat"
          title="Messages"
          subtitle="Cleaner vendor communication helps the marketplace feel credible and easier to trust."
        />

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <SurfaceCard className="p-4">
            <div className="space-y-3">
              {threads.map((t) => (
                <button key={t.id} className="w-full rounded-[22px] border border-[var(--border)] bg-[var(--green-ghost)] px-4 py-4 text-left">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-extrabold text-[var(--charcoal)]">{t.name}</div>
                      <div className="mt-1 text-sm text-[var(--muted)]">{t.last}</div>
                    </div>
                    <div className="text-xs font-bold text-[var(--muted)]">{t.time}</div>
                  </div>
                </button>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard className="flex min-h-[520px] flex-col">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--green-ghost)] text-[var(--green-primary)]">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div className="font-extrabold text-[var(--charcoal)]">Mzansi Store</div>
                  <div className="mt-1 flex items-center gap-2 text-sm text-[var(--muted)]">
                    <ShieldCheck size={14} className="text-[var(--green-primary)]" />
                    Verified conversation
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4 py-5">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`${m.from === "me" ? "bg-[var(--green-primary)] text-white" : "bg-[var(--green-ghost)] text-[var(--charcoal)]"} max-w-[75%] rounded-[22px] px-4 py-3 text-sm leading-6`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto flex gap-3 border-t border-[var(--border)] pt-4">
              <input className="input-ui" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type a message" />
              <button className="btn-primary !px-5">
                <Send size={16} />
              </button>
            </div>
          </SurfaceCard>
        </div>
      </div>
    </div>
  )
}