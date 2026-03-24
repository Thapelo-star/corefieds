import { createClient } from './supabase-client'

export async function getProducts(options?: {
  category?: string
  featured?: boolean
  limit?: number
  search?: string
}) {
  const supabase = createClient()
  let query = supabase
    .from('products')
    .select('*, vendor:profiles(id, full_name, is_verified, avatar_url)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (options?.category) query = query.eq('category_slug', options.category)
  if (options?.featured) query = query.eq('is_featured', true)
  if (options?.limit) query = query.limit(options.limit)
  if (options?.search) query = query.ilike('title', '%' + options.search + '%')

  const { data, error } = await query
  if (error) console.error(error)
  return data || []
}

export async function getProduct(id: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from('products')
    .select('*, vendor:profiles(id, full_name, is_verified, avatar_url, location)')
    .eq('id', id)
    .single()
  return data
}

export async function getCategories() {
  const supabase = createClient()
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('name')
  return data || []
}
