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
import { Order } from '@/app/type/orders';
import { MdCreate, MdDelete } from 'react-icons/md';
import { GiExitDoor } from 'react-icons/gi';
import api from '@/app/utils/api';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { VideoIcon, Flag, Image, ImageIcon } from 'lucide-react';
import useglobal from '@/app/context/Globalcontex';

export function Addprovdiologwrap({
  setloading,
  handlefetch,
  children,
}: {
  children: ReactNode;
}) {
  const [form, setform] = useState<{
    order: number | string;
    proved_image: File | null;
    proved_video: File | null;
  }>({
    order: '',
    proved_image: null,
    proved_video: null,
  });
  const closeref = useRef<HTMLButtonElement>(null);

  // =======================handlechange====================\

  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name == 'proved_image' || name == 'proved_video') {
      value = e.target?.files[0];
    }
    setform({ ...form, [name]: value });
  };
  const { role } = useglobal() ?? {};
  // =================== handle add =======================
  const handleadd = async (e: FormEvent) => {
    e.preventDefault();
    closeref.current?.click();
    setloading(true);
    if ((form.proved_video?.size || 0) > 200 * 1024 * 1024) {
      toast.error('Sorry, select a video under 200MB');
      return;
    }
    if ((form.proved_image?.size || 0) > 30 * 1024 * 1024) {
      toast.error('Sorry, choose an image under 30MB');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('order', form.order.toString());
      if (form.proved_image) {
        formData.append('proved_image', form.proved_image);
      }
      if (form.proved_video) {
        formData.append('proved_video', form.proved_video);
      }
      await api.post('api/order-proved/', formData, {
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
        <form onSubmit={handleadd}>
          <DialogHeader>
            <DialogTitle className="text-center font-bold">
              Add a new Order prove
            </DialogTitle>
            <DialogDescription>
              Fill all field and click Create button when you are done!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="order">Order Id</Label>
              <Input
                id="order"
                type="text"
                name="order"
                value={form.order}
                onChange={handlechange}
              />
            </div>
            <div className="grid gap-3">
              <Label
                htmlFor="proved_image"
                className="cursor-pointer flex items-center"
              >
                <ImageIcon />
                <span>Upload Proved Image</span>
              </Label>
              <Input
                id="proved_image"
                name="proved_image"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handlechange}
              />
              <p className="text-sm text-gray-500">
                {form.proved_image?.name || 'No image selected'}
              </p>
            </div>
            <div className="grid gap-3">
              <Label
                htmlFor="proved_video"
                className="flex items-center cursor-pointer"
              >
                <VideoIcon />
                <span>Upload Proved Video</span>
              </Label>
              <Input
                id="proved_video"
                name="proved_video"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handlechange}
              />

              <p className="text-sm text-gray-500 my-2.5">
                {form.proved_video?.name || 'No video selected'}
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
