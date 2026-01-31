import React from 'react';
import { IconType } from 'react-icons';
type prop = {
  className?: string;
  classNameib?: string;
  classNamei?: string;
  amout: number | string;
  p: string;
  icon: React.ReactNode | IconType;
};

const Overviewboxproduct = ({
  className,
  classNameib,
  classNamei,
  amout,
  p,
  icon: Icon,
}: prop) => {
  return (
    <div
      className={`md:px-1.5 px-1 py-3 flex gap-1.5 ${className ? className : ''}`}
    >
      {/* icon */}
      <div
        className={`flex justify-center items-center rounded-xl size-14 text-black ${
          classNameib ? classNameib : 'bg-secondary'
        }`}
      >
        {typeof Icon === 'function' ? (
          <Icon className={`size-7 ${classNamei ? classNamei : ''}`} />
        ) : (
          Icon
        )}
      </div>
      {/* text */}
      <div className="flex flex-col justify-between gap-1">
        <h3 className="text-font1 text-xl font-bold">{amout}</h3>
        <p className="text-gray-600 font-medium text-sm">{p}</p>
      </div>
    </div>
  );
};

export default Overviewboxproduct;
