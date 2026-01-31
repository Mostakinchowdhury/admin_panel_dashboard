'use client';
import { handlelogout } from '@/app/api/auth';
import useGlobal from '@/app/context/Globalcontex';
import useHeader from '@/app/context/Headercontext';
import api from '@/app/utils/api';
import Sloading from '@/components/nessasery/Sloading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

const Page = () => {
  const [loading, setloading] = useState<boolean[]>([false, false]);
  const { profile } = useHeader();
  const { setis_authenticated, setauth_loading } = useGlobal();
  const [data, setdata] = useState<{
    old_password: string;
    new_password: string;
    confirm_password: string;
  }>({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });
  // ===================  change form data ======================
  const handledata = (
    e:
      | ChangeEvent<HTMLInputElement>
      | {
          target: {
            name: string;
            value: string;
          };
        },
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata(pre => ({ ...pre, [name]: value }));
  };

  // ========================  submit change password ===============

  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(pre => [true, ...pre]);
    try {
      handleChangesubmit(e);
      await api.post('/api/auth/change-password/', data);
      toast.success('Password changed successfully logouting after 2s', {
        style: {
          backgroundColor: 'green',
          color: 'white',
        },
      });
      setTimeout(async () => {
        await handlelogout(setis_authenticated, setauth_loading);
      }, 2000);
    } catch (error: unknown) {
      console.log(JSON.stringify(data) + 'its payload of this request');
      console.error('Edit failed:', error);
      const apiError = (
        error as { response?: { data?: { detail?: string; message?: string } } }
      )?.response?.data;
      const message =
        apiError?.detail ||
        apiError?.message ||
        (Array.isArray(apiError)
          ? apiError[0]
          : Object.values(apiError || {}).flat()[0]) ||
        'Failed to change password';
      toast.error(message);
    } finally {
      setloading(pre => [false, ...pre]);
    }
  };
  const [email, setemail] = useState<string>('');

  const handleChangesubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (data.new_password !== data.confirm_password) {
      toast.warning('Sorry Password does not Match', {
        style: {
          backgroundColor: 'red',
          color: 'white',
        },
      });
      throw new Error('Passwords do not match');
    }
    toast.success('Its look like fine', {
      style: {
        backgroundColor: 'green',
        color: 'white',
      },
    });
  };

  // reset password
  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(pre => [...pre, true]);
    try {
      await api.post('/api/auth/request-reset-password/', { email });
      toast.success(
        `Password reset Requested successfully check your email ${email} and click the link to reset your password`,
        {
          style: {
            backgroundColor: 'green',
            color: 'white',
          },
        },
      );
    } catch (error: unknown) {
      console.log(JSON.stringify(email) + 'its payload of this request');
      console.error('Edit failed:', error);
      const apiError = (
        error as { response?: { data?: { detail?: string; message?: string } } }
      )?.response?.data;
      const message =
        apiError?.detail ||
        apiError?.message ||
        (Array.isArray(apiError)
          ? apiError[0]
          : Object.values(apiError || {}).flat()[0]) ||
        'Failed to Sent Reset Password Request';
      toast.error(message);
    } finally {
      setloading(pre => [...pre, false]);
    }
  };
  useEffect(() => {}, []);
  return (
    <div className="p-3 md:p-6 divide-y-2 divide-gray-200 !overflow-y-auto scroll-custom grow flex flex-col h-full gap-3 min-h-0">
      <div className="w-[112px] h-[112px] rounded-full overflow-hidden border-2 border-gray-300 mx-auto my-2 bg-amber-400 shrink-0">
        <Image
          src={profile}
          alt="profile"
          width={112}
          height={112}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="divide-dashed divide-y-2 divide-gray-200">
        {/* password information */}
        <form className="space-y-2 p-4" onSubmit={handlesubmit}>
          <h3 className="whitespace-nowrap txtstlh3 font-semibold text-font1 mb-8 text-center">
            Change Your Password
          </h3>
          {/* current password */}
          <div className="flex items-center gap-2.5">
            <h4 className="whitespace-nowrap textstlh4 font-semibold md:min-w-[160px]">
              Current Password
            </h4>
            <Input
              className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-medium placeholder:text-gray-200 selection:bg-yellow-500"
              value={data.old_password}
              onChange={handledata}
              name="old_password"
              placeholder="Write Your current Password"
              required
            />
          </div>
          {/* New Password */}
          <div className="flex items-center gap-2.5">
            <h4 className="whitespace-nowrap textstlh4 font-semibold md:min-w-[160px]">
              New Password
            </h4>
            <Input
              className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-medium placeholder:text-gray-200 selection:bg-yellow-500"
              onChange={handledata}
              placeholder="Write Your New Password"
              name="new_password"
              value={data.new_password}
              required
            />
          </div>
          {/* Retype Password */}
          <div className="flex items-center gap-2.5">
            <h4 className="whitespace-nowrap textstlh4 font-semibold md:min-w-[160px]">
              {' '}
              Retype Password
            </h4>
            <Input
              className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-medium placeholder:text-gray-200 selection:bg-yellow-500"
              onChange={handledata}
              name="confirm_password"
              value={data.confirm_password}
              placeholder="Retype Your New Password"
              required
            />
          </div>
          <Button
            className="bg-green-400 hover:bg-green-600 select-none ml-auto block"
            type="submit"
          >
            {loading[0] ? <Sloading size={24} /> : 'Change Password'}
          </Button>
        </form>
        {/* Reset your password */}
        <div>
          <form onSubmit={handleReset} className="flex items-center gap-3 p-4">
            <Input
              className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-medium placeholder:text-gray-200 selection:bg-green-500"
              required
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setemail(e.target.value)
              }
              name="email_field"
              placeholder="Write Your Email"
            />
            <Button
              className="bg-green-400 hover:bg-green-600 select-none block"
              type="submit"
            >
              {loading[1] ? <Sloading size={24} /> : 'Reset Password'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
