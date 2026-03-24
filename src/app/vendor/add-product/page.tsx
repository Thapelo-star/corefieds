'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase-client'
import { ShoppingBag, ArrowLeft, Plus, X, Check } from 'lucide-react'

const CATEGORIES = ['fashion','electronics','beauty','kitchen','home-garden','sports','farming','lighting','accessories','toys','furniture','vehicles','educational','services','property']
const SIZES_PRESET = ['XS','S','M','L','XL','XXL','XXXL']
const COLORS_PRESET = ['Black','White','Cream White','Grey','Navy','Red','Blue','Green','Yellow','Pink','Orange','Purple']

export default function AddProductPage() {
  const { user } = useAuth()
  const router = useRouter()
  const font = "'Plus Jakarta Sans',sans-serif"
  const syne = "'Syne',sans-serif"

  const [form, setForm] = useState({
    title:'',description:'',price:'',original_price:'',
    category_slug:'fashion',condition:'new',stock_qty:'',
  })
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [customColor, setCustomColor] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function toggleSize(s: string) {
    setSelectedSizes(prev=>prev.includes(s)?prev.filter(x=>x!==s):[...prev,s])
  }
  function toggleColor(c: string) {
    setSelectedColors(prev=>prev.includes(c)?prev.filter(x=>x!==c):[...prev,c])
  }
  function addCustomColor() {
    if(customColor.trim()&&!selectedColors.includes(customColor.trim())) {
      setSelectedColors(prev=>[...prev,customColor.trim()])
      setCustomColor('')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if(!user){router.push('/login');return}
    if(!form.title||!form.price||!form.stock_qty){setError('Please fill in all required fields.');return}
    setLoading(true);setError('')
    try {
      const supabase = createClient()
      const { error: insertError } = await supabase.from('products').insert({
        vendor_id: user.id,
        title: form.title,
        description: form.description,
        price: parseFloat(form.price),
        original_price: form.original_price?parseFloat(form.original_price):null,
        category_slug: form.category_slug,
        condition: form.condition,
        stock_qty: parseInt(form.stock_qty),
        sizes: selectedSizes,
        colors: selectedColors,
        is_active: true,
        is_featured: false,
        rating: 0,
        review_count: 0,
      })
      if(insertError) throw insertError
      setSuccess(true)
      setTimeout(()=>router.push('/vendor/dashboard'),2000)
    } catch(err: any) {
      setError(err.message||'Failed to add product.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {width:'100%',border:'1.5px solid #e2ece7',borderRadius:12,padding:'12px 14px',fontSize:14,fontFamily:font,outline:'none',color:'#1c2b22',boxSizing:'border-box' as const}
  const labelStyle = {display:'block',fontSize:12,fontWeight:700,color:'#6b8275',marginBottom:6} as const

  if(success) return (
    <div style={{minHeight:'100vh',background:'#f4faf7',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:font}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet"/>
      <div style={{textAlign:'center',background:'white',padding:48,borderRadius:24,border:'1px solid #e2ece7'}}>
        <div style={{width:80,height:80,borderRadius:'50%',background:'#22a063',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px'}}>
          <Check size={36} color="white"/>
        </div>
        <h2 style={{fontFamily:syne,fontWeight:800,fontSize:24,color:'#111714',marginBottom:8}}>Product Listed!</h2>
        <p style={{fontSize:14,color:'#6b8275'}}>Redirecting to your dashboard...</p>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#f4faf7',fontFamily:font}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet"/>
      <nav style={{background:'white',borderBottom:'1px solid #e2ece7',boxShadow:'0 1px 8px rgba(0,0,0,0.05)',position:'sticky',top:0,zIndex:50}}>
        <div style={{maxWidth:900,margin:'0 auto',padding:'0 24px',height:60,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <button onClick={()=>router.back()} style={{display:'flex',alignItems:'center',gap:6,background:'#f4faf7',border:'none',borderRadius:10,padding:'8px 14px',cursor:'pointer',fontWeight:700,fontSize:13,color:'#1c2b22',fontFamily:font}}>
            <ArrowLeft size={15}/> Back
          </button>
          <Link href="/home" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
            <div style={{width:32,height:32,borderRadius:10,background:'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center'}}><ShoppingBag size={15} color="white"/></div>
            <span style={{fontFamily:syne,fontWeight:800,fontSize:18,color:'#111714'}}>Corefieds</span>
          </Link>
        </div>
      </nav>

      <div style={{maxWidth:900,margin:'0 auto',padding:'32px 24px'}}>
        <div style={{marginBottom:28}}>
          <h1 style={{fontFamily:syne,fontWeight:800,fontSize:28,color:'#111714',marginBottom:6}}>Add New Product</h1>
          <p style={{fontSize:14,color:'#6b8275'}}>List your product for free. Reach thousands of verified buyers.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:24,alignItems:'start'}}>

            {/* Main */}
            <div style={{display:'flex',flexDirection:'column',gap:20}}>

              {/* Basic info */}
              <div style={{background:'white',borderRadius:20,padding:24,border:'1px solid #e2ece7'}}>
                <h3 style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#111714',marginBottom:18}}>Product Information</h3>
                <div style={{marginBottom:16}}>
                  <label style={labelStyle}>Product Title *</label>
                  <input style={inputStyle} placeholder="e.g. Premium Cotton T-Shirt" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/>
                </div>
                <div style={{marginBottom:16}}>
                  <label style={labelStyle}>Description</label>
                  <textarea style={{...inputStyle,height:100,resize:'vertical'}} placeholder="Describe your product — material, features, benefits..." value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:16}}>
                  <div>
                    <label style={labelStyle}>Category *</label>
                    <select style={{...inputStyle,background:'white'}} value={form.category_slug} onChange={e=>setForm({...form,category_slug:e.target.value})}>
                      {CATEGORIES.map(c=><option key={c} value={c}>{c.replace('-',' ').replace(/\b\w/g,l=>l.toUpperCase())}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Condition *</label>
                    <select style={{...inputStyle,background:'white'}} value={form.condition} onChange={e=>setForm({...form,condition:e.target.value})}>
                      <option value="new">New</option>
                      <option value="used">Used</option>
                      <option value="refurbished">Refurbished</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div style={{background:'white',borderRadius:20,padding:24,border:'1px solid #e2ece7'}}>
                <h3 style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#111714',marginBottom:18}}>Pricing & Stock</h3>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14}}>
                  <div>
                    <label style={labelStyle}>Selling Price (R) *</label>
                    <input style={inputStyle} type="number" placeholder="400" min="0" step="0.01" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required/>
                  </div>
                  <div>
                    <label style={labelStyle}>Original Price (R)</label>
                    <input style={inputStyle} type="number" placeholder="550" min="0" step="0.01" value={form.original_price} onChange={e=>setForm({...form,original_price:e.target.value})}/>
                    <div style={{fontSize:11,color:'#6b8275',marginTop:4}}>Optional — shows discount</div>
                  </div>
                  <div>
                    <label style={labelStyle}>Stock Quantity *</label>
                    <input style={inputStyle} type="number" placeholder="10" min="1" value={form.stock_qty} onChange={e=>setForm({...form,stock_qty:e.target.value})} required/>
                  </div>
                </div>
                {form.price && form.original_price && parseFloat(form.original_price)>parseFloat(form.price) && (
                  <div style={{marginTop:12,background:'#dcfce7',border:'1px solid #bbf7d0',borderRadius:10,padding:'8px 14px',fontSize:13,color:'#16a34a',fontWeight:700}}>
                    ✓ Showing {Math.round((1-parseFloat(form.price)/parseFloat(form.original_price))*100)}% discount badge
                  </div>
                )}
              </div>

              {/* Sizes */}
              <div style={{background:'white',borderRadius:20,padding:24,border:'1px solid #e2ece7'}}>
                <h3 style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#111714',marginBottom:6}}>Sizes</h3>
                <p style={{fontSize:13,color:'#6b8275',marginBottom:14}}>Select if your product comes in sizes</p>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {SIZES_PRESET.map(s=>{
                    const isSel = selectedSizes.includes(s)
                    return (
                      <button type="button" key={s} onClick={()=>toggleSize(s)}
                        style={{padding:'8px 16px',borderRadius:10,border:isSel?'2px solid #22a063':'2px solid #e2ece7',background:isSel?'#edfaf3':'white',color:isSel?'#0f5c35':'#6b8275',fontWeight:700,fontSize:13,cursor:'pointer',fontFamily:font,transition:'all .15s'}}>
                        {s}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Colors */}
              <div style={{background:'white',borderRadius:20,padding:24,border:'1px solid #e2ece7'}}>
                <h3 style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#111714',marginBottom:6}}>Colours</h3>
                <p style={{fontSize:13,color:'#6b8275',marginBottom:14}}>Select available colours</p>
                <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:14}}>
                  {COLORS_PRESET.map(c=>{
                    const isSel = selectedColors.includes(c)
                    return (
                      <button type="button" key={c} onClick={()=>toggleColor(c)}
                        style={{padding:'6px 14px',borderRadius:10,border:isSel?'2px solid #22a063':'2px solid #e2ece7',background:isSel?'#edfaf3':'white',color:isSel?'#0f5c35':'#6b8275',fontWeight:700,fontSize:12,cursor:'pointer',fontFamily:font,transition:'all .15s',display:'flex',alignItems:'center',gap:5}}>
                        {isSel&&<Check size={11}/>}{c}
                      </button>
                    )
                  })}
                </div>
                <div style={{display:'flex',gap:8}}>
                  <input value={customColor} onChange={e=>setCustomColor(e.target.value)} placeholder="Custom colour..."
                    style={{...inputStyle,flex:1}} onKeyDown={e=>e.key==='Enter'&&(e.preventDefault(),addCustomColor())}/>
                  <button type="button" onClick={addCustomColor}
                    style={{padding:'11px 16px',borderRadius:10,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:700,fontSize:13,border:'none',cursor:'pointer',fontFamily:font,display:'flex',alignItems:'center',gap:5}}>
                    <Plus size={13}/> Add
                  </button>
                </div>
                {selectedColors.length>0 && (
                  <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:10}}>
                    {selectedColors.map(c=>(
                      <span key={c} style={{background:'#edfaf3',border:'1px solid #d4f5e6',color:'#0f5c35',fontSize:12,fontWeight:700,padding:'3px 10px',borderRadius:50,display:'flex',alignItems:'center',gap:5}}>
                        {c}
                        <button type="button" onClick={()=>toggleColor(c)} style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',color:'#6b8275',padding:0}}>
                          <X size={11}/>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right sidebar */}
            <div style={{position:'sticky',top:80,display:'flex',flexDirection:'column',gap:16}}>
              {error && (
                <div style={{background:'#fff0f0',border:'1px solid #fecaca',color:'#dc2626',fontSize:13,borderRadius:12,padding:14}}>{error}</div>
              )}

              <div style={{background:'white',borderRadius:20,padding:20,border:'1px solid #e2ece7'}}>
                <h3 style={{fontFamily:syne,fontWeight:800,fontSize:15,color:'#111714',marginBottom:14}}>Listing Summary</h3>
                {[
                  {l:'Title',v:form.title||'—'},
                  {l:'Category',v:form.category_slug.replace('-',' ')},
                  {l:'Price',v:form.price?'R'+parseFloat(form.price).toLocaleString():'—'},
                  {l:'Stock',v:form.stock_qty||'—'},
                  {l:'Sizes',v:selectedSizes.length>0?selectedSizes.join(', '):'None'},
                  {l:'Colours',v:selectedColors.length>0?selectedColors.length+' selected':'None'},
                ].map(r=>(
                  <div key={r.l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #f4faf7',fontSize:13}}>
                    <span style={{color:'#6b8275'}}>{r.l}</span>
                    <span style={{fontWeight:700,color:'#1c2b22',textAlign:'right',maxWidth:160,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.v}</span>
                  </div>
                ))}
              </div>

              <button type="submit" disabled={loading}
                style={{width:'100%',padding:16,borderRadius:14,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:800,fontSize:15,border:'none',cursor:loading?'not-allowed':'pointer',fontFamily:font,boxShadow:'0 6px 20px rgba(26,122,74,0.35)',display:'flex',alignItems:'center',justifyContent:'center',gap:8,opacity:loading?0.8:1}}>
                <Plus size={17}/>{loading?'Listing Product...':'List Product for Free'}
              </button>

              <div style={{background:'linear-gradient(135deg,#edfdf4,#d4f5e6)',border:'1px solid #bbf7d0',borderRadius:14,padding:16}}>
                <div style={{fontWeight:800,fontSize:13,color:'#14532d',marginBottom:8}}>✓ Free to List</div>
                <div style={{display:'flex',flexDirection:'column',gap:5}}>
                  {['No listing fees','No monthly subscription','Trade-Safe escrow on all sales','The Courier Guy & Fastway delivery'].map(t=>(
                    <div key={t} style={{fontSize:12,color:'#166534',display:'flex',alignItems:'center',gap:6}}>
                      <Check size={11} color="#22a063"/>{t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
