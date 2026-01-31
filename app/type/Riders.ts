export type RiderStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type Rider = {
  id: number;
  name: string;
  user: number;
  email: string;
  phone_num: string;
  working_area_address: string;
  permanent_address: string;
  photo: string | null;
  photo_url: string | null;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
  status: RiderStatus;
};

export type PaginatedRiderResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Rider[];
  page_size: number;
  page: number;
  total_pages: number;
};
