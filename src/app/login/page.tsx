'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShoppingBag, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
      if (loginError) throw loginError
      router.push('/home')
    } catch (err: any) {
      setError('Incorrect email or password. Please try again.')
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

      {/* Hero */}
      <div style={{background:'linear-gradient(135deg,#0f5c35,#1a7a4a 60%,#22a063)',padding:'48px 24px 40px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',width:260,height:260,borderRadius:'50%',background:'rgba(255,255,255,0.06)',top:-80,right:-60}} />
        <div style={{position:'relative',zIndex:2,maxWidth:520,margin:'0 auto'}}>
          <Link href="/" style={{display:'inline-flex',alignItems:'center',gap:10,marginBottom:24,textDecoration:'none'}}>
            <div style={{width:38,height:38,borderRadius:12,background:'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <ShoppingBag size={18} color="white" />
            </div>
            <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:20,color:'white'}}>Corefieds</span>
          </Link>
          <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:32,color:'white',marginBottom:6,letterSpacing:'-0.5px'}}>Welcome back</h1>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:14}}>Sign in to your Corefieds account</p>
        </div>
      </div>

      <div style={{maxWidth:520,margin:'0 auto',padding:'32px 24px 60px'}}>
        <form onSubmit={handleLogin} style={{background:'white',borderRadius:20,padding:28,border:'1px solid #e2ece7',boxShadow:'0 2px 12px rgba(26,122,74,0.07)'}}>
          <div style={{marginBottom:16}}>
            <label style={labelStyle}>Email Address</label>
            <input style={inputStyle} type="email" placeholder="you@email.co.za"
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div style={{marginBottom:8}}>
            <label style={labelStyle}>Password</label>
            <div style={{position:'relative'}}>
              <input style={{...inputStyle,paddingRight:48}} type={showPw?'text':'password'}
                placeholder="Your password" value={password}
                onChange={e => setPassword(e.target.value)} required />
              <button type="button" onClick={() => setShowPw(!showPw)}
                style={{position:'absolute',right:14,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#6b8275',display:'flex'}}>
                {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
          </div>
          <div style={{textAlign:'right',marginBottom:20}}>
            <Link href="/forgot-password" style={{fontSize:12,fontWeight:700,color:'#1a7a4a',textDecoration:'none'}}>Forgot password?</Link>
          </div>

          {error && (
            <div style={{background:'#fff0f0',border:'1px solid #fecaca',color:'#dc2626',fontSize:13,borderRadius:10,padding:12,marginBottom:16}}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            style={{width:'100%',padding:'15px',borderRadius:14,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:800,fontSize:15,border:'none',cursor:loading?'not-allowed':'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",display:'flex',alignItems:'center',justifyContent:'center',gap:8,opacity:loading?0.8:1,boxShadow:'0 4px 16px rgba(26,122,74,0.3)'}}>
            {loading ? 'Signing in...' : <><span>Sign In</span><ArrowRight size={16}/></>}
          </button>

          <div style={{marginTop:16,display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>
            <Shield size={13} color="#22a063"/>
            <span style={{fontSize:12,color:'#6b8275'}}>Protected by Trade-Safe Escrow</span>
          </div>
        </form>

        <p style={{textAlign:'center',fontSize:14,color:'#6b8275',marginTop:20}}>
          Don&apos;t have an account?{' '}
          <Link href="/register" style={{fontWeight:800,color:'#1a7a4a',textDecoration:'none'}}>Create one free</Link>
        </p>
      </div>
    </div>
  )
}
