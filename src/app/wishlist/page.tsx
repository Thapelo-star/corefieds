'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { useCart } from '@/hooks/useCart'
import { createClient } from '@/lib/supabase-client'
import { ShoppingBag, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react'

const CAT_EMOJI: Record<string,string> = {fashion:'👗',electronics:'📱',beauty:'💄',kitchen:'🍳','home-garden':'🏠',sports:'⚽',farming:'🌾',lighting:'💡',accessories:'👜',toys:'🧸',furniture:'🪑',vehicles:'🚗',educational:'🎓',services:'🛠️',property:'🏘️'}
const CAT_BG: Record<string,string> = {fashion:'#f0fdf4',electronics:'#f0f9ff',beauty:'#fff0f9',kitchen:'#fff7ed','home-garden':'#fdf4ff',sports:'#f0f9ff',farming:'#fefce8',lighting:'#fefce8',accessories:'#fdf4ff',furniture:'#f0fdf4',vehicles:'#fff1f2'}

export default function WishlistPage() {
  const { user } = useAuth()
  const { addItem } = useCart()
  const router = useRouter()
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const font = "'Plus Jakarta Sans',sans-serif"
  const syne = "'Syne',sans-serif"

  useEffect(() => { if (!user) { router.push('/login'); return }; loadWishlist() }, [user])

  async function loadWishlist() {
    const supabase = createClient()
    const { data } = await supabase.from('wishlists').select('*, product:products(*)').eq('user_id', user!.id).order('created_at', { ascending: false })
    setItems(data || [])
    setLoading(false)
  }

  async function removeFromWishlist(wishId: string) {
    const supabase = createClient()
    await supabase.from('wishlists').delete().eq('id', wishId)
    setItems(prev => prev.filter(i => i.id !== wishId))
  }

  return (
    <div style={{minHeight:'100vh',background:'#f4faf7',fontFamily:font}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet"/>
      <nav style={{background:'white',borderBottom:'1px solid #e2ece7',boxShadow:'0 1px 8px rgba(0,0,0,0.05)'}}>
        <div style={{maxWidth:1100,margin:'0 auto',padding:'0 24px',height:60,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Link href="/home" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
            <div style={{width:32,height:32,borderRadius:10,background:'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center'}}><ShoppingBag size={15} color="white"/></div>
            <span style={{fontFamily:syne,fontWeight:800,fontSize:18,color:'#111714'}}>Corefieds</span>
          </Link>
          <Link href="/home" style={{fontSize:13,fontWeight:700,color:'#1a7a4a',textDecoration:'none'}}>← Back to Home</Link>
        </div>
      </nav>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'32px 24px'}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:28}}>
          <Heart size={24} color="#e84040" fill="#e84040"/>
          <h1 style={{fontFamily:syne,fontWeight:800,fontSize:28,color:'#111714',margin:0}}>Saved Products</h1>
          <span style={{fontSize:14,color:'#6b8275',fontWeight:600}}>({items.length})</span>
        </div>
        {loading ? (
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}}>
            {Array(4).fill(0).map((_,i) => <div key={i} style={{background:'white',borderRadius:18,height:280,border:'1px solid #e2ece7'}}/>)}
          </div>
        ) : items.length === 0 ? (
          <div style={{background:'white',borderRadius:24,padding:'80px 24px',border:'1px solid #e2ece7',textAlign:'center'}}>
            <Heart size={64} color="#fecaca" fill="#fecaca" style={{margin:'0 auto 20px',display:'block'}}/>
            <h2 style={{fontFamily:syne,fontWeight:800,fontSize:24,color:'#111714',marginBottom:8}}>No saved products</h2>
            <p style={{fontSize:14,color:'#6b8275',marginBottom:24}}>Tap the heart icon on any product to save it here.</p>
            <Link href="/home" style={{display:'inline-flex',alignItems:'center',gap:8,background:'linear-gradient(135deg,#0f5c35,#22a063)',color:'white',fontWeight:800,fontSize:14,padding:'12px 28px',borderRadius:12,textDecoration:'none'}}>
              Browse Products <ArrowRight size={14}/>
            </Link>
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}}>
            {items.map(item => {
              const p = item.product
              if (!p) return null
              const emoji = CAT_EMOJI[p.category_slug]||'📦'
              const bg = CAT_BG[p.category_slug]||'#f4faf7'
              return (
                <div key={item.id} style={{background:'white',borderRadius:18,border:'1px solid #e2ece7',overflow:'hidden',boxShadow:'0 2px 12px rgba(26,122,74,0.07)'}}>
                  <Link href={'/product/'+p.id} style={{textDecoration:'none',display:'block'}}>
                    <div style={{height:160,display:'flex',alignItems:'center',justifyContent:'center',fontSize:60,background:bg,position:'relative'}}>
                      {emoji}
                      <button onClick={e=>{e.preventDefault();removeFromWishlist(item.id)}} style={{position:'absolute',top:10,right:10,width:32,height:32,borderRadius:'50%',background:'white',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.1)'}}>
                        <Trash2 size={13} color="#e84040"/>
                      </button>
                    </div>
                  </Link>
                  <div style={{padding:'12px 14px 16px'}}>
                    <Link href={'/product/'+p.id} style={{textDecoration:'none'}}>
                      <h3 style={{fontWeight:700,fontSize:13,color:'#1c2b22',marginBottom:6,lineHeight:1.4}}>{p.title}</h3>
                    </Link>
                    <div style={{fontFamily:syne,fontWeight:800,fontSize:18,color:'#1a7a4a',marginBottom:10}}>R{p.price?.toLocaleString()}</div>
                    <button onClick={() => addItem({id:p.id,title:p.title,price:p.price,image:emoji,quantity:1})}
                      style={{width:'100%',padding:'9px',borderRadius:10,border:'1.5px solid #d4f5e6',background:'#edfaf3',color:'#1a7a4a',fontWeight:700,fontSize:12,cursor:'pointer',fontFamily:font,display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>
                      <ShoppingCart size={13}/> Add to Cart
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
