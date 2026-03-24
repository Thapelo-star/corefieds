'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase-client'
import { ShoppingBag, Lock, Shield, ChevronRight, CheckCircle, MapPin, CreditCard, Truck, ArrowLeft } from 'lucide-react'

const PROVINCES = ['Gauteng','Western Cape','KwaZulu-Natal','Eastern Cape','Limpopo','Mpumalanga','North West','Free State','Northern Cape']

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { user, profile } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const font = "'Plus Jakarta Sans',sans-serif"
  const syne = "'Syne',sans-serif"

  const [address, setAddress] = useState({
    full_name: profile?.full_name||'',
    phone: profile?.phone||'',
    address_line1: '',
    address_line2: '',
    city: '',
    province: 'Mpumalanga',
    postal_code: '',
  })
  const [payment, setPayment] = useState('escrow')
  const [courier, setCourier] = useState('courier-guy')

  const shipping = 80
  const escrowFee = Math.round(total * 0.01)
  const grandTotal = total + shipping + escrowFee

  async function placeOrder() {
    if (!user) { router.push('/login'); return }
    setLoading(true)
    setError('')
    try {
      const supabase = createClient()
      const { data, error: orderError } = await supabase.from('orders').insert({
        buyer_id: user.id,
        items: items,
        subtotal: total,
        shipping: shipping,
        escrow_fee: escrowFee,
        total: grandTotal,
        status: 'pending',
        escrow_status: 'held',
        payment_method: payment,
        shipping_address: address,
        courier: courier==='courier-guy'?'The Courier Guy':'Fastway',
      }).select().single()
      if (orderError) throw orderError
      clearCart()
      router.push('/orders/'+data.id+'?success=true')
    } catch (err: any) {
      setError(err.message||'Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const stepDot = (n: number, label: string) => {
    const done = step > n
    const active = step === n
    return (
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <div style={{width:32,height:32,borderRadius:'50%',background:done?'#22a063':active?'linear-gradient(135deg,#0f5c35,#22a063)':'#e2ece7',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,color:done||active?'white':'#6b8275',flexShrink:0}}>
          {done?'✓':n}
        </div>
        <span style={{fontSize:13,fontWeight:700,color:active?'#1c2b22':done?'#22a063':'#6b8275'}}>{label}</span>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div style={{minHeight:'100vh',background:'#f4faf7',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:font}}>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet"/>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:64,marginBottom:16}}>🛒</div>
          <h2 style={{fontFamily:syne,fontWeight:800,fontSize:24,color:'#111714',marginBottom:8}}>Nothing to checkout</h2>
          <Link href="/home" style={{color:'#1a7a4a',fontWeight:700,textDecoration:'none'}}>← Back to Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:'100vh',background:'#f4faf7',fontFamily:font}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet"/>

      {/* Nav */}
      <nav style={{background:'white',borderBottom:'1px solid #e2ece7',boxShadow:'0 1px 8px rgba(0,0,0,0.05)'}}>
        <div style={{maxWidth:1100,margin:'0 auto',padding:'0 24px',height:60,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <button onClick={()=>step>1?setStep(step-1):router.push('/cart')} style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',cursor:'pointer',fontWeight:700,fontSize:13,color:'#1c2b22',fontFamily:font}}>
            <ArrowLeft size={15}/> {step>1?'Back':'Back to Cart'}
          </button>
          <Link href="/home" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
            <div style={{width:32,height:32,borderRadius:10,background:'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center'}}><ShoppingBag size={15} color="white"/></div>
            <span style={{fontFamily:syne,fontWeight:800,fontSize:18,color:'#111714'}}>Corefieds</span>
          </Link>
          <div style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:'#22a063',fontWeight:700}}>
            <Lock size={13}/> Secure Checkout
          </div>
        </div>
      </nav>

      {/* Progress */}
      <div style={{background:'white',borderBottom:'1px solid #e2ece7',padding:'16px 24px'}}>
        <div style={{maxWidth:1100,margin:'0 auto',display:'flex',alignItems:'center',gap:16,flexWrap:'wrap'}}>
          {stepDot(1,'Delivery Address')}
          <div style={{flex:1,height:2,background:step>1?'#22a063':'#e2ece7',borderRadius:1,minWidth:40}}/>
          {stepDot(2,'Delivery Method')}
          <div style={{flex:1,height:2,background:step>2?'#22a063':'#e2ece7',borderRadius:1,minWidth:40}}/>
          {stepDot(3,'Payment')}
          <div style={{flex:1,height:2,background:step>3?'#22a063':'#e2ece7',borderRadius:1,minWidth:40}}/>
          {stepDot(4,'Review & Confirm')}
        </div>
      </div>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'32px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:24,alignItems:'start'}}>

          {/* Main */}
          <div>

            {/* STEP 1 — Address */}
            {step===1 && (
              <div style={{background:'white',borderRadius:20,padding:28,border:'1px solid #e2ece7',boxShadow:'0 2px 12px rgba(26,122,74,0.06)'}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:24}}>
                  <div style={{width:40,height:40,borderRadius:12,background:'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center'}}><MapPin size={18} color="white"/></div>
                  <div>
                    <h2 style={{fontFamily:syne,fontWeight:800,fontSize:20,color:'#111714',margin:0}}>Delivery Address</h2>
                    <p style={{fontSize:13,color:'#6b8275',margin:0}}>Where should we deliver your order?</p>
                  </div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                  {[
                    {l:'Full Name',k:'full_name',ph:'Thapelo Arthur',span:1},
                    {l:'Phone Number',k:'phone',ph:'071 234 5678',span:1},
                    {l:'Address Line 1',k:'address_line1',ph:'123 Main Street',span:2},
                    {l:'Address Line 2 (optional)',k:'address_line2',ph:'Apartment, unit, etc.',span:2},
                    {l:'City / Town',k:'city',ph:'eMalahleni',span:1},
                    {l:'Postal Code',k:'postal_code',ph:'1035',span:1},
                  ].map(f=>(
                    <div key={f.k} style={{gridColumn:f.span===2?'1/-1':'auto'}}>
                      <label style={{display:'block',fontSize:12,fontWeight:700,color:'#6b8275',marginBottom:6}}>{f.l}</label>
                      <input value={(address as any)[f.k]} onChange={e=>setAddress({...address,[f.k]:e.target.value})}
                        placeholder={f.ph}
                        style={{width:'100%',border:'1.5px solid #e2ece7',borderRadius:12,padding:'12px 14px',fontSize:14,fontFamily:font,outline:'none',color:'#1c2b22',boxSizing:'border-box'}}/>
                    </div>
                  ))}
                  <div>
                    <label style={{display:'block',fontSize:12,fontWeight:700,color:'#6b8275',marginBottom:6}}>Province</label>
                    <select value={address.province} onChange={e=>setAddress({...address,province:e.target.value})}
                      style={{width:'100%',border:'1.5px solid #e2ece7',borderRadius:12,padding:'12px 14px',fontSize:14,fontFamily:font,outline:'none',color:'#1c2b22',background:'white',boxSizing:'border-box'}}>
                      {PROVINCES.map(p=><option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <button onClick={()=>setStep(2)}
                  style={{marginTop:24,width:'100%',padding:15,borderRadius:14,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:800,fontSize:15,border:'none',cursor:'pointer',fontFamily:font,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                  Continue to Delivery <ChevronRight size={16}/>
                </button>
              </div>
            )}

            {/* STEP 2 — Courier */}
            {step===2 && (
              <div style={{background:'white',borderRadius:20,padding:28,border:'1px solid #e2ece7',boxShadow:'0 2px 12px rgba(26,122,74,0.06)'}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:24}}>
                  <div style={{width:40,height:40,borderRadius:12,background:'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center'}}><Truck size={18} color="white"/></div>
                  <div>
                    <h2 style={{fontFamily:syne,fontWeight:800,fontSize:20,color:'#111714',margin:0}}>Delivery Method</h2>
                    <p style={{fontSize:13,color:'#6b8275',margin:0}}>Choose your preferred courier</p>
                  </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:12}}>
                  {[
                    {id:'courier-guy',name:'The Courier Guy',eta:'2-4 business days',price:'R80',desc:'Reliable nationwide delivery with real-time tracking'},
                    {id:'fastway',name:'Fastway Couriers',eta:'3-5 business days',price:'R80',desc:'Cost-effective delivery across South Africa'},
                  ].map(c=>{
                    const isSel = courier===c.id
                    return (
                      <div key={c.id} onClick={()=>setCourier(c.id)}
                        style={{border:isSel?'2px solid #22a063':'2px solid #e2ece7',borderRadius:16,padding:20,cursor:'pointer',background:isSel?'#edfaf3':'white',transition:'all .2s',display:'flex',alignItems:'center',gap:16}}>
                        <div style={{width:48,height:48,borderRadius:14,background:isSel?'#22a063':'#f4faf7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,flexShrink:0,transition:'all .2s'}}>🚚</div>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:800,fontSize:15,color:'#111714',marginBottom:3}}>{c.name}</div>
                          <div style={{fontSize:13,color:'#6b8275'}}>{c.desc}</div>
                          <div style={{fontSize:12,color:'#22a063',fontWeight:700,marginTop:4}}>{c.eta}</div>
                        </div>
                        <div style={{textAlign:'right'}}>
                          <div style={{fontFamily:syne,fontWeight:800,fontSize:18,color:'#1a7a4a'}}>{c.price}</div>
                          {isSel && <div style={{fontSize:11,color:'#22a063',fontWeight:700,marginTop:2}}>✓ Selected</div>}
                        </div>
                      </div>
                    )
                  })}
                </div>
                <button onClick={()=>setStep(3)}
                  style={{marginTop:24,width:'100%',padding:15,borderRadius:14,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:800,fontSize:15,border:'none',cursor:'pointer',fontFamily:font,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                  Continue to Payment <ChevronRight size={16}/>
                </button>
              </div>
            )}

            {/* STEP 3 — Payment */}
            {step===3 && (
              <div style={{background:'white',borderRadius:20,padding:28,border:'1px solid #e2ece7',boxShadow:'0 2px 12px rgba(26,122,74,0.06)'}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:24}}>
                  <div style={{width:40,height:40,borderRadius:12,background:'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center'}}><CreditCard size={18} color="white"/></div>
                  <div>
                    <h2 style={{fontFamily:syne,fontWeight:800,fontSize:20,color:'#111714',margin:0}}>Payment Method</h2>
                    <p style={{fontSize:13,color:'#6b8275',margin:0}}>All payments secured by Trade-Safe escrow</p>
                  </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:24}}>
                  {[
                    {id:'escrow',icon:'🔒',name:'Trade-Safe Escrow (Recommended)',desc:'Pay via EFT or card. Funds held safely until you confirm delivery. Fully protected.'},
                    {id:'payfast',icon:'💳',name:'PayFast — Card / EFT',desc:'Pay securely via PayFast gateway. Supports Visa, Mastercard, and instant EFT.'},
                    {id:'eft',icon:'🏦',name:'Direct EFT',desc:'Pay directly via bank transfer. Order confirmed once payment reflects.'},
                  ].map(p=>{
                    const isSel = payment===p.id
                    return (
                      <div key={p.id} onClick={()=>setPayment(p.id)}
                        style={{border:isSel?'2px solid #22a063':'2px solid #e2ece7',borderRadius:16,padding:20,cursor:'pointer',background:isSel?'#edfaf3':'white',transition:'all .2s',display:'flex',gap:14,alignItems:'flex-start'}}>
                        <div style={{fontSize:28,flexShrink:0}}>{p.icon}</div>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:800,fontSize:14,color:'#111714',marginBottom:4,display:'flex',alignItems:'center',gap:8}}>
                            {p.name}
                            {p.id==='escrow' && <span style={{background:'#dcfce7',color:'#16a34a',fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:50,border:'1px solid #bbf7d0'}}>SAFEST</span>}
                          </div>
                          <div style={{fontSize:13,color:'#6b8275',lineHeight:1.5}}>{p.desc}</div>
                        </div>
                        <div style={{width:22,height:22,borderRadius:'50%',border:isSel?'none':'2px solid #e2ece7',background:isSel?'#22a063':'white',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:2}}>
                          {isSel && <div style={{width:8,height:8,borderRadius:'50%',background:'white'}}/>}
                        </div>
                      </div>
                    )
                  })}
                </div>
                <button onClick={()=>setStep(4)}
                  style={{width:'100%',padding:15,borderRadius:14,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:800,fontSize:15,border:'none',cursor:'pointer',fontFamily:font,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                  Review Order <ChevronRight size={16}/>
                </button>
              </div>
            )}

            {/* STEP 4 — Review */}
            {step===4 && (
              <div style={{display:'flex',flexDirection:'column',gap:16}}>
                <div style={{background:'white',borderRadius:20,padding:24,border:'1px solid #e2ece7'}}>
                  <h2 style={{fontFamily:syne,fontWeight:800,fontSize:20,color:'#111714',marginBottom:16}}>Review Your Order</h2>
                  {items.map(item=>(
                    <div key={item.id} style={{display:'flex',gap:14,alignItems:'center',marginBottom:14,paddingBottom:14,borderBottom:'1px solid #f4faf7'}}>
                      <div style={{width:56,height:56,borderRadius:12,background:'#f4faf7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,flexShrink:0}}>{item.image}</div>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,fontSize:14,color:'#1c2b22'}}>{item.title}</div>
                        <div style={{fontSize:12,color:'#6b8275',marginTop:2}}>Qty: {item.quantity}{item.size?' · Size: '+item.size:''}{item.color?' · '+item.color:''}</div>
                      </div>
                      <div style={{fontFamily:syne,fontWeight:800,fontSize:15,color:'#1a7a4a'}}>R{(item.price*item.quantity).toLocaleString()}</div>
                    </div>
                  ))}
                </div>

                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                  <div style={{background:'white',borderRadius:16,padding:18,border:'1px solid #e2ece7'}}>
                    <div style={{fontSize:12,fontWeight:700,color:'#6b8275',marginBottom:8}}>📍 DELIVERY TO</div>
                    <div style={{fontSize:13,fontWeight:700,color:'#1c2b22'}}>{address.full_name}</div>
                    <div style={{fontSize:13,color:'#6b8275',marginTop:4,lineHeight:1.6}}>{address.address_line1}{address.address_line2?', '+address.address_line2:''}<br/>{address.city}, {address.province} {address.postal_code}</div>
                    <div style={{fontSize:13,color:'#6b8275',marginTop:2}}>{address.phone}</div>
                  </div>
                  <div style={{background:'white',borderRadius:16,padding:18,border:'1px solid #e2ece7'}}>
                    <div style={{fontSize:12,fontWeight:700,color:'#6b8275',marginBottom:8}}>🚚 DELIVERY VIA</div>
                    <div style={{fontSize:13,fontWeight:700,color:'#1c2b22'}}>{courier==='courier-guy'?'The Courier Guy':'Fastway Couriers'}</div>
                    <div style={{fontSize:13,color:'#6b8275',marginTop:4}}>2-5 business days</div>
                    <div style={{fontSize:12,fontWeight:700,color:'#6b8275',marginTop:12,marginBottom:4}}>💳 PAYMENT</div>
                    <div style={{fontSize:13,fontWeight:700,color:'#1c2b22',textTransform:'capitalize'}}>{payment==='escrow'?'Trade-Safe Escrow':payment==='payfast'?'PayFast':'Direct EFT'}</div>
                  </div>
                </div>

                {/* Escrow explanation */}
                <div style={{background:'linear-gradient(135deg,#edfdf4,#d4f5e6)',border:'1px solid #bbf7d0',borderRadius:18,padding:20}}>
                  <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                    <Shield size={18} color="#16a34a"/>
                    <span style={{fontWeight:800,fontSize:15,color:'#14532d'}}>How Your Payment is Protected</span>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
                    {[
                      {n:'1',t:'You Pay',d:'Funds go to Trade-Safe escrow'},
                      {n:'2',t:'Vendor Ships',d:'Order dispatched by courier'},
                      {n:'3',t:'You Receive',d:'Delivery confirmed at your door'},
                      {n:'4',t:'Funds Released',d:'Vendor paid after your confirmation'},
                    ].map(s=>(
                      <div key={s.n} style={{background:'rgba(255,255,255,0.6)',borderRadius:12,padding:12,textAlign:'center'}}>
                        <div style={{fontFamily:syne,fontWeight:800,fontSize:20,color:'#22a063',marginBottom:4}}>{s.n}</div>
                        <div style={{fontWeight:800,fontSize:12,color:'#14532d',marginBottom:3}}>{s.t}</div>
                        <div style={{fontSize:11,color:'#166534',lineHeight:1.4}}>{s.d}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {error && (
                  <div style={{background:'#fff0f0',border:'1px solid #fecaca',color:'#dc2626',fontSize:13,borderRadius:12,padding:14}}>{error}</div>
                )}

                <button onClick={placeOrder} disabled={loading}
                  style={{width:'100%',padding:18,borderRadius:14,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:800,fontSize:16,border:'none',cursor:loading?'not-allowed':'pointer',fontFamily:font,boxShadow:'0 8px 24px rgba(26,122,74,0.35)',display:'flex',alignItems:'center',justifyContent:'center',gap:10,opacity:loading?0.8:1}}>
                  <Lock size={18}/>{loading?'Placing Order...':'Place Order — R'+grandTotal.toLocaleString()}
                </button>
                <p style={{textAlign:'center',fontSize:12,color:'#6b8275',margin:0}}>
                  By placing this order you agree to Corefieds Terms of Service. Payment secured by Trade-Safe.
                </p>
              </div>
            )}
          </div>

          {/* Sticky summary */}
          <div style={{position:'sticky',top:80}}>
            <div style={{background:'white',borderRadius:20,padding:20,border:'1px solid #e2ece7',boxShadow:'0 4px 24px rgba(26,122,74,0.08)'}}>
              <h3 style={{fontFamily:syne,fontWeight:800,fontSize:16,color:'#111714',marginBottom:14}}>Order Summary</h3>
              {items.map(item=>(
                <div key={item.id} style={{display:'flex',gap:10,alignItems:'center',marginBottom:10}}>
                  <div style={{width:40,height:40,borderRadius:10,background:'#f4faf7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0}}>{item.image}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:700,color:'#1c2b22',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.title}</div>
                    <div style={{fontSize:11,color:'#6b8275'}}>x{item.quantity}</div>
                  </div>
                  <span style={{fontWeight:700,fontSize:13,color:'#1a7a4a',flexShrink:0}}>R{(item.price*item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div style={{borderTop:'1px solid #f4faf7',marginTop:12,paddingTop:12,display:'flex',flexDirection:'column',gap:8}}>
                {[{l:'Subtotal',v:'R'+total.toLocaleString()},{l:'Shipping',v:'R'+shipping},{l:'Escrow fee (1%)',v:'R'+escrowFee}].map(r=>(
                  <div key={r.l} style={{display:'flex',justifyContent:'space-between',fontSize:13,color:'#6b8275'}}>
                    <span>{r.l}</span><span style={{fontWeight:600,color:'#1c2b22'}}>{r.v}</span>
                  </div>
                ))}
              </div>
              <div style={{borderTop:'2px solid #e2ece7',marginTop:12,paddingTop:12,display:'flex',justifyContent:'space-between'}}>
                <span style={{fontFamily:syne,fontWeight:800,fontSize:16,color:'#111714'}}>Total</span>
                <span style={{fontFamily:syne,fontWeight:800,fontSize:20,color:'#1a7a4a'}}>R{grandTotal.toLocaleString()}</span>
              </div>
              <div style={{marginTop:14,background:'#f4faf7',borderRadius:10,padding:10}}>
                {['🔒 Trade-Safe escrow protection','🚚 Tracked door-to-door delivery','✓ Verified vendor'].map(t=>(
                  <div key={t} style={{fontSize:11,color:'#6b8275',fontWeight:600,marginBottom:4}}>{t}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
