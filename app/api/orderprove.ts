import { toast } from 'sonner';
import api from '../utils/api';
import { OrderProof } from '../type/orderprove';
import { Dispatch, SetStateAction } from 'react';

export async function fetchorderprove({
  setloading,
  setordersprov,
  status = 'All',
  search = '',
}: {
  setloading: Dispatch<SetStateAction<boolean>>;
  setordersprov: Dispatch<SetStateAction<OrderProof[]>>;
  status?: string;
  search?: string;
}) {
  setloading(true);
  search = search.trim();
  const prm: {
    search: string;
    status?: string;
  } = { search };
  if (status != 'All') {
    prm.status = status;
  }
  try {
    const res = await api.get<OrderProof[]>('/api/order-proved', {
      params: prm,
    });

    setordersprov(res.data);

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
