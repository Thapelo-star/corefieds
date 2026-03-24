"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ShoppingBag, Eye, EyeOff, ArrowRight, Shield, Sparkles } from "lucide-react"
import { PageWrap, Hero, Container, Card } from "@/components/ui/AppShell"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
      if (loginError) throw loginError
      router.push("/home")
    } catch {
      setError("Incorrect email or password. Please try again.")
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
            Welcome back
          </>
        }
        title="Sign in to your Corefieds account"
        subtitle="Access your orders, listings, affiliate activity, and marketplace tools from one clean dashboard."
      >
        <Link href="/" className="inline-flex items-center gap-3 rounded-[24px] border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[var(--green-deep)] shadow-lg">
            <ShoppingBag size={18} />
          </div>
          <div>
            <div className="brand text-xl">Corefieds</div>
            <div className="text-sm text-white/70">Secure marketplace for modern trade</div>
          </div>
        </Link>
      </Hero>

      <Container className="-mt-6 pb-28 sm:-mt-8 lg:pb-24">
        <div className="mx-auto max-w-xl">
          <Card className="relative z-10 rounded-[32px] p-6 sm:p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="label-ui">Email address</label>
                <input
                  className="input-ui h-14 rounded-[22px]"
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
                    className="input-ui h-14 rounded-[22px] pr-12"
                    type={showPw ? "text" : "password"}
                    placeholder="Your password"
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

              <div className="text-right">
                <Link href="/forgot-password" className="text-sm font-extrabold text-[var(--charcoal)]">
                  Forgot password?
                </Link>
              </div>

              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              ) : null}

              <button type="submit" disabled={loading} className="btn-primary h-14 w-full cursor-pointer rounded-[24px] text-lg disabled:opacity-70">
                {loading ? "Signing in..." : <>Sign in <ArrowRight size={18} /></>}
              </button>

              <div className="flex items-center justify-center gap-2 rounded-[24px] bg-[var(--green-ghost)] px-4 py-4 text-base text-[var(--muted)]">
                <Shield size={16} className="text-[var(--green-primary)]" />
                Protected by Trade-Safe escrow
              </div>
            </form>
          </Card>

          <p className="mt-6 text-center text-base text-[var(--muted)]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-extrabold text-[var(--green-primary)]">
              Create one free
            </Link>
          </p>
        </div>
      </Container>
    </PageWrap>
  )
}