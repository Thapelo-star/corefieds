'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { getProducts, getCategories } from '@/lib/products'
import { useAuth } from '@/components/auth/AuthProvider'
import { useCart } from '@/hooks/useCart'
import { ShoppingBag, Search, ShoppingCart, Shield, Truck, Star, TrendingUp, ChevronRight, Flame, LogOut, Heart } from 'lucide-react'

const CAT_EMOJI: Record<string,string> = {
  fashion:'??',electronics:'??',beauty:'??',kitchen:'??',
  'home-garden':'??',sports:'?',farming:'??',lighting:'??',
  accessories:'??',toys:'??',furniture:'??',vehicles:'??',
  educational:'??',services:'???',property:'???',
}
const CAT_BG: Record<string,string> = {
  fashion:'#f0fdf4',electronics:'#f0f9ff',beauty:'#fff0f9',kitchen:'#fff7ed',
  'home-garden':'#fdf4ff',sports:'#f0f9ff',farming:'#fefce8',lighting:'#fefce8',
  accessories:'#fdf4ff',furniture:'#f0fdf4',vehicles:'#fff1f2',
  educational:'#fdf4ff',services:'#f0f9ff',property:'#f0fdf4',
}

function ProductCard({ id, title, price, originalPrice, rating, reviewCount, category, condition, vendorName, isVerified, isFeatured }: any) {
  const { addItem } = useCart()
  const [hovered, setHovered] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : null
  const emoji = CAT_EMOJI[category] || '??'
  const bg = CAT_BG[category] || '#f4faf7'
  return (
    <div
      style={{background:'white',borderRadius:18,border:'1px solid #e2ece7',overflow:'hidden',transition:'all .2s',transform:hovered?'translateY(-3px)':'none',boxShadow:hovered?'0 12px 40px rgba(26,122,74,0.15)':'0 2px 12px rgba(26,122,74,0.07)',cursor:'pointer'}}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
    >
      <Link href={'/product/'+id} style={{textDecoration:'none',display:'block',position:'relative'}}>
        <div style={{height:160,display:'flex',alignItems:'center',justifyContent:'center',fontSize:64,background:bg,position:'relative'}}>
          {emoji}
          {discount && <span style={{position:'absolute',top:10,left:10,background:'#e84040',color:'white',fontSize:10,fontWeight:800,padding:'3px 8px',borderRadius:50}}>-{discount}%</span>}
          {!discount && condition==='new' && <span style={{position:'absolute',top:10,left:10,background:'#22a063',color:'white',fontSize:10,fontWeight:800,padding:'3px 8px',borderRadius:50}}>NEW</span>}
          {isFeatured && <span style={{position:'absolute',top:10,right:10,background:'#f59e0b',color:'white',fontSize:10,fontWeight:800,padding:'3px 8px',borderRadius:50}}>HOT</span>}
          <button onClick={e=>{e.preventDefault();setWishlisted(!wishlisted)}}
            style={{position:'absolute',bottom:10,right:10,width:32,height:32,borderRadius:'50%',background:'white',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.12)',opacity:hovered?1:0,transition:'opacity .2s'}}>
            <Heart size={14} fill={wishlisted?'#e84040':'none'} color={wishlisted?'#e84040':'#6b8275'}/>
          </button>
        </div>
      </Link>
      <div style={{padding:'12px 14px 16px'}}>
        <Link href={'/product/'+id} style={{textDecoration:'none'}}>
          <h3 style={{fontWeight:700,fontSize:13,color:'#1c2b22',marginBottom:6,lineHeight:1.4}}>{title}</h3>
        </Link>
        {rating > 0 && (
          <div style={{display:'flex',alignItems:'center',gap:4,marginBottom:6}}>
            <span style={{color:'#f5a623',fontSize:11}}>{'?'.repeat(Math.round(rating))}{'?'.repeat(5-Math.round(rating))}</span>
            <span style={{fontSize:11,color:'#6b8275'}}>{rating} ({reviewCount})</span>
          </div>
        )}
        <div style={{display:'flex',alignItems:'baseline',gap:6,marginBottom:10}}>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:18,color:'#1a7a4a'}}>R{price.toLocaleString()}</span>
          {originalPrice && <span style={{fontSize:12,color:'#6b8275',textDecoration:'line-through'}}>R{originalPrice.toLocaleString()}</span>}
        </div>
        {vendorName && (
          <div style={{display:'flex',alignItems:'center',gap:4,marginBottom:10}}>
            <span style={{fontSize:11,color:'#6b8275'}}>{vendorName}</span>
            {isVerified && <span style={{fontSize:11,color:'#22a063'}}>?</span>}
          </div>
        )}
        <button onClick={()=>addItem({id,title,price,image:emoji,quantity:1,vendorName})}
          style={{width:'100%',padding:'9px',borderRadius:10,border:'1.5px solid #d4f5e6',background:'#edfaf3',color:'#1a7a4a',fontWeight:700,fontSize:12,cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",transition:'all .2s'}}
          onMouseEnter={e=>{const t=e.target as any;t.style.background='linear-gradient(135deg,#0f5c35,#22a063)';t.style.color='white'}}
          onMouseLeave={e=>{const t=e.target as any;t.style.background='#edfaf3';t.style.color='#1a7a4a'}}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

function Navbar() {
  const { profile, signOut } = useAuth()
  const { count } = useCart()
  const [search, setSearch] = useState('')
  const [profileOpen, setProfileOpen] = useState(false)
  const router = useRouter()
  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (search.trim()) router.push('/home?search='+encodeURIComponent(search))
  }
  return (
    <>
      <div style={{background:'#0f5c35',padding:'5px 24px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:11,color:'rgba(255,255,255,0.6)'}}>???? South Africa's Safest Marketplace  Trade-Safe Escrow  The Courier Guy & Fastway</span>
        <span style={{fontSize:11,color:'rgba(255,255,255,0.6)'}}>?? 069-492-3688</span>
      </div>
      <nav style={{position:'sticky',top:0,zIndex:50,background:'white',borderBottom:'1px solid #e2ece7',boxShadow:'0 1px 12px rgba(0,0,0,0.06)'}}>
        <div style={{maxWidth:1280,margin:'0 auto',padding:'0 24px',height:64,display:'flex',alignItems:'center',gap:16}}>
          <Link href="/home" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none',flexShrink:0}}>
            <div style={{width:38,height:38,borderRadius:12,background:'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <ShoppingBag size={18} color="white"/>
            </div>
            <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:20,color:'#111714'}}>Corefieds</span>
          </Link>
          <form onSubmit={handleSearch} style={{flex:1,maxWidth:640}}>
            <div style={{position:'relative'}}>
              <Search size={16} style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',color:'#6b8275'}}/>
              <input type="text" value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search products, vendors, categories..."
                style={{width:'100%',paddingLeft:42,paddingRight:16,paddingTop:11,paddingBottom:11,borderRadius:12,border:'1.5px solid #e2ece7',fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",outline:'none',background:'#f4faf7',color:'#1c2b22',boxSizing:'border-box'}}/>
            </div>
          </form>
          <div style={{display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
            <Link href="/cart" style={{position:'relative',padding:8,borderRadius:10,background:'#f4faf7',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none'}}>
              <ShoppingCart size={22} color="#1c2b22"/>
              {count > 0 && <span style={{position:'absolute',top:-2,right:-2,width:18,height:18,background:'#e84040',color:'white',fontSize:10,fontWeight:800,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}>{count}</span>}
            </Link>
            {profile ? (
              <div style={{position:'relative'}}>
                <button onClick={()=>setProfileOpen(!profileOpen)}
                  style={{display:'flex',alignItems:'center',gap:8,padding:'6px 12px',borderRadius:10,border:'1.5px solid #e2ece7',background:'white',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                  <div style={{width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:13,fontWeight:800}}>
                    {profile.full_name?.[0]||'U'}
                  </div>
                  <span style={{fontSize:13,fontWeight:700,color:'#1c2b22'}}>{profile.full_name?.split(' ')[0]}</span>
                </button>
                {profileOpen && (
                  <div style={{position:'absolute',right:0,top:'calc(100% + 8px)',width:220,background:'white',borderRadius:16,boxShadow:'0 12px 40px rgba(0,0,0,0.15)',border:'1px solid #e2ece7',overflow:'hidden',zIndex:100}}>
                    <div style={{padding:16,borderBottom:'1px solid #e2ece7'}}>
                      <div style={{fontWeight:700,fontSize:14,color:'#1c2b22'}}>{profile.full_name}</div>
                      <div style={{fontSize:12,color:'#6b8275',marginTop:2}}>{profile.email}</div>
                      <div style={{marginTop:8,display:'inline-block',background:'#edfaf3',color:'#1a7a4a',fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:50,border:'1px solid #d4f5e6'}}>? {profile.role}</div>
                    </div>
                    {[{href:'/profile',icon:'??',label:'My Profile'},{href:'/orders',icon:'??',label:'My Orders'},{href:'/affiliate',icon:'??',label:'Affiliate Dashboard'}].map(item=>(
                      <Link key={item.href} href={item.href} onClick={()=>setProfileOpen(false)}
                        style={{display:'flex',alignItems:'center',gap:10,padding:'12px 16px',textDecoration:'none',borderBottom:'1px solid #f4faf7'}}>
                        <span>{item.icon}</span>
                        <span style={{fontSize:13,color:'#1c2b22',fontWeight:600}}>{item.label}</span>
                      </Link>
                    ))}
                    <button onClick={()=>{signOut();setProfileOpen(false)}}
                      style={{width:'100%',display:'flex',alignItems:'center',gap:10,padding:'12px 16px',background:'none',border:'none',cursor:'pointer',borderTop:'1px solid #e2ece7',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                      <LogOut size={14} color="#e84040"/>
                      <span style={{fontSize:13,color:'#e84040',fontWeight:700}}>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{display:'flex',gap:8}}>
                <Link href="/login" style={{padding:'8px 16px',borderRadius:10,border:'1.5px solid #d4f5e6',background:'#edfaf3',color:'#1a7a4a',fontWeight:700,fontSize:13,textDecoration:'none'}}>Sign In</Link>
                <Link href="/register" style={{padding:'8px 16px',borderRadius:10,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:700,fontSize:13,textDecoration:'none'}}>Join Free</Link>
              </div>
            )}
          </div>
        </div>
        <div style={{maxWidth:1280,margin:'0 auto',padding:'0 24px 10px',display:'flex',gap:4,overflowX:'auto'}}>
          {[{l:'All',h:'/home'},{l:'Fashion',h:'/home?cat=fashion'},{l:'Electronics',h:'/home?cat=electronics'},{l:'Beauty',h:'/home?cat=beauty'},{l:'Kitchen',h:'/home?cat=kitchen'},{l:'Home & Garden',h:'/home?cat=home-garden'},{l:'Sports',h:'/home?cat=sports'},{l:'Farming',h:'/home?cat=farming'},{l:'Furniture',h:'/home?cat=furniture'},{l:'Vehicles',h:'/home?cat=vehicles'},{l:'Auctions',h:'/auctions'}].map(item=>(
            <Link key={item.h} href={item.h} style={{flexShrink:0,padding:'5px 14px',borderRadius:8,fontSize:12,fontWeight:700,color:'#6b8275',textDecoration:'none',whiteSpace:'nowrap'}}>{item.l}</Link>
          ))}
        </div>
      </nav>
    </>
  )
}

function HomeContent() {
  const { profile } = useAuth()
  const searchParams = useSearchParams()
  const catParam = searchParams.get('cat') || ''
  const searchParam = searchParams.get('search') || ''
  const [products, setProducts] = useState<any[]>([])
  const [featured, setFeatured] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [activeCategory, setActiveCategory] = useState(catParam)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{ loadData() },[activeCategory,searchParam])

  async function loadData() {
    setLoading(true)
    const [prods,feat,cats] = await Promise.all([
      getProducts({category:activeCategory||undefined,search:searchParam||undefined,limit:20}),
      getProducts({featured:true,limit:4}),
      getCategories(),
    ])
    setProducts(prods); setFeatured(feat); setCategories(cats)
    setLoading(false)
  }

  const greeting = () => {
    const h = new Date().getHours()
    return h<12?'Good morning':h<17?'Good afternoon':'Good evening'
  }

  const allCats = [{slug:'',name:'All',emoji:'??'},...categories.map(c=>({slug:c.slug,name:c.name.split(' ')[0],emoji:CAT_EMOJI[c.slug]||'??'}))]

  return (
    <div style={{minHeight:'100vh',background:'#f4faf7',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet"/>
      <Navbar/>

      {/* Hero */}
      <section style={{background:'linear-gradient(135deg,#0f5c35 0%,#1a7a4a 55%,#22a063 100%)',padding:'48px 24px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',width:400,height:400,borderRadius:'50%',background:'rgba(255,255,255,0.05)',top:-150,right:-100}}/>
        <div style={{position:'relative',zIndex:2,maxWidth:1280,margin:'0 auto'}}>
          {profile && <p style={{color:'rgba(255,255,255,0.7)',fontSize:14,marginBottom:4}}>{greeting()}, {profile.full_name.split(' ')[0]} ??</p>}
          <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:42,color:'white',lineHeight:1.15,marginBottom:12,letterSpacing:'-1px',maxWidth:600}}>
            Shop Safe. Sell Free.<br/><span style={{color:'#2ecc80'}}>Earn More.</span>
          </h1>
          <p style={{color:'rgba(255,255,255,0.8)',fontSize:15,marginBottom:24,maxWidth:480}}>
            Every purchase protected by Trade-Safe escrow. Delivered by The Courier Guy &amp; Fastway.
          </p>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <Link href="/register?role=vendor" style={{display:'inline-flex',alignItems:'center',gap:8,background:'white',color:'#0f5c35',fontWeight:800,fontSize:14,padding:'11px 24px',borderRadius:10,textDecoration:'none',boxShadow:'0 4px 16px rgba(0,0,0,0.15)'}}>
              Start Selling Free <ChevronRight size={14}/>
            </Link>
          </div>
          <div style={{display:'flex',gap:24,marginTop:24,flexWrap:'wrap'}}>
            {[{Icon:Shield,t:'Trade-Safe Escrow'},{Icon:Truck,t:'Courier Guy & Fastway'},{Icon:TrendingUp,t:'Earn as Affiliate'},{Icon:Star,t:'Verified Sellers'}].map(({Icon,t})=>(
              <div key={t} style={{display:'flex',alignItems:'center',gap:6}}>
                <Icon size={13} color="rgba(255,255,255,0.65)"/>
                <span style={{fontSize:12,color:'rgba(255,255,255,0.65)',fontWeight:600}}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{maxWidth:1280,margin:'0 auto',padding:'32px 24px'}}>

        {/* Categories */}
        <div style={{marginBottom:32}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:20,color:'#111714'}}>Shop by Category</h2>
          </div>
          <div style={{display:'flex',gap:10,overflowX:'auto',paddingBottom:4}}>
            {allCats.map(cat=>{
              const isActive = activeCategory === cat.slug
              return (
                <button key={cat.slug} onClick={()=>setActiveCategory(cat.slug)}
                  style={{flexShrink:0,display:'flex',flexDirection:'column',alignItems:'center',gap:6,padding:'10px 14px',borderRadius:16,border:isActive?'2px solid #22a063':'2px solid #e2ece7',background:isActive?'#edfaf3':'white',cursor:'pointer',minWidth:72,transition:'all .2s',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                  <span style={{fontSize:22}}>{cat.emoji}</span>
                  <span style={{fontSize:10,fontWeight:700,color:'#1c2b22',textAlign:'center'}}>{cat.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Promo banners */}
        {!activeCategory && !searchParam && (
          <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16,marginBottom:32}}>
            <div style={{borderRadius:24,overflow:'hidden',position:'relative',height:180,cursor:'pointer',background:'linear-gradient(135deg,#0f5c35,#22a063)'}}>
              <div style={{position:'absolute',width:200,height:200,borderRadius:'50%',background:'rgba(255,255,255,0.08)',top:-60,right:-60}}/>
              <div style={{position:'relative',zIndex:2,padding:28,height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                <span style={{background:'rgba(255,255,255,0.2)',color:'white',fontSize:10,fontWeight:800,padding:'4px 12px',borderRadius:50,width:'fit-content'}}>?? THIS WEEK</span>
                <div>
                  <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:26,color:'white',lineHeight:1.2}}>New Arrivals<br/>Just Dropped</h3>
                  <div style={{display:'flex',alignItems:'center',gap:6,color:'rgba(255,255,255,0.8)',fontSize:13,fontWeight:700,marginTop:8}}>
                    Shop Now <ChevronRight size={14}/>
                  </div>
                </div>
              </div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              <div style={{borderRadius:18,padding:20,flex:1,cursor:'pointer',background:'linear-gradient(135deg,#1e3a8a,#3b82f6)',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                <span style={{background:'rgba(255,255,255,0.2)',color:'white',fontSize:10,fontWeight:800,padding:'3px 10px',borderRadius:50,width:'fit-content'}}>? FLASH</span>
                <div><p style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:16,color:'white',margin:0}}>Electronics Drop</p><p style={{color:'rgba(255,255,255,0.7)',fontSize:12,margin:'4px 0 0'}}>Up to 30% off</p></div>
              </div>
              <div style={{borderRadius:18,padding:20,flex:1,cursor:'pointer',background:'linear-gradient(135deg,#7c3aed,#a855f7)',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                <span style={{background:'rgba(255,255,255,0.2)',color:'white',fontSize:10,fontWeight:800,padding:'3px 10px',borderRadius:50,width:'fit-content'}}>?? TUESDAY</span>
                <div><p style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:16,color:'white',margin:0}}>Choose Day</p><p style={{color:'rgba(255,255,255,0.7)',fontSize:12,margin:'4px 0 0'}}>Weekly curated picks</p></div>
              </div>
            </div>
          </div>
        )}

        {/* Featured */}
        {!activeCategory && !searchParam && featured.length > 0 && (
          <div style={{marginBottom:36}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:20,color:'#111714',display:'flex',alignItems:'center',gap:8}}>
                <Flame size={20} color="#f97316"/> Featured Products
              </h2>
              <Link href="/home" style={{fontSize:13,fontWeight:700,color:'#1a7a4a',textDecoration:'none'}}>See all ?</Link>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}}>
              {featured.map(p=>(
                <ProductCard key={p.id} id={p.id} title={p.title} price={p.price} originalPrice={p.original_price} rating={p.rating} reviewCount={p.review_count} category={p.category_slug} condition={p.condition} vendorName={p.vendor?.full_name} isVerified={p.vendor?.is_verified} isFeatured={true}/>
              ))}
            </div>
          </div>
        )}

        {/* All products */}
        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:20,color:'#111714'}}>
              {searchParam ? 'Results for "'+searchParam+'"' : activeCategory ? (CAT_EMOJI[activeCategory]||'')+' '+(categories.find(c=>c.slug===activeCategory)?.name||activeCategory) : '? All Products'}
            </h2>
            <span style={{fontSize:13,color:'#6b8275'}}>{products.length} items</span>
          </div>
          {loading ? (
            <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:16}}>
              {Array(10).fill(0).map((_,i)=>(
                <div key={i} style={{background:'white',borderRadius:18,overflow:'hidden',border:'1px solid #e2ece7'}}>
                  <div style={{height:160,background:'#f0f0f0'}}/>
                  <div style={{padding:14}}><div style={{height:14,background:'#f0f0f0',borderRadius:6,marginBottom:8}}/><div style={{height:20,background:'#f0f0f0',borderRadius:6,width:'40%'}}/></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div style={{textAlign:'center',padding:'80px 0',color:'#6b8275'}}>
              <div style={{fontSize:56,marginBottom:16}}>??</div>
              <p style={{fontWeight:700,fontSize:18,color:'#1c2b22'}}>No products found</p>
              <p style={{fontSize:14,marginTop:8}}>Try a different category or search term</p>
            </div>
          ) : (
            <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:16}}>
              {products.map(p=>(
                <ProductCard key={p.id} id={p.id} title={p.title} price={p.price} originalPrice={p.original_price} rating={p.rating} reviewCount={p.review_count} category={p.category_slug} condition={p.condition} vendorName={p.vendor?.full_name} isVerified={p.vendor?.is_verified} isFeatured={p.is_featured}/>
              ))}
            </div>
          )}
        </div>

        {/* Vendor CTA */}
        <div style={{marginTop:48,background:'linear-gradient(135deg,#edfdf4,#d4f5e6)',border:'1px solid #d4f5e6',borderRadius:24,padding:'28px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:24,flexWrap:'wrap'}}>
          <div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:20,color:'#0f5c35',marginBottom:6}}>Ready to start selling?</h3>
            <p style={{fontSize:14,color:'#1a7a4a',margin:0}}>List your products for free. No upfront cost. Reach thousands of buyers across South Africa.</p>
          </div>
          <Link href="/register?role=vendor" style={{display:'inline-flex',alignItems:'center',gap:8,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:800,fontSize:14,padding:'13px 28px',borderRadius:12,textDecoration:'none',whiteSpace:'nowrap',boxShadow:'0 4px 16px rgba(26,122,74,0.3)'}}>
            Open Your Store Free <ChevronRight size={14}/>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer style={{background:'#111714',marginTop:64,padding:'48px 24px 32px'}}>
        <div style={{maxWidth:1280,margin:'0 auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:40,marginBottom:40}}>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
                <div style={{width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center'}}><ShoppingBag size={16} color="white"/></div>
                <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:20,color:'white'}}>Corefieds</span>
              </div>
              <p style={{fontSize:13,color:'rgba(255,255,255,0.4)',lineHeight:1.7,maxWidth:240,margin:0}}>South Africa's safest marketplace. Buy | Sell | Bid | Auction | Request. Founded 2022.</p>
              <div style={{marginTop:14,fontSize:12,color:'rgba(255,255,255,0.3)'}}>
                <div>corefieds@gmail.com</div><div style={{marginTop:4}}>069-492-3688</div>
              </div>
            </div>
            {[{t:'Buy',l:['Browse Products','Categories','Featured Deals','Auctions']},{t:'Sell',l:['Open Your Store','Vendor Dashboard','Seller Guide','Free Listings']},{t:'Support',l:['Help Centre','Track Order','Returns Policy','Contact Us']}].map(col=>(
              <div key={col.t}>
                <h4 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:14,color:'white',marginBottom:16,margin:'0 0 16px'}}>{col.t}</h4>
                <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10}}>
                  {col.l.map(link=>(<li key={link}><a href="#" style={{fontSize:13,color:'rgba(255,255,255,0.38)',textDecoration:'none'}}>{link}</a></li>))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:24,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
            <span style={{fontSize:12,color:'rgba(255,255,255,0.28)'}}> 2025 Corefieds. All rights reserved.</span>
            <span style={{fontSize:12,color:'rgba(255,255,255,0.28)'}}>?? Trade-Safe  ?? The Courier Guy & Fastway  ???? Built in South Africa</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Plus Jakarta Sans',sans-serif"}}><div style={{color:'#1a7a4a',fontWeight:700,fontSize:18}}>Loading Corefieds...</div></div>}>
      <HomeContent/>
    </Suspense>
  )
}

