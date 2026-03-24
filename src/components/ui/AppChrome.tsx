import Link from "next/link"
import type { ReactNode } from "react"
import { ShoppingBag, ArrowLeft } from "lucide-react"

export function TopBar({
  title = "Corefieds",
  backHref,
  backLabel = "Back",
  right,
}: {
  title?: string
  backHref?: string
  backLabel?: string
  right?: ReactNode
}) {
  return (
    <div className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {backHref ? (
            <Link href={backHref} className="btn-soft !h-11 !px-4">
              <ArrowLeft size={16} />
              {backLabel}
            </Link>
          ) : (
            <Link href="/home" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f5c35,#22a063)] text-white shadow-lg">
                <ShoppingBag size={18} />
              </div>
              <div>
                <div className="brand text-lg text-[var(--charcoal)]">Corefieds</div>
                <div className="text-xs text-[var(--muted)]">Secure marketplace for modern trade</div>
              </div>
            </Link>
          )}
        </div>
        {right ? <div className="flex items-center gap-3">{right}</div> : null}
      </div>
    </div>
  )
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  actions?: ReactNode
}) {
  return (
    <div className="mb-8">
      {eyebrow ? <div className="badge-soft">{eyebrow}</div> : null}
      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h1 className="brand text-3xl text-[var(--charcoal)] sm:text-4xl">{title}</h1>
          {subtitle ? <p className="mt-3 text-sm leading-7 text-[var(--muted)] sm:text-base">{subtitle}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </div>
  )
}

export function SurfaceCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[0_10px_30px_rgba(26,122,74,0.08)] sm:p-6 ${className}`}>{children}</div>
}

export function MetricCard({
  label,
  value,
  helper,
}: {
  label: string
  value: ReactNode
  helper?: string
}) {
  return (
    <SurfaceCard className="p-5">
      <div className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{label}</div>
      <div className="brand mt-3 text-3xl text-[var(--charcoal)]">{value}</div>
      {helper ? <div className="mt-2 text-sm text-[var(--muted)]">{helper}</div> : null}
    </SurfaceCard>
  )
}

export function EmptyState({
  title,
  text,
  action,
}: {
  title: string
  text: string
  action?: ReactNode
}) {
  return (
    <SurfaceCard className="py-14 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--green-ghost)] text-4xl">✨</div>
      <h2 className="brand mt-6 text-2xl text-[var(--charcoal)]">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--muted)]">{text}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </SurfaceCard>
  )
}