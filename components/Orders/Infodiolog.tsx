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

import { FaSquarePhone } from 'react-icons/fa6';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent, ReactNode, useState } from 'react';
import { ord } from './Orderrow';
import { Order } from '@/app/type/orders';
import { MdEmail, MdInventory, MdOutlineDateRange } from 'react-icons/md';
import { GrStatusInfoSmall } from 'react-icons/gr';
import { FaMoneyCheckAlt, FaRegAddressCard } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { TbBikeFilled } from 'react-icons/tb';

export function Orderinfodiologwrap({
  id,
  children,
  order,
}: {
  id: number | string;
  children: ReactNode;
  order: Order;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center font-bold">
            Detail of Order id: {id}
          </DialogTitle>
          <DialogDescription>
            View order details here. Click Exit when you are done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          {/* customer email */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <MdEmail />
              <h3 className="manrope font-bold">Customer Email :</h3>
            </div>
            <h3>{order.user_email}</h3>
          </div>
          {/* status */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <GrStatusInfoSmall />
              <h3 className="manrope font-bold">Status :</h3>
            </div>
            <h3>{order.status}</h3>
          </div>
          {/* adress */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <FaRegAddressCard />
              <h3 className="manrope font-bold">Order Address :</h3>
            </div>
            <h3>{order.address}</h3>
          </div>
          {/* phone */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <FaSquarePhone />
              <h3 className="manrope font-bold">Phone Number :</h3>
            </div>
            <h3>{order.phone}</h3>
          </div>
          {/* order date */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <MdOutlineDateRange />
              <h3 className="manrope font-bold">Order Date :</h3>
            </div>
            <h3>
              {new Date(order.ordered_at).toLocaleString('us', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
              })}
            </h3>
          </div>
          {/* total_amount */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <GiMoneyStack />
              <h3 className="manrope font-bold">total_amount :</h3>
            </div>
            <h3>{order.total_amount}</h3>
          </div>
          {/* orderitems_string */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <MdInventory />
              <h3 className="manrope font-bold">Sale price :</h3>
            </div>
            <h3>{order.orderitems_string}</h3>
          </div>
          {/* amount */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <FaMoneyCheckAlt />
              <h3 className="manrope font-bold">Sale price :</h3>
            </div>

            <h3>{order.amount}</h3>
          </div>
          {/* rider */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <TbBikeFilled />
              <h3 className="manrope font-bold">Rider :</h3>
            </div>
            <h3>{order.rider || 'Dayfey'}</h3>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="default">Exit</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
