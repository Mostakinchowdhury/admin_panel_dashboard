import { toast } from 'sonner';
import api from '../utils/api';
import { PaginatedUsersResponse, User } from '../type/user';
import { Dispatch, SetStateAction } from 'react';

export async function fetchuser({
  setloading,
  setusers,
  settotalpages,
  setcount,
  status = 'All',
  page = 1,
  search = '',
  sortby = 'df',
}: {
  setloading: Dispatch<SetStateAction<boolean>>;
  setusers: Dispatch<SetStateAction<User[]>>;
  settotalpages: Dispatch<SetStateAction<number>>;
  setcount: Dispatch<SetStateAction<number>>;
  status?: string;
  page?: number;
  search?: string;
  sortby?: string;
}) {
  setloading(true);
  search = search.trim();
  const prm: {
    page: number;
    search: string;
    role?: string;
    ordering?: string;
  } = { page, search };
  if (status != 'All') {
    prm.role = status;
  }
  if (sortby != 'df') {
    prm.ordering = `${sortby == 'dt' ? 'created_at' : '-updated_at'}`;
  }
  try {
    const res = await api.get<PaginatedUsersResponse>('/mam/alluser', {
      params: prm,
    });

    setusers(res.data.results);
    settotalpages(res.data.total_pages);
    setcount(res.data.count);

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
