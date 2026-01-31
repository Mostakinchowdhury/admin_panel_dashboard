import axios from 'axios'
import { clearTokens, getStoredTokens, saveTokens } from './auth'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ROOT, // তোমার backend base URL
  headers: { 'Content-Type': 'application/json' }
})

// Request interceptor → প্রতিটি request এর সাথে token attach করব
api.interceptors.request.use((config) => {
  const { accessToken } = getStoredTokens()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

// Response interceptor → 401 পেলে refresh চেষ্টা করবে
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const { refreshToken } = getStoredTokens()
        if (!refreshToken) {
          return Promise.reject(error)
        }

        // Refresh token দিয়ে নতুন access আনব
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/token/refresh/`, {
          refresh: refreshToken
        })

        const newAccess = res.data.access
        const newRefresh = refreshToken // কারণ rotate=false

        // Redux + localStorage update
        saveTokens(newAccess, newRefresh)

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccess}`
        return api(originalRequest)
      } catch (err) {
        // Refresh কাজ না করলে → logout
        clearTokens()
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  }
)

export default api
