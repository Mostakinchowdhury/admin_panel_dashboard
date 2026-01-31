import products from './demo_products.json'
export const productscategories = ['All', ...Array.from(new Set(products.map((pr) => pr.category)))]
export interface ProductImage {
  id: number
  file: string
}

export interface Tag {
  id: number
  name: string
}

export interface Review {
  id: number
  user: string
  rating: number
  comment: string
}

export interface Product_tp {
  id: number
  category: string
  name: string
  description: string
  price: string
  max_price: string
  stock: number
  tags: Tag[]
  created_at: string
  update_at: string
  reviews: Review[]
  average_rating: number
  review_count: number
  addedtocard: number
  added_to_cart_count: number
  productimgs: ProductImage[]
}

export { products }
