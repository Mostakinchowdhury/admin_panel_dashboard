import { Dispatch, SetStateAction, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Deletediologwrap } from '../globals/Deletediolog';
import { Supercategory } from '@/app/type/supercate';
import { EditsuperCatediologwrap } from './Editcategory';

const SuperCategoryrow = ({
  className,
  supercat,
  setloading,
  handlefetch,
}: {
  className?: string;
  supercat: Supercategory;
  setloading: Dispatch<SetStateAction<boolean>>;
  handlefetch: () => Promise<void>;
}) => {
  const [checked, setChecked] = useState(false);
  // const ref = useRef<HTMLVideoElement>(null);
  return (
    <tr
      key={supercat.id}
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
        <span className="inline-block">{supercat.id}</span>
      </td>

      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {supercat.title}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {supercat.authorname || 'Not found'}
      </td>

      <td className="p-3 manrope txtstlh4 font-semibold items-center whitespace-nowrap text-center">
        <div className="w-full flex justify-center gap-2">
          <EditsuperCatediologwrap
            id={supercat.id}
            data={supercat}
            setloading={setloading}
            handlefetch={handlefetch}
          >
            <Button className="bg-primary text-white">
              {' '}
              <MdEdit />
            </Button>
          </EditsuperCatediologwrap>
          <Deletediologwrap
            id={supercat.id}
            model="Supercategory"
            query="supercategory"
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

export default SuperCategoryrow;
