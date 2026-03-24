'use client'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase-client'
import { ShoppingBag, Package, TrendingUp, DollarSign, Eye, Plus, Edit, Trash2, ToggleLeft, ToggleRight, Star, ChevronRight, ArrowUpRight, ShieldCheck, Users, Bell } from 'lucide-react'

const SAMPLE_STATS = [
  {day:'Mon',revenue:1200,orders:3},
  {day:'Tue',revenue:2800,orders:7},
  {day:'Wed',revenue:1800,orders:5},
  {day:'Thu',revenue:4200,orders:11},
  {day:'Fri',revenue:3500,orders:9},
  {day:'Sat',revenue:5100,orders:13},
  {day:'Sun',revenue:3800,orders:10},
]

const SAMPLE_ORDERS = [
  {id:'CF0001',item:'Amped Fitness T-Shirt',buyer:'Sipho D.',amount:400,status:'in_transit',date:new Date(Date.now()-3600000).toISOString()},
  {id:'CF0002',item:'Glow Serum Bundle',buyer:'Naledi K.',amount:580,status:'confirmed',date:new Date(Date.now()-7200000).toISOString()},
  {id:'CF0003',item:'Smart LED Strip Light',buyer:'Thabo M.',amount:320,status:'pending',date:new Date(Date.now()-86400000).toISOString()},
  {id:'CF0004',item:'Non-stick Pan Set',buyer:'Lerato S.',amount:1250,status:'delivered',date:new Date(Date.now()-172800000).toISOString()},
  {id:'CF0005',item:'Amped Fitness T-Shirt',buyer:'Keamo P.',amount:400,status:'dispatched',date:new Date(Date.now()-259200000).toISOString()},
]

function VendorContent() {
  const { user, profile } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [deletingId, setDeletingId] = useState<string|null>(null)

  const font = "'Plus Jakarta Sans',sans-serif"
  const syne = "'Syne',sans-serif"

  const totalRevenue = SAMPLE_STATS.reduce((s,d)=>s+d.revenue,0)
  const totalOrders = SAMPLE_STATS.reduce((s,d)=>s+d.orders,0)
  const maxRevenue = Math.max(...SAMPLE_STATS.map(d=>d.revenue))

  const statusColor: Record<string,string> = {pending:'#f59e0b',confirmed:'#3b82f6',dispatched:'#8b5cf6',in_transit:'#f97316',delivered:'#22a063'}
  const statusBg: Record<string,string> = {pending:'#fffbeb',confirmed:'#eff6ff',dispatched:'#faf5ff',in_transit:'#fff7ed',delivered:'#dcfce7'}

  useEffect(()=>{ if(user) loadProducts() },[user])

  async function loadProducts() {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase.from('products').select('*').eq('vendor_id',user!.id).order('created_at',{ascending:false})
    setProducts(data||[])
    setLoading(false)
  }

  async function toggleProduct(id: string, current: boolean) {
    const supabase = createClient()
    await supabase.from('products').update({is_active:!current}).eq('id',id)
    setProducts(prev=>prev.map(p=>p.id===id?{...p,is_active:!current}:p))
  }

  async function deleteProduct(id: string) {
    if(!confirm('Delete this product? This cannot be undone.')) return
    setDeletingId(id)
    const supabase = createClient()
    await supabase.from('products').update({is_active:false}).eq('id',id)
    setProducts(prev=>prev.filter(p=>p.id!==id))
    setDeletingId(null)
  }

  const CAT_EMOJI: Record<string,string> = {fashion:'👗',electronics:'📱',beauty:'💄',kitchen:'🍳','home-garden':'🏠',sports:'⚽',farming:'🌾',lighting:'💡',accessories:'👜',toys:'🧸',furniture:'🪑',vehicles:'🚗',educational:'🎓',services:'🛠️',property:'🏘️'}

  return (
    <div style={{minHeight:'100vh',background:'#f4faf7',fontFamily:font}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet"/>

      {/* Nav */}
      <nav style={{background:'white',borderBottom:'1px solid #e2ece7',boxShadow:'0 1px 8px rgba(0,0,0,0.05)',position:'sticky',top:0,zIndex:50}}>
        <div style={{maxWidth:1280,margin:'0 auto',padding:'0 24px',height:60,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Link href="/home" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
            <div style={{width:32,height:32,borderRadius:10,background:'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center'}}><ShoppingBag size={15} color="white"/></div>
            <span style={{fontFamily:syne,fontWeight:800,fontSize:18,color:'#111714'}}>Corefieds</span>
          </Link>
          <div style={{display:'flex',gap:4}}>
            {['overview','products','orders','analytics','settings'].map(tab=>{
              const isActive = activeTab===tab
              return (
                <button key={tab} onClick={()=>setActiveTab(tab)}
                  style={{padding:'7px 16px',borderRadius:10,border:'none',background:isActive?'linear-gradient(135deg,#0f5c35,#22a063)':'transparent',color:isActive?'white':'#6b8275',fontWeight:700,fontSize:13,cursor:'pointer',fontFamily:font,textTransform:'capitalize'}}>
                  {tab}
                </button>
              )
            })}
          </div>
          <div style={{display:'flex',gap:10,alignItems:'center'}}>
            <button style={{width:36,height:36,borderRadius:10,background:'#f4faf7',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
              <Bell size={17} color="#6b8275"/>
              <div style={{position:'absolute',top:6,right:6,width:8,height:8,background:'#e84040',borderRadius:'50%'}}/>
            </button>
            <Link href="/vendor/add-product" style={{display:'flex',alignItems:'center',gap:6,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:700,fontSize:13,padding:'8px 16px',borderRadius:10,textDecoration:'none'}}>
              <Plus size={14}/> Add Product
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#0f5c35 0%,#1a7a4a 60%,#22a063 100%)',padding:'36px 24px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',width:400,height:400,borderRadius:'50%',background:'rgba(255,255,255,0.05)',top:-150,right:-100}}/>
        <div style={{position:'relative',zIndex:2,maxWidth:1280,margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16}}>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
                <div style={{width:52,height:52,borderRadius:16,background:'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>🏪</div>
                <div>
                  <div style={{fontSize:12,color:'rgba(255,255,255,0.65)',fontWeight:600}}>VENDOR DASHBOARD</div>
                  <h1 style={{fontFamily:syne,fontWeight:800,fontSize:24,color:'white',margin:0}}>{profile?.full_name||'Your Store'}</h1>
                </div>
              </div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {profile?.is_verified && (
                  <span style={{background:'rgba(255,255,255,0.15)',color:'white',fontSize:11,fontWeight:700,padding:'4px 12px',borderRadius:50,border:'1px solid rgba(255,255,255,0.25)',display:'flex',alignItems:'center',gap:4}}>
                    <ShieldCheck size={11}/> Verified Vendor
                  </span>
                )}
                <span style={{background:'rgba(255,255,255,0.15)',color:'white',fontSize:11,fontWeight:700,padding:'4px 12px',borderRadius:50,border:'1px solid rgba(255,255,255,0.25)'}}>🇿🇦 South Africa</span>
                <span style={{background:'rgba(255,255,255,0.15)',color:'white',fontSize:11,fontWeight:700,padding:'4px 12px',borderRadius:50,border:'1px solid rgba(255,255,255,0.25)'}}>⭐ 4.8 Rating</span>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
              {[
                {icon:DollarSign,label:'Revenue',value:'R'+totalRevenue.toLocaleString(),sub:'This week'},
                {icon:Package,label:'Orders',value:totalOrders,sub:'This week'},
                {icon:Eye,label:'Views',value:'2,847',sub:'This week'},
                {icon:Star,label:'Rating',value:'4.8',sub:'Overall'},
              ].map(({icon:Icon,label,value,sub})=>(
                <div key={label} style={{background:'rgba(255,255,255,0.12)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:14,padding:'14px 16px',minWidth:100}}>
                  <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:6}}>
                    <Icon size={12} color="rgba(255,255,255,0.65)"/>
                    <span style={{fontSize:10,color:'rgba(255,255,255,0.65)',fontWeight:600}}>{label}</span>
                  </div>
                  <div style={{fontFamily:syne,fontWeight:800,fontSize:20,color:'white'}}>{value}</div>
                  <div style={{fontSize:10,color:'rgba(255,255,255,0.5)',marginTop:2}}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1280,margin:'0 auto',padding:'24px 24px'}}>

        {/* OVERVIEW */}
        {activeTab==='overview' && (
          <div style={{display:'grid',gridTemplateColumns:'1fr 380px',gap:24}}>
            <div style={{display:'flex',flexDirection:'column',gap:20}}>

              {/* Revenue chart */}
              <div style={{background:'white',borderRadius:20,padding:24,border:'1px solid #e2ece7'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
                  <div>
                    <h3 style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#111714',margin:'0 0 3px'}}>Revenue Overview</h3>
                    <p style={{fontSize:13,color:'#6b8275',margin:0}}>Past 7 days performance</p>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontFamily:syne,fontWeight:800,fontSize:24,color:'#1a7a4a'}}>R{totalRevenue.toLocaleString()}</div>
                    <div style={{fontSize:12,color:'#22a063',fontWeight:700,display:'flex',alignItems:'center',gap:3,justifyContent:'flex-end'}}><ArrowUpRight size={12}/>+23% vs last week</div>
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'flex-end',gap:8,height:140,marginBottom:8}}>
                  {SAMPLE_STATS.map(d=>{
                    const h = Math.round((d.revenue/maxRevenue)*120)
                    return (
                      <div key={d.day} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
                        <div style={{fontSize:10,fontWeight:700,color:'#1a7a4a'}}>R{(d.revenue/1000).toFixed(1)}k</div>
                        <div style={{width:'100%',background:'linear-gradient(180deg,#22a063,#0f5c35)',borderRadius:'6px 6px 0 0',height:h,minHeight:8}}/>
                      </div>
                    )
                  })}
                </div>
                <div style={{display:'flex',gap:8}}>
                  {SAMPLE_STATS.map(d=>(
                    <div key={d.day} style={{flex:1,textAlign:'center',fontSize:11,color:'#6b8275',fontWeight:600}}>{d.day}</div>
                  ))}
                </div>
              </div>

              {/* Recent orders */}
              <div style={{background:'white',borderRadius:20,border:'1px solid #e2ece7',overflow:'hidden'}}>
                <div style={{padding:'18px 24px',borderBottom:'1px solid #f4faf7',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <h3 style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#111714',margin:0}}>Recent Orders</h3>
                  <button onClick={()=>setActiveTab('orders')} style={{fontSize:13,fontWeight:700,color:'#1a7a4a',background:'none',border:'none',cursor:'pointer',fontFamily:font}}>View all →</button>
                </div>
                {SAMPLE_ORDERS.slice(0,4).map(o=>(
                  <div key={o.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 24px',borderBottom:'1px solid #f4faf7',flexWrap:'wrap',gap:8}}>
                    <div style={{display:'flex',gap:12,alignItems:'center'}}>
                      <div style={{width:36,height:36,borderRadius:10,background:'#f4faf7',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <Package size={16} color="#1a7a4a"/>
                      </div>
                      <div>
                        <div style={{fontWeight:700,fontSize:13,color:'#1c2b22'}}>#{o.id} · {o.item}</div>
                        <div style={{fontSize:11,color:'#6b8275',marginTop:2}}>by {o.buyer} · {new Date(o.date).toLocaleDateString('en-ZA',{day:'numeric',month:'short'})}</div>
                      </div>
                    </div>
                    <div style={{display:'flex',gap:10,alignItems:'center'}}>
                      <span style={{background:statusBg[o.status],color:statusColor[o.status],fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:50}}>{o.status.replace('_',' ').toUpperCase()}</span>
                      <span style={{fontFamily:syne,fontWeight:800,fontSize:15,color:'#1a7a4a'}}>R{o.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              {/* Escrow balance */}
              <div style={{background:'linear-gradient(135deg,#edfdf4,#d4f5e6)',border:'1px solid #bbf7d0',borderRadius:20,padding:22}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
                  <ShieldCheck size={16} color="#16a34a"/>
                  <h4 style={{fontFamily:syne,fontWeight:800,fontSize:15,color:'#14532d',margin:0}}>Escrow Balance</h4>
                </div>
                <div style={{fontFamily:syne,fontWeight:800,fontSize:36,color:'#0f5c35',marginBottom:6}}>R8,750</div>
                <div style={{fontSize:13,color:'#166534',marginBottom:14}}>Funds awaiting buyer confirmation</div>
                {[{l:'Available to withdraw',v:'R5,200'},{l:'In escrow (held)',v:'R3,550'},{l:'Next payout',v:'1 Apr 2026'}].map(r=>(
                  <div key={r.l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.5)',fontSize:13}}>
                    <span style={{color:'#166534'}}>{r.l}</span>
                    <span style={{fontWeight:800,color:'#0f5c35'}}>{r.v}</span>
                  </div>
                ))}
                <button style={{width:'100%',marginTop:14,padding:12,borderRadius:12,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:800,fontSize:13,border:'none',cursor:'pointer',fontFamily:font}}>
                  Withdraw Funds
                </button>
              </div>

              {/* Quick actions */}
              <div style={{background:'white',borderRadius:20,padding:20,border:'1px solid #e2ece7'}}>
                <h4 style={{fontFamily:syne,fontWeight:800,fontSize:15,color:'#111714',marginBottom:14}}>Quick Actions</h4>
                {[
                  {icon:Plus,label:'Add New Product',color:'#0f5c35',bg:'#edfaf3',action:()=>setActiveTab('products')},
                  {icon:Eye,label:'View My Storefront',color:'#1e3a8a',bg:'#eff6ff',action:()=>router.push('/vendor/'+user?.id)},
                  {icon:TrendingUp,label:'Affiliate Programme',color:'#7c3aed',bg:'#faf5ff',action:()=>router.push('/affiliate')},
                  {icon:Users,label:'View All Orders',color:'#f97316',bg:'#fff7ed',action:()=>setActiveTab('orders')},
                ].map(a=>{
                  const Icon = a.icon
                  return (
                    <button key={a.label} onClick={a.action}
                      style={{width:'100%',display:'flex',alignItems:'center',gap:12,padding:'12px',borderRadius:12,border:'1px solid #e2ece7',background:'white',cursor:'pointer',marginBottom:8,fontFamily:font,transition:'all .15s'}}>
                      <div style={{width:36,height:36,borderRadius:10,background:a.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                        <Icon size={16} color={a.color}/>
                      </div>
                      <span style={{fontWeight:700,fontSize:13,color:'#1c2b22',flex:1,textAlign:'left'}}>{a.label}</span>
                      <ChevronRight size={14} color="#6b8275"/>
                    </button>
                  )
                })}
              </div>

              {/* Top products */}
              <div style={{background:'white',borderRadius:20,padding:20,border:'1px solid #e2ece7'}}>
                <h4 style={{fontFamily:syne,fontWeight:800,fontSize:15,color:'#111714',marginBottom:14}}>Top Performing</h4>
                {[
                  {name:'Amped T-Shirt',sales:48,revenue:19200,emoji:'👕'},
                  {name:'LED Strip Light',sales:31,revenue:9920,emoji:'💡'},
                  {name:'Glow Serum',sales:22,revenue:12760,emoji:'💄'},
                ].map((p,i)=>(
                  <div key={p.name} style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
                    <div style={{fontFamily:syne,fontWeight:800,fontSize:18,color:'#e2ece7',width:20}}>{i+1}</div>
                    <div style={{fontSize:24}}>{p.emoji}</div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:13,color:'#1c2b22'}}>{p.name}</div>
                      <div style={{fontSize:11,color:'#6b8275'}}>{p.sales} sales</div>
                    </div>
                    <div style={{fontFamily:syne,fontWeight:800,fontSize:14,color:'#1a7a4a'}}>R{p.revenue.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab==='products' && (
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <div>
                <h2 style={{fontFamily:syne,fontWeight:800,fontSize:22,color:'#111714',margin:'0 0 4px'}}>My Products</h2>
                <p style={{fontSize:13,color:'#6b8275',margin:0}}>{products.length} products listed</p>
              </div>
              <Link href="/vendor/add-product" style={{display:'flex',alignItems:'center',gap:6,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:800,fontSize:14,padding:'11px 20px',borderRadius:12,textDecoration:'none',boxShadow:'0 4px 14px rgba(26,122,74,0.3)'}}>
                <Plus size={15}/> Add New Product
              </Link>
            </div>

            {loading ? (
              <div style={{textAlign:'center',padding:60,color:'#6b8275'}}>Loading products...</div>
            ) : products.length===0 ? (
              <div style={{background:'white',borderRadius:20,padding:'60px 24px',border:'1px solid #e2ece7',textAlign:'center'}}>
                <div style={{fontSize:64,marginBottom:16}}>📦</div>
                <h3 style={{fontFamily:syne,fontWeight:800,fontSize:22,color:'#111714',marginBottom:8}}>No products yet</h3>
                <p style={{fontSize:14,color:'#6b8275',marginBottom:20}}>Start listing products for free. Reach thousands of buyers.</p>
                <Link href="/vendor/add-product" style={{display:'inline-flex',alignItems:'center',gap:8,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:800,fontSize:14,padding:'12px 28px',borderRadius:12,textDecoration:'none'}}>
                  <Plus size={15}/> Add Your First Product
                </Link>
              </div>
            ) : (
              <div style={{background:'white',borderRadius:20,border:'1px solid #e2ece7',overflow:'hidden'}}>
                <div style={{display:'grid',gridTemplateColumns:'3fr 1fr 1fr 1fr auto',gap:0,padding:'12px 20px',borderBottom:'2px solid #f4faf7',fontSize:11,fontWeight:700,color:'#6b8275',textTransform:'uppercase',letterSpacing:'0.5px'}}>
                  <span>Product</span><span style={{textAlign:'center'}}>Price</span><span style={{textAlign:'center'}}>Stock</span><span style={{textAlign:'center'}}>Status</span><span/>
                </div>
                {products.map(p=>(
                  <div key={p.id} style={{display:'grid',gridTemplateColumns:'3fr 1fr 1fr 1fr auto',gap:0,padding:'16px 20px',borderBottom:'1px solid #f4faf7',alignItems:'center'}}>
                    <div style={{display:'flex',gap:14,alignItems:'center'}}>
                      <div style={{width:52,height:52,borderRadius:14,background:'#f4faf7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,flexShrink:0}}>
                        {CAT_EMOJI[p.category_slug]||'📦'}
                      </div>
                      <div>
                        <div style={{fontWeight:700,fontSize:14,color:'#1c2b22',marginBottom:3}}>{p.title}</div>
                        <div style={{fontSize:12,color:'#6b8275',textTransform:'capitalize'}}>{p.category_slug?.replace('-',' ')||'Uncategorised'}</div>
                        {p.rating>0 && <div style={{fontSize:11,color:'#f5a623',marginTop:2}}>{'★'.repeat(Math.round(p.rating))} {p.rating} ({p.review_count})</div>}
                      </div>
                    </div>
                    <div style={{textAlign:'center',fontFamily:syne,fontWeight:800,fontSize:16,color:'#1a7a4a'}}>R{p.price?.toLocaleString()}</div>
                    <div style={{textAlign:'center',fontWeight:700,fontSize:14,color:p.stock_qty<5?'#e84040':'#1c2b22'}}>{p.stock_qty}</div>
                    <div style={{textAlign:'center'}}>
                      <button onClick={()=>toggleProduct(p.id,p.is_active)} style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:5,justifyContent:'center',fontSize:12,fontWeight:700,color:p.is_active?'#22a063':'#6b8275',fontFamily:font}}>
                        {p.is_active?<ToggleRight size={22} color="#22a063"/>:<ToggleLeft size={22} color="#6b8275"/>}
                        {p.is_active?'Active':'Draft'}
                      </button>
                    </div>
                    <div style={{display:'flex',gap:6}}>
                      <Link href={'/vendor/edit-product/'+p.id}
                        style={{width:32,height:32,borderRadius:8,background:'#eff6ff',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none'}}>
                        <Edit size={13} color="#2563eb"/>
                      </Link>
                      <button onClick={()=>deleteProduct(p.id)} disabled={deletingId===p.id}
                        style={{width:32,height:32,borderRadius:8,background:'#fff0f0',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',opacity:deletingId===p.id?0.5:1}}>
                        <Trash2 size={13} color="#e84040"/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab==='orders' && (
          <div>
            <div style={{marginBottom:20,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <h2 style={{fontFamily:syne,fontWeight:800,fontSize:22,color:'#111714',margin:'0 0 4px'}}>Incoming Orders</h2>
                <p style={{fontSize:13,color:'#6b8275',margin:0}}>{SAMPLE_ORDERS.length} orders</p>
              </div>
              <div style={{display:'flex',gap:8}}>
                {['All','Pending','In Transit','Delivered'].map(f=>(
                  <button key={f} style={{padding:'7px 14px',borderRadius:10,border:'1.5px solid #e2ece7',background:'white',fontSize:12,fontWeight:700,color:'#6b8275',cursor:'pointer',fontFamily:font}}>{f}</button>
                ))}
              </div>
            </div>
            <div style={{background:'white',borderRadius:20,border:'1px solid #e2ece7',overflow:'hidden'}}>
              {SAMPLE_ORDERS.map(o=>(
                <div key={o.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'18px 24px',borderBottom:'1px solid #f4faf7',flexWrap:'wrap',gap:12}}>
                  <div style={{display:'flex',gap:14,alignItems:'center'}}>
                    <div style={{width:44,height:44,borderRadius:12,background:'#f4faf7',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <Package size={18} color="#1a7a4a"/>
                    </div>
                    <div>
                      <div style={{fontWeight:700,fontSize:14,color:'#1c2b22',marginBottom:3}}>Order #{o.id} · {o.item}</div>
                      <div style={{fontSize:12,color:'#6b8275'}}>Buyer: {o.buyer} · {new Date(o.date).toLocaleDateString('en-ZA',{day:'numeric',month:'short',year:'numeric'})}</div>
                    </div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:14}}>
                    <span style={{background:statusBg[o.status],color:statusColor[o.status],fontSize:12,fontWeight:700,padding:'4px 12px',borderRadius:50}}>
                      {o.status.replace('_',' ').toUpperCase()}
                    </span>
                    <span style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#1a7a4a'}}>R{o.amount}</span>
                    <div style={{fontSize:11,fontWeight:700,color:'#22a063'}}>🔒 In Escrow</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab==='analytics' && (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
            {[
              {title:'Total Revenue',value:'R'+totalRevenue.toLocaleString(),change:'+23%',icon:DollarSign,color:'#0f5c35',bg:'#edfaf3'},
              {title:'Total Orders',value:totalOrders,change:'+18%',icon:Package,color:'#1e3a8a',bg:'#eff6ff'},
              {title:'Profile Views',value:'2,847',change:'+31%',icon:Eye,color:'#7c3aed',bg:'#faf5ff'},
              {title:'Avg Order Value',value:'R'+(totalRevenue/totalOrders).toFixed(0),change:'+5%',icon:TrendingUp,color:'#92400e',bg:'#fffbeb'},
            ].map(({title,value,change,icon:Icon,color,bg})=>(
              <div key={title} style={{background:'white',borderRadius:20,padding:24,border:'1px solid #e2ece7'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16}}>
                  <div style={{width:44,height:44,borderRadius:14,background:bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Icon size={20} color={color}/>
                  </div>
                  <span style={{fontSize:12,fontWeight:700,color:'#22a063',background:'#dcfce7',padding:'3px 10px',borderRadius:50,display:'flex',alignItems:'center',gap:3}}>
                    <ArrowUpRight size={11}/>{change}
                  </span>
                </div>
                <div style={{fontFamily:syne,fontWeight:800,fontSize:32,color:'#111714',marginBottom:4}}>{value}</div>
                <div style={{fontSize:13,color:'#6b8275'}}>{title} · This week</div>
              </div>
            ))}
            <div style={{gridColumn:'1/-1',background:'white',borderRadius:20,padding:24,border:'1px solid #e2ece7'}}>
              <h3 style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#111714',marginBottom:20}}>Daily Revenue Breakdown</h3>
              <div style={{display:'flex',alignItems:'flex-end',gap:12,height:160,marginBottom:8}}>
                {SAMPLE_STATS.map(d=>{
                  const h = Math.round((d.revenue/maxRevenue)*140)
                  return (
                    <div key={d.day} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                      <div style={{fontSize:12,fontWeight:700,color:'#1a7a4a'}}>R{(d.revenue/1000).toFixed(1)}k</div>
                      <div style={{width:'100%',background:'linear-gradient(180deg,#22a063,#0f5c35)',borderRadius:'8px 8px 0 0',height:h,minHeight:12}}/>
                      <div style={{fontSize:12,color:'#6b8275',fontWeight:600}}>{d.day}</div>
                      <div style={{fontSize:11,color:'#6b8275'}}>{d.orders} orders</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab==='settings' && (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
            <div style={{background:'white',borderRadius:20,padding:28,border:'1px solid #e2ece7'}}>
              <h3 style={{fontFamily:syne,fontWeight:800,fontSize:18,color:'#111714',marginBottom:20}}>Store Settings</h3>
              {[
                {l:'Store Name',v:profile?.full_name||'',ph:'Your store name'},
                {l:'Contact Email',v:profile?.email||'',ph:'store@email.co.za'},
                {l:'Phone Number',v:profile?.phone||'',ph:'071 234 5678'},
                {l:'Location',v:profile?.location||'',ph:'City, Province'},
              ].map(f=>(
                <div key={f.l} style={{marginBottom:16}}>
                  <label style={{display:'block',fontSize:12,fontWeight:700,color:'#6b8275',marginBottom:6}}>{f.l}</label>
                  <input defaultValue={f.v} placeholder={f.ph}
                    style={{width:'100%',border:'1.5px solid #e2ece7',borderRadius:12,padding:'11px 14px',fontSize:14,fontFamily:font,outline:'none',color:'#1c2b22',boxSizing:'border-box'}}/>
                </div>
              ))}
              <button style={{width:'100%',padding:13,borderRadius:12,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:800,fontSize:14,border:'none',cursor:'pointer',fontFamily:font}}>
                Save Changes
              </button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              <div style={{background:'linear-gradient(135deg,#edfdf4,#d4f5e6)',border:'1px solid #bbf7d0',borderRadius:20,padding:24}}>
                <h3 style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#14532d',marginBottom:14}}>Verification Status</h3>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                  <div style={{width:44,height:44,borderRadius:'50%',background:'#22a063',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <ShieldCheck size={22} color="white"/>
                  </div>
                  <div>
                    <div style={{fontWeight:800,fontSize:15,color:'#14532d'}}>{profile?.is_verified?'Verified Vendor':'Verification Pending'}</div>
                    <div style={{fontSize:13,color:'#166534'}}>Trade-Safe escrow active on all sales</div>
                  </div>
                </div>
                {[{l:'ID Verification',v:true},{l:'Bank Account',v:true},{l:'Business Docs',v:false},{l:'Address Proof',v:true}].map(r=>(
                  <div key={r.l} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.5)'}}>
                    <span style={{fontSize:13,color:'#166534'}}>{r.l}</span>
                    <span style={{fontSize:12,fontWeight:700,color:r.v?'#16a34a':'#f59e0b'}}>{r.v?'✓ Verified':'⏳ Pending'}</span>
                  </div>
                ))}
              </div>
              <div style={{background:'white',borderRadius:20,padding:24,border:'1px solid #e2ece7'}}>
                <h3 style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#111714',marginBottom:14}}>Payment Settings</h3>
                {[{l:'Bank Name',v:'FNB'},{l:'Account Number',v:'••••••4892'},{l:'Branch Code',v:'250655'},{l:'Account Type',v:'Cheque'}].map(r=>(
                  <div key={r.l} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid #f4faf7',fontSize:13}}>
                    <span style={{color:'#6b8275'}}>{r.l}</span>
                    <span style={{fontWeight:700,color:'#1c2b22'}}>{r.v}</span>
                  </div>
                ))}
                <button style={{width:'100%',marginTop:14,padding:11,borderRadius:10,background:'#f4faf7',border:'1px solid #e2ece7',color:'#1c2b22',fontWeight:700,fontSize:13,cursor:'pointer',fontFamily:font}}>
                  Update Bank Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function VendorDashboard() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{color:'#1a7a4a',fontWeight:700}}>Loading dashboard...</div></div>}>
      <VendorContent/>
    </Suspense>
  )
}
