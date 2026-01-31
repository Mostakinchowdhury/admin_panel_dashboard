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

import { ReactNode } from 'react';
import { Order } from '@/app/type/orders';
import { MdDelete } from 'react-icons/md';
import { GiExitDoor } from 'react-icons/gi';

export function Videodiologwrap({
  src,
  children,
}: {
  src: string;
  children: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex justify-center">
          <video src={src} controls muted className="object-cover"></video>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              <GiExitDoor />
              <span>Exit</span>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
