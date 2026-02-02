'use client';
import { fetchorders } from '@/app/api/orders';
import useglobal from '@/app/context/Globalcontex';
import useHeader from '@/app/context/Headercontext';
import useOrdercontext from '@/app/context/Orderpage';
import { Orders } from '@/app/type/orders';
import Mypagination from '@/components/globals/Mypagination';
import Blurload from '@/components/nessasery/Loading';
import { Spinner } from '@/components/nessasery/Spinner';
import Orderrow from '@/components/Orders/Orderrow';
import Overviewboxorders from '@/components/Orders/Overviewboxorders';
import Sortdiologsection from '@/components/Orders/Sortdiologsection';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { BiSort } from 'react-icons/bi';
import { MdDeliveryDining, MdPending } from 'react-icons/md';
import { TbBasketCancel, TbTruckDelivery } from 'react-icons/tb';

const Orderspage = () => {
  const { exinput: searchvalue, setsearchvalue, setexinput } = useHeader();
  const [tabs, settabs] = useState<string>('All');
  const [totalpages, settotalpages] = useState<number>(1);
  const [page, setpage] = useState<number>(1);
  const [orders, setorders] = useState<Orders>([]);
  const [loading, setloading] = useState<boolean>(false);
  const context = useOrdercontext();
  const sortby = context?.sortby ?? 'df';
  const props = { page, setpage, totalpages };

  const { role } = useglobal();
  const router = useRouter();

  const prevSearch = useRef(searchvalue);
  const prevSort = useRef(sortby);

  useEffect(() => {
    return () => {
      setsearchvalue?.('');
      setexinput?.('');
    };
  }, [setsearchvalue, setexinput]);

  // ==================fetch order's=================
  useEffect(() => {
    const isSearchOrSortChanged =
      prevSearch.current !== searchvalue || prevSort.current !== sortby;

    if (isSearchOrSortChanged && page !== 1) {
      setpage(1);
      return;
    }

    fetchorders({
      setloading,
      setorders,
      settotalpages,
      page: isSearchOrSortChanged ? 1 : page,
      search: searchvalue,
      status: tabs,
      sortby,
    });

    prevSearch.current = searchvalue;
    prevSort.current = sortby;
  }, [page, searchvalue, tabs, sortby]);

  if (role == 'partner') {
    return <Blurload text="Redirecting..." />;
  }
  return (
    <div className="p-3 md:p-6 space-y-5 overflow-y-auto grow scroll-custom">
      {/* top boxes section */}
      <section className="bg-white dark:bg-card border dark:border-border/50 p-4 rounded-xl shadow-sm transition-colors">
        <h3 className="text-2xl font-bold manrope text-font1">
          Orders Over View
        </h3>
        {/* orders overview boxes */}
        <div className="px-3 py-2 grid-auto-fit-180 gap-5">
          {/* total orders */}
          <Overviewboxorders
            amout={657}
            p={'Total Orders'}
            icon={TbTruckDelivery}
            className="border-2 border-gray-300 rounded-xl"
          />
          {/* deliver orders */}
          <Overviewboxorders
            amout={521}
            p={'Deliver Orders'}
            icon={MdDeliveryDining}
            className="border-2 border-gray-300 rounded-xl"
          />
          {/* pending orders */}
          <Overviewboxorders
            amout={5483}
            p={'Pending Orders'}
            icon={MdPending}
            className="border-2 border-gray-300 rounded-xl"
          />
          {/* cancel orders */}
          <Overviewboxorders
            amout={83}
            p={'Cancel Orders'}
            icon={TbBasketCancel}
            className="border-2 border-[rgba(206,145,120,1)] bg-[rgba(206,145,120,0.1)] rounded-xl"
            classNameib="border-2 border-[rgba(206,145,120,0.9)] bg-[rgba(206,145,120,0.5)]"
          />
        </div>
      </section>
      {/* tab and sort and filter section */}
      <section className="flex md:justify-between md:items-center flex-col md:flex-row gap-2">
        {/* tabs */}
        <div className="flex items-center gap-2 rounded-lg bg-white dark:bg-card border dark:border-border/50 p-1 w-full overflow-x-auto scroll-hide md:w-auto shadow-sm">
          {[
            'All',
            ...Array.from(
              new Set([
                'PENDING',
                'PAIDANDPROCESSING',
                'CASHANDPROCESSING',
                'DELIVERED',
                'CANCELLED',
              ]),
            ),
          ].map((dt, ind) => (
            <Button
              key={ind}
              className={`cursor-pointer txtstlh4 ${
                tabs == dt
                  ? 'bg-primary text-white font-bold hover:text-font2 hover:bg-primary'
                  : 'bg-transparent font-medium text-font1 rounded-none hover:bg-transparent hover:text-font2'
              }`}
              onClick={() => {
                settabs(dt);
                setpage(1);
              }}
            >
              {dt}
            </Button>
          ))}
        </div>
        {/* filter and sort */}
        <div className="flex items-center gap-2.5 bg-white dark:bg-card border dark:border-border/50 p-1 rounded-lg ml-auto md:ml-0 shadow-sm">
          <Sortdiologsection icon={BiSort} />
        </div>
      </section>
      {/* orders list */}
      {loading ? (
        <Spinner />
      ) : (
        <section className="bg-white dark:bg-card border dark:border-border/50 p-4 rounded-xl shadow-sm max-w-full w-full overflow-x-auto block scroll-custom transition-colors">
          <table className="border-none m-0 w-full">
            <thead className="p-2 rounded-t-xl bg-primary">
              <tr className="">
                <th className="text-white txtstlh4 p-3 text-center">
                  Order ID
                </th>
                <th className="text-white txtstlh4 p-3 text-center">
                  Order at
                </th>
                <th className="text-white txtstlh4 p-3 text-center">
                  Customer
                </th>
                <th className="text-white txtstlh4 p-3 text-center">Total</th>
                <th className="text-white txtstlh4 p-3 text-center">Status</th>
                <th className="text-white txtstlh4 p-3 text-center">Riders</th>
                <th className="text-white txtstlh4 p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {orders.map(order => (
                <Orderrow
                  order={order}
                  key={order.id}
                  setloading={setloading}
                  handlefetch={async () => {
                    await fetchorders({
                      setloading,
                      setorders,
                      settotalpages,
                      page,
                      search: searchvalue,
                      status: tabs,
                      sortby,
                    });
                  }}
                />
              ))}
            </tbody>
          </table>
        </section>
      )}
      {/* section of pagination */}
      <Mypagination {...props} />
    </div>
  );
};

export default Orderspage;
