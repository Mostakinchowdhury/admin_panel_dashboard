'use client';
import { hanldelogin } from '@/app/api/auth';
import useglobal from '@/app/context/Globalcontex';
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
import { ChangeEvent, FormEvent, ReactNode, useState } from 'react';

export function Dialoglogin({ children }: { children: ReactNode }) {
  const {
    setauth_loading,
    setis_authenticated,
    auth_loading,
    setrole,
    seterror,
  } = useglobal();
  const [form, setform] = useState({
    email: '',
    password: '',
  });
  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setform({ ...form, [name]: value });
  };
  const handleform = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await hanldelogin(
      form,
      setis_authenticated,
      setauth_loading,
      setrole,
      seterror,
      setform,
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleform}>
          <DialogHeader>
            <DialogTitle>Login here</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Email</Label>
              <Input
                id="name-1"
                name="email"
                value={form.email}
                type="email"
                required
                onChange={handlechange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handlechange}
              />
            </div>
          </div>
          <DialogFooter className="my-2.5">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {auth_loading ? 'loging...' : 'login'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
