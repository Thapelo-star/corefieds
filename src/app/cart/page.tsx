'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { ShoppingBag, Trash2, Plus, Minus, ShieldCheck, Truck, ArrowRight, Tag, ChevronRight, Lock } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQty, total, count, clearCart } = useCart()
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const router = useRouter()

  const font = "'Plus Jakarta Sans',sans-serif"
  const syne = "'Syne',sans-serif"

  const shipping = total > 0 ? 80 : 0
  const escrowFee = Math.round(total * 0.01)
  const discount = couponApplied ? Math.round(total * 0.1) : 0
  const grandTotal = total + shipping + escrowFee - discount

  function applyCoupon() {
    if (coupon.toUpperCase() === 'COREFIEDS10') {
      setCouponApplied(true)
    }
  }

  return (
    <div style={{minHeight:'100vh',background:'#f4faf7',fontFamily:font}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet"/>

      {/* Nav */}
      <nav style={{background:'white',borderBottom:'1px solid #e2ece7',boxShadow:'0 1px 8px rgba(0,0,0,0.05)',position:'sticky',top:0,zIndex:50}}>
        <div style={{maxWidth:1280,margin:'0 auto',padding:'0 24px',height:60,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Link href="/home" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
            <div style={{width:32,height:32,borderRadius:10,background:'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <ShoppingBag size={15} color="white"/>
            </div>
            <span style={{fontFamily:syne,fontWeight:800,fontSize:18,color:'#111714'}}>Corefieds</span>
          </Link>
          <div style={{display:'flex',alignItems:'center',gap:6,fontSize:13,color:'#6b8275'}}>
            <Link href="/home" style={{color:'#6b8275',textDecoration:'none'}}>Home</Link>
            <ChevronRight size={12}/>
            <span style={{color:'#1c2b22',fontWeight:600}}>My Cart ({count} items)</span>
          </div>
        </div>
      </nav>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'32px 24px'}}>
        <h1 style={{fontFamily:syne,fontWeight:800,fontSize:28,color:'#111714',marginBottom:8}}>My Cart</h1>
        <p style={{fontSize:14,color:'#6b8275',marginBottom:28}}>{count} {count===1?'item':'items'} ready for checkout</p>

        {items.length === 0 ? (
          <div style={{textAlign:'center',padding:'80px 24px',background:'white',borderRadius:24,border:'1px solid #e2ece7'}}>
            <div style={{fontSize:80,marginBottom:20}}>🛒</div>
            <h2 style={{fontFamily:syne,fontWeight:800,fontSize:24,color:'#111714',marginBottom:8}}>Your cart is empty</h2>
            <p style={{fontSize:14,color:'#6b8275',marginBottom:24}}>Looks like you have not added anything yet.</p>
            <Link href="/home" style={{display:'inline-flex',alignItems:'center',gap:8,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:800,fontSize:15,padding:'13px 32px',borderRadius:12,textDecoration:'none'}}>
              Start Shopping <ArrowRight size={16}/>
            </Link>
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'1fr 380px',gap:24,alignItems:'start'}}>

            {/* Left — items */}
            <div style={{display:'flex',flexDirection:'column',gap:12}}>

              {/* Escrow banner */}
              <div style={{background:'linear-gradient(135deg,#edfdf4,#d4f5e6)',border:'1px solid #bbf7d0',borderRadius:16,padding:16,display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:40,height:40,borderRadius:12,background:'#22a063',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <Lock size={18} color="white"/>
                </div>
                <div>
                  <div style={{fontWeight:800,fontSize:14,color:'#14532d'}}>Trade-Safe Escrow Protection Active</div>
                  <div style={{fontSize:12,color:'#166534',marginTop:2}}>Your payment is held securely — only released when you confirm delivery. Zero risk.</div>
                </div>
              </div>

              {/* Items */}
              {items.map(item => (
                <div key={item.id+item.size+item.color} style={{background:'white',borderRadius:18,padding:20,border:'1px solid #e2ece7',boxShadow:'0 2px 12px rgba(26,122,74,0.06)',display:'flex',gap:16,alignItems:'center'}}>
                  <div style={{width:80,height:80,borderRadius:16,background:'#f4faf7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:36,flexShrink:0,border:'1px solid #e2ece7'}}>
                    {item.image}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <h3 style={{fontWeight:700,fontSize:15,color:'#111714',marginBottom:4,lineHeight:1.3}}>{item.title}</h3>
                    <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:8}}>
                      {item.size && <span style={{fontSize:11,fontWeight:700,background:'#f4faf7',border:'1px solid #e2ece7',padding:'2px 8px',borderRadius:6,color:'#6b8275'}}>Size: {item.size}</span>}
                      {item.color && <span style={{fontSize:11,fontWeight:700,background:'#f4faf7',border:'1px solid #e2ece7',padding:'2px 8px',borderRadius:6,color:'#6b8275'}}>Colour: {item.color}</span>}
                      {item.vendorName && <span style={{fontSize:11,color:'#6b8275'}}>by {item.vendorName}</span>}
                    </div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
                      <div style={{display:'flex',alignItems:'center',border:'1.5px solid #e2ece7',borderRadius:10,overflow:'hidden'}}>
                        <button onClick={()=>updateQty(item.id,item.quantity-1)} style={{width:34,height:34,background:'#f4faf7',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#1a7a4a',fontFamily:font}}>
                          <Minus size={14}/>
                        </button>
                        <span style={{width:36,textAlign:'center',fontWeight:800,fontSize:14,color:'#1c2b22'}}>{item.quantity}</span>
                        <button onClick={()=>updateQty(item.id,item.quantity+1)} style={{width:34,height:34,background:'#f4faf7',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#1a7a4a',fontFamily:font}}>
                          <Plus size={14}/>
                        </button>
                      </div>
                      <span style={{fontFamily:syne,fontWeight:800,fontSize:18,color:'#1a7a4a'}}>R{(item.price*item.quantity).toLocaleString()}</span>
                      <button onClick={()=>removeItem(item.id)} style={{background:'none',border:'none',cursor:'pointer',color:'#e84040',padding:6,borderRadius:8,display:'flex',alignItems:'center',gap:4,fontSize:12,fontWeight:700,fontFamily:font}}>
                        <Trash2 size={14}/> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon */}
              <div style={{background:'white',borderRadius:18,padding:20,border:'1px solid #e2ece7'}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
                  <Tag size={15} color="#1a7a4a"/>
                  <span style={{fontWeight:700,fontSize:14,color:'#1c2b22'}}>Coupon Code</span>
                </div>
                <div style={{display:'flex',gap:10}}>
                  <input value={coupon} onChange={e=>setCoupon(e.target.value)}
                    placeholder="Enter code (try COREFIEDS10)"
                    style={{flex:1,border:'1.5px solid #e2ece7',borderRadius:10,padding:'10px 14px',fontSize:13,fontFamily:font,outline:'none',color:'#1c2b22',background:couponApplied?'#edfaf3':'white',borderColor:couponApplied?'#22a063':'#e2ece7'}}/>
                  <button onClick={applyCoupon} disabled={couponApplied}
                    style={{padding:'10px 20px',borderRadius:10,background:couponApplied?'#22a063':'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',border:'none',fontWeight:700,fontSize:13,cursor:couponApplied?'default':'pointer',fontFamily:font}}>
                    {couponApplied?'✓ Applied':'Apply'}
                  </button>
                </div>
                {couponApplied && <div style={{marginTop:8,fontSize:12,color:'#16a34a',fontWeight:700}}>🎉 10% discount applied!</div>}
              </div>

              {/* Delivery info */}
              <div style={{background:'white',borderRadius:18,padding:20,border:'1px solid #e2ece7'}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
                  <Truck size={15} color="#1a7a4a"/>
                  <span style={{fontWeight:700,fontSize:14,color:'#1c2b22'}}>Delivery Partners</span>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                  {[{n:'The Courier Guy',t:'2-4 business days',p:'R80'},
                    {n:'Fastway Couriers',t:'3-5 business days',p:'R80'}].map(d=>(
                    <div key={d.n} style={{border:'1.5px solid #e2ece7',borderRadius:12,padding:14,cursor:'pointer'}}>
                      <div style={{fontWeight:700,fontSize:13,color:'#1c2b22',marginBottom:4}}>🚚 {d.n}</div>
                      <div style={{fontSize:12,color:'#6b8275'}}>{d.t}</div>
                      <div style={{fontWeight:800,fontSize:14,color:'#1a7a4a',marginTop:6}}>+R{d.p}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — summary */}
            <div style={{position:'sticky',top:80}}>
              <div style={{background:'white',borderRadius:20,padding:24,border:'1px solid #e2ece7',boxShadow:'0 4px 24px rgba(26,122,74,0.10)'}}>
                <h3 style={{fontFamily:syne,fontWeight:800,fontSize:18,color:'#111714',marginBottom:20}}>Order Summary</h3>

                {items.map(item=>(
                  <div key={item.id+item.size} style={{display:'flex',justifyContent:'space-between',marginBottom:10,fontSize:13}}>
                    <span style={{color:'#6b8275'}}>{item.title.slice(0,22)}... x{item.quantity}</span>
                    <span style={{fontWeight:700,color:'#1c2b22'}}>R{(item.price*item.quantity).toLocaleString()}</span>
                  </div>
                ))}

                <div style={{borderTop:'1px solid #f4faf7',margin:'16px 0',paddingTop:16,display:'flex',flexDirection:'column',gap:10}}>
                  {[
                    {l:'Subtotal',v:'R'+total.toLocaleString(),c:'#6b8275'},
                    {l:'Shipping',v:'R'+shipping,c:'#6b8275'},
                    {l:'Escrow fee (1%)',v:'R'+escrowFee,c:'#6b8275'},
                  ].map(row=>(
                    <div key={row.l} style={{display:'flex',justifyContent:'space-between',fontSize:14}}>
                      <span style={{color:row.c}}>{row.l}</span>
                      <span style={{fontWeight:600,color:'#1c2b22'}}>{row.v}</span>
                    </div>
                  ))}
                  {discount > 0 && (
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:14}}>
                      <span style={{color:'#16a34a',fontWeight:700}}>Coupon discount</span>
                      <span style={{fontWeight:700,color:'#16a34a'}}>-R{discount.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div style={{borderTop:'2px solid #e2ece7',paddingTop:16,display:'flex',justifyContent:'space-between',marginBottom:20}}>
                  <span style={{fontFamily:syne,fontWeight:800,fontSize:18,color:'#111714'}}>Total</span>
                  <span style={{fontFamily:syne,fontWeight:800,fontSize:22,color:'#1a7a4a'}}>R{grandTotal.toLocaleString()}</span>
                </div>

                <button onClick={()=>router.push('/checkout')}
                  style={{width:'100%',padding:16,borderRadius:14,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:800,fontSize:16,border:'none',cursor:'pointer',fontFamily:font,boxShadow:'0 6px 20px rgba(26,122,74,0.35)',display:'flex',alignItems:'center',justifyContent:'center',gap:8,marginBottom:12}}>
                  <Lock size={16}/> Secure Checkout
                </button>

                <Link href="/home" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:6,color:'#6b8275',fontSize:13,fontWeight:700,textDecoration:'none'}}>
                  ← Continue Shopping
                </Link>

                <div style={{marginTop:16,background:'#f4faf7',borderRadius:12,padding:12}}>
                  <div style={{display:'flex',flexDirection:'column',gap:6}}>
                    {['🔒 Trade-Safe escrow holds your payment','🚚 Tracked delivery nationwide','↩️ 7-day return policy'].map(t=>(
                      <div key={t} style={{fontSize:11,color:'#6b8275',fontWeight:600}}>{t}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
