"use client"

import Link from "next/link"
import { Flame, Search, ShoppingCart, ShieldCheck, Sparkles, Star, Store, TrendingUp } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { TopBar, PageHeader, SurfaceCard } from "@/components/ui/AppChrome"

const categories = [
  { name: "All", emoji: "🛍️" },
  { name: "Accessories", emoji: "⌚" },
  { name: "Beauty", emoji: "✨" },
  { name: "Electronics", emoji: "🎧" },
  { name: "Home", emoji: "🏠" },
  { name: "Fashion", emoji: "👕" },
]

const featured = [
  {
    id: "1",
    title: "Amped Fitness T-Shirt",
    price: 489,
    oldPrice: 679,
    rating: 4.9,
    reviews: 132,
    emoji: "👕",
    bg: "bg-[#eef8f1]",
  },
  {
    id: "2",
    title: "Bluetooth Earbuds Pro",
    price: 799,
    oldPrice: 999,
    rating: 4.7,
    reviews: 88,
    emoji: "🎧",
    bg: "bg-[#eef4fb]",
  },
  {
    id: "3",
    title: "Glow Serum Bundle",
    price: 589,
    oldPrice: 699,
    rating: 4.6,
    reviews: 215,
    emoji: "🧴",
    bg: "bg-[#fbf0f7]",
  },
  {
    id: "4",
    title: "Gaming Chair Pro",
    price: 3299,
    oldPrice: 4599,
    rating: 4.7,
    reviews: 41,
    emoji: "🪑",
    bg: "bg-[#eef8f1]",
  },
]

const highlights = [
  {
    badge: "THIS WEEK",
    title: "New Arrivals",
    subtitle: "Just dropped",
    bg: "bg-[linear-gradient(135deg,#17824b,#2fb36c)]",
  },
  {
    badge: "FLASH",
    title: "Electronics",
    subtitle: "Up to 30% off",
    bg: "bg-[linear-gradient(135deg,#2952b8,#3b82f6)]",
  },
  {
    badge: "TUESDAY",
    title: "Choose Day",
    subtitle: "Weekly curated picks",
    bg: "bg-[linear-gradient(135deg,#7c3aed,#a855f7)]",
  },
]

export default function HomePage() {
  const { addItem, count } = useCart()

  return (
    <div className="min-h-screen bg-[var(--surface)] pb-28">
      <TopBar
        right={
          <Link href="/cart" className="relative btn-soft !h-11 !px-4">
            <ShoppingCart size={16} />
            Cart
            {count > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-[var(--green-primary)] px-1 text-xs font-extrabold text-white">
                {count}
              </span>
            ) : null}
          </Link>
        }
      />

      <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Marketplace"
          title="Discover products people actually want to buy"
          subtitle="A cleaner shopping experience built around stronger trust, curated discovery, and seller visibility."
          actions={
            <>
              <Link href="/request" className="btn-soft">
                <Search size={15} />
                Product request
              </Link>
              <Link href="/affiliate" className="btn-primary">
                <TrendingUp size={15} />
                Earn as affiliate
              </Link>
            </>
          }
        />

        <SurfaceCard className="bg-[linear-gradient(135deg,#0f5c35_0%,#1a7a4a_50%,#22a063_100%)] text-white shadow-[0_20px_70px_rgba(26,122,74,0.22)]">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                <Sparkles size={15} />
                Fresh marketplace energy
              </div>
              <h2 className="brand mt-5 text-4xl leading-[0.95] sm:text-5xl">
                Shop with confidence on a marketplace designed to feel premium.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/80">
                Better categories, cleaner product cards, and stronger buyer trust signals make the whole experience easier to share proudly.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">Escrow-first flow</div>
                <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">Verified sellers</div>
                <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">Mobile-first layout</div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [ShieldCheck, "Protected checkout", "Buyer funds stay protected until delivery is confirmed."],
                [Store, "Seller visibility", "Premium listing presentation helps vendors feel more credible."],
              ].map(([Icon, title, text], idx) => {
                const Cmp = Icon as any
                return (
                  <div key={idx} className="rounded-[26px] border border-white/15 bg-white/10 p-5 backdrop-blur">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[var(--green-primary)]">
                      <Cmp size={20} />
                    </div>
                    <div className="text-lg font-extrabold">{title}</div>
                    <div className="mt-2 text-sm leading-7 text-white/75">{text}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </SurfaceCard>

        <section className="mt-10">
          <h2 className="brand text-3xl text-[var(--charcoal)] sm:text-4xl">Shop by category</h2>
          <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
            {categories.map((category, idx) => (
              <button
                key={category.name}
                className={`min-w-[140px] rounded-[28px] border px-5 py-6 text-center shadow-sm ${
                  idx === 0
                    ? "border-[var(--green-mid)] bg-emerald-50"
                    : "border-[var(--border)] bg-white"
                }`}
              >
                <div className="text-4xl">{category.emoji}</div>
                <div className="mt-3 text-lg font-extrabold text-[var(--charcoal)]">{category.name}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className={`rounded-[32px] ${highlights[0].bg} p-6 text-white shadow-[0_16px_50px_rgba(0,0,0,0.14)]`}>
            <div className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">{highlights[0].badge}</div>
            <h3 className="brand mt-5 text-[clamp(2.4rem,8vw,4.5rem)] leading-[0.92]">
              {highlights[0].title}
              <br />
              {highlights[0].subtitle}
            </h3>
          </div>

          <div className="grid gap-4">
            {highlights.slice(1).map((item) => (
              <div key={item.title} className={`rounded-[32px] ${item.bg} p-6 text-white shadow-[0_16px_50px_rgba(0,0,0,0.14)]`}>
                <div className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">{item.badge}</div>
                <h3 className="brand mt-5 text-4xl leading-[0.95]">{item.title}</h3>
                <p className="mt-3 text-lg text-white/80">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-center justify-between gap-4">
            <h2 className="flex items-center gap-3 brand text-3xl text-[var(--charcoal)] sm:text-4xl">
              <Flame className="text-orange-500" size={24} />
              Featured products
            </h2>
            <Link href="/wishlist" className="text-lg font-extrabold text-[var(--green-primary)]">
              See all
            </Link>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((product) => (
              <div key={product.id} className="rounded-[30px] border border-[var(--border)] bg-white p-4 shadow-[0_10px_30px_rgba(26,122,74,0.08)]">
                <div className={`relative flex h-56 items-center justify-center rounded-[26px] ${product.bg}`}>
                  <div className="absolute left-4 top-4 flex gap-2">
                    <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-extrabold text-white">
                      -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                    </span>
                    <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-extrabold text-white">
                      HOT
                    </span>
                  </div>
                  <div className="text-7xl">{product.emoji}</div>
                </div>

                <div className="mt-5">
                  <h3 className="text-2xl font-extrabold leading-tight text-[var(--charcoal)]">{product.title}</h3>
                  <div className="mt-3 flex items-center gap-2 text-sm text-[var(--muted)]">
                    <Star size={15} className="fill-amber-400 text-amber-400" />
                    {product.rating}
                    <span>({product.reviews})</span>
                  </div>

                  <div className="mt-4 flex items-end gap-3">
                    <div className="brand text-4xl text-[var(--green-primary)]">R{product.price.toLocaleString()}</div>
                    <div className="text-lg text-[var(--muted)] line-through">R{product.oldPrice.toLocaleString()}</div>
                  </div>

                  <button
                    onClick={() =>
                      addItem({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        quantity: 1,
                        image: product.emoji,
                        vendorName: "Corefieds Vendor",
                      })
                    }
                    className="btn-primary mt-5 h-14 w-full rounded-[24px] text-lg"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}