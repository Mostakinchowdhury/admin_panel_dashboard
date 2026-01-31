import { toast } from 'sonner';
import { PaginatedOrderResponse } from '../type/orders';
import api from '../utils/api';

export async function fetchorders({
  setloading,
  setorders,
  settotalpages,
  status = 'All',
  page = 1,
  search = '',
  sortby = 'df',
}) {
  setloading(true);
  search = search.trim();
  const prm: {
    page: number;
    search: string;
    status?: string;
    ordering?: string;
  } = { page, search };
  if (status != 'All') {
    prm.status = status;
  }
  if (sortby != 'df') {
    prm.ordering = `-${sortby == 'pr' ? 'amount' : 'updated_at'}`;
  }
  try {
    const res = await api.get<PaginatedOrderResponse>('/api/orders', {
      params: prm,
    });

    setorders(res.data.results);
    settotalpages(res.data.total_pages);

    return res.data;
  } catch (e: any) {
    const apiError = e?.response?.data;

    const message =
      apiError?.detail ||
      apiError?.message ||
      (Array.isArray(apiError)
        ? apiError[0]
        : Object.values(apiError || {}).flat()[0]) ||
      'Something went wrong';

    toast.error(message);
  } finally {
    setloading(false);
  }
}
