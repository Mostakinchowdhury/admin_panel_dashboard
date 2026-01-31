'use client';
import useOrdercontext from '@/app/context/Orderpage';
import React from 'react';
import { IconType } from 'react-icons';
import { MdOutlineDone } from 'react-icons/md';
import { Button } from '../ui/button';

const Sortdiologsection = ({
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
  const { sortopen, setsortopen, sortby, setsortby } = useOrdercontext();
  return (
    <Button
      className={`${
        className ? className : ''
      } relative flex justify-center items-center`}
      variant={isdeafalt ? 'default' : 'ghost'}
      onClick={() => setsortopen(!sortopen)}
    >
      {typeof Icon === 'function' ? (
        <Icon className={`${classNamei ? classNamei : ''}`} />
      ) : (
        Icon
      )}
      {/* diolog */}
      <ul
        className={`absolute mt-4 top-full right-0 bg-graybg p-2 rounded-lg flex flex-col gap-2.5 shadow-md z-20 dsdb ${
          sortopen ? 'flex' : 'hidden'
        }`}
      >
        <li className="">
          <Button
            variant={'ghost'}
            className="hover:bg-primary w-full hover:text-white text-left !px-2 justify-between"
            onClick={() => setsortby('ua')}
          >
            <p>Sort by Updated</p>
            {sortby === 'ua' && <MdOutlineDone className="block" />}
          </Button>
        </li>
        <li>
          <Button
            variant={'ghost'}
            className="hover:bg-primary w-full hover:text-white text-left !px-2 justify-between"
            onClick={() => setsortby('pr')}
          >
            <p> Sort by Price</p>

            {sortby === 'pr' && <MdOutlineDone className="block" />}
          </Button>
        </li>
        <li className="flex items-center gap-2">
          <Button
            variant={'ghost'}
            className="hover:bg-primary w-full hover:text-white text-left !px-2 justify-between"
            onClick={() => setsortby('df')}
          >
            <p>Sort by Deafault</p>
            {sortby === 'df' && <MdOutlineDone className="block" />}
          </Button>
        </li>
      </ul>
    </Button>
  );
};

export default Sortdiologsection;
