import { toast } from 'sonner';
import api from '../utils/api';
import { Promocode } from '../type/promocode';

import { Dispatch, SetStateAction } from 'react';

export async function fetchpromocodes({
  setloading,
  setpromocodes,
  search = '',
}: {
  setloading: Dispatch<SetStateAction<boolean>>;
  setpromocodes: Dispatch<SetStateAction<Promocode[]>>;
  search?: string;
}) {
  setloading(true);
  search = search.trim();
  const prm: {
    search: string;
  } = { search };
  try {
    const res = await api.get<Promocode[]>('/api/promocodes/', {
      params: prm,
    });

    setpromocodes(res.data);

    return res.data;
  } catch (e: unknown) {
    const apiError = (e as any)?.response?.data;

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
