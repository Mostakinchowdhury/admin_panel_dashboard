'use client';
import { Dispatch, useState, SetStateAction } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Promocode } from '@/app/type/promocode';
import { Deletediologwrap } from '../globals/Deletediolog';
import { EditPromodiologwrap } from './Editpromodiolog';

const Promorow = ({
  className,
  promocode,
  setloading,
  handlefetch,
}: {
  className?: string;
  promocode: Promocode;
  setloading: Dispatch<SetStateAction<boolean>>;
  handlefetch: () => Promise<void>;
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <tr
      key={promocode.id}
      className={`border-b transition-colors duration-200 ${
        checked ? 'bg-blue-50' : 'bg-white'
      } ${className ? className : ''} hover:bg-blue-50`}
    >
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        <Checkbox
          checked={checked}
          onCheckedChange={(val: boolean) => setChecked(val)}
          className="mx-2 inline-block"
        />
        <span className="inline-block">{promocode.id}</span>
      </td>

      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {promocode.code}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center text-green-600">
        {promocode.discount_percent}%
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {promocode.active ? (
          <span className="text-green-500">Active</span>
        ) : (
          <span className="text-red-500">Inactive</span>
        )}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {promocode.max_uses} ({promocode.max_uses_per_user}/user)
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {promocode.used_count || '0'}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {new Date(promocode.valid_from).toLocaleDateString()}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {!promocode.valid_to
          ? 'Not Set'
          : new Date(promocode.valid_to).toLocaleDateString()}
      </td>

      <td className="p-3 manrope txtstlh4 font-semibold items-center whitespace-nowrap text-center">
        <div className="w-full flex justify-center gap-2">
          <EditPromodiologwrap
            id={promocode.id}
            data={promocode}
            setloading={setloading}
            handlefetch={handlefetch}
          >
            <Button className="bg-primary text-white">
              <MdEdit />
            </Button>
          </EditPromodiologwrap>

          <Deletediologwrap
            id={promocode.id}
            model="Promocode"
            query="promocodes"
            setloading={setloading}
            handlefetch={handlefetch}
          >
            <Button className="bg-amber-900 text-white">
              <MdDelete />
            </Button>
          </Deletediologwrap>
        </div>
      </td>
    </tr>
  );
};

export default Promorow;
