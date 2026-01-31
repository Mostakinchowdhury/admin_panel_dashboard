import { FaClock, FaFire } from 'react-icons/fa';
import { HiTrendingUp } from 'react-icons/hi';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '@/app/utils/api';
import { timeDifference } from '@/app/utils/datetime';
import Link from 'next/link';
import Sloading from '../nessasery/Sloading';

type Props = {
  className?: string;
};

type TrendingProduct = {
  id: string;
  name: string;
  image: string;
  total_sales: number;
  last_sale: string;
};
const Top10TrendingProducts = ({ className }: Props) => {
  const [loading, setloading] = useState<boolean>(true);
  const [trendingProducts, setTrendingProducts] = useState<TrendingProduct[]>(
    [],
  );

  // fetch products

  useEffect(() => {
    const fetchtrendingproducts = async () => {
      try {
        const response = await api.get<TrendingProduct[]>(
          `${process.env.NEXT_PUBLIC_OVERVIEW}top10productsbysales/`,
        );
        const data = response.data;
        setTrendingProducts(data);
      } catch (error) {
        console.error('Error fetching trending products:', error);
      } finally {
        setloading(false);
      }
    };
    fetchtrendingproducts();
  }, []);
  return (
    <div
      className={`${className ? className : ''} bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-linear-to-br from-orange-400 to-pink-500 rounded-xl shadow-lg shadow-orange-500/20">
            <FaFire className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-800 to-gray-600">
              Top 10 Trending Products
            </h2>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              Top performing items this week
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
          <HiTrendingUp className="text-green-500" />
          <span className="text-xs font-semibold text-gray-600">
            Hot Selling
          </span>
        </div>
      </div>
      <div className="overflow-x-auto scroll-custom pb-2 min-h-[200px] relative">
        {loading ? (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-50 min-w-[300px] min-h-[300px] flex justify-center items-center">
            <Sloading size={48} />
          </div>
        ) : (
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left pb-3 pl-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Product
                </th>
                <th className="text-left pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Total Sales
                </th>
                <th className="text-left pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right pb-3 pr-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Last Sale
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {trendingProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className="group hover:bg-blue-50/30 transition-colors duration-200"
                >
                  <td className="py-3 pl-2">
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">
                        <div
                          className="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow"
                          style={{
                            backgroundImage: `url(${product.image || 'https://backend.dayfey.store/media/products/itali.webp' || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        >
                          <Image
                            src={
                              product.image ||
                              'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop'
                            }
                            alt={product.name}
                            width={48}
                            height={48}
                            className="hidden w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        {index < 3 && (
                          <div
                            className={`absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white shadow-sm
                          ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'}`}
                          >
                            {index + 1}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-700 text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 mt-0.5 font-medium">
                          ID: {product.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-700 text-sm flex items-center gap-1.5">
                        {product.total_sales.toLocaleString()}
                        <span className="text-[10px] font-medium text-green-500 bg-green-50 px-1.5 py-0.5 rounded-full">
                          {`${index + 1}`}{' '}
                          <sup>
                            {index + 1 === 1
                              ? 'st'
                              : index + 1 === 2
                                ? 'nd'
                                : index + 1 === 3
                                  ? 'rd'
                                  : 'th'}
                          </sup>
                        </span>
                      </span>
                      <span className="text-[10px] text-gray-400">
                        Items sold
                      </span>
                    </div>
                  </td>

                  <td className="py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-xs font-semibold text-green-600">
                        Active
                      </span>
                    </div>
                  </td>

                  <td className="py-3 pr-2 text-right">
                    <div className="flex items-center justify-end gap-1.5 text-gray-500 group-hover:text-blue-500 transition-colors">
                      <FaClock className="text-xs" />
                      <span className="text-xs font-medium">
                        {timeDifference({
                          to: product.last_sale,
                        })}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center">
        <Link
          href={'/products'}
          className="text-xs font-bold text-blue-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
        >
          View All Products
          <HiTrendingUp />
        </Link>
      </div>
    </div>
  );
};

export default Top10TrendingProducts;
