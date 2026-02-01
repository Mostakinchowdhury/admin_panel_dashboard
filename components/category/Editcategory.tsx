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

import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Order } from '@/app/type/orders';
import { MdCreate, MdDelete } from 'react-icons/md';
import { GiExitDoor } from 'react-icons/gi';
import api from '@/app/utils/api';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { VideoIcon, Flag, Image, ImageIcon } from 'lucide-react';
import useglobal from '@/app/context/Globalcontex';
import { GrUpdate } from 'react-icons/gr';
import { Supercategory } from '@/app/type/supercate';
import { Category } from '@/app/type/category';
import { Textarea } from '../ui/textarea';

export function EditsuperCatediologwrap({
  setloading,
  handlefetch,
  children,
  data,
  id,
}: {
  setloading: Dispatch<SetStateAction<boolean>>;
  handlefetch: () => void | Promise<void>;
  data: Supercategory;
  id: number | string;
  children: ReactNode;
}) {
  const [form, setform] = useState<{
    title: string;
  }>({
    title: data.title,
  });
  const closeref = useRef<HTMLButtonElement>(null);
  // =============== upadted per rerender ========================

  useEffect(() => {
    setform({ title: data.title });
  }, [data]);
  // =======================handlechange====================\

  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setform({ ...form, [name]: value });
  };
  // const { role } = useglobal() ?? {};
  // =================== handle add =======================
  const handlesubmit = async (e: FormEvent) => {
    e.preventDefault();
    closeref.current?.click();
    setloading(true);
    try {
      await api.patch(`api/supercategory/${id}/`, form);
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
        <form onSubmit={handlesubmit}>
          <DialogHeader>
            <DialogTitle className="text-center font-bold">
              Update a new Supercategory
            </DialogTitle>
            <DialogDescription>
              Fill all field and click Update button when you are done!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 my-2.5">
            <Input onChange={handlechange} value={form.title} name="title" />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" ref={closeref}>
                <GiExitDoor />
                <span>Exit</span>
              </Button>
            </DialogClose>
            <Button
              variant="default"
              type="submit"
              className="bg-amber-600 hover:bg-amber-800 text-white font-bold flex items-center gap-1"
            >
              <GrUpdate />
              <span> Update</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ====================== Edit category ======================

export function EditCategorydiologwrap({
  setloading,
  handlefetch,
  children,
  data,
  id,
}: {
  setloading: Dispatch<SetStateAction<boolean>>;
  handlefetch: () => void | Promise<void>;
  data: Category;
  id: number | string;
  children: ReactNode;
}) {
  const [form, setform] = useState<{
    name: string;
    description: string;
    image?: File | null;
  }>({
    name: data.name,
    description: data.description,
    image: null,
  });
  const closeref = useRef<HTMLButtonElement>(null);
  // ==================== update when rerender ===============
  useEffect(() => {
    setform({ name: data.name, description: data.description, image: null });
  }, [data]);
  // =======================handlechange====================\

  const handlechange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name;
    let value: string | File = e.target.value;
    if (name == 'image' && e.target instanceof HTMLInputElement) {
      value = e.target.files?.[0] as File;
    }
    setform({ ...form, [name]: value });
  };
  // const { role } = useglobal() ?? {};
  // =================== handle add =======================
  const handlesubmit = async (e: FormEvent) => {
    e.preventDefault();
    closeref.current?.click();
    setloading(true);
    try {
      const myform = new FormData();
      myform.append('name', form.name);
      myform.append('description', form.description);
      if (form.image) {
        myform.append('image', form.image);
      }
      await api.patch(`api/categories/${id}/`, myform, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
        <form onSubmit={handlesubmit}>
          <DialogHeader>
            <DialogTitle className="text-center font-bold">
              Update a new Category
            </DialogTitle>
            <DialogDescription>
              Fill all field and click Update button when you are done!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3 my-2">
              <Input onChange={handlechange} value={form.name} name="name" />
            </div>

            <div className="grid gap-3 my-2">
              <Textarea
                onChange={handlechange}
                value={form.description}
                name="description"
              >
                {form.description}
              </Textarea>
            </div>

            <div className="grid gap-3 my-2">
              <Label
                htmlFor={'image'}
                className="cursor-pointer flex items-center"
              >
                <ImageIcon />
                <span>Upload Category Image *</span>
              </Label>
              <Input
                id="image"
                name="image"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handlechange}
              />
              <p className="text-sm text-gray-500">
                {form.image?.name || 'No image selected'}
              </p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" ref={closeref}>
                <GiExitDoor />
                <span>Exit</span>
              </Button>
            </DialogClose>
            <Button
              variant="default"
              type="submit"
              className="bg-amber-600 hover:bg-amber-800 text-white font-bold flex items-center gap-1"
            >
              <GrUpdate />
              <span> Update</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
