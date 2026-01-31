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
import { GrUpdate } from 'react-icons/gr';
import { GiExitDoor } from 'react-icons/gi';
import api from '@/app/utils/api';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Promocode } from '@/app/type/promocode';

export function EditPromodiologwrap({
  setloading,
  handlefetch,
  children,
  data,
  id,
}: {
  setloading: Dispatch<SetStateAction<boolean>>;
  handlefetch: () => void;
  children: ReactNode;
  data: Promocode;
  id: number | string;
}) {
  const [form, setform] = useState<{
    code: string;
    discount_percent: number;
    max_uses: number;
    valid_to: string;
    active: boolean;
    max_uses_per_user: number;
  }>({
    code: data.code,
    discount_percent: data.discount_percent,
    max_uses: data.max_uses,
    valid_to: data.valid_to,
    active: data.active,
    max_uses_per_user: data.max_uses_per_user,
  });
  const closeref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setform({
      code: data.code,
      discount_percent: data.discount_percent,
      max_uses: data.max_uses,
      valid_to: data.valid_to,
      active: data.active,
      max_uses_per_user: data.max_uses_per_user,
    });
  }, [data]);

  const handlechange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    let finalValue: string | number = value;

    if (type === 'number') {
      finalValue = value === '' ? 0 : parseFloat(value);
    }

    setform({ ...form, [name]: finalValue });
  };

  const handlesubmit = async (e: FormEvent) => {
    e.preventDefault();
    closeref.current?.click();
    setloading(true);
    try {
      await api.patch(`api/promocodes/${id}/`, form);
      handlefetch();
      toast.success('Promo code updated successfully');
    } catch (e: unknown) {
      const apiError = (
        e as { response?: { data?: { detail?: string; message?: string } } }
      )?.response?.data;
      const message =
        (apiError as any)?.detail ||
        (apiError as any)?.message ||
        (Array.isArray(apiError)
          ? apiError[0]
          : Object.values((apiError as any) || {}).flat()[0]) ||
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
              Update Promo Code
            </DialogTitle>
            <DialogDescription>
              Update fields and click Update button when you are done!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 my-3">
            <div className="grid gap-2">
              <Label htmlFor="edit-code">Promo Code</Label>
              <Input
                id="edit-code"
                onChange={handlechange}
                value={form.code}
                name="code"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label htmlFor="edit-discount_percent">Discount (%)</Label>
                <Input
                  id="edit-discount_percent"
                  type="number"
                  onChange={handlechange}
                  value={form.discount_percent}
                  name="discount_percent"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-valid_to">Valid To</Label>
                <Input
                  id="edit-valid_to"
                  type="date"
                  onChange={handlechange}
                  value={form.valid_to}
                  name="valid_to"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label htmlFor="edit-max_uses">
                  Max Uses (999 means unlimited)
                </Label>
                <Input
                  id="edit-max_uses"
                  type="number"
                  onChange={handlechange}
                  value={form.max_uses}
                  name="max_uses"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-max_uses_per_user">Max Per User</Label>
                <Input
                  id="edit-max_uses_per_user"
                  type="number"
                  onChange={handlechange}
                  value={form.max_uses_per_user}
                  name="max_uses_per_user"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-active"
                checked={form.active}
                onCheckedChange={(checked: boolean) =>
                  setform({ ...form, active: checked })
                }
              />
              <Label htmlFor="edit-active">Is Active</Label>
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
