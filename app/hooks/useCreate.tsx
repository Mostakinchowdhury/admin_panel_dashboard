'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';

// multiple item checked
const MultiSelect = ({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string | number }[];
  value: (string | number)[];
  onChange: (value: (string | number)[]) => void;
}) => {
  const toggleValue = (id: string | number) => {
    if (value.includes(id)) {
      onChange(value.filter(v => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start h-11 bg-gray-50/50 border-gray-100 rounded-xl"
        >
          {value.length > 0
            ? `${value.length} item selected`
            : 'Select options'}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 max-h-[30vh] overflow-y-auto scroll-custom">
        {options.map(item => (
          <div key={item.value} className="flex items-center gap-2 py-1">
            <Checkbox
              checked={value.includes(item.value)}
              onCheckedChange={() => toggleValue(item.value)}
            />
            <span>{item.label}</span>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

// multiple item checked

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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  FormEvent,
} from 'react';
import api from '../utils/api';
import { toast } from 'sonner';
import { Loader2, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FieldConfig } from './useEdit';
import axios from 'axios';
import useGlobal from '../context/Globalcontex';

/**
 * Generic hook for managing creation state and API calls
 */
function useCreate<T extends object>({
  query,
  setloading,
  initialData,
  handlefetch,
}: {
  query: string;
  setloading: Dispatch<SetStateAction<boolean>>;
  initialData: T;
  handlefetch: () => Promise<void>;
}) {
  const [form, setform] = useState<T>(initialData);

  const handlechange = (
    name: keyof T,
    value:
      | string
      | number
      | boolean
      | null
      | (string | number)[]
      | File
      | File[]
      | FileList,
  ) => {
    setform(pre => ({ ...pre, [name]: value }));
  };

  const resetForm = () => setform(initialData);

  const handlecreate = async () => {
    setloading(true);
    try {
      // Normalize query path with trailing slash to prevent POST -> GET redirect
      const normalizedQuery = query.endsWith('/') ? query : `${query}/`;

      // Check if form contains files
      const hasFiles = Object.values(form).some(
        value =>
          value instanceof File ||
          (Array.isArray(value) && value.some(v => v instanceof File)) ||
          value instanceof FileList,
      );

      let payload: FormData | T = form;

      if (hasFiles) {
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
          if (value instanceof FileList) {
            Array.from(value).forEach(file => formData.append(key, file));
          } else if (Array.isArray(value)) {
            value.forEach(v => {
              if (v instanceof File) {
                formData.append(key, v);
              } else if (v !== null && v !== undefined) {
                formData.append(key, String(v));
              }
            });
          } else if (value instanceof File) {
            formData.append(key, value);
          } else if (value !== null && value !== undefined) {
            formData.append(key, String(value));
          }
        });
        payload = formData;
      }

      const response = await api.post(normalizedQuery, payload, {
        headers: hasFiles
          ? { 'Content-Type': 'multipart/form-data' }
          : undefined,
      });

      // Strict success check: 201 Created is the standard for successful creation
      if (response.status === 201 || response.status === 200) {
        toast.success('Successfully created ✅');
        console.log(response);

        // Intelligent product images logic: find any field that is an array of Files
        const imageField = Object.values(form).find(
          val => Array.isArray(val) && val.some(v => v instanceof File),
        ) as File[] | undefined;

        if (
          normalizedQuery.includes('api/products/') &&
          imageField &&
          imageField.length > 0
        ) {
          const uploadPromises = imageField.map(async (f: File) => {
            if (!(f instanceof File)) return;
            const imgData = new FormData();
            imgData.append('product', String(response.data.id));
            imgData.append('file', f);
            return api.post('api/product-images/', imgData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
          });
          await Promise.all(uploadPromises);
        }

        await handlefetch();
        resetForm();
        return true;
      }
    } catch (error: unknown) {
      let message = 'Failed to create record ❌';

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          JSON.stringify(error.response?.data) ||
          message;
      } else if (error instanceof Error) {
        message = error.message + ' ❌';
      }

      console.log(error);
      toast.error(message);
    } finally {
      setloading(false);
    }
    return false;
  };

  return { handlecreate, form, handlechange, resetForm };
}

export default useCreate;

// ======================= Generic Component ========================

interface CreateDialogWrapperProps<T> {
  children?: ReactNode;
  initialData: T;
  query: string;
  modelName: string;
  fields: FieldConfig<T>[];
  handlefetch: () => Promise<void>;
}

export function CreateDialogWrapper<T extends object>({
  children,
  initialData,
  query,
  modelName,
  fields,
  handlefetch,
}: CreateDialogWrapperProps<T>) {
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);

  const { form, handlechange, handlecreate, resetForm } = useCreate<T>({
    query,
    setloading,
    initialData,
    handlefetch,
  });
  const { fetch_summery } = useGlobal();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const success = await handlecreate();
    await fetch_summery();
    if (success) {
      setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={v => {
        setOpen(v);
        if (!v) resetForm();
      }}
    >
      <DialogTrigger asChild>
        {children || (
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-5 h-11 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
            <Plus className="w-5 h-5" />
            <span>Add New {modelName}</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] overflow-hidden rounded-2xl shadow-2xl border-0  bg-white/95 backdrop-blur-md">
        <form onSubmit={onSubmit}>
          <DialogHeader className="space-y-3">
            <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <Plus className="text-green-600 w-6 h-6" />
            </div>
            <DialogTitle className="text-center text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600">
              Create New {modelName}
            </DialogTitle>
            <DialogDescription className="text-center text-gray-500 font-medium">
              Fill in the details to add a new record.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-6 px-1 max-h-[45vh] scroll-custom overflow-y-auto">
            {fields.map(field => (
              <div
                key={String(field.name)}
                className="grid gap-2 relative group"
              >
                <Label
                  htmlFor={String(field.name)}
                  className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-blue-500"
                >
                  {field.label}
                </Label>

                {field.type === 'select' ? (
                  field.multiple ? (
                    field.options && (
                      <MultiSelect
                        options={field.options}
                        value={
                          (form[field.name as keyof T] as (
                            | string
                            | number
                          )[]) ?? []
                        }
                        onChange={(v: (string | number)[]) =>
                          handlechange(field.name as keyof T, v)
                        }
                      />
                    )
                  ) : (
                    <Select
                      value={String(form[field.name as keyof T] ?? '')}
                      onValueChange={v =>
                        handlechange(field.name as keyof T, v)
                      }
                    >
                      <SelectTrigger className="h-11 bg-gray-50/50 border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map(option => (
                          <SelectItem
                            key={option.value}
                            value={String(option.value)}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )
                ) : field.type === 'textarea' ? (
                  <Textarea
                    id={String(field.name)}
                    name={String(field.name)}
                    required={!field.optional}
                    placeholder={
                      field.placeholder ||
                      `Enter ${field.label.toLowerCase()}...`
                    }
                    value={String(form[field.name as keyof T] ?? '')}
                    onChange={e =>
                      handlechange(field.name as keyof T, e.target.value)
                    }
                    className="h-24 bg-gray-50/50 border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 resize-none"
                  />
                ) : field.type === 'file' ? (
                  <Input
                    id={String(field.name)}
                    name={String(field.name)}
                    required={!field.optional}
                    type="file"
                    multiple={field.multiple}
                    onChange={e => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        handlechange(
                          field.name as keyof T,
                          field.multiple ? Array.from(files) : files[0],
                        );
                      }
                    }}
                    className="h-11 bg-gray-50/50 border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 pt-2"
                  />
                ) : (
                  <Input
                    id={String(field.name)}
                    name={String(field.name)}
                    type={field.type || 'text'}
                    placeholder={
                      field.placeholder ||
                      `Enter ${field.label.toLowerCase()}...`
                    }
                    multiple={field.multiple}
                    value={String(form[field.name as keyof T] ?? '')}
                    onChange={e => handlechange(field.name, e.target.value)}
                    className="h-11 bg-gray-50/50 border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200"
                    required={!field.optional}
                  />
                )}
              </div>
            ))}
          </div>

          <DialogFooter className="gap-3 sm:gap-0 border-t border-gray-100 pt-5 mt-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                className="rounded-xl font-bold text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all active:scale-95"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all active:scale-95 min-w-[120px]"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating...</span>
                </div>
              ) : (
                'Create Record'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
