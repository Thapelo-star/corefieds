import Link from "next/link"
import {
  ArrowRight,
  ShieldCheck,
  Store,
  Sparkles,
  Truck,
  BadgeCheck,
  WalletCards,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react"

const features = [
  {
    icon: ShieldCheck,
    title: "Protected payments",
    text: "Escrow-first checkout keeps buyer funds safe until delivery is confirmed.",
  },
  {
    icon: Store,
    title: "Vendor-ready selling",
    text: "Open a store, list products, and grow without a cluttered onboarding flow.",
  },
  {
    icon: WalletCards,
    title: "Auctions and requests",
    text: "Beyond fixed-price listings, users can bid, request, and discover new supply.",
  },
  {
    icon: Truck,
    title: "Delivery support",
    text: "Built around practical fulfilment so the platform feels real, not theoretical.",
  },
  {
    icon: BadgeCheck,
    title: "Trust-led marketplace",
    text: "Verification and cleaner flows help reduce the fear that stops online buying.",
  },
  {
    icon: Sparkles,
    title: "Premium experience",
    text: "Cleaner blocks, better spacing, softer glow, and a stronger mobile-first feel.",
  },
]

const stats = [
  { value: "Escrow", label: "buyer protection" },
  { value: "Free", label: "to start selling" },
  { value: "SA", label: "market focus" },
]

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f7fbf8]">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0f5c35_0%,#1a7a4a_55%,#22a063_100%)]">
        <div className="absolute inset-0">
          <div className="absolute -left-16 top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-200/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-lime-100/10 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-5 sm:px-6 lg:px-8 lg:pb-24 lg:pt-8">
          <div className="mb-8 flex items-center justify-between gap-3">
            <div className="soft-ring inline-flex items-center gap-3 rounded-2xl bg-white/10 px-3 py-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#0f5c35] shadow-lg">
                <ShoppingBag size={18} />
              </div>
              <div>
                <div className="brand text-xl">Corefieds</div>
                <div className="text-xs text-white/70">Secure marketplace for modern trade</div>
              </div>
            </div>

            <div className="hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur md:block">
              Built for safer South African trade
            </div>
          </div>

          <div className="hero-grid items-center">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur">
                <Sparkles size={15} />
                Premium mobile-first marketplace
              </div>

              <h1 className="brand text-5xl leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                Buy, sell, bid, request and grow with confidence.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
                Corefieds combines safer payments, better seller trust, affiliate growth, and cleaner marketplace design into one stronger digital trade experience.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-extrabold text-[#0f5c35] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
                >
                  Create free account
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/home"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
                >
                  Browse marketplace
                </Link>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[
                  "Protected checkout flow",
                  "Vendor-first growth model",
                  "Built for trust and scale",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white/85 backdrop-blur"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 scale-[1.02] rounded-[32px] bg-emerald-300/20 blur-2xl" />
              <div className="relative rounded-[30px] border border-white/20 bg-white/10 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur">
                <div className="rounded-[26px] bg-white p-4 sm:p-5">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7b8d83]">
                        Marketplace preview
                      </div>
                      <h2 className="brand mt-2 text-3xl leading-tight text-[#111827]">
                        Designed to feel clean on mobile
                      </h2>
                    </div>
                    <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-[#1a7a4a]">
                      Live concept
                    </div>
                  </div>

                  <div className="glow-green rounded-[26px] bg-[linear-gradient(135deg,#0f5c35,#22a063)] p-5 text-white">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm text-white/75">Buyer protection</div>
                        <div className="mt-1 text-2xl font-extrabold">Escrow built in</div>
                      </div>
                      <ShieldCheck size={22} />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/80">
                      Payments remain protected until the buyer confirms a successful delivery.
                    </p>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[22px] border border-[#e5efe9] bg-[#f7fbf8] p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7b8d83]">
                        Vendor
                      </div>
                      <div className="mt-1 text-lg font-extrabold text-[#111827]">
                        Store setup
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#6b7280]">
                        Clean onboarding, product listing, and stronger seller presentation.
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-[#e5efe9] bg-[#f7fbf8] p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7b8d83]">
                        Affiliate
                      </div>
                      <div className="mt-1 text-lg font-extrabold text-[#111827]">
                        Earn from sharing
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#6b7280]">
                        Turn attention and reach into conversion-based income.
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Escrow", "Verified", "Delivery", "Auction", "Request"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-[#1a7a4a]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/15 bg-white/10 px-3 py-4 text-center backdrop-blur"
              >
                <div className="brand text-2xl text-white sm:text-3xl">{stat.value}</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60 sm:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-bold text-[#1a7a4a]">
            <CheckCircle2 size={15} />
            Why it feels better
          </div>
          <h2 className="brand mt-4 text-3xl text-[#111827] sm:text-4xl">
            Premium blocks, stronger spacing, cleaner hierarchy
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#6b7280] sm:text-base">
            The homepage now stacks properly on phone screens, uses softer surfaces, and avoids the cramped feeling that breaks trust.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="rounded-[28px] border border-[#e5efe9] bg-white p-6 shadow-[0_8px_30px_rgba(26,122,74,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(26,122,74,0.14)]"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#effaf4,#daf4e7)] text-[#1a7a4a]">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-extrabold text-[#111827]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#6b7280]">{feature.text}</p>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}