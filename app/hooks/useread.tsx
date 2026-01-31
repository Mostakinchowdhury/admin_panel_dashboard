'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ReactNode, useState } from 'react';
import { Eye } from 'lucide-react';
import { FieldConfig } from './useEdit';

import Image from 'next/image';
import { GrView } from 'react-icons/gr';

// ======================= Generic Component ========================

interface ReadDialogWrapperProps<T> {
  children?: ReactNode;
  data: T;
  modelName: string;
  fields: FieldConfig<T>[];
  title?: string;
  description?: string;
}

export function ReadDialogWrapper<T extends object>({
  children,
  data,
  modelName,
  fields,
  title,
  description,
}: ReadDialogWrapperProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-primary text-white">
            {' '}
            <GrView />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] overflow-hidden rounded-2xl shadow-2xl border-0 bg-white/95 backdrop-blur-md">
        <DialogHeader className="space-y-3">
          <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <Eye className="w-6 h-6" />
          </div>
          <DialogTitle className="text-center text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600">
            {title || `${modelName} Details`}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500 font-medium">
            {description ||
              `Detailed information for this ${modelName.toLowerCase()}.`}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-6 px-1 max-h-[50vh] scroll-custom overflow-y-auto">
          {fields.map(field => {
            const value = data[field.name as keyof T];
            let displayValue: ReactNode = '-';

            if (value !== undefined && value !== null && value !== '') {
              if (field.type === 'image') {
                displayValue = (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                    <Image
                      src={String(value)}
                      alt={field.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                );
              } else if (field.type === 'select' && field.options) {
                if (Array.isArray(value)) {
                  displayValue = (
                    <div className="flex flex-wrap gap-1">
                      {value.map((v, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-md uppercase tracking-wider"
                        >
                          {field.options?.find(
                            opt => String(opt.value) === String(v),
                          )?.label || String(v)}
                        </span>
                      ))}
                    </div>
                  );
                } else {
                  displayValue =
                    field.options.find(
                      opt => String(opt.value) === String(value),
                    )?.label || String(value);
                }
              } else if (Array.isArray(value)) {
                displayValue = (
                  <div className="flex flex-wrap gap-1">
                    {value.map((v, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-md uppercase tracking-wider"
                      >
                        {String(v)}
                      </span>
                    ))}
                  </div>
                );
              } else if (typeof value === 'boolean') {
                displayValue = value ? (
                  <span className="text-green-600 font-bold">Yes</span>
                ) : (
                  <span className="text-red-600 font-bold">No</span>
                );
              } else {
                if (field.type === 'date') {
                  displayValue = new Date(String(value)).toLocaleDateString(
                    'en-UK',
                    {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    },
                  );
                } else {
                  displayValue = String(value);
                }
              }
            }
            return (
              <div
                key={String(field.name)}
                className="grid grid-cols-3 gap-4 items-center p-3 rounded-xl hover:bg-gray-50/50 transition-colors border border-transparent hover:border-gray-100"
              >
                <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest pt-1">
                  {field.label}
                </Label>
                <div className="col-span-2 text-sm font-medium text-gray-700 wrap-break-word">
                  {displayValue}
                </div>
              </div>
            );
          })}
        </div>

        <DialogFooter className="border-t border-gray-100 pt-5 mt-2">
          <DialogClose asChild>
            <Button
              type="button"
              className="w-full bg-linear-to-r from-gray-800 to-gray-900 hover:from-black hover:to-gray-800 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ReadDialogWrapper;
