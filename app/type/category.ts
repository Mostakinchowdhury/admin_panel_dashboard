export interface Category {
  id: number;
  name: string;
  description: string;
  image: string | null;
  image_url: string | null;
  authorname: string | null;
  supercategory_name: string | null;
}

// যদি API থেকে array আসে, তাহলে:
export type CategoryApiResponse = Category[];
