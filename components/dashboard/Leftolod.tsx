import { FaUsers } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { Button } from '../ui/button';

const Leftolod = ({
  className,
  useramout,
}: {
  className?: string;
  useramout: number | string;
}) => {
  const counteduser =
    typeof useramout == 'string'
      ? useramout
      : useramout > 1000
        ? `${Math.floor(useramout / 1000)}K+`
        : useramout;
  return (
    <div className={`bg-white p-2 md:px-2 px-12 ${className ? className : ''}`}>
      {/* top number of user */}
      <div className="flex items-center justify-between">
        <h3 className="manrope text-2xl font-bold text-font1">No of users</h3>
      </div>

      <div className="px-3 flex flex-col gap-2">
        {/* icon section */}
        <div
          className={`flex justify-center items-center rounded-xl h-14 w-18 text-black bg-secondary
         border-2 border-gray-500 mt-5`}
        >
          <FaUsers className={`size-7`} />
        </div>
        {/* text section */}
        <h2 className="manrope text-2xl font-bold text-font1">
          {counteduser || '0'}
        </h2>
        <p className="text-gray-600 font-medium text-sm manrope">Total Users</p>
      </div>
    </div>
  );
};

export default Leftolod;
