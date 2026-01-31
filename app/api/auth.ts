import axios from 'axios'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'
import api from '../utils/api'
import { clearTokens, saveTokens } from '../utils/auth'

interface AdminLoginResponse {
  id: number
  role: 'admin' | 'partner' | 'rider'
  email: string
  name: string
}

// ===========logout handler function============

export const handlelogout = (
  sauth: Dispatch<SetStateAction<boolean>>,
  set_al: Dispatch<SetStateAction<boolean>>
) => {
  set_al(true)
  clearTokens()
  sauth(false)
  set_al(false)
}

// =================get user role ===============

export const getUserRole = async (
  setrole: Dispatch<SetStateAction<'admin' | 'partner' | 'rider' | null>>,
  sauth: Dispatch<SetStateAction<boolean>>,
  set_al: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const res = await api.get<AdminLoginResponse>('mam/ali/')
    setrole(res.data.role)
  } catch {
    toast.error('Something went wrong from getUserRole', {
      style: {
        backgroundColor: 'red',
        color: 'white',
        fontWeight: 'bold'
      }
    })
    setrole(null)
    handlelogout(sauth, set_al)
  }
}

// ===========login handler function============

export async function hanldelogin(
  { email, password }: { email: string; password: string },
  sauth: Dispatch<SetStateAction<boolean>>,
  set_al: Dispatch<SetStateAction<boolean>>,
  serole: Dispatch<SetStateAction<'admin' | 'partner' | 'rider' | null>>,
  seterror: Dispatch<SetStateAction<string>>,
  setform: Dispatch<
    SetStateAction<{
      email: string
      password: string
    }>
  >
) {
  set_al(true)
  try {
    const res = await axios.post<{
      refresh: string
      access: string
    }>(`${process.env.NEXT_PUBLIC_ADMIN}ali/`, {
      email,
      password
    })
    saveTokens(res.data.access, res.data.refresh)
    sauth(true)
    await getUserRole(serole, sauth, set_al)
    setform({
      email: '',
      password: ''
    })
    seterror('')
  } catch (e) {
    seterror(Object.values(e.response?.data || {}).flat()[0])
    console.log(e)
  } finally {
    set_al(false)
  }
}
