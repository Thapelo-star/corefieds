'use client'
import { useEffect, useState, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase-client'
import { ShoppingBag, Send, ArrowLeft, Shield, Search, MessageCircle, MoreVertical, Phone, Package } from 'lucide-react'

function ChatContent() {
  const { user, profile } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const vendorId = searchParams.get('vendor')
  const productId = searchParams.get('product')
  const productTitle = searchParams.get('title')

  const font = "'Plus Jakarta Sans',sans-serif"
  const syne = "'Syne',sans-serif"

  const [conversations, setConversations] = useState<any[]>([])
  const [activeConv, setActiveConv] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMsg, setNewMsg] = useState('')
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    if (!user) { router.push('/login'); return }
    loadConversations()
  }, [user])

  useEffect(() => {
    if (vendorId && user) startOrOpenConversation(vendorId)
  }, [vendorId, user])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!activeConv) return
    const sub = supabase
      .channel('messages:' + activeConv.id)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: 'conversation_id=eq.' + activeConv.id },
        payload => { setMessages(prev => [...prev, payload.new]) }
      ).subscribe()
    return () => { supabase.removeChannel(sub) }
  }, [activeConv])

  async function loadConversations() {
    setLoading(true)
    const { data } = await supabase
      .from('conversations')
      .select('*, buyer:profiles!conversations_buyer_id_fkey(id,full_name,is_verified), vendor:profiles!conversations_vendor_id_fkey(id,full_name,is_verified)')
      .or('buyer_id.eq.'+user!.id+',vendor_id.eq.'+user!.id)
      .order('last_message_at', { ascending: false })
    setConversations(data || [])
    setLoading(false)
  }

  async function startOrOpenConversation(vId: string) {
    const { data: existing } = await supabase
      .from('conversations')
      .select('*')
      .eq('buyer_id', user!.id)
      .eq('vendor_id', vId)
      .maybeSingle()

    if (existing) {
      setActiveConv(existing)
      loadMessages(existing.id)
    } else {
      const { data: newConv } = await supabase
        .from('conversations')
        .insert({ buyer_id: user!.id, vendor_id: vId, product_id: productId||null, product_title: productTitle||null, last_message: 'Conversation started', last_message_at: new Date().toISOString() })
        .select('*, buyer:profiles!conversations_buyer_id_fkey(id,full_name), vendor:profiles!conversations_vendor_id_fkey(id,full_name)')
        .single()
      if (newConv) {
        setConversations(prev => [newConv, ...prev])
        setActiveConv(newConv)
        setMessages([])
      }
    }
  }

  async function loadMessages(convId: string) {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', convId)
      .order('created_at', { ascending: true })
    setMessages(data || [])
    await supabase.from('messages').update({ is_read: true }).eq('conversation_id', convId).neq('sender_id', user!.id)
  }

  async function selectConversation(conv: any) {
    setActiveConv(conv)
    loadMessages(conv.id)
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!newMsg.trim() || !activeConv || sending) return
    setSending(true)
    const content = newMsg.trim()
    setNewMsg('')

    const optimistic = { id: Date.now().toString(), conversation_id: activeConv.id, sender_id: user!.id, content, created_at: new Date().toISOString(), is_read: false }
    setMessages(prev => [...prev, optimistic])

    await supabase.from('messages').insert({ conversation_id: activeConv.id, sender_id: user!.id, content })
    await supabase.from('conversations').update({ last_message: content, last_message_at: new Date().toISOString() }).eq('id', activeConv.id)
    setSending(false)
  }

  const getOtherParty = (conv: any) => {
    if (!conv) return null
    return user?.id === conv.buyer_id ? conv.vendor : conv.buyer
  }

  const filteredConvs = conversations.filter(c => {
    const other = getOtherParty(c)
    return !searchQuery || other?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) || c.product_title?.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const DEMO_MSGS = [
    { id:'d1', sender_id:'vendor', content:'Hi there! Thanks for your interest in our product 😊 How can I help you today?', created_at:new Date(Date.now()-600000).toISOString() },
    { id:'d2', sender_id:user?.id, content:'Hi! I wanted to ask about delivery times to eMalahleni.', created_at:new Date(Date.now()-540000).toISOString() },
    { id:'d3', sender_id:'vendor', content:'Great question! We dispatch within 24 hours via The Courier Guy. Delivery to eMalahleni takes 2-3 business days. 🚚', created_at:new Date(Date.now()-480000).toISOString() },
    { id:'d4', sender_id:user?.id, content:'Perfect! And the escrow payment — how does that work exactly?', created_at:new Date(Date.now()-420000).toISOString() },
    { id:'d5', sender_id:'vendor', content:'You pay through Corefieds — the money is held safely in escrow. It only gets released to us once you confirm you received your order. So you are fully protected! 🔒', created_at:new Date(Date.now()-360000).toISOString() },
    { id:'d6', sender_id:user?.id, content:"That is great, I feel much safer now. I'll go ahead and place the order!", created_at:new Date(Date.now()-300000).toISOString() },
    { id:'d7', sender_id:'vendor', content:"Awesome! Feel free to message us anytime if you need help. We're here for you 👍", created_at:new Date(Date.now()-240000).toISOString() },
  ]

  const displayMessages = messages.length > 0 ? messages : (activeConv ? DEMO_MSGS : [])

  const DEMO_CONVS = [
    { id:'dc1', product_title:'Amped Fitness T-Shirt', last_message:'Awesome! Feel free to message us anytime', last_message_at:new Date(Date.now()-240000).toISOString(), buyer_unread:0, vendor:{ id:'v1', full_name:'Amped Fitness ZA', is_verified:true } },
    { id:'dc2', product_title:'Bluetooth Earbuds Pro', last_message:'We have them in stock! Dispatching tomorrow', last_message_at:new Date(Date.now()-86400000).toISOString(), buyer_unread:1, vendor:{ id:'v2', full_name:'TechHub SA', is_verified:true } },
  ]
  const displayConvs = filteredConvs.length > 0 ? filteredConvs : DEMO_CONVS

  return (
    <div style={{minHeight:'100vh',background:'#f4faf7',fontFamily:font,display:'flex',flexDirection:'column'}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet"/>

      <nav style={{background:'white',borderBottom:'1px solid #e2ece7',boxShadow:'0 1px 8px rgba(0,0,0,0.05)',flexShrink:0}}>
        <div style={{maxWidth:1280,margin:'0 auto',padding:'0 24px',height:60,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <button onClick={()=>router.back()} style={{display:'flex',alignItems:'center',gap:6,background:'#f4faf7',border:'none',borderRadius:10,padding:'7px 12px',cursor:'pointer',fontWeight:700,fontSize:13,color:'#1c2b22',fontFamily:font}}>
              <ArrowLeft size={15}/> Back
            </button>
            <Link href="/home" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
              <div style={{width:30,height:30,borderRadius:9,background:'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center'}}><ShoppingBag size={14} color="white"/></div>
              <span style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#111714'}}>Corefieds</span>
            </Link>
          </div>
          <h2 style={{fontFamily:syne,fontWeight:800,fontSize:17,color:'#111714',margin:0}}>Messages</h2>
          <div style={{width:100}}/>
        </div>
      </nav>

      <div style={{flex:1,maxWidth:1280,margin:'0 auto',width:'100%',padding:'20px 24px',display:'grid',gridTemplateColumns:'340px 1fr',gap:20,minHeight:0}}>

        {/* Conversations sidebar */}
        <div style={{background:'white',borderRadius:20,border:'1px solid #e2ece7',display:'flex',flexDirection:'column',overflow:'hidden'}}>
          <div style={{padding:'16px',borderBottom:'1px solid #f4faf7'}}>
            <div style={{position:'relative'}}>
              <Search size={14} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#6b8275'}}/>
              <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                style={{width:'100%',paddingLeft:36,paddingRight:12,paddingTop:9,paddingBottom:9,border:'1.5px solid #e2ece7',borderRadius:10,fontSize:13,fontFamily:font,outline:'none',boxSizing:'border-box'}}/>
            </div>
          </div>
          <div style={{flex:1,overflowY:'auto'}}>
            {loading ? (
              <div style={{padding:24,textAlign:'center',color:'#6b8275',fontSize:13}}>Loading...</div>
            ) : displayConvs.length === 0 ? (
              <div style={{padding:32,textAlign:'center'}}>
                <MessageCircle size={40} color="#d4f5e6" style={{margin:'0 auto 12px',display:'block'}}/>
                <div style={{fontWeight:700,fontSize:14,color:'#1c2b22',marginBottom:4}}>No conversations yet</div>
                <div style={{fontSize:12,color:'#6b8275'}}>Message a vendor from any product page</div>
              </div>
            ) : (
              displayConvs.map(conv => {
                const other = getOtherParty(conv) || conv.vendor
                const isActive = activeConv?.id === conv.id
                const unread = user?.id === conv.buyer_id ? conv.buyer_unread : conv.vendor_unread
                return (
                  <button key={conv.id} onClick={() => selectConversation(conv)}
                    style={{width:'100%',padding:'14px 16px',background:isActive?'#edfaf3':'white',border:'none',borderLeft:isActive?'3px solid #22a063':'3px solid transparent',cursor:'pointer',textAlign:'left',fontFamily:font,transition:'all .15s',borderBottom:'1px solid #f4faf7'}}>
                    <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                      <div style={{width:44,height:44,borderRadius:14,background:isActive?'#22a063':'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:800,fontSize:16,flexShrink:0}}>
                        {other?.full_name?.[0]||'?'}
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:2}}>
                          <div style={{fontWeight:700,fontSize:13,color:'#1c2b22',display:'flex',alignItems:'center',gap:5}}>
                            {other?.full_name||'Unknown'}
                            {other?.is_verified && <span style={{fontSize:10,color:'#22a063'}}>✓</span>}
                          </div>
                          <div style={{fontSize:10,color:'#6b8275'}}>{new Date(conv.last_message_at).toLocaleTimeString('en-ZA',{hour:'2-digit',minute:'2-digit'})}</div>
                        </div>
                        {conv.product_title && (
                          <div style={{fontSize:10,color:'#22a063',fontWeight:700,marginBottom:2,display:'flex',alignItems:'center',gap:3}}>
                            <Package size={9}/>{conv.product_title}
                          </div>
                        )}
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                          <div style={{fontSize:12,color:'#6b8275',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:170}}>{conv.last_message}</div>
                          {unread > 0 && <div style={{width:18,height:18,borderRadius:'50%',background:'#22a063',color:'white',fontSize:10,fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{unread}</div>}
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Chat window */}
        <div style={{background:'white',borderRadius:20,border:'1px solid #e2ece7',display:'flex',flexDirection:'column',overflow:'hidden',minHeight:500}}>
          {!activeConv ? (
            <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:40,textAlign:'center'}}>
              <div style={{width:80,height:80,borderRadius:24,background:'#edfaf3',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:20}}>
                <MessageCircle size={36} color="#22a063"/>
              </div>
              <h3 style={{fontFamily:syne,fontWeight:800,fontSize:20,color:'#111714',marginBottom:8}}>Select a conversation</h3>
              <p style={{fontSize:14,color:'#6b8275',maxWidth:300,lineHeight:1.6}}>Choose a conversation from the left, or start a new one from any product page by clicking Message Vendor.</p>
              <div style={{marginTop:24,background:'#edfaf3',border:'1px solid #d4f5e6',borderRadius:14,padding:14,maxWidth:340}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                  <Shield size={14} color="#16a34a"/>
                  <span style={{fontWeight:800,fontSize:13,color:'#14532d'}}>Safe Messaging Reminder</span>
                </div>
                <p style={{fontSize:12,color:'#166534',margin:0,lineHeight:1.5}}>Never pay outside of Corefieds. All transactions are protected by Trade-Safe escrow. If a vendor asks you to pay via EFT directly, report it immediately.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat header */}
              <div style={{padding:'14px 20px',borderBottom:'1px solid #f4faf7',display:'flex',alignItems:'center',gap:14,flexShrink:0}}>
                <div style={{width:44,height:44,borderRadius:14,background:'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:800,fontSize:18,flexShrink:0}}>
                  {getOtherParty(activeConv)?.full_name?.[0]||'?'}
                </div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <div style={{fontWeight:800,fontSize:15,color:'#1c2b22'}}>{getOtherParty(activeConv)?.full_name||'Vendor'}</div>
                    {getOtherParty(activeConv)?.is_verified && <span style={{fontSize:11,color:'#22a063',fontWeight:700}}>✓ Verified</span>}
                  </div>
                  {activeConv.product_title && (
                    <div style={{fontSize:12,color:'#6b8275',display:'flex',alignItems:'center',gap:4,marginTop:1}}>
                      <Package size={11}/> Re: {activeConv.product_title}
                    </div>
                  )}
                </div>
                <div style={{display:'flex',gap:8}}>
                  <button style={{width:36,height:36,borderRadius:10,background:'#f4faf7',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Phone size={15} color="#6b8275"/>
                  </button>
                  <button style={{width:36,height:36,borderRadius:10,background:'#f4faf7',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <MoreVertical size={15} color="#6b8275"/>
                  </button>
                </div>
              </div>

              {/* Safe tip */}
              <div style={{padding:'8px 20px',background:'#edfaf3',borderBottom:'1px solid #d4f5e6',display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
                <Shield size={12} color="#16a34a"/>
                <span style={{fontSize:11,fontWeight:700,color:'#166534'}}>💡 Safe Tip: Never pay outside Corefieds. Use escrow to stay protected.</span>
              </div>

              {/* Messages */}
              <div style={{flex:1,overflowY:'auto',padding:'20px',display:'flex',flexDirection:'column',gap:12}}>
                {displayMessages.map((msg, idx) => {
                  const isMine = msg.sender_id === user?.id
                  const showDate = idx === 0 || new Date(msg.created_at).toDateString() !== new Date(displayMessages[idx-1]?.created_at).toDateString()
                  return (
                    <div key={msg.id}>
                      {showDate && (
                        <div style={{textAlign:'center',margin:'8px 0'}}>
                          <span style={{fontSize:11,color:'#6b8275',background:'#f4faf7',padding:'3px 12px',borderRadius:50}}>{new Date(msg.created_at).toLocaleDateString('en-ZA',{weekday:'short',day:'numeric',month:'short'})}</span>
                        </div>
                      )}
                      <div style={{display:'flex',justifyContent:isMine?'flex-end':'flex-start'}}>
                        {!isMine && (
                          <div style={{width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,#0f5c35,#22a063)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:800,fontSize:12,marginRight:8,flexShrink:0,alignSelf:'flex-end'}}>
                            {getOtherParty(activeConv)?.full_name?.[0]||'V'}
                          </div>
                        )}
                        <div style={{maxWidth:'72%'}}>
                          <div style={{padding:'11px 15px',borderRadius:isMine?'18px 18px 4px 18px':'18px 18px 18px 4px',background:isMine?'linear-gradient(135deg,#0f5c35,#22a063)':'#f4faf7',color:isMine?'white':'#1c2b22',fontSize:14,lineHeight:1.5,boxShadow:isMine?'0 2px 8px rgba(26,122,74,0.25)':'0 1px 4px rgba(0,0,0,0.06)'}}>
                            {msg.content}
                          </div>
                          <div style={{fontSize:10,color:'#6b8275',marginTop:3,textAlign:isMine?'right':'left',paddingLeft:isMine?0:4}}>
                            {new Date(msg.created_at).toLocaleTimeString('en-ZA',{hour:'2-digit',minute:'2-digit'})}
                            {isMine && <span style={{marginLeft:4}}>{msg.is_read?'✓✓':'✓'}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef}/>
              </div>

              {/* Input */}
              <form onSubmit={sendMessage} style={{padding:'14px 20px',borderTop:'1px solid #f4faf7',display:'flex',gap:10,alignItems:'center',flexShrink:0}}>
                <input value={newMsg} onChange={e=>setNewMsg(e.target.value)}
                  placeholder="Type your message..."
                  style={{flex:1,border:'1.5px solid #e2ece7',borderRadius:50,padding:'11px 18px',fontSize:14,fontFamily:font,outline:'none',color:'#1c2b22',background:'#f9fafb'}}/>
                <button type="submit" disabled={!newMsg.trim()||sending}
                  style={{width:44,height:44,borderRadius:'50%',background:newMsg.trim()?'linear-gradient(135deg,#0f5c35,#22a063)':'#e2ece7',border:'none',cursor:newMsg.trim()?'pointer':'default',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,transition:'all .2s'}}>
                  <Send size={17} color={newMsg.trim()?'white':'#6b8275'}/>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{color:'#1a7a4a',fontWeight:700}}>Loading chat...</div></div>}>
      <ChatContent/>
    </Suspense>
  )
}
