import logo from '@/assets/images/favicon-smashing-magazine.png';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { GrView } from 'react-icons/gr';
import { Shop } from '@/app/type/Partners';
import { Deletediologwrap } from '../globals/Deletediolog';
import { Partnerinfodiologwrap } from './Infopartners';
import { EditDialogWrapper, FieldConfig } from '@/app/hooks/useEdit';

const Partnerrow = ({
  className,
  partner,
  handlefetch,
  setloading,
}: {
  className?: string;
  partner: Shop;
  handlefetch: () => Promise<void>;
  setloading: Dispatch<SetStateAction<boolean>>;
}) => {
  const [checked, setChecked] = useState(false);

  const partnerFields: FieldConfig<{
    status: 'APPROVED' | 'PENDING' | 'REJECTED';
    business_name: string;
    business_type: string;
    business_address: string;
    website: string;
  }>[] = [
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'PENDING', label: 'Pending' },
        { value: 'APPROVED', label: 'Approved' },
        { value: 'CANCELLED', label: 'CANCELLED' },
      ],
    },
    { name: 'business_name', label: 'Business Name' },
    { name: 'business_type', label: 'Business Type' },
    { name: 'business_address', label: 'Business Address', type: 'textarea' },
    {
      name: 'website',
      type: 'url',
      label: 'Website Url(optional)*',
      optional: true,
    },
  ];

  return (
    <tr
      key={partner.id}
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
        <span className="inline-block">{partner.id}</span>
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        <div className="flex justify-center items-center">
          <Image
            alt="buesness logo"
            width={40}
            height={40}
            className="object-cover size-10"
            src={partner.buesness_logo_url || logo}
          />
        </div>
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {partner.business_name}
      </td>
      <td
        className={`p-3 manrope txtstlh4 font-semibold text-center whitespace-nowrap`}
      >
        <div
          className={`${
            partner.status == 'APPROVED'
              ? 'border border-green-600 text-green-600 bg-green-50'
              : partner.status == 'PENDING'
                ? 'border border-yellow-600 text-yellow-600 bg-yellow-50'
                : 'border border-red-600 text-red-600 bg-blue-50'
          } rounded-lg p-1.5 flex items-center gap-1 justify-center w-fit mx-auto`}
        >
          <span
            className={`block size-3 rounded-full ${
              partner.status == 'APPROVED'
                ? 'bg-green-600'
                : partner.status == 'PENDING'
                  ? 'bg-yellow-600'
                  : 'bg-red-600'
            }`}
          ></span>
          {partner.status}
        </div>
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {partner.business_type}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {new Date(partner.created_at).toLocaleDateString('en-UK', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        })}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold flex gap-2 items-center whitespace-nowrap text-center justify-center">
        <Partnerinfodiologwrap id={partner.id} partner={partner}>
          <Button className="bg-primary text-white">
            {' '}
            <GrView />
          </Button>
        </Partnerinfodiologwrap>
        <EditDialogWrapper<{
          status: 'APPROVED' | 'PENDING' | 'REJECTED';
          business_name: string;
          business_type: string;
          business_address: string;
          website: string;
        }>
          id={partner.id}
          data={{
            status: partner.status,
            business_name: partner.business_name,
            business_type: partner.business_type,
            business_address: partner.business_address,
            website: partner.website,
          }}
          query="api/shops/"
          modelName="Partner"
          fields={partnerFields}
          handlefetch={handlefetch}
        >
          <Button className="bg-primary text-white">
            <MdEdit />
          </Button>
        </EditDialogWrapper>
        <Deletediologwrap
          id={partner.id}
          model="Partner"
          query="shops"
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

export default Partnerrow;
