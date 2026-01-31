import { useEffect, useState } from 'react';
import Pichart from './Pichart';
import api from '@/app/utils/api';

type ordernonorderd = {
  total_users: number;
  orderedusers: number;
  nonorderusers: number;
};
const Rightolod = ({ className }: { className?: string }) => {
  const [ordernonorderd, setOrdernonorderd] = useState<ordernonorderd>({
    total_users: 0,
    orderedusers: 0,
    nonorderusers: 0,
  });

  useEffect(() => {
    const fetchOrderNonOrderd = async () => {
      try {
        const response = await api.get<ordernonorderd>('overview/orderesuser');
        setOrdernonorderd(response.data);
      } catch {
        console.log('unable to fetch ordernonorderd');
      }
    };
    fetchOrderNonOrderd();
  }, []);
  return (
    <div
      className={`bg-white p-3 flex sm:flex-row flex-col gap-8 ${className ? className : ''}`}
    >
      {/* inventory chart div */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold manrope text-font1">
          User Statistics
        </h2>
        {/* pychart */}
        <div className="min-h-[140px] md:h-[140px] flex justify-between items-center md:gap-8 gap-1 flex-col md:flex-row">
          <Pichart
            orderedusers={ordernonorderd.orderedusers}
            nonorderedusers={ordernonorderd.nonorderusers}
          />
          {/* icon and highlight */}
          <div className="flex md:justify-center flex-col px-2 gap-2">
            {/* solid utit */}
            <div className="flex gap-2 items-center">
              <div className="size-8 bg-secondary rounded-sm border-2 border-gray-700" />
              <h3 className="text-sm font-extrabold manrope text-font1">
                Ordering Users
              </h3>
            </div>
            {/* Total units */}
            <div className="flex gap-2 items-center">
              <div className="size-8 bg-primary rounded-sm border-2 border-gray-700" />
              <h3 className="text-sm font-extrabold manrope text-font1">
                Non Ordering Users
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightolod;
