import demoprofile from '@/assets/images/image-avatar.webp';
import { Provider } from '@/components/nessasery/Provider';
import axios from 'axios';
import { StaticImageData } from 'next/image';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getUserRole } from '../api/auth';
import { profile } from '../type/profile';
import api from '../utils/api';
import { clearTokens, getStoredTokens, saveTokens } from '../utils/auth';
import { Address, User, UserProfile } from '../type/usertype';
import { fetchUsers } from '../api/collectmine';
// import {getStoredTokens,clearTokens,saveTokens} from "../utils/auth"
// create a conext for user page

// ======================= fetchsummery type =======================

interface summery {
  total_products: number | string;
  total_orders: number | string;
  total_stock: number | string;
  out_of_stock: number | string;
  total_users: number | string;
  total_admin: number | string;
  total_staff: number | string;
  total_customer: number | string;
  low_stock_products: number | string;
  // partners
  pending_partners: number | string;
  approved_partners: number | string;
  cancelled_products: number | string;
  total_partners: number | string;
  // riders
  total_riders: number | string;
  pending_riders: number | string;
  approved_riders: number | string;
  rejected_riders: number | string;
}

const globalcontex = createContext<any>(null);

export const Globalcontexprovider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // ================ auth related global states and values ==================
  const [is_authenticated, setis_authenticated] = useState<boolean>(false);
  const [auth_loading, setauth_loading] = useState<boolean>(true);
  const [role, setrole] = useState<'admin' | 'partner' | 'rider' | null>(null);
  const [error, seterror] = useState<string>('');
  const [user, setuser] = useState<User | null>(null);
  const [uprofile, setuprofile] = useState<UserProfile | null>(null);
  const [address, setaddress] = useState<Address[] | null>(null);

  // user details
  const userdetails = {
    user,
    uprofile,
    address,
    setuser,
    setaddress,
    setuprofile,
  } as {
    user: User | null;
    uprofile: UserProfile | null;
    address: Address[] | null;
    setuser: Dispatch<SetStateAction<User | null>>;
    setuprofile: Dispatch<SetStateAction<UserProfile | null>>;
    setaddress: Dispatch<SetStateAction<Address[] | null>>;
  };

  // =================  summery =========================
  const [sloading, setSloading] = useState<boolean>(true);
  const [_summury, _setsummury] = useState<summery>({
    // dashorad summry
    total_products: '0',
    total_orders: '0',
    total_stock: '0',
    out_of_stock: '0',
    total_users: '0',
    total_admin: '0',
    total_staff: '0',
    total_customer: '0',
    low_stock_products: '0',
    // partners
    total_partners: '0',
    pending_partners: '0',
    approved_partners: '0',
    cancelled_products: '0',
    // riders
    total_riders: '0',
    pending_riders: '0',
    approved_riders: '0',
    rejected_riders: '0',
  });

  // ================== fetch summery ==================

  const fetch_summery = async () => {
    setSloading(true);
    try {
      const response = await api.get<summery>(
        `${process.env.NEXT_PUBLIC_OVERVIEW}summery/`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      _setsummury(response.data);
    } catch (error) {
      console.log(error);
    }
    setSloading(false);
  };

  const intauthcheck = async () => {
    setauth_loading(true);
    const { accessToken, refreshToken } = getStoredTokens();
    try {
      if (accessToken) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/token/verify/`,
          {
            token: refreshToken,
          },
        );
        setis_authenticated(true);
        await getUserRole(setrole, setis_authenticated, setauth_loading);
        await fetchUsers(setauth_loading, setuser, setuprofile, setaddress);
      }
    } catch {
      // access invalid → try refresh
      if (refreshToken) {
        try {
          const res = await axios.post<{ access: string }>(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/token/refresh/`,
            { refresh: refreshToken },
          );

          saveTokens(res.data.access, refreshToken);
          setis_authenticated(true);
          await getUserRole(setrole, setis_authenticated, setauth_loading);
        } catch {
          clearTokens();
        }
      } else {
        clearTokens();
      }
    } finally {
      setauth_loading(false);
    }
  };

  // Reactive user data fetch when authenticated
  useEffect(() => {
    if (is_authenticated && !user) {
      fetchUsers(setauth_loading, setuser, setuprofile, setaddress);
    }
  }, [is_authenticated, user]);

  // ========================= end of auth related=======================

  // ============================ profiles states ===========================
  const [profile_data, setprofile_data] = useState<profile | null>(null);
  const fetchprofile = async (
    setter: Dispatch<SetStateAction<string | StaticImageData>>,
  ) => {
    try {
      const response = await api.get<profile[]>('api/profiles/');
      if (response.data.length === 0) throw new Error('profile is empty');
      setprofile_data(response.data[0]);
      setter(response.data[0].profile_imag || demoprofile);
      console.log(response.data[0]);
      console.log(response.data[0].profile_imag);
    } catch (error) {
      console.log(error);
    }
  };
  const profile = { profile_data, setprofile_data, fetchprofile };
  const summery = { _summury, _setsummury, fetch_summery, sloading };
  // =============================== end of profile =====================
  const auths = {
    is_authenticated,
    setis_authenticated,
    auth_loading,
    setauth_loading,
    intauthcheck,
    role,
    setrole,
    error,
    seterror,
  };
  const values = {
    auths,
    profile,
    summery,
    userdetails,
  };
  return (
    <globalcontex.Provider value={values}>
      <Provider>{children}</Provider>
    </globalcontex.Provider>
  );
};

// ============================== useglobal custom hook =====================

export function useSummery(): { summery: summery; sloading: boolean } {
  const { summery, sloading } = useContext(globalcontex);
  const { _summury } = summery;
  return { summery: _summury, sloading };
}

export default function useGlobal(): {
  is_authenticated: boolean;
  setis_authenticated: Dispatch<SetStateAction<boolean>>;
  auth_loading: boolean;
  setauth_loading: Dispatch<SetStateAction<boolean>>;
  intauthcheck: () => Promise<void>;
  role: 'admin' | 'partner' | 'rider' | null;
  setrole: Dispatch<SetStateAction<'admin' | 'partner' | 'rider' | null>>;
  error: string;
  seterror: Dispatch<SetStateAction<string>>;
  fetch_summery: () => Promise<void>;
} {
  const { auths, summery } = useContext(globalcontex);
  const {
    is_authenticated,
    setis_authenticated,
    auth_loading,
    setauth_loading,
    intauthcheck,
    role,
    setrole,
    error,
    seterror,
  } = auths;

  const { fetch_summery } = summery;

  return {
    is_authenticated,
    setis_authenticated,
    auth_loading,
    setauth_loading,
    intauthcheck,
    role,
    setrole,
    error,
    seterror,
    fetch_summery,
  };
}

// ============================== useprofile custom hook =====================

export function useProfile(): {
  profile_data: profile | null;
  setprofile_data: Dispatch<SetStateAction<profile | null>>;
  fetchprofile: (
    setter: Dispatch<SetStateAction<string | StaticImageData>>,
  ) => Promise<void>;
} {
  const { profile } = useContext(globalcontex);
  const { profile_data, setprofile_data, fetchprofile } = profile;
  return { profile_data, setprofile_data, fetchprofile };
}

// =================== useUserDetail ======================

export function useUserDetail(): {
  user: User | null;
  uprofile: UserProfile | null;
  address: Address[] | null;
  setuser: Dispatch<SetStateAction<User | null>>;
  setuprofile: Dispatch<SetStateAction<UserProfile | null>>;
  setaddress: Dispatch<SetStateAction<Address[] | null>>;
} {
  const { userdetails } = useContext(globalcontex);
  const { user, uprofile, address, setuser, setaddress, setuprofile } =
    userdetails;
  return { user, uprofile, address, setuser, setaddress, setuprofile };
}
