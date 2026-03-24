'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingBag, Search, ShoppingCart, User, Menu, X, Bell, ChevronDown, LogOut, Package, Heart, TrendingUp } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/components/auth/AuthProvider'

export function Navbar() {
  const { count } = useCart()
  const { user, profile, signOut } = useAuth()
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (search.trim()) router.push('/home?search=' + encodeURIComponent(search))
  }

  return (
    <>
      {/* Top bar */}
      <div style={{background:'var(--green-deep,#0f5c35)'}} className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-between text-xs text-white/70">
          <span>🇿🇦 South Africa's Safest Marketplace · Trade-Safe Escrow · The Courier Guy & Fastway</span>
          <span>📞 069-492-3688 · corefieds@gmail.com</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[var(--border)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center gap-4">
            {/* Logo */}
            <Link href="/home" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:'linear-gradient(135deg,#0f5c35,#22a063)'}}>
                <ShoppingBag size={18} color="white" />
              </div>
              <span className="brand text-xl hidden sm:block" style={{color:'var(--text)'}}>Corefieds</span>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search products, vendors, categories..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all bg-[var(--surface)]"
                />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Cart */}
              <Link href="/cart" className="relative p-2 rounded-xl hover:bg-[var(--surface)] transition-colors">
                <ShoppingCart size={22} style={{color:'var(--text)'}} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-800 rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>

              {/* Notifications */}
              {user && (
                <button className="relative p-2 rounded-xl hover:bg-[var(--surface)] transition-colors hidden md:flex">
                  <Bell size={22} style={{color:'var(--text)'}} />
                </button>
              )}

              {/* Profile or auth */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[var(--surface)] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-700 text-white" style={{background:'linear-gradient(135deg,#0f5c35,#22a063)'}}>
                      {profile?.full_name?.[0] || 'U'}
                    </div>
                    <span className="text-sm font-600 hidden md:block" style={{color:'var(--text)'}}>
                      {profile?.full_name?.split(' ')[0] || 'Account'}
                    </span>
                    <ChevronDown size={14} style={{color:'var(--muted)'}} />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-card-hover border border-[var(--border)] overflow-hidden z-50">
                      <div className="p-4 border-b border-[var(--border)]">
                        <div className="font-700 text-sm">{profile?.full_name}</div>
                        <div className="text-xs text-[var(--muted)] mt-0.5">{profile?.email}</div>
                        <span className="badge-verified mt-2">✓ {profile?.role}</span>
                      </div>
                      {[
                        { href: '/profile', icon: User, label: 'My Profile' },
                        { href: '/orders', icon: Package, label: 'My Orders' },
                        { href: '/wishlist', icon: Heart, label: 'Saved Items' },
                        { href: '/affiliate', icon: TrendingUp, label: 'Affiliate Dashboard' },
                      ].map(item => {
                        const Icon = item.icon
                        return (
                          <Link key={item.href} href={item.href}
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-[var(--surface)] transition-colors">
                            <Icon size={15} style={{color:'var(--muted)'}} />
                            <span style={{color:'var(--text)'}}>{item.label}</span>
                          </Link>
                        )
                      })}
                      <button onClick={() => { signOut(); setProfileOpen(false) }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-[var(--border)]">
                        <LogOut size={15} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="text-sm font-700 px-4 py-2 rounded-xl hover:bg-[var(--surface)] transition-colors" style={{color:'var(--text)'}}>
                    Sign In
                  </Link>
                  <Link href="/register" className="btn-primary text-sm px-4 py-2">
                    Join Free
                  </Link>
                </div>
              )}

              {/* Mobile menu */}
              <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-xl hover:bg-[var(--surface)] md:hidden">
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Category nav */}
          <div className="hidden md:flex items-center gap-1 pb-2 overflow-x-auto scrollbar-none">
            {[
              {label:'All Products', href:'/home'},
              {label:'Fashion', href:'/home?cat=fashion'},
              {label:'Electronics', href:'/home?cat=electronics'},
              {label:'Beauty', href:'/home?cat=beauty'},
              {label:'Home & Garden', href:'/home?cat=home-garden'},
              {label:'Kitchen', href:'/home?cat=kitchen'},
              {label:'Sports', href:'/home?cat=sports'},
              {label:'Farming', href:'/home?cat=farming'},
              {label:'Vehicles', href:'/home?cat=vehicles'},
              {label:'Services', href:'/home?cat=services'},
              {label:'Auctions 🔥', href:'/auctions'},
            ].map(item => (
              <Link key={item.href} href={item.href}
                className="text-xs font-700 px-3 py-1.5 rounded-lg whitespace-nowrap hover:bg-[var(--surface)] transition-colors flex-shrink-0"
                style={{color:'var(--muted)'}}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-[var(--border)] bg-white px-4 py-4 space-y-2">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search..." className="input-field pl-9 py-2.5 text-sm" />
              </div>
            </form>
            {['/home','/orders','/affiliate','/cart','/profile'].map(href => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                className="block py-2.5 text-sm font-600 capitalize border-b border-[var(--border)]" style={{color:'var(--text)'}}>
                {href.replace('/', '') || 'Home'}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}
