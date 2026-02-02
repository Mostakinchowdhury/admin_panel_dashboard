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

const Overviewboxusers = ({
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
        className={`flex justify-center items-center rounded-xl size-14 text-primary dark:text-primary-foreground ${
          classNameib ? classNameib : 'bg-secondary dark:bg-muted'
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
        <h3 className="text-font1 text-xl font-bold transition-colors">
          {typeof amout === 'number'
            ? amout > 1000
              ? (amout / 1000).toFixed(2) + 'K'
              : amout
            : amout}
        </h3>
        <p className="text-font2 font-medium text-sm transition-colors">{p}</p>
      </div>
    </div>
  );
};

export default Overviewboxusers;
