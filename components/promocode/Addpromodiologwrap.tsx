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
import { Checkbox } from '../ui/checkbox';

export function Addpromodiologwrap({
  setloading,
  handlefetch,
  children,
}: {
  setloading: Dispatch<SetStateAction<boolean>>;
  handlefetch: () => void;
  children: ReactNode;
}) {
  const [form, setform] = useState<{
    code: string;
    discount_percent: number;
    max_uses: number;
    valid_to: Date | string;
    active: boolean;
    max_uses_per_user: number;
  }>({
    code: '',
    max_uses: 1,
    discount_percent: 2,
    active: true,
    max_uses_per_user: 1,
    valid_to: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
  });
  const closeref = useRef<HTMLButtonElement>(null);

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
      await api.post(`api/promocodes/`, form);
      handlefetch();
      toast.success('Promo code created successfully');
    } catch (e: unknown) {
      const apiError = (
        e as { response?: { data?: { detail?: string; message?: string } } }
      )?.response?.data;
      const message =
        apiError?.detail ||
        apiError?.message ||
        (Array.isArray(apiError)
          ? apiError[0]
          : Object.values(apiError || {}).flat()[0]) ||
        'Failed to Create Promo Code';
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
              Add a new Promo Code
            </DialogTitle>
            <DialogDescription>
              Fill all fields and click Create button when you are done!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 my-3">
            <div className="grid gap-2">
              <Label htmlFor="code">Promo Code</Label>
              <Input
                id="code"
                onChange={handlechange}
                value={form.code}
                name="code"
                required
                placeholder="e.g. SAVE20"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label htmlFor="discount_percent">Discount (%)</Label>
                <Input
                  id="discount_percent"
                  type="number"
                  onChange={handlechange}
                  value={form.discount_percent}
                  name="discount_percent"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="valid_to">Valid To</Label>
                <Input
                  id="valid_to"
                  type="date"
                  onChange={handlechange}
                  value={form.valid_to as string}
                  name="valid_to"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label htmlFor="max_uses">
                  Max Uses(999 is a special amount thats mean unlimited)
                </Label>
                <Input
                  id="max_uses"
                  type="number"
                  onChange={handlechange}
                  value={form.max_uses}
                  name="max_uses"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="max_uses_per_user">Max Per User</Label>
                <Input
                  id="max_uses_per_user"
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
                id="active"
                checked={form.active}
                onCheckedChange={(checked: boolean) =>
                  setform({ ...form, active: checked })
                }
              />
              <Label htmlFor="active">Is Active</Label>
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
