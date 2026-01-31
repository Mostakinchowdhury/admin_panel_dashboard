import api from '@/app/utils/api';
import { Mail, Phone, ShieldCheck, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import Sloading from '../nessasery/Sloading';

type Admin = {
  id: number;
  email: string;
  name: string;
  phone_number: string;
};

type Adminresponse = {
  adminlist: Admin[];
  you: string;
};

type Props = {
  className?: string;
};

export default function Admins({ className }: Props) {
  const [adminlist, setAdminlist] = useState<Admin[]>([]);
  const [you, setYou] = useState<string>('');
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await api.get<Adminresponse>('overview/adminlist');
        setAdminlist(response.data.adminlist);
        setYou(response.data.you);
      } catch (error) {
        console.error('Failed to fetch admin list', error);
      } finally {
        setloading(false);
      }
    };
    fetchAdmins();
  }, []);

  if (loading) {
    return <Sloading size={48} />;
  }

  return (
    <div
      className={`${className ? className : ''} bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50 h-full flex flex-col`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-800 to-gray-600">
              Admin Team
            </h2>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              Authorized Personnel
            </p>
          </div>
        </div>
        <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">
          {adminlist.length} Members
        </div>
      </div>

      <div className="overflow-y-auto pr-1 space-y-3 scroll-custom max-h-[700px]">
        {adminlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
            <User className="w-10 h-10 mb-2 opacity-20" />
            <p className="text-sm">No admins found</p>
          </div>
        ) : (
          adminlist.map(admin => (
            <div
              key={admin.id}
              className="group p-4 rounded-xl bg-gray-50/50 hover:bg-blue-50/30 border border-gray-100 hover:border-blue-100 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-blue-500/5 to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg shadow-inner shrink-0">
                    {admin.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                      {admin.name}
                    </h3>
                    <div className="flex flex-col gap-1 mt-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 group-hover:text-gray-600">
                        <Mail className="w-3 h-3 text-blue-400" />
                        <span className="wrap-break-word max-w-[180px] whitespace-normal">
                          {admin.email}{' '}
                          {admin.email == you && (
                            <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-linear-to-r from-blue-600 to-indigo-600 text-white text-[8px] font-bold rounded-full border-2 border-white shadow-sm uppercase tracking-wider">
                              You
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 group-hover:text-gray-600">
                        <Phone className="w-3 h-3 text-green-400" />
                        <span>{admin.phone_number}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
