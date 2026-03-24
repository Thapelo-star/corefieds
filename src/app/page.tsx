import Link from "next/link"
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Store,
  WalletCards,
  Truck,
  BadgeCheck,
  ShoppingBag,
} from "lucide-react"

const features = [
  {
    icon: ShieldCheck,
    title: "Protected payments",
    text: "Escrow-first checkout keeps buyer funds protected until delivery is confirmed.",
  },
  {
    icon: Store,
    title: "Vendor-ready selling",
    text: "Give sellers a cleaner way to list products and build trust.",
  },
  {
    icon: WalletCards,
    title: "Auctions and requests",
    text: "Support bidding, buyer requests, and product discovery in one place.",
  },
  {
    icon: Truck,
    title: "Delivery support",
    text: "Built around practical fulfilment so the marketplace feels real and usable.",
  },
  {
    icon: BadgeCheck,
    title: "Trust-led design",
    text: "Verification and cleaner flows reduce the fear that slows online trade.",
  },
]

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0f5c35_0%,#1a7a4a_55%,#22a063_100%)]">
        <div className="absolute inset-0">
          <div className="absolute -left-16 top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-200/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-lime-100/10 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24 lg:pt-10">
          <div className="inline-flex items-center gap-3 rounded-[28px] border border-white/15 bg-white/10 px-5 py-4 text-white backdrop-blur">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white text-[var(--green-deep)] shadow-lg">
              <ShoppingBag size={22} />
            </div>
            <div>
              <div className="brand text-[clamp(1.8rem,5vw,2.4rem)] leading-none">Corefieds</div>
              <div className="mt-1 text-sm text-white/75 sm:text-base">Secure marketplace for modern trade</div>
            </div>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur">
            <Sparkles size={15} />
            Premium mobile-first marketplace
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-3xl">
              <h1 className="brand text-[clamp(3.2rem,15vw,6.8rem)] leading-[0.9] text-white">
                Buy, sell, bid, request and grow with confidence.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
                Corefieds combines safer payments, better seller trust, affiliate growth, and cleaner marketplace design into one stronger digital trade experience.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[24px] bg-white px-6 py-4 text-base font-extrabold text-[var(--green-deep)] shadow-[0_14px_40px_rgba(0,0,0,0.18)]"
                >
                  Create free account
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/home"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[24px] border border-white/20 bg-white/10 px-6 py-4 text-base font-bold text-white backdrop-blur"
                >
                  Browse marketplace
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  "Protected checkout flow",
                  "Vendor-first growth model",
                  "Built for trust and scale",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-white/15 bg-white/10 px-4 py-4 text-sm font-semibold text-white/90 backdrop-blur"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 scale-[1.02] rounded-[34px] bg-emerald-300/20 blur-2xl" />
              <div className="relative rounded-[32px] border border-white/20 bg-white/10 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur">
                <div className="rounded-[28px] bg-white p-5 sm:p-6">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7b8d83]">
                        Marketplace preview
                      </div>
                      <h2 className="brand mt-2 text-3xl leading-tight text-[#111827] sm:text-4xl">
                        Designed to feel clean on mobile
                      </h2>
                    </div>
                    <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-[var(--green-primary)]">
                      Live concept
                    </div>
                  </div>

                  <div className="rounded-[28px] bg-[linear-gradient(135deg,#0f5c35,#22a063)] p-5 text-white shadow-[0_18px_50px_rgba(34,160,99,0.25)]">
                    <div className="flex items-start justify-between gap-4">
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

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[24px] border border-[var(--border)] bg-[var(--green-ghost)] p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7b8d83]">Vendor</div>
                      <div className="mt-2 text-lg font-extrabold text-[var(--charcoal)]">Store setup</div>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        Cleaner onboarding, product listing, and stronger seller presentation.
                      </p>
                    </div>

                    <div className="rounded-[24px] border border-[var(--border)] bg-[var(--green-ghost)] p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7b8d83]">Affiliate</div>
                      <div className="mt-2 text-lg font-extrabold text-[var(--charcoal)]">Earn from sharing</div>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        Turn attention and reach into conversion-based income.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Escrow", "Verified", "Delivery", "Auction", "Request"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-[var(--green-primary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Escrow", "buyer protection"],
              ["Free", "to start selling"],
              ["SA", "market focus"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-[28px] border border-white/15 bg-white/10 px-5 py-5 text-center backdrop-blur"
              >
                <div className="brand text-4xl text-white">{value}</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <div className="badge-soft">Why it feels better</div>
          <h2 className="brand mt-4 text-3xl text-[var(--charcoal)] sm:text-4xl">
            Premium blocks, calmer spacing, stronger trust signals
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--muted)]">
            The landing experience now feels more deliberate on mobile, with better hierarchy, safer spacing, and cleaner marketplace storytelling.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[0_10px_30px_rgba(26,122,74,0.08)]"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#effaf4,#daf4e7)] text-[var(--green-primary)]">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-extrabold text-[var(--charcoal)]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{feature.text}</p>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}