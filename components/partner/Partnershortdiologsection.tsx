'use client';
import usePartnercontext from '@/app/context/partner';
import React from 'react';
import { IconType } from 'react-icons';
import { MdOutlineDone } from 'react-icons/md';
import { Button } from '../ui/button';

const Partner_Sortdiologsection = ({
  className,
  classNamei,
  isdeafalt,
  icon: Icon,
}: {
  className?: string;
  classNamei?: string;
  isdeafalt?: boolean;
  icon: React.ReactNode | IconType;
}) => {
  const {
    partner_sortopen,
    partner_setsortopen,
    partner_sortby,
    partner_setsortby,
  } = usePartnercontext();
  return (
    <div
      className={`${
        className ? className : ''
      } relative flex justify-center items-center cursor-pointer`}
      onClick={() => partner_setsortopen(!partner_sortopen)}
    >
      {typeof Icon === 'function' ? (
        <Icon className={`${classNamei ? classNamei : ''}`} />
      ) : (
        Icon
      )}
      {/* diolog */}
      <ul
        className={`absolute mt-4 top-full right-0 bg-graybg p-2 rounded-lg flex flex-col gap-2.5 shadow-md z-20 dsdb ${
          partner_sortopen ? 'flex' : 'hidden'
        }`}
      >
        <li className="">
          <Button
            variant={'ghost'}
            className="hover:bg-primary w-full hover:text-white text-left !px-2 justify-between"
            onClick={() => partner_setsortby('dt')}
          >
            <p>Sort by Date</p>
            {partner_sortby === 'dt' && <MdOutlineDone className="block" />}
          </Button>
        </li>
        <li>
          <Button
            variant={'ghost'}
            className="hover:bg-primary w-full hover:text-white text-left !px-2 justify-between"
            onClick={() => partner_setsortby('ua')}
          >
            <p> Sort by Updated date</p>

            {partner_sortby === 'ua' && <MdOutlineDone className="block" />}
          </Button>
        </li>
        <li className="flex items-center gap-2">
          <Button
            variant={'ghost'}
            className="hover:bg-primary w-full hover:text-white text-left !px-2 justify-between"
            onClick={() => partner_setsortby('df')}
          >
            <p>Sort by Deafault</p>
            {partner_sortby === 'df' && <MdOutlineDone className="block" />}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Partner_Sortdiologsection;
