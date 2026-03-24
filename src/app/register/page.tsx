"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ShoppingBag, Store, TrendingUp, Eye, EyeOff, ArrowRight, Check, Sparkles } from "lucide-react"
import type { UserRole } from "@/types"
import { PageWrap, Hero, Container, Card } from "@/components/ui/AppShell"

const roles = [
  {
    id: "buyer" as UserRole,
    icon: ShoppingBag,
    label: "Buyer",
    desc: "Shop safely with escrow protection",
  },
  {
    id: "vendor" as UserRole,
    icon: Store,
    label: "Vendor",
    desc: "List products and grow your store",
  },
  {
    id: "affiliate" as UserRole,
    icon: TrendingUp,
    label: "Affiliate",
    desc: "Share links and earn commissions",
  },
]

export default function RegisterPage() {
  const [role, setRole] = useState<UserRole>("buyer")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    if (typeof window === "undefined") return
    const roleParam = new URLSearchParams(window.location.search).get("role")
    if (roleParam === "buyer" || roleParam === "vendor" || roleParam === "affiliate") {
      setRole(roleParam)
    }
  }, [])

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, role } },
      })
      if (signUpError) throw signUpError

      if (data.user) {
        await supabase.from("profiles").insert({
          id: data.user.id,
          email,
          full_name: fullName,
          role,
          is_verified: false,
        })
        router.push("/home")
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrap>
      <Hero
        badge={
          <>
            <Sparkles size={15} />
            Join free
          </>
        }
        title="Create your Corefieds account"
        subtitle="Start as a buyer, vendor, or affiliate and move through one premium mobile-first marketplace."
      >
        <Link href="/" className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[var(--green-deep)] shadow-lg">
            <ShoppingBag size={18} />
          </div>
          <div>
            <div className="brand text-xl">Corefieds</div>
            <div className="text-xs text-white/70">Secure marketplace for modern trade</div>
          </div>
        </Link>
      </Hero>

      <Container className="-mt-8 pb-16 sm:-mt-10 lg:pb-24">
        <div className="mx-auto max-w-2xl">
          <Card>
            <div className="mb-6">
              <div className="label-ui">Choose account type</div>
              <div className="grid gap-3 sm:grid-cols-3">
                {roles.map((r) => {
                  const Icon = r.icon
                  const active = role === r.id
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={`rounded-[22px] border p-4 text-left transition ${
                        active
                          ? "border-[var(--green-mid)] bg-emerald-50 shadow-[0_10px_30px_rgba(26,122,74,0.08)]"
                          : "border-[var(--border)] bg-white"
                      }`}
                    >
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#effaf4,#daf4e7)] text-[var(--green-primary)]">
                        <Icon size={22} />
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-extrabold text-[var(--charcoal)]">{r.label}</h3>
                        {active ? <Check size={16} className="text-[var(--green-primary)]" /> : null}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{r.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="label-ui">Full name</label>
                <input
                  className="input-ui"
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label-ui">Email address</label>
                <input
                  className="input-ui"
                  type="email"
                  placeholder="you@email.co.za"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label-ui">Password</label>
                <div className="relative">
                  <input
                    className="input-ui pr-12"
                    type={showPw ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              ) : null}

              <button type="submit" disabled={loading} className="btn-primary w-full cursor-pointer disabled:opacity-70">
                {loading ? "Creating account..." : <>Create free account <ArrowRight size={16} /></>}
              </button>
            </form>
          </Card>

          <p className="mt-5 text-center text-sm text-[var(--muted)]">
            Already have an account?{" "}
            <Link href="/login" className="font-extrabold text-[var(--green-primary)]">
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </PageWrap>
  )
}