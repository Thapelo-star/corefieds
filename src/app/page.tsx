import Link from "next/link"
import {
  ArrowRight,
  Shield,
  Store,
  TrendingUp,
  Truck,
  Star,
  ShoppingBag,
  CheckCircle,
  Sparkles,
  BadgeCheck,
  WalletCards,
} from "lucide-react"

const features = [
  {
    Icon: Shield,
    title: "Trade-Safe escrow",
    desc: "Buyer funds stay protected until delivery is confirmed.",
  },
  {
    Icon: Store,
    title: "Free vendor onboarding",
    desc: "Start selling without heavy upfront platform costs.",
  },
  {
    Icon: TrendingUp,
    title: "Affiliate earnings",
    desc: "Share product links and earn from real conversions.",
  },
  {
    Icon: Truck,
    title: "Trusted delivery",
    desc: "Built around reliable courier fulfilment across South Africa.",
  },
  {
    Icon: BadgeCheck,
    title: "Verified sellers",
    desc: "A stronger trust layer to reduce scams and fake listings.",
  },
  {
    Icon: WalletCards,
    title: "Auctions and requests",
    desc: "Buy, sell, bid, request, and grow from one marketplace.",
  },
]

const steps = [
  {
    number: "01",
    title: "Browse safely",
    desc: "Find products, vendors, and opportunities in one place.",
  },
  {
    number: "02",
    title: "Pay with protection",
    desc: "Funds are held securely instead of going directly to the seller.",
  },
  {
    number: "03",
    title: "Receive delivery",
    desc: "Track fulfilment and confirm once the order arrives properly.",
  },
  {
    number: "04",
    title: "Release payment",
    desc: "Only then does the seller receive the funds.",
  },
]

const stats = [
  { value: "150K+", label: "User goal" },
  { value: "Free", label: "To start selling" },
  { value: "Escrow", label: "Buyer protection" },
  { value: "SA", label: "Built for local trade" },
]

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4faf7] text-[#1c2b22]">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f5c35_0%,#1a7a4a_55%,#22a063_100%)]" />
        <div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-lime-200/10 blur-2xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-5 sm:px-6 lg:px-8 lg:pb-24 lg:pt-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0f5c35] shadow-lg">
                <ShoppingBag size={18} />
              </div>
              <div>
                <div className="brand text-lg text-white">Corefieds</div>
                <div className="text-xs text-white/70">Secure marketplace for modern trade</div>
              </div>
            </div>

            <div className="hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur md:block">
              South Africa • Escrow-first • Courier-enabled
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-white/10 px-3 py-2 text-sm font-semibold text-emerald-50 backdrop-blur">
                <Sparkles size={15} />
                Built to make online trade feel safer
              </div>

              <h1 className="brand max-w-4xl text-4xl leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Buy, sell, bid, request and grow on a marketplace that feels premium on mobile.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                Corefieds brings protected transactions, verified sellers, affiliate income, and cleaner vendor growth into one modern South African marketplace.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
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
              <div className="absolute inset-0 scale-[1.03] rounded-[32px] bg-emerald-300/20 blur-2xl" />
              <div className="relative rounded-[28px] border border-white/20 bg-white/12 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.2)] backdrop-blur">
                <div className="rounded-[24px] bg-white p-4 sm:p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b8275]">
                        Marketplace preview
                      </p>
                      <h2 className="brand mt-1 text-2xl text-[#111714]">Designed for mobile first</h2>
                    </div>
                    <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-[#1a7a4a]">
                      Live concept
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="rounded-3xl bg-[linear-gradient(135deg,#0f5c35,#22a063)] p-5 text-white shadow-lg">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm text-white/75">Buyer protection</p>
                          <p className="mt-1 text-2xl font-extrabold">Escrow built in</p>
                        </div>
                        <Shield className="mt-1" size={22} />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white/80">
                        Payments remain protected until the buyer confirms successful delivery.
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl border border-[#e2ece7] bg-[#f8fcfa] p-4 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b8275]">Vendor</p>
                        <p className="mt-1 text-lg font-extrabold text-[#111714]">Open your store</p>
                        <p className="mt-2 text-sm leading-6 text-[#6b8275]">
                          Product listings, trust badges, and simple onboarding.
                        </p>
                      </div>
                      <div className="rounded-3xl border border-[#e2ece7] bg-[#f8fcfa] p-4 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b8275]">Affiliate</p>
                        <p className="mt-1 text-lg font-extrabold text-[#111714]">Earn from sharing</p>
                        <p className="mt-2 text-sm leading-6 text-[#6b8275]">
                          Turn reach into income with product-linked commissions.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-[#e2ece7] bg-white p-4 shadow-sm">
                      <div className="flex flex-wrap gap-2">
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
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/15 bg-white/10 px-4 py-4 text-center backdrop-blur"
              >
                <div className="brand text-2xl text-white sm:text-3xl">{stat.value}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
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
            <CheckCircle size={15} />
            Why it feels stronger
          </div>
          <h2 className="brand mt-4 text-3xl text-[#111714] sm:text-4xl">
            Cleaner blocks, better spacing, stronger mobile presence
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#6b8275] sm:text-base">
            The experience now uses stacked responsive cards, softer glow layers, and a layout that breathes properly on smaller screens.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {features.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-[28px] border border-[#e2ece7] bg-white p-6 shadow-[0_8px_30px_rgba(26,122,74,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(26,122,74,0.14)]"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#edfaf3,#d4f5e6)] text-[#1a7a4a] shadow-sm">
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-extrabold text-[#111714]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#6b8275]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="inline-flex rounded-full bg-[#edfaf3] px-3 py-2 text-sm font-bold text-[#1a7a4a]">
                How it works
              </div>
              <h2 className="brand mt-4 text-3xl text-[#111714] sm:text-4xl">
                Simple enough for first-time users, premium enough for growth
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#6b8275] sm:text-base">
                The flow is clear, trust-led, and structured to reduce friction for both buyers and sellers.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-[28px] border border-[#e2ece7] bg-[#f8fcfa] p-5 shadow-sm"
                >
                  <div className="brand text-4xl text-[#d0eadb]">{step.number}</div>
                  <h3 className="mt-3 text-lg font-extrabold text-[#111714]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#6b8275]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f5c35_0%,#1a7a4a_50%,#22a063_100%)]" />
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-10 bottom-0 h-56 w-56 rounded-full bg-lime-200/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <h2 className="brand text-3xl text-white sm:text-5xl">
            Ready to make Corefieds look premium on every screen?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
            The structure now favors proper mobile stacking, clearer spacing, smoother cards, and visual glow without breaking the existing build.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-extrabold text-[#0f5c35] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
            >
              Start free
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/home"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
            >
              View marketplace
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}