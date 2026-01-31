import riders_f_json from './riders.json'
export type ApplyRiderType = {
  id: number
  name: string
  user: number | null
  email: string
  phone_num: string
  working_area_address: string
  permanent_address: string
  photo: string | null
  photo_url: string | null
  created_at: string
  updated_at: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
}
export const riderstatusoptions = ['All', 'PENDING', 'APPROVED', 'REJECTED']
export const ridersdata = riders_f_json as ApplyRiderType[]
