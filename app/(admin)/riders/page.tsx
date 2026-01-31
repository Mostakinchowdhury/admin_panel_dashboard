'use client';
import { fetchrider } from '@/app/api/rider';
import useHeader from '@/app/context/Headercontext';
import useRidercontext from '@/app/context/Riders';
import { Rider } from '@/app/type/Riders';
import { riderstatusoptions } from '@/assets/datas/riders';
import Mypagination from '@/components/globals/Mypagination';
import { Spinner } from '@/components/nessasery/Spinner';
import Overviewboxrider from '@/components/rider/Overviewboxrider';
import Rider_Sortdiologsection from '@/components/rider/Rider_sort_section';
import Riderrow from '@/components/rider/Riderrow';
import { Button } from '@/components/ui/button';
import { CreateDialogWrapper } from '@/app/hooks/useCreate';
import { useEffect, useState } from 'react';
import { BiSort } from 'react-icons/bi';
import { RiEBike2Fill, RiEBikeFill, RiMotorbikeFill } from 'react-icons/ri';
import { TbBikeOff } from 'react-icons/tb';
import { useSummery } from '@/app/context/Globalcontex';

const Rider_page = () => {
  const [tabs, settabs] = useState<string>('All');
  const [totalpages, settotalpages] = useState<number>(1);
  const [page, setpage] = useState<number>(1);
  const [riders, setriders] = useState<Rider[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const { rider_sortby } = useRidercontext() ?? 'df';
  const { sloading, summery } = useSummery();
  const {
    exinput: searchvalue,
    setexinput,
    setsearchvalue,
  } = useHeader() ?? {};
  const props = { page, setpage, totalpages };

  // ==================fetch rider's=================

  useEffect(() => {
    fetchrider({
      setloading,
      setriders,
      settotalpages,
      page,
      search: searchvalue,
      status: tabs,
      sortby: rider_sortby,
    });
  }, [page, searchvalue, tabs, rider_sortby]);

  // Reset page when search or sort changes
  useEffect(() => {
    setpage(1);
  }, [searchvalue, rider_sortby]);

  useEffect(() => {
    return () => {
      setsearchvalue?.('');
      setexinput?.('');
    };
  }, [setsearchvalue, setexinput]);
  return (
    <div className="p-3 md:p-6 space-y-5 overflow-y-auto grow scroll-custom">
      {/* top section overview */}
      <section className="bg-white p-2.5">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold manrope text-font1">
            Riders Overview
          </h3>
          <CreateDialogWrapper
            initialData={{
              name: '',
              phone_num: '',
              vehicle_type: 'BIKE',
              status: 'PENDING',
              email: '',
              working_area_address: '',
              permanent_address: '',
              photo: null,
            }}
            query="api/riders/"
            modelName="Rider"
            fields={[
              { name: 'name', label: 'Rider Name' },
              { name: 'email', label: 'Email', type: 'email' },
              { name: 'phone_num', label: 'Phone Number' },
              {
                name: 'working_area_address',
                label: 'Working Area Address',
              },
              { name: 'permanent_address', label: 'Permanent Address' },
              {
                name: 'photo',
                label: 'Upload Your Photo(optional)*',
                type: 'file',
                optional: true,
              },
              {
                name: 'status',
                label: 'Status',
                type: 'select',
                options: [
                  {
                    value: 'PENDING',
                    label: 'Pending',
                  },
                  {
                    value: 'APPROVED',
                    label: 'Approved',
                  },
                  {
                    value: 'CANCELLED',
                    label: 'Cancelled',
                  },
                ],
              },
            ]}
            handlefetch={async () => {
              await fetchrider({
                setloading,
                setriders,
                settotalpages,
                page,
                search: searchvalue,
                status: tabs,
                sortby: rider_sortby,
              });
            }}
          >
            <Button className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white font-bold rounded-xl px-6 h-12 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
              <RiEBike2Fill className="w-5 h-5" />
              <span>Add New Rider</span>
            </Button>
          </CreateDialogWrapper>
        </div>
        {/* rider overview boxes */}
        <div className="px-3 py-2 grid-auto-fit-180 gap-5">
          {/*Total riders */}
          <Overviewboxrider
            amout={sloading ? '...' : summery.total_riders}
            p={'Total Rider'}
            icon={RiEBike2Fill}
            className="border-2 border-gray-300 rounded-xl"
          />
          {/* Approved riders */}
          <Overviewboxrider
            amout={sloading ? '...' : summery.approved_riders}
            p={'Approved Riders'}
            icon={RiMotorbikeFill}
            className="border-2 border-gray-300 rounded-xl"
          />
          {/* Pending riders */}
          <Overviewboxrider
            amout={sloading ? '...' : summery.pending_riders}
            p={'Pending Riders'}
            icon={RiEBikeFill}
            className="border-2 border-gray-300 rounded-xl"
          />
          {/* Rejected Riders */}
          <Overviewboxrider
            amout={sloading ? '...' : summery.rejected_riders}
            p={'Rejected Riders'}
            icon={TbBikeOff}
            className="border-2 border-[rgba(206,145,120,1)] bg-[rgba(206,145,120,0.1)] rounded-xl"
            classNameib="border-2 border-[rgba(206,145,120,0.9)] bg-[rgba(206,145,120,0.5)]"
          />
        </div>
      </section>
      {/* sort and filtering */}
      <section className="flex md:justify-between md:items-center flex-col md:flex-row gap-2">
        {/* tabs */}
        <div className="flex items-center gap-2 rounded-lg bg-white p-1 w-full overflow-x-auto scroll-hide md:w-auto md:max-w-1/2">
          {riderstatusoptions.map((dt, ind) => (
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
        <div className="flex items-center gap-2.5 bg-white p-1 rounded-lg ml-auto md:ml-0">
          <Rider_Sortdiologsection icon={BiSort} />
        </div>
      </section>
      {/* table section */}
      {loading ? (
        <Spinner />
      ) : (
        <section className="bg-white p-4 max-w-full w-full overflow-x-auto block scroll-custom">
          <table className="border-none m-0 w-full">
            <thead className="p-2 rounded-t-xl bg-primary">
              <tr>
                <th className="text-white txtstlh4 p-3 text-center whitespace-nowrap">
                  ID
                </th>
                <th className="text-white txtstlh4 p-3 text-center whitespace-nowrap">
                  Name
                </th>
                <th className="text-white txtstlh4 p-3 text-center whitespace-nowrap">
                  Rider Profile
                </th>
                <th className="text-white txtstlh4 p-3 text-center whitespace-nowrap">
                  Status
                </th>
                <th className="text-white txtstlh4 p-3 text-center whitespace-nowrap">
                  Created At
                </th>
                <th className="text-white txtstlh4 p-3 text-center whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="">
              {riders.map(rider => (
                <Riderrow
                  rider={rider}
                  key={rider.id}
                  setloading={setloading}
                  handlefetch={async () => {
                    await fetchrider({
                      setloading,
                      setriders,
                      settotalpages,
                      page,
                      search: searchvalue,
                      status: tabs,
                      sortby: rider_sortby,
                    });
                  }}
                />
              ))}
            </tbody>
          </table>
        </section>
      )}
      <Mypagination {...props} />
    </div>
  );
};

export default Rider_page;
