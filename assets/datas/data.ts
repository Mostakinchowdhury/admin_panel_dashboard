export const arechartdata: {
  month: string;
  expense: number;
  profit: number;
}[] = [
  { month: 'January', expense: 5000, profit: 2000 },
  { month: 'February', expense: 4000, profit: 2500 },
  { month: 'March', expense: 10200, profit: 4995 },
  { month: 'April', expense: 13470, profit: 9210 },
  { month: 'May', expense: 4216, profit: 2654 },
  { month: 'June', expense: 9872, profit: 4215 },
];

//   (
//   ('PENDING', 'Pending'),
//   ('PAIDANDPROCESSING', 'Paid and Processing'),
//   ('CASHANDPROCESSING', 'Cashon and Processing'),
//   ('DELIVERED', 'Delivered'),
//   ('CANCELLED', 'Cancelled')
// )
export const tabscom: {
  id: number;
  h3: string;
  state: string;
}[] = [
  {
    id: 1,
    h3: 'All',
    state: 'all',
  },
  {
    id: 2,
    h3: 'Paid and Processing',
    state: 'pap',
  },
  {
    id: 3,
    h3: 'Cashon and Processing',
    state: 'cap',
  },
  {
    id: 4,
    h3: 'Delivered',
    state: 'dlv',
  },
  {
    id: 5,
    h3: 'Cancelled',
    state: 'cnc',
  },
];

export const orders: {
  id: string;
  date: string;
  customer: string;
  payment: string;
  total: string;
  status: 'Pending' | 'Processing' | 'Delivered' | 'Cancelled';
  items: number;
  rider: string;
}[] = Array.from({ length: 100 }, (_, i) => ({
  id: `ORD-${1000 + i}`,
  date: new Date(
    2025,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1,
  )
    .toISOString()
    .split('T')[0],
  customer: [
    'Monira Chowdhury',
    'Aminul Islam',
    'Sadia Khatun',
    'Rahim Uddin',
    'Mostakin Chowdhury',
  ][Math.floor(Math.random() * 5)],
  payment: ['Pending', 'Cash', 'Success'][Math.floor(Math.random() * 3)],
  total: (Math.random() * 5000 + 500).toFixed(2),
  status: (['Pending', 'Processing', 'Delivered', 'Cancelled'] as const)[
    Math.floor(Math.random() * 4)
  ],
  items: Math.floor(Math.random() * 6) + 1,
  rider: ['Rafi', 'Naim', 'Sumon', 'Shanto', 'Hasib'][
    Math.floor(Math.random() * 5)
  ],
}));
