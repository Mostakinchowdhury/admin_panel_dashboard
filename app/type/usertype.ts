export interface Address {
  id: number;
  street: string;
  city: string;
  country: string;
  created_at: string; // ISO date string
  profile: number;
}

export interface UserProfile {
  id: number;
  user: number;
  phone_num: string | null;
  country: string;
  bio: string | null;
  gender: string;
  birth_date: string | null;
  profile_image: string | null;
  profile_imag: string | null;
}

type profilewithresponse = {
  id: number;
  user: number;
  phone_num: string | null;
  country: string;
  bio: string | null;
  gender: string;
  birth_date: string | null;
  profile_image: string | null;
  profile_imag: string | null;
  addresses: Address[];
};

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_verified: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  is_rider: boolean;
  role: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface Userresponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_verified: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  is_rider: boolean;
  role: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  profile: profilewithresponse;
}
