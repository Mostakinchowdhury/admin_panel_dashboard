'use client';
import { fetchorderprove } from '@/app/api/orderprove';
import useglobal from '@/app/context/Globalcontex';
import useHeader from '@/app/context/Headercontext';
import { OrderProof } from '@/app/type/orderprove';
import Blurload from '@/components/nessasery/Loading';
import { Spinner } from '@/components/nessasery/Spinner';
import { CreateDialogWrapper } from '@/app/hooks/useCreate';
import { FieldConfig } from '@/app/hooks/useEdit';
import Orderprovrow from '@/components/orderprov/Ordeprovrrow';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdCreate } from 'react-icons/md';

const Orderprovepage = () => {
  const {
    exinput: searchvalue,
    setsearchvalue,
    setexinput,
  } = useHeader() ?? {};
  const [tabs, settabs] = useState<string>('All');
  const [ordersprov, setordersprov] = useState<OrderProof[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const { role } = useglobal();
  const router = useRouter();

  const proofCreateFields: FieldConfig<any>[] = [
    { name: 'order', label: 'Order ID', type: 'number' },
    { name: 'rider', label: 'Rider ID', type: 'number' },
    { name: 'proved_image_url', label: 'Image URL' },
    { name: 'proved_video_url', label: 'Video URL' },
  ];

  const initialProof = {
    order: 0,
    rider: 0,
    proved_image_url: '',
    proved_video_url: '',
    status: 'PENDING',
  };

  // ============= if user is rider redirect to another page============
  useEffect(() => {
    if (role === 'partner') {
      router.push('/products');
    }
  }, [role, router]);

  useEffect(() => {
    return () => {
      setsearchvalue?.('');
      setexinput?.('');
    };
  }, [setsearchvalue, setexinput]);

  // ==================fetch order's prov=================
  useEffect(() => {
    fetchorderprove({
      setloading,
      setordersprov,
      search: searchvalue,
      status: tabs,
    });
  }, [searchvalue, tabs]);

  if (role === 'partner') {
    return <Blurload text="Redirecting..." />;
  }
  return (
    <div className="p-3 md:p-6 space-y-5 overflow-y-auto grow scroll-custom">
      <CreateDialogWrapper
        initialData={initialProof}
        query="api/order-proved"
        modelName="Order Proof"
        fields={proofCreateFields}
        handlefetch={async () => {
          await fetchorderprove({
            setloading,
            setordersprov,
            search: searchvalue,
            status: tabs,
          });
        }}
      >
        <Button className="flex items-center gap-1 p-6 bg-orange-400 text-white font-bold hover:bg-orange-600 rounded-xl shadow-lg transition-all active:scale-95">
          <MdCreate />
          <span>Create new Proof</span>
        </Button>
      </CreateDialogWrapper>
      {/* tab and sort and filter section */}
      <section className="flex md:justify-between md:items-center flex-col md:flex-row gap-2">
        {/* tabs */}
        <div className="flex items-center gap-2 rounded-lg bg-white dark:bg-card border dark:border-border/50 p-1 w-full overflow-x-auto scroll-hide md:w-auto shadow-sm">
          {[
            'All',
            ...Array.from(new Set(['PENDING', 'APPROVED', 'CANCELLED'])),
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
              }}
            >
              {dt}
            </Button>
          ))}
        </div>
      </section>
      {/* proved list */}

      {loading ? (
        <Spinner />
      ) : (
        <section className="bg-white dark:bg-card border dark:border-border/50 p-4 rounded-xl shadow-sm max-w-full w-full overflow-x-auto block scroll-custom transition-colors">
          <table className="border-none m-0 w-full">
            <thead className="p-2 rounded-t-xl bg-primary">
              <tr className="">
                <th className="text-white txtstlh4 p-3 text-center">ID</th>
                <th className="text-white txtstlh4 p-3 text-center">
                  Order ID
                </th>
                <th className="text-white txtstlh4 p-3 text-center">
                  Rider Name
                </th>
                <th className="text-white txtstlh4 p-3 text-center">
                  Proved Image
                </th>
                <th className="text-white txtstlh4 p-3 text-center">
                  Proved Video
                </th>
                <th className="text-white txtstlh4 p-3 text-center">status</th>
                <th className="text-white txtstlh4 p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {ordersprov.map(orprov => (
                <Orderprovrow
                  orderprove={orprov}
                  key={orprov.id}
                  setloading={setloading}
                  handlefetch={async () => {
                    await fetchorderprove({
                      setloading,
                      setordersprov,
                      search: searchvalue,
                      status: tabs,
                    });
                  }}
                />
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
};

export default Orderprovepage;
