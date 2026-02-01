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
import {
  FaBirthdayCake,
  FaMoneyCheckAlt,
  FaRegAddressCard,
} from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { TbBikeFilled } from 'react-icons/tb';
import { Rider } from '@/app/type/Riders';
import { PiAddressBookTabsBold } from 'react-icons/pi';
import Image from 'next/image';
import { Shop } from '@/app/type/Partners';
import { partners } from '@/assets/datas/partners';
import Link from 'next/link';
import logo from '@/assets/images/favicon-smashing-magazine.png';
import { Flag, LucideFileText } from 'lucide-react';
import { CgNametag, CgWebsite } from 'react-icons/cg';
import { User } from '@/app/type/user';
import { BsGenderAmbiguous } from 'react-icons/bs';

export function Userinfodiologwrap({
  id,
  children,
  user,
}: {
  id: number | string;
  children: ReactNode;
  user: User;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center font-bold">
            Detail of User id: {id}
          </DialogTitle>
          <DialogDescription>
            View User details here. Click Exit when you are done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="flex justify-center items-center gap-3">
            <Image
              alt="partner photo"
              width={60}
              height={60}
              className="object-cover size-20 aspect-square rounded-full"
              src={(user.profile && user.profile.profile_imag) || img}
            />
          </div>
          {/* user name */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <MdDriveFileRenameOutline />
              <h3 className="manrope font-bold">Rider Name :</h3>
            </div>
            <h3>{user.first_name.concat(' ').concat(user.last_name)}</h3>
          </div>
          {/* Bio */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <LucideFileText />
              <h3 className="manrope font-bold">Bio :</h3>
            </div>
            <article>{(user.profile && user.profile.bio) || 'Not set'}</article>
          </div>
          {/* email */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <MdEmail />
              <h3 className="manrope font-bold">User Email :</h3>
            </div>
            <h3>{user.email}</h3>
          </div>
          {/* phone */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <FaSquarePhone />
              <h3 className="manrope font-bold">Phone Number :</h3>
            </div>
            <h3>{(user.profile && user.profile.phone_num) || 'Not set'}</h3>
          </div>
          {/* birthdate */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <FaBirthdayCake />
              <h3 className="manrope font-bold">Birth Date :</h3>
            </div>
            <h3>
              {user.profile && user.profile.birth_date
                ? new Date(user.profile.birth_date).toLocaleString('us', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  })
                : 'Not set'}
            </h3>
          </div>
          {/* gender */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <BsGenderAmbiguous />
              <h3 className="manrope font-bold">Gender :</h3>
            </div>
            <h3>{(user.profile && user.profile.gender) || 'Not set'}</h3>
          </div>
          {/* country */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <Flag />
              <h3 className="manrope font-bold">Country :</h3>
            </div>
            <h3>{(user.profile && user.profile.country) || 'Not set'}</h3>
          </div>
          {/*  adress */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1">
              {' '}
              <FaRegAddressCard />
              <h3 className="manrope font-bold">Addresses :</h3>
            </div>
            <h3>
              {(user.profile &&
                user.profile.addresses &&
                user.profile.addresses
                  .map(ad => [ad.city, ad.street, ad.country].join(','))
                  .join('\n')) ||
                'Not set'}
            </h3>
          </div>
          {/* Role */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <GrStatusInfoSmall />
              <h3 className="manrope font-bold"> Role :</h3>
            </div>
            <h3>{user.role}</h3>
          </div>

          {/* created date */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {' '}
              <MdOutlineDateRange />
              <h3 className="manrope font-bold">Create Date :</h3>
            </div>
            <h3>
              {new Date(user.created_at).toLocaleString('us', {
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
              {new Date(user.updated_at).toLocaleString('us', {
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
