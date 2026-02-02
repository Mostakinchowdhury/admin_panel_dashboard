import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from 'react';
import { IoIosSearch, IoIosSunny } from 'react-icons/io';
import { IoMoonSharp, IoNotificationsOutline } from 'react-icons/io5';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import { TiThMenu } from 'react-icons/ti';
import { useUserDetail } from '@/app/context/Globalcontex';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import useHeader from '@/app/context/Headercontext';

const Header = ({
  className,
  setisshowmanu,
  setisdark,
  isdark,
}: {
  className?: string;
  setisshowmanu: Dispatch<SetStateAction<boolean>>;
  setisdark: Dispatch<SetStateAction<boolean>>;
  isdark: boolean;
}) => {
  // input state
  const {
    searchvalue: input,
    setsearchvalue: setinput,
    handleinputbtnclick,
  } = useHeader();
  const { user } = useUserDetail();
  const handleclick = () => {
    setisshowmanu(pre => !pre);
  };
  const handleinput = (e: ChangeEvent<HTMLInputElement>) => {
    setinput(e.target.value);
  };
  const handlesearchclick = () => {
    handleinputbtnclick();
  };
  const handlekeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      handlesearchclick();
    }
  };
  return (
    <div
      className={`${
        className ? className : ''
      } flex items-center gap-2 p-2.5 md:p-3 justify-between bg-white dark:bg-card border-b dark:border-border/50 w-full transition-colors duration-300`}
    >
      {/* text */}
      <h2 className="manrope text-2xl font-bold hidden md:block dark:text-foreground">
        Welcome {user?.first_name || 'Admin'}
      </h2>
      <Button
        className="md:hidden block text-primary border border-primary/20 h-10 w-10 p-0"
        variant={'ghost'}
        onClick={handleclick}
      >
        <TiThMenu size={24} />
      </Button>
      {/* search or a to z functionality section */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3">
        {/* search div*/}
        <div className="flex justify-between items-center border-2 border-primary/20 dark:border-border/50 w-[140px] sm:w-[180px] md:w-[310px] rounded-full h-10 md:h-11 overflow-hidden bg-gray-50 dark:bg-muted/50 focus-within:border-primary/50 transition-all">
          <Input
            className="ghost text-sm text-font1 dark:text-foreground font-medium placeholder:text-sm placeholder:text-font2 grow px-4 py-1.5"
            placeholder="Search..."
            value={input}
            onChange={handleinput}
            onKeyDown={handlekeydown}
          />
          {/* button */}
          <button
            className="w-10 h-full flex justify-center items-center text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
            onClick={handlesearchclick}
          >
            <IoIosSearch size={20} />
          </button>
        </div>
        {/* toggle dark or light */}
        <div className="flex p-1 items-center bg-secondary dark:bg-muted rounded-full w-24 sm:w-28 md:w-32 h-10 md:h-11 shadow-inner">
          <button
            className={`flex-1 h-full flex justify-center items-center rounded-full transition-all duration-300 ${!isdark ? 'bg-white text-primary shadow-sm scale-105' : 'text-primary/60 hover:text-primary'}`}
            onClick={() => setisdark(false)}
          >
            <IoIosSunny size={20} />
          </button>
          <button
            className={`flex-1 h-full flex justify-center items-center rounded-full transition-all duration-300 ${isdark ? 'bg-primary text-white shadow-sm scale-105' : 'text-font2 hover:text-foreground'}`}
            onClick={() => setisdark(true)}
          >
            <IoMoonSharp size={18} />
          </button>
        </div>
        {/* notification */}
        <Button
          className="ghost hover:bg-transparent flex justify-center items-center p-0"
          variant={'ghost'}
        >
          {!true ? (
            <IoNotificationsOutline className="size-6 md:size-8" />
          ) : (
            <MdOutlineNotificationsActive className="size-6 md:size-8" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Header;
