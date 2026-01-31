// যদি পুরো অ্যারে টাইপ করতে চাও:

export interface Order {
  id: number;
  user: number;
  user_email: string;
  cart: number;
  status:
    | 'PENDING'
    | 'PAIDANDPROCESSING'
    | 'CASHANDPROCESSING'
    | 'DELIVERED'
    | 'CANCELLED';
  address: string;
  phone: string;
  ordered_at: string; // ISO date string
  total_amount: number;
  orderitems_string: string | null;
  amount: string; // decimal string;
  rider: string | null;
}

export interface PaginatedOrderResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Order[];
  page_size: number;
  page: number;
  total_pages: number;
}
export type Orders = Order[];
