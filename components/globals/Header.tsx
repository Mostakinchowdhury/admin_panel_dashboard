import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from 'react'
import { IoIosSearch, IoIosSunny } from 'react-icons/io'
import { IoMoonSharp, IoNotificationsOutline } from 'react-icons/io5'
import { MdOutlineNotificationsActive } from 'react-icons/md'
import { TiThMenu } from 'react-icons/ti'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import useHeader from '@/app/context/Headercontext'

const Header = ({
  className,
  setisshowmanu,
  setisdark,
  isdark
}: {
  className?: string
  setisshowmanu: Dispatch<SetStateAction<boolean>>
  setisdark: Dispatch<SetStateAction<boolean>>
  isdark: boolean
}) => {
  // input state
  const { searchvalue: input, setsearchvalue: setinput, handleinputbtnclick } = useHeader()
  const handleclick = () => {
    setisshowmanu((pre) => !pre)
  }
  const handleinput = (e: ChangeEvent<HTMLInputElement>) => {
    setinput(e.target.value)
  }
  const handlesearchclick = () => {
    handleinputbtnclick()
  }
  const handlekeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      handlesearchclick()
    }
  }
  return (
    <div
      className={`${
        className ? className : ''
      } flex items-center gap-2 p-2.5 md:p-3 justify-between bg-white w-full`}
    >
      {/* text */}
      <h2 className="manrope text-2xl font-bold hidden md:block">Wellcome Mostakin</h2>
      <Button
        className="md:hidden block text-gray-300 border-[1px] border-gray-400 h-auto w-auto"
        variant={'ghost'}
        onClick={handleclick}
      >
        <TiThMenu size={80} />
      </Button>
      {/* search or a to z functionality section */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3">
        {/* search div*/}
        <div className="flex justify-between items-center border-2 border-gray-600 w-[160px] sm:w-[180px] md:w-[310px] rounded-2xl h-10 md:h-12 overflow-hidden">
          <Input
            className="ghost text-sm text-font1 font-medium placeholder:text-sm placeholder:text-font1 grow px-2.5 py-1.5 border-0 outline-0 focus:outline-0 focus-visible:ring-0 focus-visible:outline-0 focus-visible:border-0 focus:border-0 active:border-0 active:outline-0 active:ring-0 focus:ring-0 bg-transparent hover:bg-transparent"
            placeholder=" Search..."
            value={input}
            onChange={handleinput}
            onKeyDown={handlekeydown}
          />
          {/* button */}
          <Button
            className="w-10 h-full flex justify-between items-center text-black font-bold bg-gray-300 rounded-none hover:text-white"
            onClick={handlesearchclick}
          >
            <IoIosSearch />
          </Button>
        </div>
        {/* togle dark or light */}
        <div className="flex gap-0 items-center justify-center bg-ts w-20 sm:w-[100px] h-[30px] md:w-[140px]  rounded-xl overflow-hidden dark:bg-ts">
          <button
            className={`flex-1 h-full flex justify-center items-center font-bold  dark:rounded-none hover:rounded-r-xl bg-primary text-gray-300 rounded-r-xl hover:text-red-800 dark:hover:bg-transparent dark:bg-ts`}
            onClick={() => setisdark(false)}
          >
            <IoIosSunny />
          </button>
          <button
            className={`flex-1 h-full flex justify-center items-center font-bold  rounded-none hover:rounded-l-xl hover:text-gray-300 text-primary  dark:text-gray-300 dark:rounded-l-xl  dark:hover:text-red-600 dark:hover:bg-tp bg-secondary dark:bg-tp`}
            onClick={() => setisdark(true)}
          >
            <IoMoonSharp />
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
  )
}

export default Header
