import { Dispatch, SetStateAction, useState } from 'react';
import { FcProcess } from 'react-icons/fc';
import { GiCancel } from 'react-icons/gi';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { MdDelete, MdEdit, MdPendingActions } from 'react-icons/md';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Order } from '@/app/type/orders';
import { GrView } from 'react-icons/gr';
import { Orderinfodiologwrap } from './Infodiolog';
import { Deletediologwrap } from '../globals/Deletediolog';
import { EditDialogWrapper, FieldConfig } from '@/app/hooks/useEdit';
import useGlobal from '@/app/context/Globalcontex';

const Orderrow = ({
  className,
  order,
  setloading,
  handlefetch,
}: {
  className?: string;
  order: Order;
  setloading: Dispatch<SetStateAction<boolean>>;
  handlefetch: () => Promise<void>;
}) => {
  const [checked, setChecked] = useState(false);

  // Define fields for generic edit dialog
  const orderFields: FieldConfig<Order>[] = [
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'PENDING', label: 'Pending' },
        { value: 'PAIDANDPROCESSING', label: 'Paid and Processing' },
        { value: 'CASHANDPROCESSING', label: 'Cash and Processing' },
        { value: 'DELIVERED', label: 'Delivered' },
        { value: 'CANCELLED', label: 'Cancelled' },
      ],
    },
  ];

  const { role } = useGlobal() ?? {};

  return (
    <tr
      key={order.id}
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
        <span className="inline-block">{order.id}</span>
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {new Date(order.ordered_at).toLocaleString('us', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        })}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {order.user_email}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        ${order.amount}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        <div
          className={`${
            order.status == 'DELIVERED'
              ? 'text-green-600'
              : order.status == 'PENDING'
                ? 'text-yellow-600'
                : order.status == 'PAIDANDPROCESSING' ||
                    order.status == 'CASHANDPROCESSING'
                  ? 'text-blue-600'
                  : 'text-red-600'
          } rounded-lg p-1.5 flex items-center gap-2 justify-center w-fit mx-auto`}
        >
          <div
            className={`flex justify-center items-center rounded-full ${
              order.status == 'DELIVERED'
                ? 'text-green-600'
                : order.status == 'PENDING'
                  ? 'text-yellow-600'
                  : order.status == 'PAIDANDPROCESSING' ||
                      order.status == 'CASHANDPROCESSING'
                    ? 'text-blue-600'
                    : 'text-red-600'
            }`}
          >
            {order.status == 'DELIVERED' ? (
              <IoCheckmarkDoneCircle className="size-3" />
            ) : order.status == 'PENDING' ? (
              <MdPendingActions className="size-3" />
            ) : order.status == 'PAIDANDPROCESSING' ||
              order.status == 'CASHANDPROCESSING' ? (
              <FcProcess className="size-3" />
            ) : (
              <GiCancel className="size-3" />
            )}
          </div>
          {order.status}
        </div>
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {order.rider || 'Dayfey'}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold flex gap-2 items-center whitespace-nowrap text-center">
        <Orderinfodiologwrap id={order.id} order={order}>
          <Button className="bg-primary text-white">
            {' '}
            <GrView />
          </Button>
        </Orderinfodiologwrap>
        {role == 'admin' && (
          <>
            <EditDialogWrapper
              id={order.id}
              data={order}
              query="api/orders"
              modelName="Order"
              fields={orderFields}
              handlefetch={handlefetch}
            >
              <Button className="bg-primary text-white">
                {' '}
                <MdEdit />
              </Button>
            </EditDialogWrapper>
            <Deletediologwrap
              id={order.id}
              model="Order"
              query="orders"
              setloading={setloading}
              handlefetch={handlefetch}
            >
              <Button className="bg-amber-900 text-white">
                <MdDelete />
              </Button>
            </Deletediologwrap>
          </>
        )}
      </td>
    </tr>
  );
};

export default Orderrow;
