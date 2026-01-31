'use client';
import { handlelogout } from '@/app/api/auth';
import useGlobal, { useUserDetail } from '@/app/context/Globalcontex';
import useHeader from '@/app/context/Headercontext';
import api from '@/app/utils/api';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { toast } from 'sonner';

export default function Page() {
  const { profile } = useHeader();
  const { setis_authenticated, setauth_loading } = useGlobal();
  const [loading, setloading] = useState<boolean>(false);
  const { user } = useUserDetail();

  // handle delete user

  const handledeleteUser = async () => {
    try {
      setloading(true);
      await api.delete(`/mam/deleteuser/${user?.id}/`);
      toast.success('User Deleted Successfully logouting in 2s...');
      setTimeout(async () => {
        await handlelogout(setis_authenticated, setauth_loading);
      }, 2000);
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
        'Failed to Delete User';
      toast.error(message);
    } finally {
      setloading(false);
    }
  };

  const [ischeaked, setischeaked] = useState<boolean>(false);
  const handlesuredelete = () => {
    toast.promise(() => handledeleteUser(), {
      loading: 'Deleting...',
      success: () =>
        `${user?.first_name.concat(' ').concat(user?.last_name)} has been Deleted.Loging out in 2s...`,
      error: 'Error',
      style: {
        backgroundColor: 'green',
        color: 'white',
      },
    });
  };
  const handledelete = () => {
    if (!ischeaked) {
      toast.warning(
        'Read full warning message and cheacked the checkbox and then try again,Its is a serious matter think more what do you want.',
        {
          style: {
            backgroundColor: 'orange',
            color: 'white',
          },
        },
      );
    } else {
      toast.info(
        'Are you Sure You want to Delete Your Account?You Have a Chance Think Again.If You sure Then Click `Sure` Button',
        {
          style: {
            backgroundColor: 'red',
            color: 'white',
          },
          action: {
            label: 'Sure',
            actionButtonStyle: {
              backgroundColor: 'red',
              color: 'white',
              fontSize: 18,
              fontWeight: 900,
            },
            onClick: handlesuredelete,
          },
        },
      );
    }
  };
  return (
    <div className="p-3 md:p-6 divide-y-2 divide-gray-200 !overflow-y-auto scroll-custom grow flex flex-col h-full gap-3 min-h-0">
      {/* profile page */}
      <div className="w-[112px] h-[112px] rounded-full overflow-hidden border-2 border-gray-300 mx-auto my-2 bg-amber-400 shrink-0">
        <Image
          src={profile}
          alt="profile"
          width={112}
          height={112}
          className="w-full h-full object-cover"
        />
      </div>
      {/* delete my account */}
      <div className="space-y-3">
        <h3 className="txtstlh3 font-extrabold text-red-600">
          ⚠️ Warning: Account Deletion is Permanent
        </h3>
        <p className="txtstlp font-medium text-gray-600 tracking-wider leading-6">
          Deleting your account is a permanent and irreversible action. Once you
          confirm deletion, all your data, files, preferences, and account
          history will be permanently erased from our systems. This includes
          your profile information, saved settings, messages, uploaded content,
          payment history, and any personalized recommendations you’ve received.
          Please be aware that after deletion, your data cannot be restored
          under any circumstances. Even if you decide to create a new account in
          the future, none of your old information will be recoverable. Your
          username may also become unavailable if it’s permanently linked to
          your deleted profile. Before proceeding, we strongly recommend that
          you: Download any important data or files you wish to keep. Cancel any
          active subscriptions or linked services to avoid future charges. Log
          out of all devices connected to your account. If your account was used
          to manage teams, projects, or shared resources, deleting it may also
          impact other users who depend on your data. Make sure to transfer
          ownership or notify collaborators before confirming deletion. Once the
          deletion request is submitted, your account will be permanently
          removed after a short verification period for security purposes.
          During this time, you may still cancel your request by contacting
          support. If you are unsure or have questions, please reach out to our
          support team before taking this step. Deleting your account means
          starting over completely — proceed only if you’re absolutely certain.
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={ischeaked}
              onClick={() => setischeaked(pre => !pre)}
              className={`${
                ischeaked
                  ? '!bg-red-600 !border-white'
                  : 'bg-transparent border-red-600'
              } checked:text-white`}
            />
            <h4 className="txtstlh4 font-semibold text-red-600">
              I read warning and agree
            </h4>
          </div>
          <Button
            className="bg-red-600 hover:bg-red-800 text-white select-none focus-visible:ring-0 flex items-center gap-0.5 ml-auto"
            onClick={handledelete}
          >
            <MdDelete />
            <span>Delete Account</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
