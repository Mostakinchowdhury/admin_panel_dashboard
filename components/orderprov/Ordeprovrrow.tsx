import { useRef, useState, Dispatch, SetStateAction } from 'react';
import { GiCancel } from 'react-icons/gi';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { MdDelete, MdEdit, MdPendingActions } from 'react-icons/md';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Deletediologwrap } from '../globals/Deletediolog';
import { OrderProof } from '@/app/type/orderprove';
import Image from 'next/image';
import { VideoIcon } from 'lucide-react';
import { Videodiologwrap } from './Videodiolog';
import { EditDialogWrapper, FieldConfig } from '@/app/hooks/useEdit';

const Orderprovrow = ({
  className,
  orderprove,
  setloading,
  handlefetch,
}: {
  className?: string;
  orderprove: OrderProof;
  setloading: Dispatch<SetStateAction<boolean>>;
  handlefetch: () => Promise<void>;
}) => {
  const [checked, setChecked] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  const proofFields: FieldConfig<OrderProof>[] = [
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'PENDING', label: 'Pending' },
        { value: 'APPROVED', label: 'Approved' },
        { value: 'REJECTED', label: 'Rejected' },
      ],
    },
  ];

  const handlevideo = () => {
    if (!ref.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.error(err));
      return;
    }
    ref.current.requestFullscreen().catch(err => console.error(err));
  };

  return (
    <tr
      key={orderprove.id}
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
        <span className="inline-block">{orderprove.id}</span>
      </td>

      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {orderprove.order}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {orderprove.rider_name}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center flex justify-center items-center">
        <Image
          src={orderprove.proved_image_url}
          alt="Orderproveimage"
          height={60}
          width={60}
          className="object-cover size-14 block"
        />
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold text-center">
        <div className="w-full flex justify-center items-center">
          <Videodiologwrap src={orderprove.proved_video_url}>
            <Button className="flex items-center gap-1">
              <VideoIcon />
              <span>Watch video</span>
            </Button>
          </Videodiologwrap>
        </div>
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        <div
          className={`${
            orderprove.status == 'APPROVED'
              ? 'text-green-600'
              : orderprove.status == 'PENDING'
                ? 'text-yellow-600'
                : 'text-red-600'
          } rounded-lg p-1.5 flex items-center gap-2 justify-center w-fit mx-auto`}
        >
          <div
            className={`flex justify-center items-center rounded-full ${
              orderprove.status == 'APPROVED'
                ? 'text-green-600'
                : orderprove.status == 'PENDING'
                  ? 'text-yellow-600'
                  : 'text-red-600'
            }`}
          >
            {orderprove.status == 'APPROVED' ? (
              <IoCheckmarkDoneCircle className="size-3" />
            ) : orderprove.status == 'PENDING' ? (
              <MdPendingActions className="size-3" />
            ) : (
              <GiCancel className="size-3" />
            )}
          </div>
          {orderprove.status}
        </div>
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold items-center whitespace-nowrap text-center">
        <div className="w-full flex justify-center gap-2">
          <EditDialogWrapper
            id={orderprove.id}
            data={orderprove}
            query="api/order-proved"
            modelName="Order Proof"
            fields={proofFields}
            handlefetch={handlefetch}
          >
            <Button className="bg-primary text-white border-0 shadow-none hover:bg-primary/90">
              <MdEdit />
            </Button>
          </EditDialogWrapper>
          <Deletediologwrap
            id={orderprove.id}
            model="Order Prove"
            query="order-proved"
            setloading={setloading}
            handlefetch={handlefetch}
          >
            <Button className="bg-amber-900 text-white border-0 shadow-none hover:bg-amber-800">
              <MdDelete />
            </Button>
          </Deletediologwrap>
        </div>
      </td>
    </tr>
  );
};

export default Orderprovrow;
