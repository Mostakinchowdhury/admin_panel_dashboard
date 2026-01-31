'use client';
import Admins from '@/components/dashboard/Admins';
import Leftolod from '@/components/dashboard/Leftolod';
import Overviewbox from '@/components/dashboard/Overviewbox';
import Rightolod from '@/components/dashboard/Rightolod';
import Top10TrendingProducts from '@/components/dashboard/Top10TrendingProducts';
import Blurload from '@/components/nessasery/Loading';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AiOutlineStock } from 'react-icons/ai';
import { BsInboxesFill } from 'react-icons/bs';
import { FaTruck } from 'react-icons/fa';
import { PiEmptyFill } from 'react-icons/pi';
import useglobal, { useSummery } from './context/Globalcontex';

export default function Home() {
  const { role, fetch_summery } = useglobal();
  const { summery, sloading } = useSummery();
  const router = useRouter();
  // ============= if user not admin redirect to another page============
  useEffect(() => {
    if (role == 'partner') {
      router.push('/products');
    }
    if (role == 'rider') {
      router.push('/orders');
    }
  }, [role, router]);

  // ============== fetch summery ==============
  useEffect(() => {
    fetch_summery();
  }, []);

  if (role != 'admin') {
    return <Blurload text="Redirecting..." />;
  }

  return (
    <div className="p-3 md:p-6 space-y-5 overflow-y-auto grow scroll-custom">
      {/* top  counts section */}
      <section className="bg-white p-2.5">
        <h3 className="text-2xl font-bold manrope text-font1">Over View</h3>
        {/* boxes */}
        <div className="px-3 py-2 grid-auto-fit-180 gap-5">
          {/* total product */}
          <Overviewbox
            amout={sloading ? '...' : summery.total_products}
            p={'Total Products'}
            icon={BsInboxesFill}
            className="border-2 border-gray-300 rounded-xl"
          />
          {/* orders */}
          <Overviewbox
            amout={sloading ? '...' : summery.total_orders}
            p={'Orders'}
            icon={FaTruck}
            className="border-2 border-gray-300 rounded-xl"
          />
          {/* total stock */}
          <Overviewbox
            amout={sloading ? '...' : summery.total_stock}
            p={'Stock Products'}
            icon={AiOutlineStock}
            className="border-2 border-gray-300 rounded-xl"
          />
          {/* out of stock */}
          <Overviewbox
            amout={sloading ? '...' : summery.out_of_stock || 0}
            p={'Stock Out Products'}
            icon={PiEmptyFill}
            className="border-2 border-[rgba(206,145,120,1)] bg-[rgba(206,145,120,0.1)] rounded-xl"
            classNameib="border-2 border-[rgba(206,145,120,0.9)] bg-[rgba(206,145,120,0.5)]"
          />
        </div>
      </section>
      {/* down part */}
      <div className="flex gap-4 flex-col lg:flex-row items-start">
        {/* left section of down */}
        <section className="flex gap-5 flex-col md:flex-1">
          {/* left of left section of down*/}
          {/* pichart and user section */}
          <div className="flex gap-5 flex-col md:flex-row">
            <Leftolod
              className="md:min-w-[280px]"
              useramout={summery.total_users}
            />
            <Rightolod className="flex-1" />
          </div>
          {/* top 10 products*/}
          <Top10TrendingProducts />
        </section>
        {/* right section of down */}
        <section className="md:basis-sm bg-white w-full md:w-auto">
          <Admins className="w-full" />
        </section>
      </div>
    </div>
  );
}
