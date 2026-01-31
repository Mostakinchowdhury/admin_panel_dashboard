'use client';
import useRidercontext from '@/app/context/Riders';
import React from 'react';
import { IconType } from 'react-icons';
import { MdOutlineDone } from 'react-icons/md';
import { Button } from '../ui/button';

const Rider_Sortdiologsection = ({
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
  const { rider_sortopen, rider_setsortopen, rider_sortby, rider_setsortby } =
    useRidercontext();
  return (
    <Button
      className={`${
        className ? className : ''
      } relative flex justify-center items-center cursor-pointer`}
      variant={isdeafalt ? 'default' : 'ghost'}
      onClick={() => rider_setsortopen(!rider_sortopen)}
    >
      {typeof Icon === 'function' ? (
        <Icon className={`${classNamei ? classNamei : ''}`} />
      ) : (
        Icon
      )}
      {/* diolog */}
      <ul
        className={`absolute mt-4 top-full right-0 bg-graybg p-2 rounded-lg flex flex-col gap-2.5 shadow-md z-20 dsdb ${
          rider_sortopen ? 'flex' : 'hidden'
        }`}
      >
        <li className="">
          <Button
            variant={'ghost'}
            className="hover:bg-primary w-full hover:text-white text-left !px-2 justify-between"
            onClick={() => rider_setsortby('dt')}
          >
            <p>Sort by Date</p>
            {rider_sortby === 'dt' && <MdOutlineDone className="block" />}
          </Button>
        </li>
        <li>
          <Button
            variant={'ghost'}
            className="hover:bg-primary w-full hover:text-white text-left !px-2 justify-between"
            onClick={() => rider_setsortby('ua')}
          >
            <p> Sort by Updated at</p>

            {rider_sortby === 'ua' && <MdOutlineDone className="block" />}
          </Button>
        </li>
        <li className="flex items-center gap-2">
          <Button
            variant={'ghost'}
            className="hover:bg-primary w-full hover:text-white text-left !px-2 justify-between"
            onClick={() => rider_setsortby('df')}
          >
            <p>Sort by Deafault</p>
            {rider_sortby === 'df' && <MdOutlineDone className="block" />}
          </Button>
        </li>
      </ul>
    </Button>
  );
};

export default Rider_Sortdiologsection;
