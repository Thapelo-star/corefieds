'use client'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase-client'
import { ShoppingBag, TrendingUp, Copy, Check, Users, DollarSign, MousePointer, ChevronRight, ArrowUpRight, Gift, Star, Zap, Share2 } from 'lucide-react'

const SAMPLE_COMMISSIONS = [
  {id:'1',product_title:'Amped Fitness T-Shirt',amount:40,status:'paid',created_at:new Date(Date.now()-86400000).toISOString()},
  {id:'2',product_title:'Bluetooth Earbuds Pro',amount:40,status:'paid',created_at:new Date(Date.now()-172800000).toISOString()},
  {id:'3',product_title:'Glow Serum Bundle',amount:29,status:'pending',created_at:new Date(Date.now()-259200000).toISOString()},
  {id:'4',product_title:'Non-stick Pan Set',amount:63,status:'paid',created_at:new Date(Date.now()-345600000).toISOString()},
  {id:'5',product_title:'Smart LED Strip Light',amount:16,status:'paid',created_at:new Date(Date.now()-432000000).toISOString()},
  {id:'6',product_title:'Gaming Chair Pro',amount:160,status:'pending',created_at:new Date(Date.now()-518400000).toISOString()},
  {id:'7',product_title:'Smart Watch Lite',amount:25,status:'paid',created_at:new Date(Date.now()-604800000).toISOString()},
]

const SAMPLE_PRODUCTS = [
  {id:'1',title:'Amped Fitness T-Shirt',price:400,category_slug:'fashion',commission:5},
  {id:'2',title:'Bluetooth Earbuds Pro',price:799,category_slug:'electronics',commission:5},
  {id:'3',title:'Glow Serum Bundle',price:580,category_slug:'beauty',commission:5},
  {id:'4',title:'Gaming Chair Pro',price:3200,category_slug:'furniture',commission:5},
]

const CAT_EMOJI: Record<string,string> = {fashion:'👗',electronics:'📱',beauty:'💄',furniture:'🪑',kitchen:'🍳',sports:'⚽'}

const WEEKLY_DATA = [
  {day:'Mon',amount:120},{day:'Tue',amount:280},{day:'Wed',amount:180},
  {day:'Thu',amount:420},{day:'Fri',amount:350},{day:'Sat',amount:510},{day:'Sun',amount:380},
]

function AffiliateContent() {
  const { user, profile } = useAuth()
  const [commissions, setCommissions] = useState(SAMPLE_COMMISSIONS)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(false)

  const font = "'Plus Jakarta Sans',sans-serif"
  const syne = "'Syne',sans-serif"

  const refCode = profile?.full_name
    ? 'corefieds.co.za/ref/'+profile.full_name.toLowerCase().replace(/\s+/g,'')+Math.floor(Math.random()*100)
    : 'corefieds.co.za/ref/user123'

  const totalEarned = commissions.reduce((s,c)=>s+c.amount,0)
  const paidOut = commissions.filter(c=>c.status==='paid').reduce((s,c)=>s+c.amount,0)
  const pending = commissions.filter(c=>c.status==='pending').reduce((s,c)=>s+c.amount,0)
  const maxWeekly = Math.max(...WEEKLY_DATA.map(d=>d.amount))

  function copyLink() {
    navigator.clipboard.writeText('https://'+refCode).catch(()=>{})
    setCopied(true)
    setTimeout(()=>setCopied(false),2500)
  }

  return (
    <div style={{minHeight:'100vh',background:'#f4faf7',fontFamily:font}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet"/>

      {/* Nav */}
      <nav style={{background:'white',borderBottom:'1px solid #e2ece7',boxShadow:'0 1px 8px rgba(0,0,0,0.05)',position:'sticky',top:0,zIndex:50}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',height:60,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Link href="/home" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
            <div style={{width:32,height:32,borderRadius:10,background:'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center'}}><ShoppingBag size={15} color="white"/></div>
            <span style={{fontFamily:syne,fontWeight:800,fontSize:18,color:'#111714'}}>Corefieds</span>
          </Link>
          <div style={{display:'flex',gap:6}}>
            {['overview','commissions','products','tiers'].map(tab=>{
              const isActive = activeTab===tab
              return (
                <button key={tab} onClick={()=>setActiveTab(tab)}
                  style={{padding:'7px 16px',borderRadius:10,border:'none',background:isActive?'linear-gradient(135deg,#0f5c35,#22a063)':'transparent',color:isActive?'white':'#6b8275',fontWeight:700,fontSize:13,cursor:'pointer',fontFamily:font,textTransform:'capitalize'}}>
                  {tab}
                </button>
              )
            })}
          </div>
          <Link href="/home" style={{fontSize:13,fontWeight:700,color:'#1a7a4a',textDecoration:'none'}}>← Home</Link>
        </div>
      </nav>

      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#1e3a8a 0%,#2563eb 60%,#3b82f6 100%)',padding:'40px 24px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',width:400,height:400,borderRadius:'50%',background:'rgba(255,255,255,0.05)',top:-150,right:-100}}/>
        <div style={{position:'absolute',width:200,height:200,borderRadius:'50%',background:'rgba(255,255,255,0.05)',bottom:-60,left:40}}/>
        <div style={{position:'relative',zIndex:2,maxWidth:1200,margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:20}}>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                <div style={{width:44,height:44,borderRadius:14,background:'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <TrendingUp size={22} color="white"/>
                </div>
                <div>
                  <div style={{fontSize:12,color:'rgba(255,255,255,0.65)',fontWeight:600}}>AFFILIATE DASHBOARD</div>
                  <h1 style={{fontFamily:syne,fontWeight:800,fontSize:24,color:'white',margin:0}}>
                    {profile?.full_name||'Your'} Earnings
                  </h1>
                </div>
              </div>
            </div>
            <div style={{background:'rgba(255,255,255,0.12)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:16,padding:20,minWidth:280}}>
              <div style={{fontSize:12,color:'rgba(255,255,255,0.65)',fontWeight:600,marginBottom:4}}>TOTAL EARNED THIS MONTH</div>
              <div style={{fontFamily:syne,fontWeight:800,fontSize:44,color:'white',lineHeight:1}}>R{totalEarned.toLocaleString()}</div>
              <div style={{fontSize:13,color:'#4ade80',fontWeight:700,marginTop:6,display:'flex',alignItems:'center',gap:4}}>
                <ArrowUpRight size={14}/> +R420 from last month
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginTop:24}}>
            {[
              {icon:DollarSign,label:'Paid Out',value:'R'+paidOut,sub:'This month',color:'#4ade80'},
              {icon:Clock2,label:'Pending',value:'R'+pending,sub:'Processing',color:'#fbbf24'},
              {icon:MousePointer,label:'Link Clicks',value:'1,203',sub:'This month',color:'#60a5fa'},
              {icon:Users,label:'Referrals',value:'47',sub:'Conversions',color:'#c084fc'},
            ].map(({icon:Icon,label,value,sub,color})=>(
              <div key={label} style={{background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:14,padding:16}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                  <Icon size={14} color={color}/>
                  <span style={{fontSize:11,color:'rgba(255,255,255,0.65)',fontWeight:600}}>{label}</span>
                </div>
                <div style={{fontFamily:syne,fontWeight:800,fontSize:22,color:'white'}}>{value}</div>
                <div style={{fontSize:11,color:'rgba(255,255,255,0.5)',marginTop:2}}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:'0 auto',padding:'28px 24px'}}>

        {activeTab==='overview' && (
          <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:24}}>
            <div style={{display:'flex',flexDirection:'column',gap:20}}>

              {/* Weekly chart */}
              <div style={{background:'white',borderRadius:20,padding:24,border:'1px solid #e2ece7'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
                  <h3 style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#111714',margin:0}}>Weekly Earnings</h3>
                  <span style={{fontSize:12,fontWeight:700,background:'#eff6ff',color:'#2563eb',padding:'4px 12px',borderRadius:50}}>This Week</span>
                </div>
                <div style={{display:'flex',alignItems:'flex-end',gap:8,height:140,marginBottom:8}}>
                  {WEEKLY_DATA.map(d=>{
                    const h = Math.round((d.amount/maxWeekly)*120)
                    return (
                      <div key={d.day} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                        <div style={{fontSize:11,fontWeight:700,color:'#1a7a4a'}}>R{d.amount}</div>
                        <div style={{width:'100%',background:'linear-gradient(180deg,#22a063,#0f5c35)',borderRadius:'6px 6px 0 0',height:h,minHeight:8,transition:'height .3s'}}/>
                      </div>
                    )
                  })}
                </div>
                <div style={{display:'flex',gap:8}}>
                  {WEEKLY_DATA.map(d=>(
                    <div key={d.day} style={{flex:1,textAlign:'center',fontSize:11,color:'#6b8275',fontWeight:600}}>{d.day}</div>
                  ))}
                </div>
              </div>

              {/* Recent commissions */}
              <div style={{background:'white',borderRadius:20,border:'1px solid #e2ece7',overflow:'hidden'}}>
                <div style={{padding:'20px 24px',borderBottom:'1px solid #f4faf7',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <h3 style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#111714',margin:0}}>Recent Commissions</h3>
                  <button onClick={()=>setActiveTab('commissions')} style={{fontSize:13,fontWeight:700,color:'#2563eb',background:'none',border:'none',cursor:'pointer',fontFamily:font}}>View all →</button>
                </div>
                {commissions.slice(0,5).map(c=>(
                  <div key={c.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 24px',borderBottom:'1px solid #f4faf7'}}>
                    <div style={{display:'flex',alignItems:'center',gap:12}}>
                      <div style={{width:36,height:36,borderRadius:10,background:'#eff6ff',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <DollarSign size={15} color="#2563eb"/>
                      </div>
                      <div>
                        <div style={{fontWeight:700,fontSize:13,color:'#1c2b22'}}>{c.product_title}</div>
                        <div style={{fontSize:11,color:'#6b8275',marginTop:2}}>{new Date(c.created_at).toLocaleDateString('en-ZA',{day:'numeric',month:'short',year:'numeric'})}</div>
                      </div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{fontFamily:syne,fontWeight:800,fontSize:16,color:'#1a7a4a'}}>R{c.amount}</div>
                      <div style={{fontSize:11,fontWeight:700,padding:'2px 8px',borderRadius:50,display:'inline-block',background:c.status==='paid'?'#dcfce7':'#fef9c3',color:c.status==='paid'?'#16a34a':'#a16207',marginTop:2}}>
                        {c.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right sidebar */}
            <div style={{display:'flex',flexDirection:'column',gap:16}}>

              {/* Referral link */}
              <div style={{background:'white',borderRadius:20,padding:20,border:'1px solid #e2ece7'}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
                  <Share2 size={16} color="#2563eb"/>
                  <h3 style={{fontFamily:syne,fontWeight:800,fontSize:15,color:'#111714',margin:0}}>Your Referral Link</h3>
                </div>
                <div style={{background:'#f4faf7',borderRadius:10,padding:'10px 12px',fontSize:12,color:'#1a7a4a',fontWeight:600,marginBottom:10,wordBreak:'break-all',border:'1px solid #e2ece7'}}>
                  {refCode}
                </div>
                <button onClick={copyLink}
                  style={{width:'100%',padding:'11px',borderRadius:10,background:copied?'#22a063':'linear-gradient(135deg,#1e3a8a,#2563eb)',color:'white',fontWeight:800,fontSize:13,border:'none',cursor:'pointer',fontFamily:font,display:'flex',alignItems:'center',justifyContent:'center',gap:6,transition:'all .2s'}}>
                  {copied?<><Check size={14}/> Copied!</>:<><Copy size={14}/> Copy Link</>}
                </button>
                <div style={{display:'flex',gap:8,marginTop:10}}>
                  {['WhatsApp','Facebook','Twitter'].map(s=>(
                    <button key={s} style={{flex:1,padding:'8px 4px',borderRadius:8,border:'1px solid #e2ece7',background:'white',fontSize:11,fontWeight:700,color:'#6b8275',cursor:'pointer',fontFamily:font}}>{s}</button>
                  ))}
                </div>
              </div>

              {/* Commission tiers */}
              <div style={{background:'linear-gradient(135deg,#1e3a8a,#2563eb)',borderRadius:20,padding:20}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
                  <Star size={16} color="white"/>
                  <h3 style={{fontFamily:syne,fontWeight:800,fontSize:15,color:'white',margin:0}}>Commission Tiers</h3>
                </div>
                {[
                  {tier:'Tier 1',pct:'5%',desc:'Direct referral sales',color:'#4ade80'},
                  {tier:'Tier 2',pct:'3%',desc:'Your referral\'s sales',color:'#60a5fa'},
                  {tier:'Tier 3',pct:'1%',desc:'2nd level referrals',color:'#c084fc'},
                ].map(t=>(
                  <div key={t.tier} style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'rgba(255,255,255,0.1)',borderRadius:10,padding:'10px 14px',marginBottom:8}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:13,color:'white'}}>{t.tier}</div>
                      <div style={{fontSize:11,color:'rgba(255,255,255,0.6)'}}>{t.desc}</div>
                    </div>
                    <div style={{fontFamily:syne,fontWeight:800,fontSize:22,color:t.color}}>{t.pct}</div>
                  </div>
                ))}
              </div>

              {/* Payout info */}
              <div style={{background:'white',borderRadius:16,padding:18,border:'1px solid #e2ece7'}}>
                <h4 style={{fontFamily:syne,fontWeight:800,fontSize:14,color:'#111714',marginBottom:12}}>💳 Payout Info</h4>
                {[{l:'Next payout',v:'1 April 2026'},{l:'Minimum payout',v:'R100'},{l:'Payment method',v:'Bank Transfer'},{l:'Processing time',v:'2-3 business days'}].map(r=>(
                  <div key={r.l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #f4faf7',fontSize:13}}>
                    <span style={{color:'#6b8275'}}>{r.l}</span>
                    <span style={{fontWeight:700,color:'#1c2b22'}}>{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab==='commissions' && (
          <div style={{background:'white',borderRadius:20,border:'1px solid #e2ece7',overflow:'hidden'}}>
            <div style={{padding:'20px 24px',borderBottom:'1px solid #f4faf7',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <h3 style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#111714',margin:0}}>All Commissions</h3>
              <div style={{display:'flex',gap:8}}>
                {['All','Paid','Pending'].map(f=>(
                  <button key={f} style={{padding:'5px 14px',borderRadius:8,border:'1px solid #e2ece7',background:'white',fontSize:12,fontWeight:700,color:'#6b8275',cursor:'pointer',fontFamily:font}}>{f}</button>
                ))}
              </div>
            </div>
            <div style={{padding:'0 24px'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr auto auto',gap:0,padding:'12px 0',borderBottom:'2px solid #f4faf7',fontSize:11,fontWeight:700,color:'#6b8275',textTransform:'uppercase',letterSpacing:'0.5px'}}>
                <span>Product</span><span style={{textAlign:'center',paddingRight:32}}>Status</span><span style={{textAlign:'right'}}>Amount</span>
              </div>
              {commissions.map(c=>(
                <div key={c.id} style={{display:'grid',gridTemplateColumns:'1fr auto auto',gap:0,padding:'16px 0',borderBottom:'1px solid #f4faf7',alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:14,color:'#1c2b22'}}>{c.product_title}</div>
                    <div style={{fontSize:12,color:'#6b8275',marginTop:2}}>{new Date(c.created_at).toLocaleDateString('en-ZA',{day:'numeric',month:'long',year:'numeric'})}</div>
                  </div>
                  <div style={{paddingRight:32}}>
                    <span style={{fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:50,background:c.status==='paid'?'#dcfce7':'#fef9c3',color:c.status==='paid'?'#16a34a':'#a16207'}}>
                      {c.status.toUpperCase()}
                    </span>
                  </div>
                  <div style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#1a7a4a',textAlign:'right'}}>R{c.amount}</div>
                </div>
              ))}
            </div>
            <div style={{padding:'16px 24px',background:'#f4faf7',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{fontSize:13,color:'#6b8275',fontWeight:600}}>Total: {commissions.length} commissions</span>
              <span style={{fontFamily:syne,fontWeight:800,fontSize:18,color:'#1a7a4a'}}>R{totalEarned} total</span>
            </div>
          </div>
        )}

        {activeTab==='products' && (
          <div>
            <div style={{marginBottom:20,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <h2 style={{fontFamily:syne,fontWeight:800,fontSize:20,color:'#111714',margin:0}}>Products to Promote</h2>
              <span style={{fontSize:13,color:'#6b8275'}}>Earn 5% on every sale</span>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:16}}>
              {SAMPLE_PRODUCTS.map(p=>(
                <div key={p.id} style={{background:'white',borderRadius:18,padding:20,border:'1px solid #e2ece7',display:'flex',gap:16,alignItems:'center'}}>
                  <div style={{width:64,height:64,borderRadius:16,background:'#f4faf7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,flexShrink:0}}>
                    {CAT_EMOJI[p.category_slug]||'📦'}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:14,color:'#1c2b22',marginBottom:4}}>{p.title}</div>
                    <div style={{display:'flex',gap:8,alignItems:'center'}}>
                      <span style={{fontFamily:syne,fontWeight:800,fontSize:16,color:'#1a7a4a'}}>R{p.price.toLocaleString()}</span>
                      <span style={{background:'#dcfce7',color:'#16a34a',fontSize:11,fontWeight:700,padding:'2px 8px',borderRadius:50}}>Earn R{Math.round(p.price*0.05)}/sale</span>
                    </div>
                  </div>
                  <button onClick={copyLink}
                    style={{padding:'8px 14px',borderRadius:10,background:'linear-gradient(135deg,#1e3a8a,#2563eb)',color:'white',fontWeight:700,fontSize:12,border:'none',cursor:'pointer',fontFamily:font,display:'flex',alignItems:'center',gap:5,flexShrink:0}}>
                    <Copy size={12}/> Share
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab==='tiers' && (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
            <div style={{background:'white',borderRadius:20,padding:28,border:'1px solid #e2ece7'}}>
              <h3 style={{fontFamily:syne,fontWeight:800,fontSize:20,color:'#111714',marginBottom:20}}>How Commissions Work</h3>
              {[
                {n:'1',t:'Get Your Link',d:'Copy your unique referral link from the dashboard'},
                {n:'2',t:'Share It',d:'Share on WhatsApp, Facebook, Instagram, or anywhere'},
                {n:'3',t:'Someone Buys',d:'When someone clicks and buys within 30 days'},
                {n:'4',t:'You Earn',d:'Commission is credited to your account automatically'},
                {n:'5',t:'Get Paid',d:'Withdraw to your bank on the 1st of every month'},
              ].map(s=>(
                <div key={s.n} style={{display:'flex',gap:14,marginBottom:16}}>
                  <div style={{width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,#1e3a8a,#2563eb)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:800,fontSize:13,flexShrink:0}}>{s.n}</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:14,color:'#1c2b22',marginBottom:3}}>{s.t}</div>
                    <div style={{fontSize:13,color:'#6b8275'}}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              {[
                {tier:'Bronze',pct:'5%',min:'R0',max:'R999',color:'#92400e',bg:'#fff7ed',border:'#fed7aa'},
                {tier:'Silver',pct:'7%',min:'R1,000',max:'R4,999',color:'#374151',bg:'#f9fafb',border:'#e5e7eb'},
                {tier:'Gold',pct:'10%',min:'R5,000',max:'R19,999',color:'#92400e',bg:'#fffbeb',border:'#fde68a'},
                {tier:'Platinum',pct:'12%',min:'R20,000',max:'No limit',color:'#1e3a8a',bg:'#eff6ff',border:'#bfdbfe'},
              ].map(t=>(
                <div key={t.tier} style={{background:t.bg,border:'2px solid '+t.border,borderRadius:16,padding:18,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontFamily:syne,fontWeight:800,fontSize:18,color:t.color,marginBottom:3}}>{t.tier}</div>
                    <div style={{fontSize:12,color:'#6b8275'}}>Earnings: {t.min} – {t.max}</div>
                  </div>
                  <div style={{fontFamily:syne,fontWeight:800,fontSize:32,color:t.color}}>{t.pct}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Clock2({size,color}: {size:number,color:string}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
}

export default function AffiliatePage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{color:'#2563eb',fontWeight:700}}>Loading dashboard...</div></div>}>
      <AffiliateContent/>
    </Suspense>
  )
}
