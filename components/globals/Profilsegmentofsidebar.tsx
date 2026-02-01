import { useProfile, useUserDetail } from '@/app/context/Globalcontex';
import useHeader from '@/app/context/Headercontext';
import Image from 'next/image';

const Profilsegmentofsidebar = ({ className }: { className?: string }) => {
  const { profile } = useHeader();
  const { profile_data } = useProfile();
  const istrue = profile_data && profile_data.profile_imag;
  const { user } = useUserDetail() ?? {};
  return (
    <div className={`${className ? className : ''} flex flex-col gap-1.5 px-6`}>
      <div className="border-4 border-white border-l-0 p-4 mx-auto rounded-full flex justify-center items-center">
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden mx-auto">
          <Image
            src={(istrue ? profile_data.profile_imag : (profile as any)) || ''}
            alt="profile"
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <h3 className="text-white text-xl text-center font-semibold manrope">
        {user?.first_name} {user?.last_name}
      </h3>
      <p className="text-font2 text-center text-sm font-normal manrope">
        {user?.email}
      </p>
    </div>
  );
};

export default Profilsegmentofsidebar;
