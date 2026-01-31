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
import { SiAnytype } from 'react-icons/si';
import { FaSquarePhone } from 'react-icons/fa6';
import {
  MdDriveFileRenameOutline,
  MdEmail,
  MdOutlineDateRange,
} from 'react-icons/md';
import { GrStatusInfoSmall } from 'react-icons/gr';
import Image from 'next/image';
import { Shop } from '@/app/type/Partners';
import logo from '@/assets/images/favicon-smashing-magazine.png';
import { LucideFileText } from 'lucide-react';
import { CgNametag, CgWebsite } from 'react-icons/cg';
import { ReactNode } from 'react';
import { FaRegAddressCard } from 'react-icons/fa';

export function Partnerinfodiologwrap({
  id,
  children,
  partner,
}: {
  id: number | string;
  children: ReactNode;
  partner: Shop;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] scroll-custom overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center font-bold">
            Detail of pertners id: {id}
          </DialogTitle>
          <DialogDescription>
            View pertners details here. Click Exit when you are done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="flex justify-center items-center gap-3">
            <Image
              alt="buesness logo"
              width={60}
              height={60}
              className="object-cover size-20 aspect-square rounded-full"
              src={partner.buesness_logo_url || logo}
            />
            <Image
              alt="partner photo"
              width={60}
              height={60}
              className="object-cover size-20 aspect-square rounded-full"
              src={partner.owner_photo_url || img}
            />
          </div>
          {/* perner name */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <MdDriveFileRenameOutline />
              <h3 className="manrope font-bold">Rider Name :</h3>
            </div>
            <h3>{partner.name}</h3>
          </div>
          {/* business name */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <CgNametag />
              <h3 className="manrope font-bold">Business Name :</h3>
            </div>
            <h3>{partner.business_name}</h3>
          </div>
          {/* business type */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <SiAnytype />
              <h3 className="manrope font-bold">business Type :</h3>
            </div>
            <h3>{partner.business_type}</h3>
          </div>
          {/* website */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <CgWebsite />
              <h3 className="manrope font-bold">Website :</h3>
            </div>
            <a href={partner.website} target="_blank">
              {partner.website}
            </a>
          </div>
          {/* description */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <LucideFileText />
              <h3 className="manrope font-bold">Description :</h3>
            </div>
            <article>{partner.description}</article>
          </div>
          {/* email */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <MdEmail />
              <h3 className="manrope font-bold">Rider Email :</h3>
            </div>
            <h3>{partner.email}</h3>
          </div>
          {/* phone */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <FaSquarePhone />
              <h3 className="manrope font-bold">Phone Number :</h3>
            </div>
            <h3>{partner.phone_num}</h3>
          </div>
          {/*  adress */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <FaRegAddressCard />
              <h3 className="manrope font-bold">Buesness Address :</h3>
            </div>
            <h3>{partner.business_address}</h3>
          </div>
          {/* status */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <GrStatusInfoSmall />
              <h3 className="manrope font-bold"> Status :</h3>
            </div>
            <h3>{partner.status}</h3>
          </div>

          {/* created date */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <MdOutlineDateRange />
              <h3 className="manrope font-bold">Create Date :</h3>
            </div>
            <h3>
              {new Date(partner.created_at).toLocaleString('us', {
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
              {new Date(partner.updated_at).toLocaleString('us', {
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
