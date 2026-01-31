'use client';
import { ChangeEvent, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Address } from '@/app/type/usertype';
import api from '@/app/utils/api';
import { toast } from 'sonner';
import Sloading from '../nessasery/Sloading';
import Countrylist from '../nessasery/Countrylist';

export default function Edit_adress({
  loadings,
  setloading,
  adress,
  adressnum,
  className,
}: {
  adress: Address;
  adressnum: number;
  className?: string;
  loadings: {
    profile: boolean;
    address1: boolean;
    address2: boolean;
    address3: boolean;
    img: boolean;
  };
  setloading: React.Dispatch<
    React.SetStateAction<{
      profile: boolean;
      address1: boolean;
      address2: boolean;
      address3: boolean;
      img: boolean;
    }>
  >;
}) {
  const [form, setform] = useState<Address>({
    id: adress.id,
    city: adress.city,
    street: adress.street,
    created_at: adress.created_at,
    country: adress.country,
    profile: adress.profile,
  });
  const handleinput = (
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
    setform(pre => ({ ...pre, [name]: value }));
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(pre => ({ ...pre, [`address${adressnum}`]: true }));
    try {
      await api.patch(`api/adress/${adress.id}/`, form);
      toast.success('Address updated successfully');
    } catch (error) {
      console.log(error);
    } finally {
      setloading(pre => ({ ...pre, [`address${adressnum}`]: false }));
    }
  };
  if (loadings[`address${adressnum}` as keyof typeof loadings]) {
    return <Sloading />;
  }
  return (
    <form
      className={`${className ? className : ''} flex gap-2.5`}
      key={adress.id}
      onSubmit={handlesubmit}
    >
      <h4 className="whitespace-nowrap textstlh4 font-semibold md:min-w-[160px]">
        Address {adressnum}
      </h4>
      <div className="flex flex-wrap gap-3">
        {/* city */}
        <div>
          <h4 className="textstlh4 font-medium md:min-w-[160px]">City</h4>

          <Input
            className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-normal selection:bg-blue-600 selection:text-white"
            value={form.city}
            name="city"
            onChange={handleinput}
          ></Input>
        </div>
        {/* Street */}
        <div>
          <h4 className="textstlh4 font-medium md:min-w-[160px]">Street</h4>
          <Input
            className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-normal selection:bg-blue-600 selection:text-white"
            value={form.street}
            onChange={handleinput}
            name="street"
          />
        </div>
        {/* Country */}
        <div>
          <h4 className="textstlh4 font-medium md:min-w-[160px]">Country</h4>
          <Countrylist />
          <Input
            className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-normal selection:bg-blue-600 selection:text-white"
            value={form.country}
            onChange={handleinput}
            name="country"
            list="country_list"
          />
        </div>
        {/* Created at */}
        <div>
          <h4 className="textstlh4 font-medium md:min-w-[160px]">Created at</h4>
          <Input
            className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-normal selection:bg-blue-600 selection:text-white"
            disabled
            value={new Date(form.created_at).toLocaleString('en-UK', {
              day: '2-digit',
              year: 'numeric',
              month: 'short',
            })}
          />
        </div>
        <Button
          type="submit"
          className="bg-green-400 text-white font-bold lg:mt-6 hover:bg-green-600 ml-auto"
          variant={'default'}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}
