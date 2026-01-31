// Address type
export interface Address {
  id: number;
  street: string;
  city: string;
  country: string;
  created_at: string; // ISO date string (e.g., "2025-11-09T12:00:00Z")
  profile: number; // profile ID (ForeignKey reference)
}

// Profile type
export interface Profile {
  id: number;
  user: number; // user ID (ForeignKey reference)
  phone_num: string | null;
  country: string;
  bio: string | null;
  gender: 'male' | 'female' | 'other'; // depends on your GENDER_CHOICES
  birth_date: string | null; // ISO date string or null
  profile_image: string | null; // URL of the image (from Cloudinary)
  profile_imag: string | null; // custom field for image URL
  addresses: Address[]; // list of address objects
}
export interface Only_Profile {
  phone_num: string | null;
  first_name: string;
  last_name: string;
  country: string;
  bio: string | null;
  gender: 'male' | 'female' | 'others'; // depends on your GENDER_CHOICES
  birth_date: string | null; // ISO date string or null
}

export const profileExample: Profile = {
  id: 1,
  user: 15,
  phone_num: '+8801712345678',
  country: 'Bangladesh',
  bio: 'Full-stack web developer & tech enthusiast.',
  gender: 'male',
  birth_date: '2000-07-15',
  profile_image:
    'https://res.cloudinary.com/demo/image/upload/v1731122334/profile/image/mostakin.jpg',
  profile_imag:
    'https://res.cloudinary.com/demo/image/upload/v1731122334/profile/image/mostakin.jpg',
  addresses: [
    {
      id: 101,
      street: 'House 12, Road 8, Dhanmondi',
      city: 'Dhaka',
      country: 'Bangladesh',
      created_at: '2025-10-15T09:45:00Z',
      profile: 1,
    },
    {
      id: 102,
      street: '32/A Green Road',
      city: 'Dhaka',
      country: 'Bangladesh',
      created_at: '2025-09-28T11:30:00Z',
      profile: 1,
    },
    {
      id: 103,
      street: 'Beradanga, Nilphamari',
      city: 'Nilphamari',
      country: 'Bangladesh',
      created_at: '2025-08-10T07:20:00Z',
      profile: 1,
    },
  ],
};
