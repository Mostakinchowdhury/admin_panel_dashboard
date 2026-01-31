import { hanldelogin } from '@/app/api/auth';
import useglobal from '@/app/context/Globalcontex';
import { ChangeEvent, FormEvent, useState } from 'react';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { Mail, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import bgc from '../../assets/images/backgroundimage.avif';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';

export default function Logincom() {
  const {
    setauth_loading,
    setis_authenticated,
    auth_loading,
    setrole,
    error,
    seterror,
  } = useglobal();
  const [form, setform] = useState({
    email: '',
    password: '',
  });
  const [show, setshow] = useState<boolean>(false);
  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setform({ ...form, [name]: value });
  };
  const handleform = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await hanldelogin(
        form,
        setis_authenticated,
        setauth_loading,
        setrole,
        seterror,
        setform,
      );
    } catch (error: unknown) {
      console.error('Edit failed:', error);
      const apiError = (
        error as { response?: { data?: { detail?: string; message?: string } } }
      )?.response?.data;
      const message =
        apiError?.detail ||
        apiError?.message ||
        (Array.isArray(apiError)
          ? apiError[0]
          : Object.values(apiError || {}).flat()[0]) ||
        'Failed to logged in';
      toast.error(message);
    }
  };
  return (
    <div
      className="relative w-screen h-screen flex justify-center items-center bg-no-repeat bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgc.src})`,
      }}
    >
      {/* Dark Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>

      {/* Glassmorphism Card */}
      <div className="relative z-10 w-[90%] md:w-[450px] bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-linear-to-br from-blue-500 to-purple-600 rounded-full shadow-lg mb-4">
            <ShieldCheck className="text-white w-8 h-8" />
          </div>
          <h2 className="font-extrabold text-4xl text-transparent bg-clip-text bg-linear-to-r from-blue-200 to-purple-200 tracking-tight text-center">
            Admin Portal
          </h2>
          <p className="text-blue-200/80 text-sm mt-2 font-medium">
            Secure Access Gateway
          </p>
        </div>

        <div className="bg-blue-900/40 border border-blue-500/30 p-3 rounded-xl mb-6 backdrop-blur-md">
          <div className="flex gap-2 items-start">
            <AlertCircle className="text-blue-400 w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-100 leading-relaxed">
              Authorized access only. Please enter your{' '}
              <span className="text-blue-300 font-bold">Admin, Rider,</span> or
              <span className="text-blue-300 font-bold"> Partner</span>{' '}
              credentials.
              <span className="block mt-1 text-red-300 font-semibold border-t border-blue-500/30 pt-1">
                Not for general users.
              </span>
            </p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleform}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/90 font-medium ml-1">
              Email Address
            </Label>
            <div className="relative group">
              <div className="absolute top-1/2 -translate-y-1/2 left-3 text-blue-200 transition-colors group-focus-within:text-blue-400">
                <Mail size={20} />
              </div>
              <Input
                id="email"
                name="email"
                value={form.email}
                type="email"
                required
                onChange={handlechange}
                placeholder="name@example.com"
                className="pl-10 h-12 bg-black/20 border-white/10 text-white placeholder:text-white/40 focus:border-blue-400/50 focus:bg-black/30 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-white/90 font-medium ml-1"
            >
              Password
            </Label>
            <div className="relative group">
              <div className="absolute top-1/2 -translate-y-1/2 left-3 text-blue-200 transition-colors group-focus-within:text-blue-400">
                <Lock size={20} />
              </div>
              <Input
                id="password"
                name="password"
                type={show ? 'text' : 'password'}
                required
                value={form.password}
                onChange={handlechange}
                placeholder="Enter your password"
                className="pl-10 pr-12 h-12 bg-black/20 border-white/10 text-white placeholder:text-white/40 focus:border-blue-400/50 focus:bg-black/30 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setshow(pre => !pre)}
                className="absolute top-1/2 -translate-y-1/2 right-3 text-blue-200 hover:text-white transition-colors p-1"
              >
                {show ? <IoIosEyeOff size={22} /> : <IoIosEye size={22} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 animate-in slide-in-from-top-2">
              <p className="text-red-200 font-bold text-sm text-center">
                {error}
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_rgba(79,70,229,0.7)] transform transition-all duration-300 hover:-translate-y-1 active:scale-95"
            disabled={auth_loading}
          >
            {auth_loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Authenticating...</span>
              </div>
            ) : (
              'Login to Dashboard'
            )}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-blue-200/50">
            &copy; 2025 Admin Panel. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
