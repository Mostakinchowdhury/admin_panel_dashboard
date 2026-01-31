// Single shop/partner type
export interface Shop {
  id: number;
  name: string;
  email: string;
  phone_num: string;
  business_name: string;
  business_address: string;
  business_type: string;
  website: string;
  description: string;
  buesness_logo: string | null;
  buesness_logo_url: string | null;
  owner_photo: string | null;
  owner_photo_url: string | null;
  status: 'APPROVED' | 'PENDING' | 'REJECTED'; // যদি অন্য status থাকে, সেগুলোও যোগ করা যাবে
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

// API response type
export interface ShopsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Shop[];
  page_size: number;
  page: number;
  total_pages: number;
}
