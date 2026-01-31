import img from '@/assets/images/image-avatar.webp';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import { GrView } from 'react-icons/gr';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Deletediologwrap } from '../globals/Deletediolog';
import { Riderinfodiologwrap } from './Inforider';
import { EditDialogWrapper, FieldConfig } from '@/app/hooks/useEdit';
import { Rider } from '@/app/type/Riders';

const Riderrow = ({
  className,
  rider,
  setloading,
  handlefetch,
}: {
  className?: string;
  rider: Rider;
  setloading: Dispatch<SetStateAction<boolean>>;
  handlefetch: () => Promise<void>;
}) => {
  const [checked, setChecked] = useState(false);

  const riderFields: FieldConfig<{
    status: string;
    working_area_address: string;
    permanent_address: string;
    photo?: File | null;
  }>[] = rider.photo_url
    ? [
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          options: [
            { value: 'PENDING', label: 'Pending' },
            { value: 'APPROVED', label: 'Approved' },
            { value: 'CANCELLED', label: 'Cancelled' },
          ],
        },
        {
          name: 'working_area_address',
          label: 'Working Area',
          type: 'textarea',
        },
        {
          name: 'permanent_address',
          label: 'Permanent Address',
          type: 'textarea',
        },
      ]
    : [
        {
          name: 'photo',
          label: 'Upload Your Photo(optional)*',
          type: 'file',
          optional: true,
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          options: [
            { value: 'PENDING', label: 'Pending' },
            { value: 'APPROVED', label: 'Approved' },
            { value: 'CANCELLED', label: 'Cancelled' },
          ],
        },
        {
          name: 'working_area_address',
          label: 'Working Area',
          type: 'textarea',
        },
        {
          name: 'permanent_address',
          label: 'Permanent Address',
          type: 'textarea',
        },
      ];

  return (
    <tr
      key={rider.id}
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
        <span className="inline-block">{rider.id}</span>
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {rider.name}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        <div className="flex justify-center items-center">
          <Image
            alt="rider photo"
            width={40}
            height={40}
            className="object-cover size-10 aspect-square rounded-full"
            src={rider.photo_url || img}
          />
        </div>
      </td>

      <td
        className={`p-3 manrope txtstlh4 font-semibold text-center whitespace-nowrap`}
      >
        <div
          className={`${
            rider.status == 'APPROVED'
              ? 'border border-green-600 text-green-600 bg-green-50'
              : rider.status == 'PENDING'
                ? 'border border-yellow-600 text-yellow-600 bg-yellow-50'
                : 'border border-red-600 text-red-600 bg-blue-50'
          } rounded-lg p-1.5 flex items-center gap-1 justify-center w-fit mx-auto`}
        >
          <span
            className={`block size-3 rounded-full ${
              rider.status == 'APPROVED'
                ? 'bg-green-600'
                : rider.status == 'PENDING'
                  ? 'bg-yellow-600'
                  : 'bg-red-600'
            }`}
          ></span>
          {rider.status}
        </div>
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {new Date(rider.created_at).toLocaleDateString('en-UK', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        })}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold flex gap-2 items-center whitespace-nowrap text-center justify-center">
        <Riderinfodiologwrap id={rider.id} rider={rider}>
          <Button className="bg-primary text-white">
            {' '}
            <GrView />
          </Button>
        </Riderinfodiologwrap>
        <EditDialogWrapper<{
          status: string;
          working_area_address: string;
          permanent_address: string;
          photo?: File | null;
        }>
          id={rider.id}
          data={
            rider.photo_url
              ? {
                  status: rider.status,
                  working_area_address: rider.working_area_address,
                  permanent_address: rider.permanent_address,
                }
              : {
                  status: rider.status,
                  working_area_address: rider.working_area_address,
                  permanent_address: rider.permanent_address,
                  photo: null,
                }
          }
          query="api/riders"
          modelName="Rider"
          fields={riderFields}
          handlefetch={handlefetch}
        >
          <Button className="bg-primary text-white">
            <MdEdit />
          </Button>
        </EditDialogWrapper>
        <Deletediologwrap
          id={rider.id}
          query="riders"
          model="Rider"
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

export default Riderrow;
