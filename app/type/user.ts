// Address type
export interface Address {
  id: number;
  street: string;
  city: string;
  country: string;
  created_at: string; // ISO datetime string
  profile: number; // profile id reference
}

// Profile type
export interface Profile {
  id: number;
  user: number; // user id reference
  phone_num: string;
  country: string;
  bio: string;
  gender: 'male' | 'female' | 'other'; // restrict to known values
  birth_date: string | null; // nullable ISO date
  profile_image: string;
  profile_imag: string; // duplicate field in your JSON
  addresses: Address[];
}

// User type
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
  is_rider: boolean;
  role: 'Admin' | 'Partner' | 'Customer'; // union of roles
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
  profile: Profile;
}

// Paginated response
export interface PaginatedUsersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
  page_size: number;
  page: number;
  total_pages: number;
}
