'use client';
import { fetchpromocodes } from '@/app/api/promocode';
import { fetchcategories, fetchosupercategories } from '@/app/api/supercat';
import useHeader from '@/app/context/Headercontext';
import { Category } from '@/app/type/category';
import { Promocode } from '@/app/type/promocode';
import { Supercategory } from '@/app/type/supercate';
import SuperCategoryrow from '@/components/category/SuperCategoryrow';
import Categoryrow from '@/components/category/Categoryrow';
import Promorow from '@/components/promocode/Promorow';
import { Spinner } from '@/components/nessasery/Spinner';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { MdCreate } from 'react-icons/md';
import {
  Addcategorydiologwrap,
  Addsupercategorydiologwrap,
} from '@/components/category/Addsupercategory';
import { Addpromodiologwrap } from '@/components/promocode/Addpromodiologwrap';

const Categorypage = () => {
  const { exinput: searchvalue, setsearchvalue, setexinput } = useHeader();
  const [supercategories, setsupercategories] = useState<Supercategory[]>([]);
  const [categories, setcategories] = useState<Category[]>([]);
  const [promocodes, setpromocodes] = useState<Promocode[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  // ============= if user is rider redirect to another page============
  useEffect(() => {
    return () => {
      setsearchvalue('');
      setexinput('');
    };
  }, []);

  // ==================fetch order's prov=================

  useEffect(() => {
    fetchcategories({
      setloading,
      setcategories,
      search: searchvalue,
    });
    fetchosupercategories({
      setloading,
      setsupercategories,
      search: searchvalue,
    });
    fetchpromocodes({
      setloading,
      setpromocodes,
      search: searchvalue,
    });
  }, [searchvalue]);

  // ==============handle fetch ============

  const handlefetch = async () => {
    await fetchcategories({
      setloading,
      setcategories,
      search: searchvalue,
    });
    await fetchosupercategories({
      setloading,
      setsupercategories,
      search: searchvalue,
    });
    await fetchpromocodes({
      setloading,
      setpromocodes,
      search: searchvalue,
    });
  };

  return (
    <div className="p-3 md:p-6 space-y-5 overflow-y-auto grow scroll-custom">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-orange-400 text-center select-none">
            Supercategories Table
          </h2>
          <Addsupercategorydiologwrap
            setloading={setloading}
            handlefetch={handlefetch}
          >
            <Button className="flex items-center gap-1 p-6 bg-orange-400 text-white font-bold hover:bg-orange-600">
              <MdCreate />
              <span>Create new Supercategory</span>
            </Button>
          </Addsupercategorydiologwrap>
          <section className="bg-white dark:bg-card border dark:border-border/50 p-4 rounded-xl shadow-sm max-w-full w-full overflow-x-auto block scroll-custom max-h-[650px] overflow-y-auto transition-colors">
            <table className="border-none m-0 w-full">
              <thead className="p-2 rounded-t-xl bg-primary">
                <tr className="">
                  <th className="text-white txtstlh4 p-3 text-center">ID</th>
                  <th className="text-white txtstlh4 p-3 text-center">Title</th>
                  <th className="text-white txtstlh4 p-3 text-center">
                    Author Email
                  </th>
                  <th className="text-white txtstlh4 p-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {supercategories.map(supercat => (
                  <SuperCategoryrow
                    supercat={supercat}
                    key={supercat.id}
                    setloading={setloading}
                    handlefetch={handlefetch}
                  />
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
      {/* ================ category ======================= */}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-orange-400 text-center select-none">
            Categories Table
          </h2>
          <Addcategorydiologwrap
            setloading={setloading}
            handlefetch={handlefetch}
            datas={supercategories}
          >
            <Button className="flex items-center gap-1 p-6 bg-orange-400 text-white font-bold hover:bg-orange-600">
              <MdCreate />
              <span>Create new Category</span>
            </Button>
          </Addcategorydiologwrap>
          <section className="bg-white dark:bg-card border dark:border-border/50 p-4 rounded-xl shadow-sm max-w-full w-full overflow-x-auto block scroll-custom my-4 lg:my-6 max-h-[650px] overflow-y-auto transition-colors">
            <table className="border-none m-0 w-full">
              <thead className="p-2 rounded-t-xl bg-primary">
                <tr className="">
                  <th className="text-white txtstlh4 p-3 text-center">ID</th>
                  <th className="text-white txtstlh4 p-3 text-center">Name</th>
                  <th className="text-white txtstlh4 p-3 text-center">
                    Supercategory Name
                  </th>
                  <th className="text-white txtstlh4 p-3 text-center">
                    Category Image
                  </th>
                  <th className="text-white txtstlh4 p-3 text-center">
                    Author Email
                  </th>
                  <th className="text-white txtstlh4 p-3 text-center">
                    Description
                  </th>
                  <th className="text-white txtstlh4 p-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => (
                  <Categoryrow
                    category={cat}
                    key={cat.id}
                    setloading={setloading}
                    handlefetch={handlefetch}
                  />
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
      {/* ================ promo codes ======================= */}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-orange-400 text-center select-none">
            Promo Codes Table
          </h2>
          <Addpromodiologwrap setloading={setloading} handlefetch={handlefetch}>
            <Button className="flex items-center gap-1 p-6 bg-orange-400 text-white font-bold hover:bg-orange-600">
              <MdCreate />
              <span>Create new Promo Code</span>
            </Button>
          </Addpromodiologwrap>
          <section className="bg-white dark:bg-card border dark:border-border/50 p-4 rounded-xl shadow-sm max-w-full w-full overflow-x-auto block scroll-custom my-4 lg:my-6 max-h-[650px] overflow-y-auto transition-colors">
            <table className="border-none m-0 w-full">
              <thead className="p-2 rounded-t-xl bg-primary">
                <tr className="">
                  <th className="text-white txtstlh4 p-3 text-center">ID</th>
                  <th className="text-white txtstlh4 p-3 text-center">Code</th>
                  <th className="text-white txtstlh4 p-3 text-center">
                    Discount (%)
                  </th>
                  <th className="text-white txtstlh4 p-3 text-center">
                    Status
                  </th>
                  <th className="text-white txtstlh4 p-3 text-center">
                    Usage (Max/User)
                  </th>
                  <th className="text-white txtstlh4 p-3 text-center">
                    Total Used
                  </th>
                  <th className="text-white txtstlh4 p-3 text-center">
                    From Date
                  </th>
                  <th className="text-white txtstlh4 p-3 text-center">
                    Valid To
                  </th>
                  <th className="text-white txtstlh4 p-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {promocodes.map(promo => (
                  <Promorow
                    promocode={promo}
                    key={promo.id}
                    setloading={setloading}
                    handlefetch={handlefetch}
                  />
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </div>
  );
};

export default Categorypage;
