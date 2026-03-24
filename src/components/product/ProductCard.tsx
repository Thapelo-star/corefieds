'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Heart, Star, ShieldCheck } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'

interface ProductCardProps {
  id: string
  title: string
  price: number
  originalPrice?: number
  rating?: number
  reviewCount?: number
  category?: string
  condition?: string
  vendorName?: string
  isVerified?: boolean
  isFeatured?: boolean
}

const CAT_EMOJI: Record<string,string> = {fashion:'👗',electronics:'📱',beauty:'💄',kitchen:'🍳','home-garden':'🏠',sports:'⚽',farming:'🌾',lighting:'💡',accessories:'👜',toys:'🧸',furniture:'🪑',vehicles:'🚗',educational:'🎓',services:'🛠️',property:'🏘️'}
const CAT_BG: Record<string,string> = {fashion:'#f0fdf4',electronics:'#f0f9ff',beauty:'#fff0f9',kitchen:'#fff7ed','home-garden':'#fdf4ff',sports:'#f0f9ff',farming:'#fefce8',lighting:'#fefce8',accessories:'#fdf4ff',furniture:'#f0fdf4',vehicles:'#fff1f2',educational:'#fdf4ff',services:'#f0f9ff',property:'#f0fdf4'}

export function ProductCard({ id, title, price, originalPrice, rating, reviewCount, category, condition, vendorName, isVerified, isFeatured }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const [wishLoading, setWishLoading] = useState(false)
  const { addItem } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : null
  const emoji = CAT_EMOJI[category||''] || '📦'
  const bg = CAT_BG[category||''] || '#f4faf7'

  async function toggleWishlist(e: React.MouseEvent) {
    e.preventDefault()
    if (!user) { router.push('/login'); return }
    setWishLoading(true)
    const supabase = createClient()
    if (wishlisted) {
      await supabase.from('wishlists').delete().eq('user_id', user.id).eq('product_id', id)
      setWishlisted(false)
    } else {
      await supabase.from('wishlists').insert({ user_id: user.id, product_id: id })
      setWishlisted(true)
    }
    setWishLoading(false)
  }

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
          {isFeatured && <span style={{position:'absolute',top:10,right:40,background:'#f59e0b',color:'white',fontSize:10,fontWeight:800,padding:'3px 8px',borderRadius:50}}>HOT</span>}
          <button onClick={toggleWishlist} disabled={wishLoading}
            style={{position:'absolute',bottom:10,right:10,width:32,height:32,borderRadius:'50%',background:'white',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.12)',opacity:hovered?1:0,transition:'opacity .2s'}}>
            <Heart size={14} fill={wishlisted?'#e84040':'none'} color={wishlisted?'#e84040':'#6b8275'}/>
          </button>
        </div>
      </Link>
      <div style={{padding:'12px 14px 16px'}}>
        <Link href={'/product/'+id} style={{textDecoration:'none'}}>
          <h3 style={{fontWeight:700,fontSize:13,color:'#1c2b22',marginBottom:6,lineHeight:1.4}}>{title}</h3>
        </Link>
        {(rating||0) > 0 && (
          <div style={{display:'flex',alignItems:'center',gap:4,marginBottom:6}}>
            <span style={{color:'#f5a623',fontSize:11}}>{'★'.repeat(Math.round(rating||0))}{'☆'.repeat(5-Math.round(rating||0))}</span>
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
            {isVerified && <ShieldCheck size={11} color="#22a063"/>}
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
