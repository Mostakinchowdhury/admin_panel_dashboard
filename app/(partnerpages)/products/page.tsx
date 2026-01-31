'use client';
import { fetchcategory } from '@/app/api/category';
import { fetchproduct } from '@/app/api/product';
import useglobal, { useSummery } from '@/app/context/Globalcontex';
import useHeader from '@/app/context/Headercontext';
import useProductcontext from '@/app/context/Products';
import { CreateDialogWrapper } from '@/app/hooks/useCreate';
import { FieldConfig } from '@/app/hooks/useEdit';
import { CategoryApiResponse } from '@/app/type/category';
import { Product } from '@/app/type/product';
import api from '@/app/utils/api';
import Mypagination from '@/components/globals/Mypagination';
import Blurload from '@/components/nessasery/Loading';
import Overviewboxproduct from '@/components/product/Overviewboxproduct';
import Productrow from '@/components/product/Productrow';
import Product_Sortdiologsection from '@/components/product/Productsortdiologsection';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiFillProduct } from 'react-icons/ai';
import { BiSort } from 'react-icons/bi';
import { CgUnavailable } from 'react-icons/cg';
import { FaProductHunt } from 'react-icons/fa';
import { MdProductionQuantityLimits } from 'react-icons/md';

export default function Productspage() {
  const [tabs, settabs] = useState<string>('All');
  const [totalpages, settotalpages] = useState<number>(1);
  const [page, setpage] = useState<number>(1);
  const [loading, setloading] = useState<boolean>(false);
  const [ca_loading, setca_loading] = useState<boolean>(false);
  const [product, setproduct] = useState<Product[]>([]);
  const [category, setcategory] = useState<CategoryApiResponse>([]);
  const { exinput: searchvalue } = useHeader() ?? {};
  const [tags, settags] = useState<{ id: number; name: string }[]>([]);
  const props = { page, setpage, totalpages };
  const { role } = useglobal();
  const router = useRouter();
  const { product_sortby } = useProductcontext();
  const { summery, sloading } = useSummery();

  const productCreateFields: FieldConfig<{
    name: string;
    description: string;
    price: string;
    max_price: string;
    stock: number;
    category: number | null;
    tags: number[];
    images: File[];
  }>[] = [
    { name: 'name', label: 'Product Name' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'max_price', label: 'Max Price', type: 'number' },
    { name: 'stock', label: 'Stock', type: 'number' },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: category.map(item => ({ label: item.name, value: item.id })),
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'select',
      multiple: true,
      options: tags.map(item => ({ label: item.name, value: item.id })),
    },
    { name: 'images', label: 'Images', type: 'file', multiple: true },
  ];

  const initialProduct: {
    name: string;
    description: string;
    price: string;
    max_price: string;
    stock: number;
    category: number | null;
    tags: number[];
    images: File[];
  } = {
    name: '',
    description: '',
    price: '0.00',
    max_price: '0.00',
    stock: 0,
    category: null,
    tags: [],
    images: [],
  };
  // ============= if user is rider redirect to another page============
  useEffect(() => {
    if (role == 'rider') {
      router.push('/orders');
    }
  }, [role, router]);

  // Reset page when search or sort changes
  useEffect(() => {
    setpage(1);
  }, [searchvalue, product_sortby]);

  // ==================fetch products=================

  useEffect(() => {
    fetchproduct({
      setloading,
      setproduct,
      settotalpages,
      page,
      search: searchvalue,
      category: tabs,
      sortby: product_sortby,
    });
  }, [page, searchvalue, tabs, product_sortby]);

  // ==============fetch category=====================
  useEffect(() => {
    const fetchtags = async () => {
      setloading(true);
      try {
        const response = await api.get('/api/tags');
        const data = await response.data;
        settags(data as { id: number; name: string }[]);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    fetchtags();
    fetchcategory({ setcategory, setloading: setca_loading });
  }, []);
  if (role == 'rider') {
    return <Blurload text="Redirecting..." />;
  }
  if (ca_loading) {
    return <Blurload text="Fetching..." />;
  }

  return (
    <div className="p-3 md:p-6 space-y-5 overflow-y-auto grow scroll-custom">
      {/* top section overview */}
      <section className="bg-white p-2.5">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold manrope text-font1">
            Products Over View
          </h3>
          <CreateDialogWrapper<{
            name: string;
            description: string;
            price: string;
            max_price: string;
            stock: number;
            category: number | null;
            tags: number[];
            images: File[];
          }>
            initialData={initialProduct}
            query="api/products"
            modelName="Product"
            fields={productCreateFields}
            handlefetch={async () => {
              await fetchproduct({
                setloading,
                setproduct,
                settotalpages,
                page,
                search: searchvalue,
                category: tabs,
                sortby: product_sortby,
              });
            }}
          >
            <Button className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white font-bold rounded-xl px-6 h-12 transition-all active:scale-95 shadow-lg shadow-primary/20">
              <AiFillProduct className="w-5 h-5" />
              <span>Add New Product</span>
            </Button>
          </CreateDialogWrapper>
        </div>
        {/* orders overview boxes */}
        <div className="px-3 py-2 grid-auto-fit-180 gap-5">
          {/*Total Products */}
          <Overviewboxproduct
            amout={sloading ? '...' : summery.total_products || '0'}
            p={'Total Products'}
            icon={AiFillProduct}
            className="border-2 border-gray-300 rounded-xl"
          />
          {/* Available Products */}
          <Overviewboxproduct
            amout={sloading ? '...' : summery.total_stock || '0'}
            p={'Available Products'}
            icon={MdProductionQuantityLimits}
            className="border-2 border-gray-300 rounded-xl"
          />
          {/* Low in Stock */}
          <Overviewboxproduct
            amout={sloading ? '...' : summery.low_stock_products || '0'}
            p={'Low in Stock(under or equal to 20)'}
            icon={FaProductHunt}
            className="border-2 border-gray-300 rounded-xl"
          />
          {/* Stockout Products */}
          <Overviewboxproduct
            amout={sloading ? '...' : summery.out_of_stock || '0'}
            p={'Stockout Products'}
            icon={CgUnavailable}
            className="border-2 border-[rgba(206,145,120,1)] bg-[rgba(206,145,120,0.1)] rounded-xl"
            classNameib="border-2 border-[rgba(206,145,120,0.9)] bg-[rgba(206,145,120,0.5)]"
          />
        </div>
      </section>
      {/* sort and filter section */}
      <section className="flex md:justify-between md:items-center flex-col md:flex-row gap-2">
        {/* tabs */}
        <div className="flex items-center gap-2 rounded-lg bg-white p-1 w-full overflow-x-auto scroll-hide md:w-auto md:max-w-1/2">
          {category.map((dt, ind) => (
            <Button
              key={ind}
              className={`cursor-pointer txtstlh4 ${
                tabs == dt.name
                  ? 'bg-primary text-white font-bold hover:text-font2 hover:bg-primary'
                  : 'bg-transparent font-medium text-font1 rounded-none hover:bg-transparent hover:text-font2'
              }`}
              onClick={() => {
                settabs(dt.name);
                setpage(1);
              }}
            >
              {dt.name}
            </Button>
          ))}
        </div>
        {/* filter and sort */}
        <div className="flex items-center gap-2.5 bg-white p-1 rounded-lg ml-auto md:ml-0">
          <Product_Sortdiologsection icon={BiSort} />
        </div>
      </section>
      {/* table section */}
      {loading ? (
        <h2 className="text-center text-2xl font-extrabold text-white">
          Loading Products...
        </h2>
      ) : (
        <section className="bg-white p-4 max-w-full w-full overflow-x-auto block scroll-custom">
          <table className="border-none m-0 w-full">
            <thead className="p-2 rounded-t-xl bg-primary">
              <tr>
                <th className="text-white txtstlh4 p-3 text-center whitespace-nowrap">
                  ID
                </th>
                <th className="text-white txtstlh4 p-3 text-center whitespace-nowrap">
                  Product Name
                </th>
                <th className="text-white txtstlh4 p-3 text-center whitespace-nowrap">
                  Category
                </th>

                <th className="text-white txtstlh4 p-3 text-center whitespace-nowrap">
                  Price
                </th>
                <th className="text-white txtstlh4 p-3 text-center whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="">
              {product.map(product => (
                <Productrow
                  product={product}
                  key={product.id}
                  loading={loading}
                  setloading={setloading}
                  tags={tags}
                  handlefetch={async () => {
                    await fetchproduct({
                      setloading,
                      setproduct,
                      settotalpages,
                      page,
                      search: searchvalue,
                      category: tabs,
                      sortby: product_sortby,
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
}
