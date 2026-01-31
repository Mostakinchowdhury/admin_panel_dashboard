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
  useRef,
  useState,
} from 'react';
import { MdCreate } from 'react-icons/md';
import { GiExitDoor } from 'react-icons/gi';
import api from '@/app/utils/api';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ImageIcon } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Selectsuper } from './Selectsuper';
import { Supercategory } from '@/app/type/supercate';

export function Addsupercategorydiologwrap({
  setloading,
  handlefetch,
  children,
}: {
  setloading: Dispatch<SetStateAction<boolean>>;
  handlefetch: () => void | Promise<void>;
  children: ReactNode;
}) {
  const [form, setform] = useState<{
    title: string;
  }>({
    title: '',
  });
  const closeref = useRef<HTMLButtonElement>(null);
  // =======================handlechange====================\

  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setform({ ...form, [name]: value });
  };
  // const { role } = useglobal() ?? {};
  // =================== handle submit =======================
  const handlesubmit = async (e: FormEvent) => {
    e.preventDefault();
    closeref.current?.click();
    setloading(true);
    try {
      await api.post(`api/supercategory/`, form);
      handlefetch();
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
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handlesubmit}>
          <DialogHeader>
            <DialogTitle className="text-center font-bold">
              Add a new Super category
            </DialogTitle>
            <DialogDescription>
              Fill all field and click Create button when you are done!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 my-3">
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
              <MdCreate />
              <span> Create</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function Addcategorydiologwrap({
  setloading,
  handlefetch,
  children,
  datas,
}: {
  setloading: Dispatch<SetStateAction<boolean>>;
  handlefetch: () => void;
  children: ReactNode;
  datas: Supercategory[];
}) {
  const [form, setform] = useState<{
    name: string;
    description: string;
    image?: File | null;
  }>({
    name: '',
    description: '',
    image: null,
  });
  const [value, setvalue] = useState<string>('');
  const closeref = useRef<HTMLButtonElement>(null);
  // =======================handlechange====================\

  const handlechange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name == 'image' && e.target instanceof HTMLInputElement) {
      value = e.target.files?.[0] as any;
    }
    setform({ ...form, [name]: value });
  };
  // const { role } = useglobal() ?? {};
  // =================== handle submit =======================
  const handlesubmit = async (e: FormEvent) => {
    e.preventDefault();
    closeref.current?.click();
    setloading(true);
    if (!value) {
      toast.error('Supercategory empty not allowed');
      setloading(false);
      return;
    }
    try {
      const myform = new FormData();
      myform.append('name', form.name);
      myform.append('description', form.description);
      myform.append('supercategory', value);
      if (form.image) {
        myform.append('image', form.image);
      }
      await api.post(`api/categories/`, myform, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      handlefetch();
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
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handlesubmit}>
          <DialogHeader>
            <DialogTitle className="text-center font-bold">
              Add a new Super category
            </DialogTitle>
            <DialogDescription>
              Fill all field and click Create button when you are done!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3 my-2">
              <Input
                onChange={handlechange}
                value={form.name}
                name="name"
                required
                placeholder="Write category name"
              />
            </div>
            <div className="grid gap-3 my-2">
              <Selectsuper
                data={datas}
                plac="Select a Supercategory"
                value={value}
                setvalue={setvalue}
              />
            </div>

            <div className="grid gap-3 my-2">
              <Textarea
                onChange={handlechange}
                value={form.description}
                required
                name="description"
                placeholder="Write category description"
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
                required
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
              <MdCreate />
              <span> Create</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
