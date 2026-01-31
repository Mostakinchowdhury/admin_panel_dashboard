'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Dispatch, ReactNode, SetStateAction } from 'react';
import { MdDelete } from 'react-icons/md';
import { GiExitDoor } from 'react-icons/gi';
import api from '@/app/utils/api';
import { toast } from 'sonner';

export function Deletediologwrap({
  setloading,
  handlefetch,
  id,
  children,
  query,
  model,
}: {
  id: number | string;
  children: ReactNode;
  query: string;
  model: string;
  setloading: Dispatch<SetStateAction<boolean>>;
  handlefetch: () => Promise<void>;
}) {
  const handledelete = async () => {
    setloading(true);
    const inapi = !query.includes('/');
    try {
      await api.delete(inapi ? `api/${query}/${id}/` : `${query}/${id}/`);
      handlefetch();
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
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center font-bold">
            Delete of {model} id: {id}
          </DialogTitle>
          <DialogDescription>
            Are You sure you want to delete this {model}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              <GiExitDoor />
              <span>Exit</span>
            </Button>
          </DialogClose>
          <Button
            variant="default"
            onClick={handledelete}
            className="bg-red-600 hover:bg-red-800 text-white font-bold flex items-center gap-1"
          >
            <MdDelete />
            <span> Delete</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
