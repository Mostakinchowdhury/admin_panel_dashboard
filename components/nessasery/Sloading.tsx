import { Loader } from 'lucide-react';
import React from 'react';

export default function Sloading({ size }: { size?: number | string }) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loader size={size || 32} className="animate-spin" />
    </div>
  );
}
