'use client';
import { fetchuser } from '@/app/api/fetchuser';
import useHeader from '@/app/context/Headercontext';
import useUsercontext from '@/app/context/Userpage';
import { User } from '@/app/type/user';
import { Userrole } from '@/assets/datas/user';
import Mypagination from '@/components/globals/Mypagination';
import { Spinner } from '@/components/nessasery/Spinner';
import { Button } from '@/components/ui/button';
import Overviewboxusers from '@/components/users/Overviewboxusers';
import Userrow from '@/components/users/Userrow';
import Usersortdiologsection from '@/components/users/Usersortdiologsection';
import { CreateDialogWrapper } from '@/app/hooks/useCreate';
import { useEffect, useState } from 'react';
import { BiSort } from 'react-icons/bi';
import { FaUser, FaUsers, FaUsersCog, FaUserSecret } from 'react-icons/fa';
import useGlobal, { useSummery } from '@/app/context/Globalcontex';

const Userspage = () => {
  const [tabs, settabs] = useState<string>('All');
  const [count, setcount] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [totalpages, settotalpages] = useState<number>(1);
  const {
    exinput: searchvalue,
    setexinput,
    setsearchvalue,
  } = useHeader() ?? {};
  const [users, setusers] = useState<User[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const { user_sortby } = useUsercontext() ?? { user_sortby: 'df' };
  const { summery, sloading } = useSummery();
  const props = { page, setpage, totalpages };
  // Reset page when search or sort changes
  useEffect(() => {
    setpage(1);
  }, [searchvalue, user_sortby]);

  useEffect(() => {
    return () => {
      setsearchvalue?.('');
      setexinput?.('');
    };
  }, [setsearchvalue, setexinput]);

  // ========================== fetch users ===================
  useEffect(() => {
    fetchuser({
      setloading,
      setusers,
      settotalpages,
      page,
      setcount,
      search: searchvalue,
      status: tabs,
      sortby: user_sortby,
    });
  }, [page, searchvalue, tabs, user_sortby]);
  return (
    <div className="p-3 md:p-6 space-y-5 overflow-y-auto grow scroll-custom">
      {/* top overview section */}
      <section className="bg-white p-2.5">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold manrope text-font1">
            Users Over View
          </h3>
          <CreateDialogWrapper
            initialData={{
              first_name: '',
              last_name: '',
              email: '',
              password: '',
              role: 'customer',
            }}
            query="mam/usercreate/"
            modelName="User"
            fields={[
              { name: 'first_name', label: 'First Name' },
              { name: 'last_name', label: 'Last Name' },
              { name: 'email', label: 'Email', type: 'email' },
              { name: 'password', label: 'Password', type: 'password' },
              {
                name: 'role',
                label: 'Role',
                type: 'select',
                options: [
                  { value: 'admin', label: 'Admin' },
                  { value: 'staff', label: 'Staff/Partner' },
                  { value: 'rider', label: 'Rider' },
                  { value: 'customer', label: 'Customer' },
                ],
              },
            ]}
            handlefetch={async () => {
              await fetchuser({
                setloading,
                setusers,
                settotalpages,
                page,
                setcount,
                search: searchvalue,
                status: tabs,
                sortby: user_sortby,
              });
            }}
          >
            <Button className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white font-bold rounded-xl px-6 h-12 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
              <FaUsers className="w-5 h-5" />
              <span>Add New User</span>
            </Button>
          </CreateDialogWrapper>
        </div>
        {/* orders overview boxes */}
        <div className="px-3 py-2 grid-auto-fit-180 gap-5">
          {/*Total Users */}
          <Overviewboxusers
            amout={sloading ? '...' : summery.total_users}
            p={'Total Users'}
            icon={FaUsers}
            className="border-2 border-gray-300 rounded-xl"
          />
          {/* Total Admins */}
          <Overviewboxusers
            amout={sloading ? '...' : summery.total_admin}
            p={'Total Admins'}
            icon={FaUserSecret}
            className="border-2 border-gray-300 rounded-xl"
          />
          {/* Total Staff */}
          <Overviewboxusers
            amout={sloading ? '...' : summery.total_staff}
            p={'Total Staff'}
            icon={FaUsersCog}
            className="border-2 border-gray-300 rounded-xl"
          />
          {/* General Users */}
          <Overviewboxusers
            amout={summery.total_customer}
            p={'All Customers'}
            icon={FaUser}
            className="border-2 border-[rgba(206,145,120,1)] bg-[rgba(206,145,120,0.1)] rounded-xl"
            classNameib="border-2 border-[rgba(206,145,120,0.9)] bg-[rgba(206,145,120,0.5)]"
          />
        </div>
      </section>
      {/* sort by and filter */}
      <section className="flex md:justify-between md:items-center flex-col md:flex-row gap-2">
        {/* tabs */}
        <div className="flex items-center gap-2 rounded-lg bg-white p-1 w-full overflow-x-auto scroll-hide md:w-auto">
          {Userrole.map((dt, ind) => (
            <Button
              key={ind}
              className={`cursor-pointer txtstlh4 ${
                tabs == dt
                  ? 'bg-primary text-white font-bold hover:text-font2 hover:bg-primary'
                  : 'bg-transparent font-medium text-font1 rounded-none hover:bg-transparent hover:text-font2'
              }`}
              onClick={() => {
                settabs(dt);
                setpage(1);
              }}
            >
              {dt}
            </Button>
          ))}
        </div>
        {/* filter and sort */}
        <div className="flex items-center gap-2.5 bg-white p-3 rounded-lg ml-auto md:ml-0">
          <Usersortdiologsection icon={BiSort} />
        </div>
      </section>
      {/* {
    id: 2,
    firstname: "Rahim",
    : "Hossain",
    : "rahim.hossain@gmail.com",
    : "01798765432",
    isstaff: true,
    superadmin: false,
    created_date: "2024-03-18"
  } */}
      {/* table section */}
      {loading ? (
        <Spinner />
      ) : (
        <section className="bg-white p-4 max-w-full w-full overflow-x-auto block scroll-custom">
          <table className="border-none m-0 w-full">
            <thead className="p-2 rounded-t-xl bg-primary">
              <tr className="">
                <th className="text-white txtstlh4 p-3 text-center whitespace-nowrap">
                  User ID
                </th>
                <th className="text-white txtstlh4 p-3 text-center whitespace-nowrap">
                  Name
                </th>
                <th className="text-white txtstlh4 p-3 text-center whitespace-nowrap">
                  Role
                </th>
                <th className="text-white txtstlh4 p-3 text-center whitespace-nowrap">
                  Date
                </th>
                <th className="text-white txtstlh4 p-3 text-center whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="">
              {users.map(user => (
                <Userrow
                  user={user}
                  key={user.id}
                  setloading={setloading}
                  handlefetch={async () => {
                    await fetchuser({
                      setloading,
                      setusers,
                      settotalpages,
                      page,
                      setcount,
                      search: searchvalue,
                      status: tabs,
                      sortby: user_sortby,
                    });
                  }}
                />
              ))}
            </tbody>
          </table>
        </section>
      )}
      <div className="w-fit ml-auto bg-accent-foreground select-none p-2 rounded-md text-white font-bold text-lg">
        {count.toString().concat(' Records')}
      </div>
      {/* section of pagination */}
      <Mypagination {...props} />
    </div>
  );
};

export default Userspage;
