import type { ReactNode } from "react"

export function PageWrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`min-h-screen bg-[var(--surface)] text-[var(--text)] ${className}`}>{children}</div>
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

export function Hero({
  badge,
  title,
  subtitle,
  children,
}: {
  badge?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0f5c35_0%,#1a7a4a_55%,#22a063_100%)] text-white">
      <div className="absolute -left-16 top-8 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-200/10 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-lime-100/10 blur-2xl" />
      <Container className="relative py-10 sm:py-14 lg:py-16">
        {badge ? (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold backdrop-blur">
            {badge}
          </div>
        ) : null}
        <div className="max-w-3xl">
          <h1 className="brand text-4xl leading-[0.98] sm:text-5xl lg:text-6xl">{title}</h1>
          {subtitle ? <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">{subtitle}</p> : null}
          {children ? <div className="mt-7">{children}</div> : null}
        </div>
      </Container>
    </section>
  )
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[0_10px_30px_rgba(26,122,74,0.08)] sm:p-6 ${className}`}>
      {children}
    </div>
  )
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <div className="inline-flex rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--green-primary)]">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="brand mt-4 text-3xl text-[var(--charcoal)] sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-base">{subtitle}</p> : null}
    </div>
  )
}