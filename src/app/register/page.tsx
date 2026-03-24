'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShoppingBag, Store, TrendingUp, Shield, Eye, EyeOff, ArrowRight, Check } from 'lucide-react'
import type { UserRole } from '@/types'

const roles = [
  { id: 'buyer' as UserRole, icon: ShoppingBag, label: 'Buyer', desc: 'Shop safely with escrow protection', grad: 'linear-gradient(135deg,#0f5c35,#22a063)' },
  { id: 'vendor' as UserRole, icon: Store, label: 'Vendor', desc: 'List products free, sell to thousands', grad: 'linear-gradient(135deg,#1e3a8a,#3b82f6)' },
  { id: 'affiliate' as UserRole, icon: TrendingUp, label: 'Affiliate', desc: 'Share links, earn commissions', grad: 'linear-gradient(135deg,#7c3aed,#a855f7)' },
]

export default function RegisterPage() {
  const [role, setRole] = useState<UserRole>('buyer')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, role } }
      })
      if (signUpError) throw signUpError
      if (data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id, email, full_name: fullName, role, is_verified: false,
        })
        router.push('/home')
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width:'100%', border:'1.5px solid #e2ece7', borderRadius:12, padding:'13px 16px',
    fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, color:'#1c2b22',
    background:'white', outline:'none', boxSizing:'border-box' as const,
  }
  const labelStyle = { display:'block', fontSize:12, fontWeight:700, color:'#6b8275', marginBottom:6 }

  return (
    <div style={{minHeight:'100vh',background:'#f4faf7',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet" />

      {/* Hero header */}
      <div style={{background:'linear-gradient(135deg,#0f5c35,#1a7a4a 60%,#22a063)',padding:'48px 24px 40px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',width:260,height:260,borderRadius:'50%',background:'rgba(255,255,255,0.06)',top:-80,right:-60}} />
        <div style={{position:'absolute',width:140,height:140,borderRadius:'50%',background:'rgba(255,255,255,0.04)',bottom:-30,left:30}} />
        <div style={{position:'relative',zIndex:2,maxWidth:520,margin:'0 auto'}}>
          <Link href="/" style={{display:'inline-flex',alignItems:'center',gap:10,marginBottom:24,textDecoration:'none'}}>
            <div style={{width:38,height:38,borderRadius:12,background:'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <ShoppingBag size={18} color="white" />
            </div>
            <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:20,color:'white'}}>Corefieds</span>
          </Link>
          <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:32,color:'white',marginBottom:6,letterSpacing:'-0.5px'}}>Create your account</h1>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:14}}>Join South Africa&apos;s safest marketplace — free to start</p>
        </div>
      </div>

      <div style={{maxWidth:520,margin:'0 auto',padding:'32px 24px 60px'}}>

        {/* Role selector */}
        <div style={{marginBottom:24}}>
          <p style={{fontSize:13,fontWeight:700,color:'#6b8275',marginBottom:12}}>I want to join as a:</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
            {roles.map(r => {
              const Icon = r.icon
              const selected = role === r.id
              return (
                <button key={r.id} onClick={() => setRole(r.id)}
                  style={{position:'relative',padding:16,borderRadius:18,border:selected?'2px solid #22a063':'2px solid #e2ece7',background:selected?'#edfaf3':'white',cursor:'pointer',textAlign:'left',transition:'all .2s',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                  {selected && (
                    <div style={{position:'absolute',top:8,right:8,width:20,height:20,borderRadius:'50%',background:'#22a063',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <Check size={11} color="white" />
                    </div>
                  )}
                  <div style={{width:44,height:44,borderRadius:14,background:r.grad,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:10}}>
                    <Icon size={20} color="white" />
                  </div>
                  <div style={{fontWeight:800,fontSize:13,color:'#111714',marginBottom:4}}>{r.label}</div>
                  <div style={{fontSize:11,color:'#6b8275',lineHeight:1.4}}>{r.desc}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} style={{background:'white',borderRadius:20,padding:24,border:'1px solid #e2ece7',boxShadow:'0 2px 12px rgba(26,122,74,0.07)'}}>
          <div style={{marginBottom:16}}>
            <label style={labelStyle}>Full Name</label>
            <input style={inputStyle} type="text" placeholder="e.g. Thapelo Arthur"
              value={fullName} onChange={e => setFullName(e.target.value)} required />
          </div>
          <div style={{marginBottom:16}}>
            <label style={labelStyle}>Email Address</label>
            <input style={inputStyle} type="email" placeholder="you@email.co.za"
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div style={{marginBottom:20}}>
            <label style={labelStyle}>Password</label>
            <div style={{position:'relative'}}>
              <input style={{...inputStyle,paddingRight:48}} type={showPw?'text':'password'}
                placeholder="Min. 8 characters" value={password}
                onChange={e => setPassword(e.target.value)} minLength={8} required />
              <button type="button" onClick={() => setShowPw(!showPw)}
                style={{position:'absolute',right:14,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#6b8275',display:'flex'}}>
                {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
          </div>

          {error && (
            <div style={{background:'#fff0f0',border:'1px solid #fecaca',color:'#dc2626',fontSize:13,borderRadius:10,padding:12,marginBottom:16}}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            style={{width:'100%',padding:'15px',borderRadius:14,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:800,fontSize:15,border:'none',cursor:loading?'not-allowed':'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",display:'flex',alignItems:'center',justifyContent:'center',gap:8,opacity:loading?0.8:1,boxShadow:'0 4px 16px rgba(26,122,74,0.3)'}}>
            {loading ? 'Creating account...' : <><span>Create Free Account</span><ArrowRight size={16}/></>}
          </button>

          {/* Trust strip */}
          <div style={{marginTop:16,background:'linear-gradient(135deg,#edfdf4,#d4f5e6)',border:'1px solid #bbf7d0',borderRadius:12,padding:12}}>
            <div style={{display:'flex',flexWrap:'wrap',gap:10,justifyContent:'center'}}>
              {['🔒 Trade-Safe Escrow','✓ Free to Join','🚚 Courier Guy & Fastway'].map(t=>(
                <span key={t} style={{fontSize:11,fontWeight:700,color:'#166534'}}>{t}</span>
              ))}
            </div>
          </div>
        </form>

        <p style={{textAlign:'center',fontSize:14,color:'#6b8275',marginTop:20}}>
          Already have an account?{' '}
          <Link href="/login" style={{fontWeight:800,color:'#1a7a4a',textDecoration:'none'}}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
