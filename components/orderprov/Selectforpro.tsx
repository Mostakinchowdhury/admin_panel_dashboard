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

export function Selectprov({
  value,
  setvalue,
  plac,
}: {
  children: React.ReactNode;
  plac: string;
}) {
  return (
    <Select onValueChange={setvalue} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={plac} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="APPROVED">APPROVED</SelectItem>
          <SelectItem value="PENDING">PENDING</SelectItem>
          <SelectItem value="CANCELLED">CANCELLED</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
