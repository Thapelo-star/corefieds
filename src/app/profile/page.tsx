'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase-client'
import { ShoppingBag, User, Package, Heart, TrendingUp, Shield, Bell, CreditCard, LogOut, Edit2, Check, MapPin, Phone, Mail, Camera, ChevronRight, Star, ShieldCheck, Store } from 'lucide-react'

const PROVINCES = ['Gauteng','Western Cape','KwaZulu-Natal','Eastern Cape','Limpopo','Mpumalanga','North West','Free State','Northern Cape']

export default function ProfilePage() {
  const { user, profile, signOut } = useAuth()
  const router = useRouter()
  const font = "'Plus Jakarta Sans',sans-serif"
  const syne = "'Syne',sans-serif"

  const [activeTab, setActiveTab] = useState('profile')
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [orders, setOrders] = useState<any[]>([])
  const [wishlistCount, setWishlistCount] = useState(0)
  const [notifications, setNotifications] = useState<any[]>([])

  const [form, setForm] = useState({
    full_name: '', phone: '', location: '', province: 'Mpumalanga'
  })

  useEffect(() => {
    if (!user) { router.push('/login'); return }
    if (profile) {
      setForm({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        location: profile.location || '',
        province: profile.province || 'Mpumalanga',
      })
    }
    loadData()
  }, [user, profile])

  async function loadData() {
    if (!user) return
    const supabase = createClient()
    const [{ data: ordersData }, { data: wishData }, { data: notifData }] = await Promise.all([
      supabase.from('orders').select('*').eq('buyer_id', user.id).order('created_at', { ascending: false }).limit(5),
      supabase.from('wishlists').select('id').eq('user_id', user.id),
      supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20),
    ])
    setOrders(ordersData || [])
    setWishlistCount(wishData?.length || 0)
    setNotifications(notifData || [])
  }

  async function saveProfile() {
    if (!user) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from('profiles').update({
      full_name: form.full_name,
      phone: form.phone,
      location: form.location + ', ' + form.province,
    }).eq('id', user.id)
    setSaving(false)
    setSaved(true)
    setEditing(false)
    setTimeout(() => setSaved(false), 3000)
  }

  async function markAllRead() {
    if (!user) return
    const supabase = createClient()
    await supabase.from('notifications').update({ is_read: true }).eq('user_id', user.id)
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
  }

  const statusColor: Record<string,string> = { pending:'#f59e0b',confirmed:'#3b82f6',dispatched:'#8b5cf6',in_transit:'#f97316',delivered:'#22a063' }
  const statusBg: Record<string,string> = { pending:'#fffbeb',confirmed:'#eff6ff',dispatched:'#faf5ff',in_transit:'#fff7ed',delivered:'#dcfce7' }
  const unreadNotifs = notifications.filter(n => !n.is_read).length

  const SAMPLE_NOTIFS = [
    { id:'n1', type:'order', title:'Order Dispatched', message:'Your order #CF0001 has been dispatched via The Courier Guy.', link:'/orders', is_read:false, created_at:new Date(Date.now()-3600000).toISOString() },
    { id:'n2', type:'promo', title:'Tuesday Choose Day', message:'New curated deals are live. Shop now before they run out!', link:'/home', is_read:false, created_at:new Date(Date.now()-86400000).toISOString() },
    { id:'n3', type:'chat', title:'New Message', message:'Amped Fitness ZA replied to your message about the T-Shirt.', link:'/chat', is_read:true, created_at:new Date(Date.now()-172800000).toISOString() },
    { id:'n4', type:'affiliate', title:'Commission Earned!', message:'You earned R40 commission from a sale. Keep sharing!', link:'/affiliate', is_read:true, created_at:new Date(Date.now()-259200000).toISOString() },
  ]

  const displayNotifs = notifications.length > 0 ? notifications : SAMPLE_NOTIFS

  if (!user || !profile) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:font}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet"/>
      <div style={{color:'#1a7a4a',fontWeight:700}}>Loading profile...</div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#f4faf7',fontFamily:font}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet"/>

      {/* Nav */}
      <nav style={{background:'white',borderBottom:'1px solid #e2ece7',boxShadow:'0 1px 8px rgba(0,0,0,0.05)',position:'sticky',top:0,zIndex:50}}>
        <div style={{maxWidth:1100,margin:'0 auto',padding:'0 24px',height:60,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Link href="/home" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
            <div style={{width:32,height:32,borderRadius:10,background:'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center'}}><ShoppingBag size={15} color="white"/></div>
            <span style={{fontFamily:syne,fontWeight:800,fontSize:18,color:'#111714'}}>Corefieds</span>
          </Link>
          <div style={{display:'flex',gap:4}}>
            {['profile','orders','notifications','security'].map(tab => {
              const isActive = activeTab === tab
              const hasAlert = tab === 'notifications' && displayNotifs.filter(n => !n.is_read).length > 0
              return (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  style={{padding:'7px 14px',borderRadius:10,border:'none',background:isActive?'linear-gradient(135deg,#0f5c35,#22a063)':'transparent',color:isActive?'white':'#6b8275',fontWeight:700,fontSize:13,cursor:'pointer',fontFamily:font,textTransform:'capitalize',position:'relative'}}>
                  {tab}
                  {hasAlert && <div style={{position:'absolute',top:4,right:4,width:8,height:8,background:'#e84040',borderRadius:'50%'}}/>}
                </button>
              )
            })}
          </div>
          <button onClick={() => { signOut(); router.push('/') }}
            style={{display:'flex',alignItems:'center',gap:6,background:'#fff0f0',color:'#e84040',border:'none',borderRadius:10,padding:'8px 14px',cursor:'pointer',fontWeight:700,fontSize:13,fontFamily:font}}>
            <LogOut size={14}/> Sign Out
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{background:'linear-gradient(135deg,#0f5c35,#1a7a4a 60%,#22a063)',padding:'40px 24px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',width:360,height:360,borderRadius:'50%',background:'rgba(255,255,255,0.05)',top:-120,right:-80}}/>
        <div style={{position:'relative',zIndex:2,maxWidth:1100,margin:'0 auto',display:'flex',alignItems:'center',gap:24,flexWrap:'wrap'}}>
          <div style={{position:'relative'}}>
            <div style={{width:88,height:88,borderRadius:24,background:'rgba(255,255,255,0.2)',border:'3px solid rgba(255,255,255,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:36,fontWeight:800,color:'white'}}>
              {profile.full_name?.[0]?.toUpperCase() || 'U'}
            </div>
            <button style={{position:'absolute',bottom:-4,right:-4,width:28,height:28,borderRadius:'50%',background:'white',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.15)'}}>
              <Camera size={13} color="#1a7a4a"/>
            </button>
          </div>
          <div style={{flex:1}}>
            <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',marginBottom:4}}>
              <h1 style={{fontFamily:syne,fontWeight:800,fontSize:26,color:'white',margin:0}}>{profile.full_name}</h1>
              {profile.is_verified && (
                <span style={{background:'rgba(255,255,255,0.2)',color:'white',fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:50,border:'1px solid rgba(255,255,255,0.3)',display:'flex',alignItems:'center',gap:4}}>
                  <ShieldCheck size={11}/> Verified
                </span>
              )}
            </div>
            <div style={{fontSize:13,color:'rgba(255,255,255,0.7)',marginBottom:8}}>{profile.email}</div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              <span style={{background:'rgba(255,255,255,0.15)',color:'white',fontSize:11,fontWeight:700,padding:'4px 12px',borderRadius:50,border:'1px solid rgba(255,255,255,0.2)',textTransform:'capitalize'}}>{profile.role}</span>
              <span style={{background:'rgba(255,255,255,0.15)',color:'white',fontSize:11,fontWeight:700,padding:'4px 12px',borderRadius:50,border:'1px solid rgba(255,255,255,0.2)'}}>🇿🇦 South Africa</span>
              {profile.location && <span style={{background:'rgba(255,255,255,0.15)',color:'white',fontSize:11,fontWeight:700,padding:'4px 12px',borderRadius:50,border:'1px solid rgba(255,255,255,0.2)',display:'flex',alignItems:'center',gap:4}}><MapPin size={10}/>{profile.location}</span>}
            </div>
          </div>
          {/* Quick stats */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:1,background:'rgba(255,255,255,0.1)',borderRadius:16,overflow:'hidden'}}>
            {[{n:orders.length.toString(),l:'Orders'},{n:wishlistCount.toString(),l:'Saved'},{n:'R2.8k',l:'Earned'}].map(s=>(
              <div key={s.l} style={{background:'rgba(255,255,255,0.08)',padding:'14px 20px',textAlign:'center'}}>
                <div style={{fontFamily:syne,fontWeight:800,fontSize:22,color:'white'}}>{s.n}</div>
                <div style={{fontSize:11,color:'rgba(255,255,255,0.6)',marginTop:2}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'28px 24px'}}>

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:24}}>
            <div style={{display:'flex',flexDirection:'column',gap:20}}>

              {/* Edit profile */}
              <div style={{background:'white',borderRadius:20,padding:28,border:'1px solid #e2ece7'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
                  <h3 style={{fontFamily:syne,fontWeight:800,fontSize:18,color:'#111714',margin:0}}>Personal Information</h3>
                  {!editing ? (
                    <button onClick={() => setEditing(true)} style={{display:'flex',alignItems:'center',gap:6,background:'#edfaf3',color:'#1a7a4a',border:'1px solid #d4f5e6',borderRadius:10,padding:'8px 14px',cursor:'pointer',fontWeight:700,fontSize:13,fontFamily:font}}>
                      <Edit2 size={13}/> Edit
                    </button>
                  ) : (
                    <div style={{display:'flex',gap:8}}>
                      <button onClick={() => setEditing(false)} style={{background:'#f4faf7',color:'#6b8275',border:'1px solid #e2ece7',borderRadius:10,padding:'8px 14px',cursor:'pointer',fontWeight:700,fontSize:13,fontFamily:font}}>Cancel</button>
                      <button onClick={saveProfile} disabled={saving} style={{display:'flex',alignItems:'center',gap:6,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',border:'none',borderRadius:10,padding:'8px 14px',cursor:'pointer',fontWeight:700,fontSize:13,fontFamily:font}}>
                        {saving ? 'Saving...' : <><Check size={13}/> Save</>}
                      </button>
                    </div>
                  )}
                </div>
                {saved && <div style={{background:'#dcfce7',border:'1px solid #bbf7d0',color:'#16a34a',fontSize:13,fontWeight:700,borderRadius:10,padding:'10px 14px',marginBottom:16}}>✓ Profile updated successfully!</div>}
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                  {[
                    {l:'Full Name',k:'full_name',ph:'Your full name',icon:User},
                    {l:'Phone Number',k:'phone',ph:'071 234 5678',icon:Phone},
                    {l:'City / Town',k:'location',ph:'eMalahleni',icon:MapPin},
                  ].map(f => {
                    const Icon = f.icon
                    return (
                      <div key={f.k} style={{gridColumn:f.k==='full_name'?'1/-1':'auto'}}>
                        <label style={{display:'block',fontSize:12,fontWeight:700,color:'#6b8275',marginBottom:6}}>{f.l}</label>
                        <div style={{position:'relative'}}>
                          <Icon size={14} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#6b8275'}}/>
                          <input value={(form as any)[f.k]} onChange={e => setForm({...form,[f.k]:e.target.value})}
                            placeholder={f.ph} disabled={!editing}
                            style={{width:'100%',border:'1.5px solid #e2ece7',borderRadius:12,padding:'11px 14px 11px 36px',fontSize:14,fontFamily:font,outline:'none',color:'#1c2b22',background:editing?'white':'#f9fafb',boxSizing:'border-box'}}/>
                        </div>
                      </div>
                    )
                  })}
                  <div>
                    <label style={{display:'block',fontSize:12,fontWeight:700,color:'#6b8275',marginBottom:6}}>Province</label>
                    <select value={form.province} onChange={e => setForm({...form,province:e.target.value})} disabled={!editing}
                      style={{width:'100%',border:'1.5px solid #e2ece7',borderRadius:12,padding:'11px 14px',fontSize:14,fontFamily:font,outline:'none',color:'#1c2b22',background:editing?'white':'#f9fafb',boxSizing:'border-box'}}>
                      {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div style={{gridColumn:'1/-1'}}>
                    <label style={{display:'block',fontSize:12,fontWeight:700,color:'#6b8275',marginBottom:6}}>Email Address</label>
                    <div style={{position:'relative'}}>
                      <Mail size={14} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#6b8275'}}/>
                      <input value={profile.email} disabled
                        style={{width:'100%',border:'1.5px solid #e2ece7',borderRadius:12,padding:'11px 14px 11px 36px',fontSize:14,fontFamily:font,outline:'none',color:'#6b8275',background:'#f9fafb',boxSizing:'border-box'}}/>
                    </div>
                    <div style={{fontSize:11,color:'#6b8275',marginTop:4}}>Email cannot be changed. Contact support if needed.</div>
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div style={{background:'white',borderRadius:20,border:'1px solid #e2ece7',overflow:'hidden'}}>
                <div style={{padding:'18px 24px',borderBottom:'1px solid #f4faf7'}}>
                  <h3 style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#111714',margin:0}}>Quick Access</h3>
                </div>
                {[
                  {icon:Package,label:'My Orders',sub:orders.length+' orders',color:'#0f5c35',bg:'#edfaf3',action:()=>setActiveTab('orders')},
                  {icon:Heart,label:'Saved Products',sub:wishlistCount+' items',color:'#e84040',bg:'#fff0f0',action:()=>router.push('/wishlist')},
                  {icon:TrendingUp,label:'Affiliate Dashboard',sub:'Earn commissions',color:'#7c3aed',bg:'#faf5ff',action:()=>router.push('/affiliate')},
                  {icon:Store,label:'Vendor Dashboard',sub:'Manage your store',color:'#1e3a8a',bg:'#eff6ff',action:()=>router.push('/vendor/dashboard')},
                  {icon:Bell,label:'Notifications',sub:displayNotifs.filter(n=>!n.is_read).length+' unread',color:'#f97316',bg:'#fff7ed',action:()=>setActiveTab('notifications')},
                  {icon:Shield,label:'Security Centre',sub:'Password, 2FA',color:'#dc2626',bg:'#fff0f0',action:()=>setActiveTab('security')},
                ].map(item => {
                  const Icon = item.icon
                  return (
                    <button key={item.label} onClick={item.action}
                      style={{width:'100%',display:'flex',alignItems:'center',gap:14,padding:'16px 24px',border:'none',background:'white',cursor:'pointer',borderBottom:'1px solid #f4faf7',fontFamily:font,transition:'all .15s',textAlign:'left'}}>
                      <div style={{width:40,height:40,borderRadius:12,background:item.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                        <Icon size={17} color={item.color}/>
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,fontSize:14,color:'#1c2b22'}}>{item.label}</div>
                        <div style={{fontSize:12,color:'#6b8275',marginTop:1}}>{item.sub}</div>
                      </div>
                      <ChevronRight size={15} color="#6b8275"/>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Right sidebar */}
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              {/* Verification */}
              <div style={{background:'linear-gradient(135deg,#edfdf4,#d4f5e6)',border:'1px solid #bbf7d0',borderRadius:20,padding:20}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
                  <ShieldCheck size={18} color="#16a34a"/>
                  <h4 style={{fontFamily:syne,fontWeight:800,fontSize:15,color:'#14532d',margin:0}}>Account Verification</h4>
                </div>
                {[
                  {l:'Email',v:true},{l:'Phone',v:!!profile.phone},{l:'ID Verification',v:profile.is_verified},{l:'Address',v:!!profile.location}
                ].map(r => (
                  <div key={r.l} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.5)'}}>
                    <span style={{fontSize:13,color:'#166534'}}>{r.l}</span>
                    <span style={{fontSize:12,fontWeight:700,color:r.v?'#16a34a':'#f59e0b'}}>{r.v?'✓ Verified':'⏳ Pending'}</span>
                  </div>
                ))}
                {!profile.is_verified && (
                  <button style={{width:'100%',marginTop:14,padding:11,borderRadius:10,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:700,fontSize:13,border:'none',cursor:'pointer',fontFamily:font}}>
                    Complete Verification
                  </button>
                )}
              </div>

              {/* Role upgrade */}
              {profile.role === 'buyer' && (
                <div style={{background:'linear-gradient(135deg,#1e3a8a,#2563eb)',borderRadius:20,padding:20}}>
                  <div style={{fontFamily:syne,fontWeight:800,fontSize:16,color:'white',marginBottom:8}}>Start Selling Today</div>
                  <div style={{fontSize:13,color:'rgba(255,255,255,0.8)',marginBottom:14,lineHeight:1.6}}>List products for free. Reach thousands of buyers. Trade-Safe escrow protects every transaction.</div>
                  <Link href="/vendor/add-product" style={{display:'block',textAlign:'center',background:'rgba(255,255,255,0.2)',color:'white',fontWeight:700,fontSize:13,padding:'11px',borderRadius:10,textDecoration:'none',border:'1px solid rgba(255,255,255,0.3)'}}>
                    Open Your Store Free →
                  </Link>
                </div>
              )}

              {/* Referral */}
              <div style={{background:'white',borderRadius:20,padding:20,border:'1px solid #e2ece7'}}>
                <div style={{fontFamily:syne,fontWeight:800,fontSize:15,color:'#111714',marginBottom:8}}>💸 Earn with Affiliates</div>
                <div style={{fontSize:13,color:'#6b8275',marginBottom:12,lineHeight:1.6}}>Share your referral link and earn 5% commission on every sale you refer.</div>
                <Link href="/affiliate" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:6,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:700,fontSize:13,padding:'11px',borderRadius:10,textDecoration:'none'}}>
                  <TrendingUp size={14}/> Go to Affiliate Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div>
            <div style={{marginBottom:20,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <h2 style={{fontFamily:syne,fontWeight:800,fontSize:22,color:'#111714',margin:0}}>My Orders</h2>
              <Link href="/orders" style={{fontSize:13,fontWeight:700,color:'#1a7a4a',textDecoration:'none'}}>View All Orders →</Link>
            </div>
            {orders.length === 0 ? (
              <div style={{background:'white',borderRadius:20,padding:'60px 24px',border:'1px solid #e2ece7',textAlign:'center'}}>
                <div style={{fontSize:56,marginBottom:16}}>📦</div>
                <h3 style={{fontFamily:syne,fontWeight:800,fontSize:20,color:'#111714',marginBottom:8}}>No orders yet</h3>
                <p style={{fontSize:14,color:'#6b8275',marginBottom:20}}>Start shopping to see your orders here.</p>
                <Link href="/home" style={{display:'inline-flex',alignItems:'center',gap:8,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:800,fontSize:14,padding:'12px 28px',borderRadius:12,textDecoration:'none'}}>Browse Products</Link>
              </div>
            ) : (
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                {orders.map(o => (
                  <Link key={o.id} href={'/orders/'+o.id} style={{textDecoration:'none',background:'white',borderRadius:18,padding:20,border:'1px solid #e2ece7',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,flexWrap:'wrap'}}>
                    <div style={{display:'flex',gap:14,alignItems:'center'}}>
                      <div style={{width:48,height:48,borderRadius:14,background:'#f4faf7',display:'flex',alignItems:'center',justifyContent:'center'}}><Package size={20} color="#1a7a4a"/></div>
                      <div>
                        <div style={{fontWeight:700,fontSize:14,color:'#1c2b22',marginBottom:3}}>Order #{o.id.slice(0,8).toUpperCase()}</div>
                        <div style={{fontSize:12,color:'#6b8275'}}>{o.items?.length||0} item{(o.items?.length||0)>1?'s':''} · {new Date(o.created_at).toLocaleDateString('en-ZA',{day:'numeric',month:'short',year:'numeric'})}</div>
                      </div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:12}}>
                      <span style={{background:statusBg[o.status]||'#f4faf7',color:statusColor[o.status]||'#6b8275',fontSize:11,fontWeight:700,padding:'4px 12px',borderRadius:50}}>{o.status?.replace('_',' ').toUpperCase()}</span>
                      <span style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#1a7a4a'}}>R{o.total?.toLocaleString()}</span>
                      <ChevronRight size={16} color="#6b8275"/>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === 'notifications' && (
          <div>
            <div style={{marginBottom:20,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <h2 style={{fontFamily:syne,fontWeight:800,fontSize:22,color:'#111714',margin:0}}>Notifications</h2>
              {displayNotifs.some(n => !n.is_read) && (
                <button onClick={markAllRead} style={{fontSize:13,fontWeight:700,color:'#1a7a4a',background:'none',border:'none',cursor:'pointer',fontFamily:font}}>Mark all as read</button>
              )}
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {displayNotifs.map(n => {
                const icons: Record<string,string> = {order:'📦',promo:'🔥',chat:'💬',affiliate:'💸',system:'🔔'}
                return (
                  <Link key={n.id} href={n.link||'#'} style={{textDecoration:'none',background:n.is_read?'white':'#edfaf3',borderRadius:16,padding:18,border:n.is_read?'1px solid #e2ece7':'1px solid #bbf7d0',display:'flex',gap:14,alignItems:'flex-start',transition:'all .15s'}}>
                    <div style={{width:44,height:44,borderRadius:14,background:n.is_read?'#f4faf7':'#d4f5e6',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0}}>
                      {icons[n.type]||'🔔'}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:8}}>
                        <div style={{fontWeight:700,fontSize:14,color:'#1c2b22'}}>{n.title}</div>
                        {!n.is_read && <div style={{width:8,height:8,borderRadius:'50%',background:'#22a063',flexShrink:0,marginTop:4}}/>}
                      </div>
                      <div style={{fontSize:13,color:'#6b8275',marginTop:3,lineHeight:1.5}}>{n.message}</div>
                      <div style={{fontSize:11,color:'#6b8275',marginTop:6}}>{new Date(n.created_at).toLocaleDateString('en-ZA',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === 'security' && (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
            <div style={{background:'white',borderRadius:20,padding:28,border:'1px solid #e2ece7'}}>
              <h3 style={{fontFamily:syne,fontWeight:800,fontSize:18,color:'#111714',marginBottom:20}}>Change Password</h3>
              {['Current Password','New Password','Confirm New Password'].map(f => (
                <div key={f} style={{marginBottom:16}}>
                  <label style={{display:'block',fontSize:12,fontWeight:700,color:'#6b8275',marginBottom:6}}>{f}</label>
                  <input type="password" placeholder="••••••••"
                    style={{width:'100%',border:'1.5px solid #e2ece7',borderRadius:12,padding:'11px 14px',fontSize:14,fontFamily:font,outline:'none',boxSizing:'border-box'}}/>
                </div>
              ))}
              <button style={{width:'100%',padding:13,borderRadius:12,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:800,fontSize:14,border:'none',cursor:'pointer',fontFamily:font}}>
                Update Password
              </button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              <div style={{background:'white',borderRadius:20,padding:24,border:'1px solid #e2ece7'}}>
                <h3 style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#111714',marginBottom:14}}>Two-Factor Authentication</h3>
                <div style={{fontSize:13,color:'#6b8275',marginBottom:16,lineHeight:1.6}}>Add an extra layer of security to your account. We recommend enabling 2FA for all accounts.</div>
                <button style={{width:'100%',padding:12,borderRadius:12,background:'#edfaf3',color:'#1a7a4a',border:'1.5px solid #d4f5e6',fontWeight:700,fontSize:13,cursor:'pointer',fontFamily:font}}>
                  Enable 2FA via SMS
                </button>
              </div>
              <div style={{background:'white',borderRadius:20,padding:24,border:'1px solid #e2ece7'}}>
                <h3 style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#111714',marginBottom:14}}>Login Activity</h3>
                {[{device:'Chrome · Windows',loc:'eMalahleni, ZA',time:'Now · Current session'},{device:'Safari · iPhone',loc:'Johannesburg, ZA',time:'2 days ago'}].map(s => (
                  <div key={s.device} style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',padding:'10px 0',borderBottom:'1px solid #f4faf7'}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:13,color:'#1c2b22'}}>{s.device}</div>
                      <div style={{fontSize:12,color:'#6b8275'}}>{s.loc}</div>
                    </div>
                    <div style={{fontSize:11,color:'#6b8275',textAlign:'right'}}>{s.time}</div>
                  </div>
                ))}
              </div>
              <div style={{background:'#fff0f0',border:'1px solid #fecaca',borderRadius:20,padding:24}}>
                <h3 style={{fontFamily:syne,fontWeight:800,fontSize:16,color:'#dc2626',marginBottom:8}}>Danger Zone</h3>
                <div style={{fontSize:13,color:'#6b8275',marginBottom:14}}>Permanently delete your account and all associated data. This cannot be undone.</div>
                <button style={{background:'none',border:'1.5px solid #e84040',color:'#e84040',fontWeight:700,fontSize:13,padding:'10px 20px',borderRadius:10,cursor:'pointer',fontFamily:font}}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
