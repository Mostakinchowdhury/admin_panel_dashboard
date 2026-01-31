import demoprofile from '@/assets/images/image-avatar.webp';
import { StaticImageData } from 'next/image';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
// create a conext for user page

const headercontext = createContext<any>(null);

export const Headerprovider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setprofile] = useState<StaticImageData | string>(demoprofile);
  const [searchvalue, setsearchvalue] = useState<string>('');
  const [notificationopen, setnotificationopen] = useState<boolean>(false);
  const [exinput, setexinput] = useState<string>('');
  const handleinputbtnclick = () => {
    setexinput(searchvalue);
  };
  const values = {
    searchvalue,
    exinput,
    setexinput,
    setsearchvalue,
    notificationopen,
    setnotificationopen,
    handleinputbtnclick,
    profile,
    setprofile,
  };
  return (
    <headercontext.Provider value={values}>{children}</headercontext.Provider>
  );
};

export default function useHeader(): {
  searchvalue: string;
  exinput: string;
  setexinput: Dispatch<SetStateAction<string>>;
  setsearchvalue: Dispatch<SetStateAction<string>>;
  notificationopen: boolean;
  setnotificationopen: Dispatch<SetStateAction<boolean>>;
  handleinputbtnclick: () => void;
  profile: string | StaticImageData;
  setprofile: Dispatch<SetStateAction<string | StaticImageData>>;
} {
  return useContext(headercontext);
}
