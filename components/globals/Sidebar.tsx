import { handlelogout } from '@/app/api/auth';
import useglobal from '@/app/context/Globalcontex';
import { Dispatch, SetStateAction } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import { Button } from '../ui/button';
import Menubars from './Menubars';
import Profilsegmentofsidebar from './Profilsegmentofsidebar';

const Sidebar = ({
  className,
  ishowmanu,
  setisshowmanu,
}: {
  className?: string;
  ishowmanu: boolean;
  setisshowmanu: Dispatch<SetStateAction<boolean>>;
}) => {
  const handlecrossclick = () => {
    setisshowmanu(false);
  };
  const { setis_authenticated, setauth_loading } = useglobal();
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          ishowmanu ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handlecrossclick}
      ></div>
      <aside
        className={`${
          className ? className : ''
        } flex flex-col gap-2 lg:relative fixed lg:translate-x-0 top-0 left-0 ${
          ishowmanu ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 py-8 px-10 bg-primary h-screen z-50 shadow-2xl lg:shadow-none`}
      >
        {/* xross button */}
        <Button
          variant={'ghost'}
          onClick={handlecrossclick}
          className="text-secondary absolute right-2 top-3 md:hidden"
        >
          <MdCancel className="size-8" />
        </Button>
        {/* blurbg */}

        {/* profile segment */}
        <Profilsegmentofsidebar />
        {/* top div */}
        {/* menubatrs */}
        <Menubars
          className="flex flex-col flex-1 min-h-0"
          handlecrossclick={handlecrossclick}
        />

        {/* logout button */}
        <div className="flex justify-center items-center gap-1">
          <AiOutlineLogout color="oklch(86.9% 0.022 252.894)" />
          <Button
            className="txt2 text-xl font-medium bg-transparent p-0 focus-visible:border-0 focus-visible:outline-0 focus:outline-0 focus:border-0 active:outline-0 active:border-0 focus-visible:ring-0"
            variant={'default'}
            onClick={() => handlelogout(setis_authenticated, setauth_loading)}
          >
            logout
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
