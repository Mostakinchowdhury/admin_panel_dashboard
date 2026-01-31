'use client';
import useglobal from '@/app/context/Globalcontex';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { BiSolidCategory, BiSolidReport } from 'react-icons/bi';
import { FaHandshake, FaUserShield } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import {
  MdDashboard,
  MdDirectionsBike,
  MdInventory,
  MdOutlineProductionQuantityLimits,
  MdOutlineSupportAgent,
} from 'react-icons/md';
import { RiListOrdered } from 'react-icons/ri';
import { TbTruckDelivery } from 'react-icons/tb';

const Menubars = ({
  className,
  handlecrossclick,
}: {
  className?: string;
  handlecrossclick: () => void;
}) => {
  const path = usePathname();
  const { role } = useglobal();
  useEffect(() => {
    console.log(`${path} is current path`);
  }, [path]);
  return (
    <nav className={`${className ? className : ''} min-h-0 my-8 box-border`}>
      <ul className="manrope text-xl font-bold flex flex-col gap-2 pl-6 -mr-6 overflow-y-auto overflow-x-hidden h-full scroll-custom">
        {/* Dashboard */}
        {role == 'admin' && (
          <li
            className="flex items-center gap-1 justify-center relative"
            onClick={handlecrossclick}
          >
            <div
              className={`size-10 bg-secondary absolute top-0 right-0
          -translate-y-[15px] translate-x-[20px] rotate-[50deg] ${
            path == '/' ? 'block' : 'hidden'
          }`}
            ></div>
            <div
              className={`size-10 bg-secondary absolute bottom-0 right-0
          translate-y-[15px] translate-x-[20px] rotate-[40deg] ${
            path == '/' ? 'block' : 'hidden'
          }`}
            ></div>
            <Link
              href={'/'}
              className={`${
                path == '/' ? 'bg-secondary text-font1' : 'text-font2'
              } font-bold text-lg w-full h-11 rounded-l-4xl rounded-r-none flex items-center gap-1 pl-[60px]`}
            >
              <MdDashboard />
              <h3>Dashboard</h3>
            </Link>
          </li>
        )}
        {/* Category and supercategory */}
        {(role == 'admin' || role == 'partner') && (
          <li
            className="flex items-center gap-1 justify-center relative"
            onClick={handlecrossclick}
          >
            <div
              className={`size-10 bg-secondary absolute top-0 right-0
          -translate-y-[15px] translate-x-[20px] rotate-[50deg] ${
            path == '/cateandsupcate' ? 'block' : 'hidden'
          }`}
            ></div>
            <div
              className={`size-10 bg-secondary absolute bottom-0 right-0
          translate-y-[15px] translate-x-[20px] rotate-[40deg] ${
            path == '/cateandsupcate' ? 'block' : 'hidden'
          }`}
            ></div>
            <Link
              href={'/cateandsupcate'}
              className={`${
                path == '/cateandsupcate'
                  ? 'bg-secondary text-font1'
                  : 'text-font2'
              } font-bold text-lg w-full h-11 rounded-l-4xl rounded-r-none flex items-center gap-1 pl-[60px]`}
            >
              <BiSolidCategory />
              <h3>Categories</h3>
            </Link>
          </li>
        )}
        {/* Orders */}
        {(role == 'admin' || role == 'rider') && (
          <li
            className="flex items-center gap-1 justify-center relative"
            onClick={handlecrossclick}
          >
            <div
              className={`size-10 bg-secondary absolute top-0 right-0
          -translate-y-[15px] translate-x-[20px] rotate-[50deg] ${
            path == '/orders' ? 'block' : 'hidden'
          }`}
            ></div>
            <div
              className={`size-10 bg-secondary absolute bottom-0 right-0
          translate-y-[15px] translate-x-[20px] rotate-[40deg] ${
            path == '/orders' ? 'block' : 'hidden'
          }`}
            ></div>
            <Link
              href={'/orders'}
              className={`${
                path == '/orders' ? 'bg-secondary text-font1' : 'text-font2'
              } font-bold text-lg w-full h-11 rounded-l-4xl rounded-r-none flex items-center gap-1 pl-[60px]`}
            >
              <TbTruckDelivery />
              <h3>Orders</h3>
            </Link>
          </li>
        )}
        {/* orderprove */}
        {(role == 'admin' || role == 'rider') && (
          <li
            className="flex items-center gap-1 justify-center relative"
            onClick={handlecrossclick}
          >
            <div
              className={`size-10 bg-secondary absolute top-0 right-0
          -translate-y-[15px] translate-x-[20px] rotate-[50deg] ${
            path == '/orderprove' ? 'block' : 'hidden'
          }`}
            ></div>
            <div
              className={`size-10 bg-secondary absolute bottom-0 right-0
          translate-y-[15px] translate-x-[20px] rotate-[40deg] ${
            path == '/orderprove' ? 'block' : 'hidden'
          }`}
            ></div>
            <Link
              href={'/orderprove'}
              className={`${
                path == '/orderprove' ? 'bg-secondary text-font1' : 'text-font2'
              } font-bold text-lg w-full h-11 rounded-l-4xl rounded-r-none flex items-center gap-1 pl-[60px]`}
            >
              <RiListOrdered />
              <h3>Order prove</h3>
            </Link>
          </li>
        )}
        {/* Users */}
        {role == 'admin' && (
          <li
            className="flex items-center gap-1 justify-center relative"
            onClick={handlecrossclick}
          >
            <div
              className={`size-10 bg-secondary absolute top-0 right-0
          -translate-y-[15px] translate-x-[20px] rotate-[50deg] ${
            path == '/users' ? 'block' : 'hidden'
          }`}
            ></div>
            <div
              className={`size-10 bg-secondary absolute bottom-0 right-0
          translate-y-[15px] translate-x-[20px] rotate-[40deg] ${
            path == '/users' ? 'block' : 'hidden'
          }`}
            ></div>
            <Link
              href={'/users'}
              className={`${
                path == '/users' ? 'bg-secondary text-font1' : 'text-font2'
              } font-bold text-lg w-full h-11 rounded-l-4xl rounded-r-none flex items-center gap-1 pl-[60px]`}
            >
              <FaUserShield />
              <h3>Users</h3>
            </Link>
          </li>
        )}
        {/* Products */}
        {(role == 'admin' || role == 'partner') && (
          <li
            className="flex items-center gap-1 justify-center relative"
            onClick={handlecrossclick}
          >
            <div
              className={`size-10 bg-secondary absolute top-0 right-0
          -translate-y-[15px] translate-x-[20px] rotate-[50deg] ${
            path == '/products' ? 'block' : 'hidden'
          }`}
            ></div>
            <div
              className={`size-10 bg-secondary absolute bottom-0 right-0
          translate-y-[15px] translate-x-[20px] rotate-[40deg] ${
            path == '/products' ? 'block' : 'hidden'
          }`}
            ></div>
            <Link
              href={'/products'}
              className={`${
                path == '/products' ? 'bg-secondary text-font1' : 'text-font2'
              } font-bold text-lg w-full h-11 rounded-l-4xl rounded-r-none flex items-center gap-1 pl-[60px]`}
            >
              <MdOutlineProductionQuantityLimits />
              <h3>Products</h3>
            </Link>
          </li>
        )}
        {/* partners */}
        {role == 'admin' && (
          <li
            className="flex items-center gap-1 justify-center relative"
            onClick={handlecrossclick}
          >
            <div
              className={`size-10 bg-secondary absolute top-0 right-0
          -translate-y-[15px] translate-x-[20px] rotate-[50deg] ${
            path == '/partners' ? 'block' : 'hidden'
          }`}
            ></div>
            <div
              className={`size-10 bg-secondary absolute bottom-0 right-0
          translate-y-[15px] translate-x-[20px] rotate-[40deg] ${
            path == '/partners' ? 'block' : 'hidden'
          }`}
            ></div>
            <Link
              href={'/partners'}
              className={`${
                path == '/partners' ? 'bg-secondary text-font1' : 'text-font2'
              } font-bold text-lg w-full h-11 rounded-l-4xl rounded-r-none flex items-center gap-1 pl-[60px]`}
            >
              <FaHandshake />
              <h3>Partners</h3>
            </Link>
          </li>
        )}
        {/* riders */}
        {role == 'admin' && (
          <li
            className="flex items-center gap-1 justify-center relative"
            onClick={handlecrossclick}
          >
            <div
              className={`size-10 bg-secondary absolute top-0 right-0
          -translate-y-[15px] translate-x-[20px] rotate-[50deg] ${
            path == '/riders' ? 'block' : 'hidden'
          }`}
            ></div>
            <div
              className={`size-10 bg-secondary absolute bottom-0 right-0
          translate-y-[15px] translate-x-[20px] rotate-[40deg] ${
            path == '/riders' ? 'block' : 'hidden'
          }`}
            ></div>
            <Link
              href={'/riders'}
              className={`${
                path == '/riders' ? 'bg-secondary text-font1' : 'text-font2'
              } font-bold text-lg w-full h-11 rounded-l-4xl rounded-r-none flex items-center gap-1 pl-[60px]`}
            >
              <MdDirectionsBike />
              <h3>Riders</h3>
            </Link>
          </li>
        )}
        {/* reporting */}
        {role == 'admin' && (
          <li
            className="flex items-center gap-1 justify-center relative"
            onClick={handlecrossclick}
          >
            <div
              className={`size-10 bg-secondary absolute top-0 right-0
          -translate-y-[15px] translate-x-[20px] rotate-[50deg] ${
            path == '/reporting' ? 'block' : 'hidden'
          }`}
            ></div>
            <div
              className={`size-10 bg-secondary absolute bottom-0 right-0
          translate-y-[15px] translate-x-[20px] rotate-[40deg] ${
            path == '/reporting' ? 'block' : 'hidden'
          }`}
            ></div>
            <Link
              href={'/reporting'}
              className={`${
                path == '/reporting' ? 'bg-secondary text-font1' : 'text-font2'
              } font-bold text-lg w-full h-11 rounded-l-4xl rounded-r-none flex items-center gap-1 pl-[60px]`}
            >
              <BiSolidReport />
              <h3>Reporting</h3>
            </Link>
          </li>
        )}
        {/* support */}
        <li
          className="flex items-center gap-1 justify-center relative"
          onClick={handlecrossclick}
        >
          <div
            className={`size-10 bg-secondary absolute top-0 right-0
          -translate-y-[15px] translate-x-[20px] rotate-[50deg] ${
            path == '/support' ? 'block' : 'hidden'
          }`}
          ></div>
          <div
            className={`size-10 bg-secondary absolute bottom-0 right-0
          translate-y-[15px] translate-x-[20px] rotate-[40deg] ${
            path == '/support' ? 'block' : 'hidden'
          }`}
          ></div>
          <Link
            href={'/support'}
            className={`${
              path == '/support' ? 'bg-secondary text-font1' : 'text-font2'
            } font-bold text-lg w-full h-11 rounded-l-4xl rounded-r-none flex items-center gap-1 pl-[60px]`}
          >
            <MdOutlineSupportAgent />
            <h3>Support</h3>
          </Link>
        </li>
        {/* settings */}
        <li
          className="flex items-center gap-1 justify-center relative"
          onClick={handlecrossclick}
        >
          <div
            className={`size-10 bg-secondary absolute top-0 right-0
          -translate-y-[15px] translate-x-[20px] rotate-[50deg] ${
            path == '/settings' ? 'block' : 'hidden'
          }`}
          ></div>
          <div
            className={`size-10 bg-secondary absolute bottom-0 right-0
          translate-y-[15px] translate-x-[20px] rotate-[40deg] ${
            path == '/settings' ? 'block' : 'hidden'
          }`}
          ></div>
          <Link
            href={'/settings'}
            className={`${
              path == '/settings' ? 'bg-secondary text-font1' : 'text-font2'
            } font-bold text-lg w-full h-11 rounded-l-4xl rounded-r-none flex items-center gap-1 pl-[60px]`}
          >
            <IoSettings />
            <h3>Settings</h3>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menubars;
