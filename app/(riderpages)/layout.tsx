'use client';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';
import useglobal from '../context/Globalcontex';

export default function Pagelayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { role } = useglobal() ?? {};
  // =============== if partner redirect ==============
  useEffect(() => {
    if (role == 'partner') {
      router.push('/products');
    }
  }, [role, router]);
  return <>{children}</>;
}
