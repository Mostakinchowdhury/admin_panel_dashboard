// Category type
export interface Category {
  id: number;
  name: string;
  description: string;
  image: string | null;
  image_url: string | null;
  authorname: string | null;
  supercategory_name: string | null;
}

// Supercategory type
export interface Supercategory {
  id: number;
  category: Category[];
  title: string;
  author: string | null;
  authorname: string | null;
}

// Full response type (array of Supercategory)
export type SupercategoryResponse = Supercategory[];
