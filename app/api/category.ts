import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'
import { CategoryApiResponse } from '../type/category'
import api from '../utils/api'

// ================= fetch cateegory props type===================
type fetchcategoryprop = {
  setcategory: Dispatch<SetStateAction<CategoryApiResponse>>
  setloading: Dispatch<SetStateAction<boolean>>
}
// =========================== fetch category==============================
export async function fetchcategory({ setcategory, setloading }: fetchcategoryprop) {
  setloading(true)
  try {
    const res = await api.get<CategoryApiResponse>('/api/categories/')
    setcategory(res.data)
  } catch (e: any) {
    const apiError = e?.response?.data
    const message =
      apiError?.detail ||
      apiError?.message ||
      (Array.isArray(apiError) ? apiError[0] : Object.values(apiError || {}).flat()[0]) ||
      'Something went wrong'

    toast.error(message)
  } finally {
    setloading(false)
  }
}
