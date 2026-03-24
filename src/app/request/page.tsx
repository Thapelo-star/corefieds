'use client'
import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase-client'
import { ShoppingBag, Plus, Search, MapPin, DollarSign, ChevronRight, Check } from 'lucide-react'

const CATEGORIES = ['Fashion','Electronics','Beauty','Kitchen','Home & Garden','Sports','Farming','Vehicles','Furniture','Toys','Educational','Services','Property','Other']
const PROVINCES = ['Any Province','Gauteng','Western Cape','KwaZulu-Natal','Eastern Cape','Limpopo','Mpumalanga','North West','Free State','Northern Cape']

function RequestContent() {
  const { user, profile } = useAuth()
  const router = useRouter()
  const font = "'Plus Jakarta Sans',sans-serif"
  const syne = "'Syne',sans-serif"
  const [requests, setRequests] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({ title:'', description:'', category:'Electronics', budget:'', province:'Any Province' })

  useEffect(() => { loadRequests() }, [])

  async function loadRequests() {
    const supabase = createClient()
    const { data } = await supabase.from('product_requests').select('*, user:profiles(full_name)').eq('status','open').order('created_at',{ascending:false}).limit(20)
    setRequests(data || [])
    setLoading(false)
  }

  async function submitRequest(e: React.FormEvent) {
    e.preventDefault()
    if (!user) { router.push('/login'); return }
    setSubmitting(true)
    const supabase = createClient()
    await supabase.from('product_requests').insert({ user_id:user.id, title:form.title, description:form.description, category:form.category, budget:form.budget?parseFloat(form.budget):null, province:form.province })
    setSubmitting(false)
    setSuccess(true)
    setShowForm(false)
    setForm({title:'',description:'',category:'Electronics',budget:'',province:'Any Province'})
    loadRequests()
    setTimeout(() => setSuccess(false), 4000)
  }

  const DEMO_REQUESTS = [
    { id:'r1', title:'Looking for Jordan 4 Retro Shoes Size 10', description:'Specifically looking for Jordan 4 Retro in White Cement or Black Cat colourway. Must be authentic.', category:'Fashion', budget:4500, province:'Gauteng', offers_count:3, created_at:new Date(Date.now()-3600000).toISOString(), user:{full_name:'Sipho D.'} },
    { id:'r2', title:'Need iPhone 14 Pro Max 256GB', description:'Looking for a used or refurbished iPhone 14 Pro Max, any colour, good condition.', category:'Electronics', budget:12000, province:'Any Province', offers_count:7, created_at:new Date(Date.now()-86400000).toISOString(), user:{full_name:'Naledi K.'} },
    { id:'r3', title:'Wanted: 6-seater dining table and chairs', description:'Looking for a solid wood dining set, preferably oak or similar. Good condition used is fine.', category:'Furniture', budget:8000, province:'Western Cape', offers_count:2, created_at:new Date(Date.now()-172800000).toISOString(), user:{full_name:'Thabo M.'} },
  ]

  const displayRequests = requests.length > 0 ? requests : DEMO_REQUESTS

  return (
    <div style={{minHeight:'100vh',background:'#f4faf7',fontFamily:font}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet"/>
      <nav style={{background:'white',borderBottom:'1px solid #e2ece7',boxShadow:'0 1px 8px rgba(0,0,0,0.05)'}}>
        <div style={{maxWidth:1100,margin:'0 auto',padding:'0 24px',height:60,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Link href="/home" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
            <div style={{width:32,height:32,borderRadius:10,background:'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center'}}><ShoppingBag size={15} color="white"/></div>
            <span style={{fontFamily:syne,fontWeight:800,fontSize:18,color:'#111714'}}>Corefieds</span>
          </Link>
          <Link href="/home" style={{fontSize:13,fontWeight:700,color:'#1a7a4a',textDecoration:'none'}}>← Home</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{background:'linear-gradient(135deg,#0f5c35,#22a063)',padding:'40px 24px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',width:300,height:300,borderRadius:'50%',background:'rgba(255,255,255,0.05)',top:-100,right:-80}}/>
        <div style={{position:'relative',zIndex:2}}>
          <div style={{fontSize:40,marginBottom:12}}>🔍</div>
          <h1 style={{fontFamily:syne,fontWeight:800,fontSize:32,color:'white',marginBottom:8}}>Find a Product</h1>
          <p style={{color:'rgba(255,255,255,0.8)',fontSize:15,marginBottom:24,maxWidth:480,margin:'0 auto 24px'}}>Can't find what you're looking for? Post a request and let verified vendors come to you with offers.</p>
          <button onClick={() => user ? setShowForm(!showForm) : router.push('/login')}
            style={{display:'inline-flex',alignItems:'center',gap:8,background:'white',color:'#0f5c35',fontWeight:800,fontSize:15,padding:'13px 32px',borderRadius:12,border:'none',cursor:'pointer',fontFamily:font,boxShadow:'0 4px 16px rgba(0,0,0,0.15)'}}>
            <Plus size={16}/> Post a Product Request
          </button>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'28px 24px'}}>

        {success && (
          <div style={{background:'#dcfce7',border:'1px solid #bbf7d0',color:'#16a34a',fontSize:14,fontWeight:700,borderRadius:14,padding:16,marginBottom:20,display:'flex',alignItems:'center',gap:8}}>
            <Check size={16}/> Your request has been posted! Vendors will reach out to you with offers.
          </div>
        )}

        {/* Post form */}
        {showForm && (
          <div style={{background:'white',borderRadius:20,padding:28,border:'1px solid #e2ece7',marginBottom:24,boxShadow:'0 4px 24px rgba(26,122,74,0.10)'}}>
            <h3 style={{fontFamily:syne,fontWeight:800,fontSize:20,color:'#111714',marginBottom:20}}>Post Your Product Request</h3>
            <form onSubmit={submitRequest}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
                <div style={{gridColumn:'1/-1'}}>
                  <label style={{display:'block',fontSize:12,fontWeight:700,color:'#6b8275',marginBottom:6}}>What are you looking for? *</label>
                  <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required
                    placeholder="e.g. iPhone 14 Pro Max 256GB, Jordan 4 Retro Size 10..."
                    style={{width:'100%',border:'1.5px solid #e2ece7',borderRadius:12,padding:'12px 14px',fontSize:14,fontFamily:font,outline:'none',color:'#1c2b22',boxSizing:'border-box'}}/>
                </div>
                <div style={{gridColumn:'1/-1'}}>
                  <label style={{display:'block',fontSize:12,fontWeight:700,color:'#6b8275',marginBottom:6}}>Description (optional)</label>
                  <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})}
                    placeholder="Provide more details — condition, colour, specs, etc."
                    style={{width:'100%',border:'1.5px solid #e2ece7',borderRadius:12,padding:'12px 14px',fontSize:14,fontFamily:font,outline:'none',color:'#1c2b22',boxSizing:'border-box',height:80,resize:'vertical'}}/>
                </div>
                <div>
                  <label style={{display:'block',fontSize:12,fontWeight:700,color:'#6b8275',marginBottom:6}}>Category</label>
                  <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}
                    style={{width:'100%',border:'1.5px solid #e2ece7',borderRadius:12,padding:'12px 14px',fontSize:14,fontFamily:font,outline:'none',color:'#1c2b22',background:'white',boxSizing:'border-box'}}>
                    {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{display:'block',fontSize:12,fontWeight:700,color:'#6b8275',marginBottom:6}}>Your Budget (R)</label>
                  <input type="number" value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})}
                    placeholder="e.g. 5000"
                    style={{width:'100%',border:'1.5px solid #e2ece7',borderRadius:12,padding:'12px 14px',fontSize:14,fontFamily:font,outline:'none',color:'#1c2b22',boxSizing:'border-box'}}/>
                </div>
                <div>
                  <label style={{display:'block',fontSize:12,fontWeight:700,color:'#6b8275',marginBottom:6}}>Province</label>
                  <select value={form.province} onChange={e=>setForm({...form,province:e.target.value})}
                    style={{width:'100%',border:'1.5px solid #e2ece7',borderRadius:12,padding:'12px 14px',fontSize:14,fontFamily:font,outline:'none',color:'#1c2b22',background:'white',boxSizing:'border-box'}}>
                    {PROVINCES.map(p=><option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div style={{display:'flex',gap:12}}>
                <button type="submit" disabled={submitting}
                  style={{flex:1,padding:14,borderRadius:12,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:800,fontSize:15,border:'none',cursor:'pointer',fontFamily:font}}>
                  {submitting?'Posting...':'Post Request'}
                </button>
                <button type="button" onClick={()=>setShowForm(false)}
                  style={{padding:'14px 20px',borderRadius:12,background:'#f4faf7',color:'#6b8275',border:'1px solid #e2ece7',fontWeight:700,fontSize:14,cursor:'pointer',fontFamily:font}}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={{marginBottom:20,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h2 style={{fontFamily:syne,fontWeight:800,fontSize:20,color:'#111714',margin:0}}>Open Requests</h2>
          <span style={{fontSize:13,color:'#6b8275'}}>{displayRequests.length} active requests</span>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {displayRequests.map(r=>(
            <div key={r.id} style={{background:'white',borderRadius:18,padding:22,border:'1px solid #e2ece7',boxShadow:'0 2px 12px rgba(26,122,74,0.06)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:16,flexWrap:'wrap'}}>
                <div style={{flex:1}}>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:8}}>
                    <span style={{background:'#edfaf3',color:'#1a7a4a',fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:50,border:'1px solid #d4f5e6'}}>{r.category}</span>
                    {r.province && r.province!=='Any Province' && <span style={{background:'#f4faf7',color:'#6b8275',fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:50,display:'flex',alignItems:'center',gap:3}}><MapPin size={9}/>{r.province}</span>}
                  </div>
                  <h3 style={{fontWeight:800,fontSize:16,color:'#1c2b22',marginBottom:6}}>{r.title}</h3>
                  {r.description && <p style={{fontSize:13,color:'#6b8275',lineHeight:1.6,margin:'0 0 10px'}}>{r.description}</p>}
                  <div style={{display:'flex',gap:16,alignItems:'center',flexWrap:'wrap'}}>
                    {r.budget && <div style={{display:'flex',alignItems:'center',gap:4,fontSize:13,fontWeight:700,color:'#1a7a4a'}}><DollarSign size={13}/>Budget: R{parseFloat(r.budget).toLocaleString()}</div>}
                    <div style={{fontSize:12,color:'#6b8275'}}>by {r.user?.full_name||'Anonymous'} · {new Date(r.created_at).toLocaleDateString('en-ZA',{day:'numeric',month:'short'})}</div>
                  </div>
                </div>
                <div style={{textAlign:'center',flexShrink:0}}>
                  <div style={{fontFamily:syne,fontWeight:800,fontSize:24,color:'#1a7a4a'}}>{r.offers_count||0}</div>
                  <div style={{fontSize:11,color:'#6b8275',fontWeight:600}}>Offers</div>
                  {profile?.role === 'vendor' && (
                    <button style={{marginTop:10,padding:'8px 16px',borderRadius:10,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:700,fontSize:12,border:'none',cursor:'pointer',fontFamily:font}}>
                      Make Offer
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function RequestPage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{color:'#1a7a4a',fontWeight:700}}>Loading...</div></div>}>
      <RequestContent/>
    </Suspense>
  )
}
