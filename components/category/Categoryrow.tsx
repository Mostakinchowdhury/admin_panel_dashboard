import { Dispatch, SetStateAction, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Deletediologwrap } from '../globals/Deletediolog';
import Image from 'next/image';
import { Category } from '@/app/type/category';
import { EditCategorydiologwrap } from './Editcategory';

const Categoryrow = ({
  className,
  category,
  setloading,
  handlefetch,
}: {
  className?: string;
  category: Category;
  setloading: Dispatch<SetStateAction<boolean>>;
  handlefetch: () => Promise<void>;
}) => {
  const [checked, setChecked] = useState(false);
  // const ref = useRef<HTMLVideoElement>(null);
  return (
    <tr
      key={category.id}
      className={`border-b transition-colors duration-200 ${
        checked ? 'bg-blue-50' : 'bg-white'
      } ${className ? className : ''} hover:bg-blue-50`}
    >
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center has-checked:bg-amber-300">
        <Checkbox
          checked={checked}
          onCheckedChange={(val: boolean) => setChecked(val)}
          className="mx-2 inline-block"
        />
        <span className="inline-block">{category.id}</span>
      </td>

      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {category.name}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {category.supercategory_name || 'Not Found'}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        <div className="w-full flex justify-center items-center">
          {category.image_url ? (
            <Image
              src={category.image_url}
              alt="Category image"
              width={60}
              height={60}
              className="aspect-square object-cover"
            />
          ) : (
            <h3>Not set</h3>
          )}
        </div>
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {category.authorname || 'Not found'}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {(category.description.length > 50
          ? category.description.slice(0, 51)
          : category.description) || 'Not set'}
      </td>

      <td className="p-3 manrope txtstlh4 font-semibold items-center whitespace-nowrap text-center">
        <div className="w-full flex justify-center gap-2">
          <EditCategorydiologwrap
            id={category.id}
            data={category}
            setloading={setloading}
            handlefetch={handlefetch}
          >
            <Button className="bg-primary text-white">
              {' '}
              <MdEdit />
            </Button>
          </EditCategorydiologwrap>

          <Deletediologwrap
            id={category.id}
            model="Category"
            query="categories"
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

export default Categoryrow;
