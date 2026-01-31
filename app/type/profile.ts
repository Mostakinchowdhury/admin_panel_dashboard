export type address = {
  id: number
  street: string
  city: string
  country: string
  created_at: string
}
export type profile = {
  id: number
  addresses: address[]
  phone_num: null | string
  country: string
  bio: null | string
  gender: string
  birth_date: null | string
  profile_image: null | string | number
  profile_imag: null | string
  user: number
}
