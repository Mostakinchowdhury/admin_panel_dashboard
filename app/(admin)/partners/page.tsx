'use client';
import { fetchpartners } from '@/app/api/partners';
import useHeader from '@/app/context/Headercontext';
import usePartnercontext from '@/app/context/partner';
import { Shop } from '@/app/type/Partners';
import { partnerstatus } from '@/assets/datas/partners';
import Mypagination from '@/components/globals/Mypagination';
import { Spinner } from '@/components/nessasery/Spinner';
import Overviewboxpartner from '@/components/partner/Overviewboxpartner';
import Partnerrow from '@/components/partner/Partnerrow';
import Partner_Sortdiologsection from '@/components/partner/Partnershortdiologsection';
import { Button } from '@/components/ui/button';
import { CreateDialogWrapper } from '@/app/hooks/useCreate';
import { useEffect, useState } from 'react';
import { BiSort } from 'react-icons/bi';
import { BsStopwatchFill } from 'react-icons/bs';
import { FaHandshake } from 'react-icons/fa';
import { GiLovers } from 'react-icons/gi';
import { TiCancel } from 'react-icons/ti';

const Partner_page = () => {
  const [tabs, settabs] = useState<string>('All');
  const [page, setpage] = useState<number>(1);
  const [totalpages, settotalpages] = useState<number>(1);
  const { exinput: searchvalue } = useHeader() ?? {};
  const [loading, setloading] = useState<boolean>(false);
  const [partners, setpartners] = useState<Shop[]>([]);
  const { partner_sortby } = usePartnercontext() ?? { partner_sortby: 'df' };

  const props = { page, setpage, totalpages };

  const { setexinput, setsearchvalue } = useHeader() ?? {};
  useEffect(() => {
    setexinput?.('');
    setsearchvalue?.('');
    return () => {
      setexinput?.('');
      setsearchvalue?.('');
    };
  }, [setexinput, setsearchvalue]);

  useEffect(() => {
    setpage(1);
  }, [searchvalue, partner_sortby]);

  //  ============================ fetch partners====================
  useEffect(() => {
    fetchpartners({
      setloading,
      setpartners,
      settotalpages,
      page,
      search: searchvalue,
      status: tabs,
      sortby: partner_sortby,
    });
  }, [page, searchvalue, tabs, partner_sortby]);

  // ============== reset search ===============

  return (
    <div className="p-3 md:p-6 space-y-5 overflow-y-auto grow scroll-custom">
      {/* top section overview */}
      <section className="bg-white p-2.5">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold manrope text-font1">
            Partners Overview
          </h3>
          <CreateDialogWrapper<{
            business_name: string;
            business_type: string;
            business_address: string;
            status: string;
            name: string;
            email: string;
            phone_num: string;
            website: string;
            owner_photo: null | File;
            buesness_logo: null | File;
            description: string;
          }>
            initialData={{
              business_name: '',
              business_type: '',
              business_address: '',
              status: 'PENDING',
              name: '',
              email: '',
              phone_num: '',
              website: '',
              owner_photo: null,
              buesness_logo: null,
              description: '',
            }}
            query="api/shops/"
            modelName="Partner"
            fields={[
              { name: 'business_name', label: 'Business Name' },
              {
                name: 'status',
                label: 'Business Type',
                type: 'select',
                options: [
                  {
                    value: 'PENDING',
                    label: 'Pending',
                  },
                  {
                    value: 'CANCELLED',
                    label: 'Cancelled',
                  },
                  {
                    value: 'APPROVED',
                    label: 'Approved',
                  },
                ],
              },
              { name: 'business_type', label: 'Your Business Type' },
              { name: 'name', label: 'Your Name' },
              { name: 'email', label: 'Your Email', type: 'email' },
              { name: 'phone_num', label: 'Your Phone Number' },
              {
                name: 'website',
                type: 'url',
                label: 'Website Url(optional)*',
                optional: true,
              },
              { name: 'description', label: 'Description ', type: 'textarea' },
              {
                name: 'buesness_logo',
                label: 'Upload Business logo(optional)',
                type: 'file',
              },
              {
                name: 'owner_photo',
                label: 'Upload Your photo(optional)',
                type: 'file',
              },
              {
                name: 'business_address',
                label: 'Business Address',
                type: 'textarea',
              },
            ]}
            handlefetch={async () => {
              await fetchpartners({
                setloading,
                setpartners,
                settotalpages,
                page,
                search: searchvalue,
                status: tabs,
                sortby: partner_sortby,
              });
            }}
          >
            <Button className="flex items-center gap-2 bg-primary hover:bg-primary/60 text-white font-bold rounded-xl px-6 h-12 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
              <FaHandshake className="w-5 h-5" />
              <span>Add New Partner</span>
            </Button>
          </CreateDialogWrapper>
        </div>
        {/* orders overview boxes */}
        <div className="px-3 py-2 grid-auto-fit-180 gap-5">
          {/*Total Partners */}
          <Overviewboxpartner
            amout={partners.length}
            p={'Total Partners'}
            icon={FaHandshake}
            className="border-2 border-gray-300 rounded-xl"
          />
          {/* Approved partners */}
          <Overviewboxpartner
            amout={partners.filter(i => i.status === 'APPROVED').length}
            p={'Approved partners'}
            icon={GiLovers}
            className="border-2 border-gray-300 rounded-xl"
          />
          {/* Pending partners */}
          <Overviewboxpartner
            amout={partners.filter(i => i.status === 'PENDING').length}
            p={'Pending partners'}
            icon={BsStopwatchFill}
            className="border-2 border-gray-300 rounded-xl"
          />
          {/* Rejected partners */}
          <Overviewboxpartner
            amout={partners.filter(i => i.status === 'REJECTED').length}
            p={'Rejected partners'}
            icon={TiCancel}
            className="border-2 border-[rgba(206,145,120,1)] bg-[rgba(206,145,120,0.1)] rounded-xl"
            classNameib="border-2 border-[rgba(206,145,120,0.9)] bg-[rgba(206,145,120,0.5)]"
          />
        </div>
      </section>
      {/* sort and filtering */}
      <section className="flex md:justify-between md:items-center flex-col md:flex-row gap-2">
        {/* tabs */}
        <div className="flex items-center gap-2 rounded-lg bg-white p-1 w-full overflow-x-auto scroll-hide md:w-auto md:max-w-1/2">
          {partnerstatus.map((dt, ind) => (
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
        <div className="flex items-center gap-2.5 bg-white p-3 rounded-lg ml-auto md:ml-0">
          <Partner_Sortdiologsection icon={BiSort} />
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
                  Business Logo
                </th>
                <th className="text-white txtstlh4 p-3 text-center whitespace-nowrap">
                  Business Name
                </th>
                <th className="text-white txtstlh4 p-3 text-center whitespace-nowrap">
                  Status
                </th>
                <th className="text-white txtstlh4 p-3 text-center whitespace-nowrap">
                  Business Type
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
              {partners.map(partner => (
                <Partnerrow
                  partner={partner}
                  key={partner.id}
                  setloading={setloading}
                  handlefetch={async () => {
                    await fetchpartners({
                      setloading,
                      setpartners,
                      settotalpages,
                      page,
                      search: searchvalue,
                      status: tabs,
                      sortby: partner_sortby,
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

export default Partner_page;
