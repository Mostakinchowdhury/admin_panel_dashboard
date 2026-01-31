'use client';
import useGlobal, {
  useProfile,
  useUserDetail,
} from '@/app/context/Globalcontex';
import useHeader from '@/app/context/Headercontext';
import api from '@/app/utils/api';
import { Only_Profile } from '@/assets/datas/profile';
import demoprofile from '@/assets/images/image-avatar.webp';
import { DatePickerDemo } from '@/components/globals/Datepicker';
import Countrylist from '@/components/nessasery/Countrylist';
import Sloading from '@/components/nessasery/Sloading';
import Edit_adress from '@/components/settings_com/Edit_adress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

const Edit_profilepage = () => {
  const [loadings, setloadings] = useState<{
    profile: boolean;
    address1: boolean;
    address2: boolean;
    address3: boolean;
    img: boolean;
  }>({
    profile: false,
    address1: false,
    address2: false,
    address3: false,
    img: false,
  });
  const { role, intauthcheck } = useGlobal();

  const { user, uprofile, address } = useUserDetail();
  const { profile, setprofile } = useHeader();
  const { fetchprofile } = useProfile();
  const [date, setdate] = useState<Date | undefined>(
    uprofile && uprofile.birth_date ? new Date(uprofile.birth_date) : undefined,
  );
  const [formdata, setformdata] = useState<Only_Profile>({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    bio: uprofile?.bio || '',
    birth_date: uprofile?.birth_date
      ? new Date(uprofile.birth_date).toISOString().split('T')[0]
      : null,
    country: uprofile?.country || '',
    gender: (uprofile?.gender as 'male' | 'female' | 'others') || 'male',
    phone_num: uprofile?.phone_num || '',
  });
  useEffect(() => {
    setformdata(pre => ({
      ...pre,
      birth_date: date ? date.toISOString().split('T')[0] : null,
    }));
  }, [date]);

  const fileRef = useRef<HTMLInputElement>(null);
  const handleformdata = (
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
    let value = e.target.value;
    if (name == 'phone_num') {
      value = value = value
        .split('')
        .filter(ch => /[0-9+]/.test(ch))
        .join('');
    }
    setformdata(pre => ({ ...pre, [name]: value }));
  };
  const handleclearprofile = () => {
    if (fileRef.current && fileRef.current.files) {
      fileRef.current.value = '';
    }
    setprofile(demoprofile);
  };
  // const handlefilechange = async (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setloadings(pre => ({ ...pre, img: true }));
  //     const url = URL.createObjectURL(file);
  //     setprofile(url);
  //     try {
  //       console.log('window url', url);
  //     } catch (e) {
  //       console.log(e instanceof Error ? e.message : JSON.stringify(e));
  //     } finally {
  //       setloadings(pre => ({ ...pre, img: false }));
  //     }
  //   }
  //   e.target.value = '';
  // };

  // Image change handler
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setloadings(pre => ({ ...pre, img: true }));
      const url = URL.createObjectURL(file);
      setprofile(url);
      const formData = new FormData();
      formData.append('profile_image', file);
      try {
        const res = await api.patch(`api/profiles/${uprofile?.id}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (res.status < 200 || res.status > 299) {
          toast.error('Fail to changed profile image');
        }
        console.log('____HYGTH_____');
        console.log(res.data);
        console.log('____HYGTH_____');
        toast.success('Profile image changed succesfully');
        await fetchprofile(setprofile);
      } catch (error: any) {
        if (error.response) {
          console.log('🛑 Server Error:', error.response.data);
          console.log('🔢 Status:', error.response.status);
        } else if (error.request) {
          console.log('🚫 No response received:', error.request);
        } else {
          console.log('❌ Error setting up request:', error.message);
        }
        toast.error(`Server Error: cheak consol`);
      } finally {
        setloadings(pre => ({ ...pre, img: false }));
      }
      e.target.value = '';
    }
  };

  // submit profile
  const handlesubmitform = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloadings(pre => ({
      ...pre,
      profile: true,
    }));

    try {
      const { first_name, last_name, ...profiledata } = formdata;
      await Promise.all([
        api.patch(`api/profiles/${uprofile?.id}/`, profiledata),
        api.patch(`mam/changeusername/${user?.id}/`, {
          first_name,
          last_name,
          role: role,
        }),
      ]);
      toast.success('Profile updated successfully');
      await intauthcheck();
    } catch (error: unknown) {
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
        'Failed to update profile';
      toast.error(message);
    } finally {
      setloadings(pre => ({
        ...pre,
        profile: false,
      }));
    }
  };

  useEffect(() => {
    console.log('prevew', profile);
  }, [profile]);
  return (
    <div className="p-3 md:p-6 divide-y-2 divide-gray-200 overflow-y-auto scroll-custom grow flex flex-col h-full gap-3 min-h-0">
      {/* top introduce section */}
      <div className="space-y-1.5 py-2 text-center">
        <h3 className="txtstlh2 font-bold text-font1">Manage Your profile</h3>
        <p className="txtstlp text-gray-500">
          Manage your personal detail and keep your contact info up to update
        </p>
      </div>
      {/* profile pick change */}
      <form
        action=""
        className="p-4 space-x-2 flex items-center flex-col gap-2 mx-auto"
      >
        <Input
          type="file"
          accept="image/*"
          id="fileinp"
          ref={fileRef}
          className="hidden"
          onChange={handleImageChange}
        />

        <div className="w-[112px] h-[112px] rounded-full overflow-hidden border-2 border-gray-300">
          {loadings.img ? (
            <Sloading />
          ) : (
            <Image
              src={profile}
              alt="profile"
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="flex gap-2">
          <Button
            className="bg-red-400 hover:bg-red-600 text-white font-bold"
            type="button"
            onClick={handleclearprofile}
          >
            Clear
          </Button>
          <Button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="bg-green-400 hover:bg-green-600 text-white font-bold"
          >
            Change
          </Button>
        </div>
      </form>
      {/* Personal Information */}
      <form className="space-y-2 p-4" onSubmit={handlesubmitform}>
        <h3 className="whitespace-nowrap txtstlh3 font-semibold text-font1 mb-8 text-center">
          User Info
        </h3>
        {/* first name */}
        <div className="flex items-center gap-2.5">
          <h4 className="whitespace-nowrap textstlh4 font-semibold md:min-w-[160px]">
            First Name
          </h4>
          <Input
            className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-medium"
            value={formdata.first_name || ''}
            onChange={handleformdata}
            name="first_name"
          />
        </div>
        {/* first name */}
        <div className="flex items-center gap-2.5">
          <h4 className="whitespace-nowrap textstlh4 font-semibold md:min-w-[160px]">
            Last Name
          </h4>
          <Input
            className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-medium"
            value={formdata.last_name || ''}
            onChange={handleformdata}
            name="last_name"
          />
        </div>
        {/* Short bio */}
        <div className="flex items-center gap-2.5">
          <h4 className="whitespace-nowrap textstlh4 font-semibold md:min-w-[160px]">
            Short Bio
          </h4>
          <Input
            className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-medium"
            value={formdata.bio || ''}
            onChange={handleformdata}
            name="bio"
          />
        </div>
        {/* Phone number */}
        <div className="flex items-center gap-2.5">
          <h4 className="whitespace-nowrap textstlh4 font-semibold md:min-w-[160px]">
            Phone number
          </h4>
          <Input
            className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-medium"
            onChange={handleformdata}
            name="phone_num"
            value={formdata.phone_num || ''}
          />
        </div>
        {/* Date of Birth */}
        <div className="flex items-center gap-2.5">
          <h4 className="whitespace-nowrap textstlh4 font-semibold md:min-w-[160px]">
            Date of Birth
          </h4>
          <DatePickerDemo
            className="!txtstlp w-fit md:min-w-[260px] border-2 p-2 rounded-lg font-medium"
            date={date}
            setDate={setdate}
          />
        </div>
        {/* Gender */}
        <div className="flex items-center gap-2.5">
          <h4 className="whitespace-nowrap textstlh4 font-semibold md:min-w-[160px]">
            Gender
          </h4>
          <div className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-medium flex gap-2 justify-between items-center">
            {['male', 'female', 'others'].map(c => (
              <label key={c} className="mr-4 inline-block">
                <Input
                  type="radio"
                  name="gender"
                  value={c}
                  checked={formdata.gender == c}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleformdata({
                      target: {
                        name: 'gender',
                        value: e.target.value,
                      },
                    })
                  }
                />
                {c}
              </label>
            ))}
          </div>
        </div>
        {/* country */}
        <div className="flex items-center gap-2.5">
          <h4 className="whitespace-nowrap textstlh4 font-semibold md:min-w-[160px]">
            Country
          </h4>
          <div className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-medium">
            <Countrylist />
            <Input
              className="!txtstlp text-white w-fit md:min-w-[260px] bg-primary border-2 border-gray-200 p-2 rounded-lg font-medium"
              onChange={handleformdata}
              name="country"
              value={formdata.country || ''}
              list="country_list"
            />
          </div>
        </div>
        <Button
          className="bg-green-400 hover:bg-green-600 select-none ml-auto block"
          type="submit"
        >
          {loadings.profile ? <Sloading /> : 'Save Changes'}
        </Button>
      </form>
      {/* adress manage */}
      <div className="space-y-2 p-4">
        <h3 className="whitespace-nowrap txtstlh3 font-semibold text-font1 mb-8 text-center">
          Address Info
        </h3>
        <section>
          {!address
            ? 'No adress Found'
            : address.map((add, ind) => (
                <Edit_adress
                  loadings={loadings}
                  setloading={setloadings}
                  key={add.id}
                  adress={add}
                  adressnum={ind + 1}
                />
              ))}
        </section>
      </div>
    </div>
  );
};

export default Edit_profilepage;
