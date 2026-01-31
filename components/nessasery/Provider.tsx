import useglobal, { useProfile } from '@/app/context/Globalcontex';
import useHeader from '@/app/context/Headercontext';
import { ReactNode, useEffect } from 'react';
import Blurload from './Loading';
import Logincom from './Logincom';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export function Provider({ children }: { children: ReactNode }) {
  const { auth_loading, intauthcheck, is_authenticated } = useglobal();
  const { fetchprofile } = useProfile();
  const { setprofile } = useHeader();
  // ==============intial authenication status========

  useEffect(() => {
    intauthcheck();
    fetchprofile(setprofile);
  }, []);
  return (
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-secondary`}
    >
      {auth_loading ? (
        <Blurload text="Checking..." />
      ) : !is_authenticated ? (
        <Logincom />
      ) : (
        children
      )}
    </body>
  );
}
