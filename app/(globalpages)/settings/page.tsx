'use client';
import useHeader from '@/app/context/Headercontext';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { useUserDetail } from '@/app/context/Globalcontex';

const Page = () => {
  const { profile } = useHeader();
  const { user, uprofile, address } = useUserDetail();
  return (
    <div className="p-3 md:p-6 divide-y-2 divide-gray-200 !overflow-y-auto scroll-custom grow flex flex-col h-full gap-3 min-h-0">
      {/* top introduce section */}
      <div className="space-y-1.5 py-2 text-center">
        <h3 className="txtstlh2 font-bold text-font1">Profile Information</h3>
        <p className="txtstlp text-gray-500">
          Look your personal info and cheak what need to update
        </p>
      </div>
      {/* account section */}
      <div className="space-y-2 py-2">
        <div className="w-[112px] h-[112px] rounded-full overflow-hidden border-2 border-gray-300 mx-auto my-2">
          <Image
            src={profile}
            alt="profile"
            width={112}
            height={112}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="txtstlh3 font-semibold text-font1 mb-8">
          Account Information
        </h3>
        {/* Name */}
        <div className="flex items-center gap-2.5">
          <h4 className="textstlh4 font-semibold md:min-w-[160px]">Name</h4>
          <div className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-medium">
            {`${user?.first_name} ${user?.last_name}`}
          </div>
        </div>
        {/* Email */}
        <div className="flex items-center gap-2.5">
          <h4 className="textstlh4 font-semibold md:min-w-[160px]">Email</h4>
          <div className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-medium">
            {user?.email}
          </div>
        </div>
        {/* Isverified */}
        <div className="flex items-center gap-2.5">
          <h4 className="textstlh4 font-semibold md:min-w-[160px]">
            Isverified Account {user?.is_verified ? 'Yes' : 'No'}
          </h4>
          <Checkbox
            checked={user?.is_verified}
            disabled
            className="disabled:opacity-100 bg-primary"
          />
        </div>
      </div>
      {/* Personal Information */}
      <div className="space-y-2">
        <h3 className="whitespace-nowrap txtstlh3 font-semibold text-font1 mb-8">
          Personal Information
        </h3>
        {/* Short bio */}
        <div className="flex items-center gap-2.5">
          <h4 className="whitespace-nowrap textstlh4 font-semibold md:min-w-[160px]">
            Short Bio
          </h4>
          <div className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-medium">
            {uprofile?.bio || 'No bio available'}
          </div>
        </div>
        {/* Phone number */}
        <div className="flex items-center gap-2.5">
          <h4 className="whitespace-nowrap textstlh4 font-semibold md:min-w-[160px]">
            Phone number
          </h4>
          <div className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-medium">
            {uprofile?.phone_num || 'No phone number available'}
          </div>
        </div>
        {/* Date of Birth */}
        <div className="flex items-center gap-2.5">
          <h4 className="whitespace-nowrap textstlh4 font-semibold md:min-w-[160px]">
            Date of Birth
          </h4>
          <div className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-medium">
            {uprofile?.birth_date || 'No date of birth available'}
          </div>
        </div>
        {/* Gender */}
        <div className="flex items-center gap-2.5">
          <h4 className="whitespace-nowrap textstlh4 font-semibold md:min-w-[160px]">
            Gender
          </h4>
          <div className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-medium">
            {uprofile?.gender || 'No gender available'}
          </div>
        </div>
        {/* country */}
        <div className="flex items-center gap-2.5">
          <h4 className="whitespace-nowrap textstlh4 font-semibold md:min-w-[160px]">
            Country
          </h4>
          <div className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-medium">
            {uprofile?.country || 'No country available'}
          </div>
        </div>
        {/* country */}
        <div className="flex items-center gap-2.5">
          <h4 className="whitespace-nowrap textstlh4 font-semibold md:min-w-[160px]">
            Adresses
          </h4>
          <div className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-medium">
            {address?.length || 'No addresses available'}
          </div>
        </div>
        {address?.map((add, ind) => (
          <div className="flex gap-2.5" key={add.id}>
            <h4 className="whitespace-nowrap textstlh4 font-semibold md:min-w-[160px]">
              Address {ind + 1}
            </h4>
            <div className="flex flex-wrap gap-3">
              {/* city */}
              <div>
                <h4 className="textstlh4 font-medium md:min-w-[160px]">City</h4>
                <div className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-normal">
                  {add.city}
                </div>
              </div>
              {/* Street */}
              <div>
                <h4 className="textstlh4 font-medium md:min-w-[160px]">
                  Street
                </h4>
                <div className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-normal">
                  {add.street}
                </div>
              </div>
              {/* Country */}
              <div>
                <h4 className="textstlh4 font-medium md:min-w-[160px]">
                  Country
                </h4>
                <div className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-normal">
                  {add.country}
                </div>
              </div>
              {/* Created at */}
              <div>
                <h4 className="textstlh4 font-medium md:min-w-[160px]">
                  Created at
                </h4>
                <div className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-normal">
                  {new Date(add.created_at).toLocaleString('en-UK', {
                    day: '2-digit',
                    year: 'numeric',
                    month: 'short',
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
