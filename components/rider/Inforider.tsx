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
import img from '@/assets/images/image-avatar.webp';

import { FaSquarePhone } from 'react-icons/fa6';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent, ReactNode, useState } from 'react';
import { Order } from '@/app/type/orders';
import {
  MdDriveFileRenameOutline,
  MdEmail,
  MdInventory,
  MdOutlineDateRange,
} from 'react-icons/md';
import { GrStatusInfoSmall } from 'react-icons/gr';
import { FaMoneyCheckAlt, FaRegAddressCard } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { TbBikeFilled } from 'react-icons/tb';
import { Rider } from '@/app/type/Riders';
import { PiAddressBookTabsBold } from 'react-icons/pi';
import Image from 'next/image';

export function Riderinfodiologwrap({
  id,
  children,
  rider,
}: {
  id: number | string;
  children: ReactNode;
  rider: Rider;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center font-bold">
            Detail of Rider id: {id}
          </DialogTitle>
          <DialogDescription>
            View Rider details here. Click Exit when you are done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="flex justify-center items-center">
            <Image
              alt="rider photo"
              width={80}
              height={80}
              className="object-cover size-20 aspect-square rounded-full"
              src={rider.photo_url || img}
            />
          </div>
          {/* rider name */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <MdDriveFileRenameOutline />
              <h3 className="manrope font-bold">Rider Name :</h3>
            </div>
            <h3>{rider.name}</h3>
          </div>
          {/* email */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <MdEmail />
              <h3 className="manrope font-bold">Rider Email :</h3>
            </div>
            <h3>{rider.email}</h3>
          </div>
          {/* phone */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <FaSquarePhone />
              <h3 className="manrope font-bold">Phone Number :</h3>
            </div>
            <h3>{rider.phone_num}</h3>
          </div>
          {/* working adress */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <FaRegAddressCard />
              <h3 className="manrope font-bold">Working Address :</h3>
            </div>
            <h3>{rider.working_area_address}</h3>
          </div>
          {/* permanent adress */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <PiAddressBookTabsBold />
              <h3 className="manrope font-bold"> Permanent Address :</h3>
            </div>
            <h3>{rider.permanent_address}</h3>
          </div>
          {/* status */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <GrStatusInfoSmall />
              <h3 className="manrope font-bold"> Status :</h3>
            </div>
            <h3>{rider.status}</h3>
          </div>

          {/* created date */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <MdOutlineDateRange />
              <h3 className="manrope font-bold">Create Date :</h3>
            </div>
            <h3>
              {new Date(rider.created_at).toLocaleString('us', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
              })}
            </h3>
          </div>
          {/* updated date */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <MdOutlineDateRange />
              <h3 className="manrope font-bold">updated Date :</h3>
            </div>
            <h3>
              {new Date(rider.updated_at).toLocaleString('us', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
              })}
            </h3>
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
