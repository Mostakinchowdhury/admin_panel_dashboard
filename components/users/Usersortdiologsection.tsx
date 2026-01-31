import useOrdercontext from '@/app/context/Orderpage';
import React from 'react';
import { IconType } from 'react-icons';
import { MdOutlineDone } from 'react-icons/md';
import { Button } from '../ui/button';
import useUsercontext from '@/app/context/Userpage';

const Usersortdiologsection = ({
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
  const { user_sortopen, user_setsortopen, user_sortby, user_setsortby } =
    useUsercontext();
  return (
    <div
      className={`${
        className ? className : ''
      } relative flex justify-center items-center cursor-pointer`}
      onClick={() => user_setsortopen(!user_sortopen)}
    >
      {typeof Icon === 'function' ? (
        <Icon className={`${classNamei ? classNamei : ''}`} />
      ) : (
        Icon
      )}
      {/* diolog */}
      <ul
        className={`absolute mt-4 top-full right-0 bg-graybg p-2 rounded-lg flex flex-col gap-2.5 shadow-md z-20 dsdb ${
          user_sortopen ? 'flex' : 'hidden'
        }`}
      >
        <li className="">
          <Button
            variant={'ghost'}
            className="hover:bg-primary w-full hover:text-white text-left !px-2 justify-between"
            onClick={() => user_setsortby('dt')}
          >
            <p>Sort by Date</p>
            {user_sortby === 'dt' && <MdOutlineDone className="block" />}
          </Button>
        </li>
        <li>
          <Button
            variant={'ghost'}
            className="hover:bg-primary w-full hover:text-white text-left !px-2 justify-between"
            onClick={() => user_setsortby('ua')}
          >
            <p> Sort by Updated at</p>

            {user_sortby === 'ua' && <MdOutlineDone className="block" />}
          </Button>
        </li>
        <li className="flex items-center gap-2">
          <Button
            variant={'ghost'}
            className="hover:bg-primary w-full hover:text-white text-left !px-2 justify-between"
            onClick={() => user_setsortby('df')}
          >
            <p>Sort by Deafault</p>
            {user_sortby === 'df' && <MdOutlineDone className="block" />}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Usersortdiologsection;
