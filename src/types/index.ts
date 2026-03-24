export type UserRole = 'buyer' | 'vendor' | 'affiliate' | 'admin'

export interface UserProfile {
  id: string
  email: string
  full_name: string
  role: UserRole
  avatar_url?: string
  phone?: string
  location?: string
  is_verified: boolean
  created_at: string
}

export interface Product {
  id: string
  vendor_id: string
  title: string
  description: string
  price: number
  original_price?: number
  category: string
  images: string[]
  condition: 'new' | 'used' | 'refurbished'
  stock_qty: number
  sizes?: string[]
  colors?: string[]
  is_featured: boolean
  is_active: boolean
  created_at: string
  vendor?: UserProfile
  rating?: number
  review_count?: number
}

export interface Order {
  id: string
  buyer_id: string
  vendor_id: string
  product_id: string
  quantity: number
  total_amount: number
  status: 'pending' | 'confirmed' | 'dispatched' | 'in_transit' | 'delivered' | 'disputed'
  escrow_status: 'held' | 'released' | 'refunded'
  tracking_number?: string
  courier?: string
  created_at: string
  product?: Product
}

export interface CartItem {
  product: Product
  quantity: number
  selected_size?: string
  selected_color?: string
}
