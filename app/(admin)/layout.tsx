'use client';
import Blurload from '@/components/nessasery/Loading';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import useGlobal from '../context/Globalcontex';
// import useHeader from '../context/Headercontext';

export default function Adminlayout({ children }: { children: ReactNode }) {
  const { role } = useGlobal();
  const router = useRouter();
  const { fetch_summery } = useGlobal();
  // const { setexinput, setsearchvalue } = useHeader() ?? {};
  // useEffect(() => {
  //   setexinput('');
  //   setsearchvalue('');

  //   return () => {
  //     setexinput('');
  //     setsearchvalue('');
  //   };
  // }, []);
  // ============= if user not admin redirect to another page============
  useEffect(() => {
    fetch_summery();
  }, []);
  useEffect(() => {
    if (role == 'partner') {
      router.push('/products');
    }
    if (role == 'rider') {
      router.push('/orders');
    }
  }, [role, router]);
  if (role != 'admin') {
    return <Blurload text="Redirecting..." />;
  }

  return <>{children}</>;
}
