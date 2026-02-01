import { toast } from 'sonner';
import api from '../utils/api';
import { Supercategory } from '../type/supercate';
import { Category } from '../type/category';
import { Dispatch, SetStateAction } from 'react';

export async function fetchosupercategories({
  setloading,
  setsupercategories,
  search = '',
}: {
  setloading: Dispatch<SetStateAction<boolean>>;
  setsupercategories: Dispatch<SetStateAction<Supercategory[]>>;
  search?: string;
}) {
  setloading(true);
  search = search.trim();
  const prm: {
    search: string;
  } = { search };
  try {
    const res = await api.get<Supercategory[]>('/api/supercategory/', {
      params: prm,
    });

    setsupercategories(res.data);

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

export async function fetchcategories({
  setloading,
  setcategories,
  search = '',
}: {
  setloading: Dispatch<SetStateAction<boolean>>;
  setcategories: Dispatch<SetStateAction<Category[]>>;
  search?: string;
}) {
  setloading(true);
  search = search.trim();
  const prm: {
    search: string;
  } = { search };
  try {
    const res = await api.get<Category[]>('/api/categories/', {
      params: prm,
    });

    setcategories(res.data);

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
