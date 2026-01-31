import { toast } from 'sonner';
import api from '../utils/api';
import { ShopsResponse } from '../type/Partners';

export async function fetchpartners({
  setloading,
  setpartners,
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
    prm.ordering = `${sortby == 'dt' ? 'created_at' : '-updated_at'}`;
  }
  try {
    const res = await api.get<ShopsResponse>('/api/shops', {
      params: prm,
    });

    setpartners(res.data.results);
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
