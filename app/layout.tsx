'use client';
import Header from '@/components/globals/Header';
import Sidebar from '@/components/globals/Sidebar';
import { metadata } from '@/components/metadata';
import { Toaster } from '@/components/ui/sonner';
import { Geist, Geist_Mono } from 'next/font/google';
import { useEffect, useState } from 'react';
import { Globalcontexprovider } from './context/Globalcontex';
import { Headerprovider } from './context/Headercontext';
import './globals.css';
import { Productpageprovider } from './context/Products';
import { Riderpageprovider } from './context/Riders';
import { Orderpageprovider } from './context/Orderpage';
import { Partnerpageprovider } from '@/app/context/partner';
import { Userpageprovider } from './context/Userpage';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [ishowmanu, setisshowmanu] = useState<boolean>(false);
  const [isdark, setisdark] = useState<boolean>(false);
  useEffect(() => {
    console.log(metadata.title);
  });
  return (
    <html lang="en" className={isdark ? 'dark' : ''}>
      <Partnerpageprovider>
        <Userpageprovider>
          <Orderpageprovider>
            <Riderpageprovider>
              <Productpageprovider>
                <Headerprovider>
                  <Globalcontexprovider>
                    <section className="md:flex md:gap-0 block">
                      <Sidebar
                        className="min-h-screen box-border min-w-[280px]"
                        ishowmanu={ishowmanu}
                        setisshowmanu={setisshowmanu}
                      />

                      <main className="md:flex-1 lg:flex block flex-col h-screen overflow-x-hidden">
                        <Header
                          setisshowmanu={setisshowmanu}
                          setisdark={setisdark}
                          isdark={isdark}
                        />
                        {children}
                      </main>
                    </section>
                    <Toaster position="top-center" />
                  </Globalcontexprovider>
                </Headerprovider>
              </Productpageprovider>
            </Riderpageprovider>
          </Orderpageprovider>
        </Userpageprovider>
      </Partnerpageprovider>
    </html>
  );
}
