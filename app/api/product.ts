import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'
import { Product, ProductApiResponse } from '../type/product'
import api from '../utils/api'

type FetchArgs = {
  setloading: Dispatch<SetStateAction<boolean>>
  setproduct: Dispatch<SetStateAction<Product[]>>
  settotalpages: Dispatch<SetStateAction<number>>
  page?: number
  search?: string
  category?: string
  sortby?: string
}

export async function fetchproduct({
  setloading,
  setproduct,
  settotalpages,
  page = 1,
  search = '',
  category = 'All',
  sortby = 'df'
}: FetchArgs) {
  setloading(true)
  search = search.trim()
  const prm: {
    page: number
    search: string
    category?: string
    ordering?: string
  } = { page, search }
  if (category != 'All') {
    prm.category = category
  }
  if (sortby != 'df') {
    prm.ordering = `-${sortby == 'atc' ? 'added_to_cart_count' :sortby=="stk"?"stock":'price'}`
  }
  try {
    const res = await api.get<ProductApiResponse>('/api/products', {
      params: prm
    })

    setproduct(res.data.results)
    settotalpages(res.data.total_pages)

    return res.data
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
