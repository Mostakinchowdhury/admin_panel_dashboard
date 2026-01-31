import { Dispatch, SetStateAction, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { User } from '@/app/type/user';
import { Deletediologwrap } from '../globals/Deletediolog';
import { Userinfodiologwrap } from './Userinfowrap';
import { GrView } from 'react-icons/gr';
import { EditDialogWrapper, FieldConfig } from '@/app/hooks/useEdit';

const Userrow = ({
  className,
  user,
  setloading,
  handlefetch,
}: {
  className?: string;
  user: User;
  setloading: Dispatch<SetStateAction<boolean>>;
  handlefetch: () => Promise<void>;
}) => {
  const [checked, setChecked] = useState(false);

  const userFields: FieldConfig<{
    first_name: string;
    last_name: string;
    role: string;
  }>[] = [
    { name: 'first_name', label: 'First Name' },
    { name: 'last_name', label: 'Last Name' },
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
  ];

  return (
    <tr
      key={user.id}
      className={`border-b transition-colors duration-200 ${
        checked ? 'bg-blue-50' : 'bg-white'
      } ${className ? className : ''} hover:bg-blue-50`}
    >
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center has-checked:bg-amber-300">
        <Checkbox
          checked={checked}
          onCheckedChange={val => setChecked(!!val)}
          className="mx-2 inline-block"
        />
        <span className="inline-block">{user.id}</span>
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {`${user.first_name} ${user.last_name}`}
      </td>
      <td
        className={`p-3 manrope txtstlh4 font-semibold text-center whitespace-nowrap`}
      >
        <div
          className={`${
            user.role == 'Admin'
              ? 'border border-green-600 text-green-600 bg-green-50'
              : user.role == 'Partner'
                ? 'border border-yellow-600 text-yellow-600 bg-yellow-50'
                : 'border border-blue-600 text-blue-600 bg-blue-50'
          } rounded-lg p-1.5 flex items-center gap-1 justify-center w-fit mx-auto`}
        >
          <span
            className={`block size-3 rounded-full ${
              user.role == 'Admin'
                ? 'bg-green-600'
                : user.role == 'Partner'
                  ? 'bg-yellow-600'
                  : 'bg-blue-600'
            }`}
          ></span>
          {user.role}
        </div>
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {new Date(user.created_at).toLocaleString('us', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        })}
      </td>

      <td className="p-3 manrope txtstlh4 font-semibold flex gap-2 items-center whitespace-nowrap text-center justify-center">
        <Userinfodiologwrap id={user.id} user={user}>
          <Button className="bg-primary text-white">
            {' '}
            <GrView />
          </Button>
        </Userinfodiologwrap>
        <EditDialogWrapper<{
          first_name: string;
          last_name: string;
          role: string;
        }>
          id={user.id}
          data={{
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role.toLocaleLowerCase(),
          }}
          query="mam/changeusername"
          modelName="User"
          fields={userFields}
          handlefetch={handlefetch}
        >
          <Button className="bg-primary text-white">
            <MdEdit />
          </Button>
        </EditDialogWrapper>
        <Deletediologwrap
          id={user.id}
          model="User"
          query="mam/deleteuser"
          setloading={setloading}
          handlefetch={handlefetch}
        >
          <Button className="bg-amber-900 text-white">
            <MdDelete />
          </Button>
        </Deletediologwrap>
      </td>
    </tr>
  );
};

export default Userrow;
