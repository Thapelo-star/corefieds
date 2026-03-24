import Link from 'next/link'
import { ShoppingBag, Shield, TrendingUp, Store, Truck, Star, ArrowRight, CheckCircle } from 'lucide-react'

export default function LandingPage() {
  return (
    <main style={{fontFamily:"'Plus Jakarta Sans',sans-serif",background:'#ffffff',minHeight:'100vh'}}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet" />

      {/* Nav */}
      <nav style={{position:'sticky',top:0,zIndex:50,background:'rgba(255,255,255,0.95)',backdropFilter:'blur(12px)',borderBottom:'1px solid #e2ece7',boxShadow:'0 1px 12px rgba(0,0,0,0.06)'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',height:64,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:38,height:38,borderRadius:12,background:'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <ShoppingBag size={18} color="white" />
            </div>
            <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22,color:'#111714',letterSpacing:'-0.5px'}}>Corefieds</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <Link href="/login" style={{fontWeight:700,fontSize:14,color:'#1a7a4a',padding:'10px 20px',borderRadius:10,border:'1.5px solid #d4f5e6',background:'#edfaf3',textDecoration:'none',transition:'all .2s'}}>Sign In</Link>
            <Link href="/register" style={{fontWeight:700,fontSize:14,color:'white',padding:'10px 20px',borderRadius:10,background:'linear-gradient(135deg,#0f5c35,#22a063)',textDecoration:'none',boxShadow:'0 4px 14px rgba(26,122,74,0.3)'}}>Get Started Free</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{background:'linear-gradient(135deg,#0f5c35 0%,#1a7a4a 55%,#22a063 100%)',padding:'80px 24px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',width:500,height:500,borderRadius:'50%',background:'rgba(255,255,255,0.05)',top:-150,right:-150}} />
        <div style={{position:'absolute',width:300,height:300,borderRadius:'50%',background:'rgba(255,255,255,0.05)',bottom:-100,left:-80}} />
        <div style={{position:'relative',zIndex:2,maxWidth:700,margin:'0 auto'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,255,255,0.15)',border:'1px solid rgba(255,255,255,0.25)',borderRadius:50,padding:'6px 16px',marginBottom:24}}>
            <Shield size={13} color="white" />
            <span style={{color:'white',fontSize:12,fontWeight:700}}>South Africa&apos;s Safest Marketplace · Founded 2022</span>
          </div>
          <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:58,color:'white',lineHeight:1.1,marginBottom:20,letterSpacing:'-1.5px'}}>
            Buy. Sell. Bid.<br />
            <span style={{color:'#2ecc80'}}>Auction. Request.</span>
          </h1>
          <p style={{color:'rgba(255,255,255,0.82)',fontSize:18,lineHeight:1.7,marginBottom:36,maxWidth:560,margin:'0 auto 36px'}}>
            Every transaction protected by Trade-Safe escrow. Your money is safe until you confirm delivery. Zero upfront cost to sell.
          </p>
          <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/register" style={{display:'inline-flex',alignItems:'center',gap:8,background:'white',color:'#0f5c35',fontWeight:800,fontSize:15,padding:'14px 32px',borderRadius:12,textDecoration:'none',boxShadow:'0 8px 24px rgba(0,0,0,0.15)'}}>
              Start Selling Free <ArrowRight size={16} />
            </Link>
            <Link href="/home" style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,255,255,0.15)',color:'white',fontWeight:700,fontSize:15,padding:'14px 32px',borderRadius:12,textDecoration:'none',border:'1px solid rgba(255,255,255,0.3)'}}>
              Browse Products
            </Link>
          </div>
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:24,marginTop:40}}>
            {['Trade-Safe Escrow','The Courier Guy & Fastway','Free Listings','Verified Sellers'].map(f => (
              <div key={f} style={{display:'flex',alignItems:'center',gap:6}}>
                <CheckCircle size={14} color="rgba(255,255,255,0.7)" />
                <span style={{color:'rgba(255,255,255,0.75)',fontSize:13,fontWeight:600}}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{background:'#111714',padding:'20px 24px'}}>
        <div style={{maxWidth:900,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,textAlign:'center'}}>
          {[
            {n:'150K+',l:'User Goal'},
            {n:'Free',l:'To List & Sell'},
            {n:'100%',l:'Escrow Protected'},
            {n:'2022',l:'Founded in SA'},
          ].map(s => (
            <div key={s.l}>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:26,color:'#2ecc80'}}>{s.n}</div>
              <div style={{fontSize:12,color:'rgba(255,255,255,0.5)',fontWeight:600,marginTop:2}}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{maxWidth:1100,margin:'0 auto',padding:'80px 24px'}}>
        <div style={{textAlign:'center',marginBottom:56}}>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:38,color:'#111714',letterSpacing:'-1px',marginBottom:12}}>Why Corefieds?</h2>
          <p style={{color:'#6b8275',fontSize:16,maxWidth:500,margin:'0 auto',lineHeight:1.6}}>Built to solve South Africa&apos;s biggest online shopping problem — scams and unsafe transactions.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}}>
          {[
            {Icon:Shield,title:'Trade-Safe Escrow',desc:'Your payment is held securely. Funds only release to the vendor after you confirm safe delivery. No risk, ever.',bg:'#f0fdf4',ic:'#16a34a',ib:'#dcfce7'},
            {Icon:Store,title:'Free for Vendors',desc:'List unlimited products at absolutely zero cost. Reach thousands of verified buyers across South Africa and Africa.',bg:'#eff6ff',ic:'#2563eb',ib:'#dbeafe'},
            {Icon:TrendingUp,title:'Earn as Affiliate',desc:'Share product links, earn commissions on every sale. Turn your WhatsApp and Instagram into a real income stream.',bg:'#faf5ff',ic:'#9333ea',ib:'#f3e8ff'},
            {Icon:Truck,title:'Trusted Delivery',desc:'Partnered with The Courier Guy and Fastway for reliable, fully tracked door-to-door delivery across South Africa.',bg:'#fffbeb',ic:'#d97706',ib:'#fef3c7'},
            {Icon:Star,title:'Verified Sellers',desc:'Every vendor is verified before listing. Shop knowing exactly who you are buying from — no anonymous sellers.',bg:'#fff1f2',ic:'#e11d48',ib:'#ffe4e6'},
            {Icon:ShoppingBag,title:'Bid and Auction',desc:'Beyond fixed prices — bid on items, run live auctions, or request products you cannot find listed anywhere else.',bg:'#f0fdfa',ic:'#0d9488',ib:'#ccfbf1'},
          ].map(({Icon,title,desc,bg,ic,ib}) => (
            <div key={title} style={{background:'white',borderRadius:20,padding:28,border:'1px solid #e2ece7',boxShadow:'0 2px 12px rgba(26,122,74,0.07)',transition:'all .2s'}}>
              <div style={{width:52,height:52,borderRadius:16,background:ib,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:18}}>
                <Icon size={24} color={ic} />
              </div>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:17,color:'#111714',marginBottom:10}}>{title}</h3>
              <p style={{fontSize:14,color:'#6b8275',lineHeight:1.7}}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{background:'#f4faf7',padding:'80px 24px'}}>
        <div style={{maxWidth:900,margin:'0 auto',textAlign:'center'}}>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:38,color:'#111714',letterSpacing:'-1px',marginBottom:12}}>How It Works</h2>
          <p style={{color:'#6b8275',fontSize:16,marginBottom:52}}>Safe buying in 4 simple steps</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20}}>
            {[
              {n:'01',t:'Browse & Find',d:'Search products across all categories from verified vendors'},
              {n:'02',t:'Pay via Escrow',d:'Your payment goes to Trade-Safe — not the vendor yet'},
              {n:'03',t:'Get Delivered',d:'The Courier Guy or Fastway brings it to your door'},
              {n:'04',t:'Confirm & Release',d:'Happy with your order? Confirm and funds release to vendor'},
            ].map(step => (
              <div key={step.n} style={{background:'white',borderRadius:20,padding:24,border:'1px solid #e2ece7',textAlign:'center'}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:32,color:'#d4f5e6',marginBottom:12}}>{step.n}</div>
                <div style={{fontWeight:800,fontSize:15,color:'#111714',marginBottom:8}}>{step.t}</div>
                <div style={{fontSize:13,color:'#6b8275',lineHeight:1.6}}>{step.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:'linear-gradient(135deg,#0f5c35,#22a063)',padding:'80px 24px',textAlign:'center'}}>
        <div style={{maxWidth:600,margin:'0 auto'}}>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:42,color:'white',letterSpacing:'-1px',marginBottom:16}}>Join the Movement</h2>
          <p style={{color:'rgba(255,255,255,0.8)',fontSize:16,marginBottom:36,lineHeight:1.7}}>
            150,000 users is the goal. Be a vendor, buyer, or affiliate — it&apos;s all free to start.
          </p>
          <Link href="/register" style={{display:'inline-flex',alignItems:'center',gap:8,background:'white',color:'#0f5c35',fontWeight:800,fontSize:16,padding:'16px 40px',borderRadius:14,textDecoration:'none',boxShadow:'0 8px 32px rgba(0,0,0,0.15)'}}>
            Create Free Account <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background:'#111714',padding:'48px 24px 32px'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:40,marginBottom:40}}>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
                <div style={{width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <ShoppingBag size={16} color="white" />
                </div>
                <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:20,color:'white'}}>Corefieds</span>
              </div>
              <p style={{color:'rgba(255,255,255,0.45)',fontSize:13,lineHeight:1.7,maxWidth:260}}>
                South Africa&apos;s safest marketplace. Buy, Sell, Bid, Auction and Request. Founded 2022 by Bruce, Zwonaka and Tshamano Nthulane.
              </p>
              <div style={{marginTop:16,fontSize:12,color:'rgba(255,255,255,0.35)'}}>
                <div>corefieds@gmail.com</div>
                <div style={{marginTop:4}}>069-492-3688</div>
              </div>
            </div>
            {[
              {t:'Buy',links:['Browse Products','Categories','Featured Deals','Auctions']},
              {t:'Sell',links:['Open Your Store','Vendor Dashboard','Seller Guide','Pricing']},
              {t:'Company',links:['About Us','Affiliate Program','Help Centre','Contact']},
            ].map(col => (
              <div key={col.t}>
                <h4 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:14,color:'white',marginBottom:16}}>{col.t}</h4>
                <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10}}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{fontSize:13,color:'rgba(255,255,255,0.4)',textDecoration:'none'}}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:24,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
            <span style={{fontSize:12,color:'rgba(255,255,255,0.3)'}}>© 2025 Corefieds. All rights reserved.</span>
            <span style={{fontSize:12,color:'rgba(255,255,255,0.3)'}}>🔒 Trade-Safe · 🚚 The Courier Guy & Fastway · 🇿🇦 Built in South Africa</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
