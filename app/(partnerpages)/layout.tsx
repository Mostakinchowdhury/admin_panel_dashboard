'use client';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';
import useglobal from '../context/Globalcontex';
import Blurload from '@/components/nessasery/Loading';

export default function Pagelayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { role, fetch_summery } = useglobal() ?? {};

  useEffect(() => {
    fetch_summery();
  }, []);
  // =============== if rider redirect ==============

  useEffect(() => {
    if (role == 'rider') {
      router.push('/orders');
    }
  }, [role, router]);
  if (role == 'rider') {
    return <Blurload text="Redirecting..." />;
  }
  return <>{children}</>;
}
