export interface ProductApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
  page_size: number;
  page: number;
  total_pages: number;
}

// ------------------ Product ------------------
export type Tag = {
  id: number;
  tag_author: string;
  name: string;
};
export interface Product {
  product_img: string;
  id: number;
  category: string;
  name: string;
  description: string;
  price: string; // price string আকারে এসেছে
  max_price: string;
  stock: number;
  tags: Tag[];
  created_at: string;
  update_at: string;

  // review list
  reviews: Review[];

  // rating and review info
  review_count: number;
  average_rating?: number;

  addedtocard: number;
  added_to_cart_count: number;

  // product images
  productimgs: ProductImage[];
}

// ------------------ Review ------------------

export interface Review {
  id: number;
  product: number;
  product_name: string;
  user: number;
  user_email: string;
  comment: string;
  rated: number;
  created_at: string;
  updated_at: string;
}

// ------------------ Product Image ------------------

export interface ProductImage {
  id: number;
  product: number;
  file: string;
  file_url: string;
}
