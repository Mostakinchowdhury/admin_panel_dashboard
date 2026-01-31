import partnars from './partner.json'

export type ApplyBusinessman_tp = {
  id: number
  name: string
  email: string
  phone_num: string
  business_name: string
  business_address: string
  business_type: string
  website?: string | null
  description?: string | null
  buesness_logo?: string | null
  buesness_logo_url?: string | null
  owner_photo?: string | null
  owner_photo_url?: string | null
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  created_at: string
  updated_at: string
}


export const partnerstatus = ['All', 'PENDING', 'APPROVED', 'REJECTED']
export const partners = partnars as ApplyBusinessman_tp[]
