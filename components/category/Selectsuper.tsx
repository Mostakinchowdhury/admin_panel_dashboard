import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Supercategory } from '@/app/type/supercate';

export function Selectsuper({
  value,
  setvalue,
  plac,
  data,
}: {
  plac: string;
  value: string;
  setvalue: (value: string) => void;
  data: Supercategory[];
}): React.ReactElement {
  return (
    <Select onValueChange={setvalue} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={plac} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Supercategory</SelectLabel>
          {data.map(sup => (
            <SelectItem value={sup.id.toString()} key={sup.id}>
              {sup.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
