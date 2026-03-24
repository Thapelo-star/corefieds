'use client'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-client'
import { useAuth } from '@/components/auth/AuthProvider'
import { ShoppingBag, Package, ChevronRight, Clock } from 'lucide-react'

function OrdersList() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const font = "'Plus Jakarta Sans',sans-serif"
  const syne = "'Syne',sans-serif"

  useEffect(()=>{ if(user) loadOrders() },[user])

  async function loadOrders() {
    const supabase = createClient()
    const { data } = await supabase.from('orders').select('*').eq('buyer_id',user!.id).order('created_at',{ascending:false})
    setOrders(data||[])
    setLoading(false)
  }

  const statusColor: Record<string,string> = {
    pending:'#f59e0b',confirmed:'#3b82f6',dispatched:'#8b5cf6',in_transit:'#f97316',delivered:'#22a063'
  }
  const statusBg: Record<string,string> = {
    pending:'#fffbeb',confirmed:'#eff6ff',dispatched:'#faf5ff',in_transit:'#fff7ed',delivered:'#dcfce7'
  }
  const statusLabel: Record<string,string> = {
    pending:'Order Placed',confirmed:'Confirmed',dispatched:'Dispatched',in_transit:'Out for Delivery',delivered:'Delivered'
  }

  return (
    <div style={{minHeight:'100vh',background:'#f4faf7',fontFamily:font}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet"/>
      <nav style={{background:'white',borderBottom:'1px solid #e2ece7',boxShadow:'0 1px 8px rgba(0,0,0,0.05)'}}>
        <div style={{maxWidth:900,margin:'0 auto',padding:'0 24px',height:60,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Link href="/home" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
            <div style={{width:32,height:32,borderRadius:10,background:'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center'}}><ShoppingBag size={15} color="white"/></div>
            <span style={{fontFamily:syne,fontWeight:800,fontSize:18,color:'#111714'}}>Corefieds</span>
          </Link>
          <Link href="/home" style={{fontSize:13,fontWeight:700,color:'#1a7a4a',textDecoration:'none'}}>← Back to Home</Link>
        </div>
      </nav>

      <div style={{maxWidth:900,margin:'0 auto',padding:'32px 24px'}}>
        <h1 style={{fontFamily:syne,fontWeight:800,fontSize:28,color:'#111714',marginBottom:6}}>My Orders</h1>
        <p style={{fontSize:14,color:'#6b8275',marginBottom:28}}>{orders.length} orders total</p>

        {loading ? (
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {[1,2,3].map(i=>(
              <div key={i} style={{background:'white',borderRadius:18,padding:20,border:'1px solid #e2ece7',height:100}}/>
            ))}
          </div>
        ) : orders.length===0 ? (
          <div style={{textAlign:'center',padding:'80px 24px',background:'white',borderRadius:24,border:'1px solid #e2ece7'}}>
            <div style={{fontSize:64,marginBottom:16}}>📦</div>
            <h2 style={{fontFamily:syne,fontWeight:800,fontSize:22,color:'#111714',marginBottom:8}}>No orders yet</h2>
            <p style={{fontSize:14,color:'#6b8275',marginBottom:20}}>Start shopping to see your orders here.</p>
            <Link href="/home" style={{display:'inline-flex',alignItems:'center',gap:8,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:800,fontSize:14,padding:'12px 28px',borderRadius:12,textDecoration:'none'}}>
              Start Shopping <ChevronRight size={14}/>
            </Link>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {orders.map(order=>(
              <Link key={order.id} href={'/orders/'+order.id} style={{textDecoration:'none',display:'block',background:'white',borderRadius:18,padding:20,border:'1px solid #e2ece7',boxShadow:'0 2px 12px rgba(26,122,74,0.06)',transition:'all .2s'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
                  <div style={{display:'flex',alignItems:'center',gap:14}}>
                    <div style={{width:48,height:48,borderRadius:14,background:'#f4faf7',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <Package size={22} color="#1a7a4a"/>
                    </div>
                    <div>
                      <div style={{fontWeight:700,fontSize:14,color:'#1c2b22',marginBottom:3}}>Order #{order.id.slice(0,8).toUpperCase()}</div>
                      <div style={{fontSize:12,color:'#6b8275',display:'flex',alignItems:'center',gap:4}}>
                        <Clock size={11}/>{new Date(order.created_at).toLocaleDateString('en-ZA',{day:'numeric',month:'short',year:'numeric'})}
                      </div>
                      <div style={{fontSize:12,color:'#6b8275',marginTop:2}}>
                        {order.items?.length||0} item{(order.items?.length||0)>1?'s':''}
                      </div>
                    </div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <span style={{background:statusBg[order.status]||'#f4faf7',color:statusColor[order.status]||'#6b8275',fontSize:12,fontWeight:700,padding:'4px 12px',borderRadius:50}}>
                      {statusLabel[order.status]||order.status}
                    </span>
                    <div style={{textAlign:'right'}}>
                      <div style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#1a7a4a'}}>R{order.total?.toLocaleString()}</div>
                      <div style={{fontSize:11,color:order.escrow_status==='released'?'#22a063':'#f59e0b',fontWeight:700,marginTop:2}}>
                        {order.escrow_status==='released'?'✓ Payment Released':'🔒 In Escrow'}
                      </div>
                    </div>
                    <ChevronRight size={18} color="#6b8275"/>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{color:'#1a7a4a',fontWeight:700}}>Loading orders...</div></div>}>
      <OrdersList/>
    </Suspense>
  )
}
