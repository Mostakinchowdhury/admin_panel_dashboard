import { inboxes_type } from '@/assets/datas/inbox';
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useState,
} from 'react';
import { IoIosSend } from 'react-icons/io';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import api from '@/app/utils/api';
import Sloading from '../nessasery/Sloading';

export default function Inboxinput({
  className,
  recever,
  fetchinbox,
}: {
  className?: string;
  recever: number;
  fetchinbox: () => Promise<void>;
  setinbox: Dispatch<SetStateAction<inboxes_type[]>>;
}) {
  const [input, setinput] = useState<string>('');
  const [loading, setloading] = useState<boolean>(false);
  const handleSend = async () => {
    if (input === '') {
      toast.error('Please write something first');
      return;
    }
    setloading(true);
    try {
      await api.post('support/chatting/', {
        receiver: recever,
        message: input,
      });
      setinput('');
      fetchinbox();
    } catch (error: unknown) {
      console.error('Failed to send message:', error);
      const apiError = (
        error as {
          response?: { data?: { detail?: string; message?: string } };
        }
      )?.response?.data;
      const message =
        apiError?.detail ||
        apiError?.message ||
        (Array.isArray(apiError)
          ? apiError[0]
          : Object.values(apiError || {}).flat()[0]) ||
        'Failed to send message';
      toast.error(message);
    } finally {
      setloading(false);
    }
  };
  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    setinput(e.target.value);
  };
  const handlekeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      handleSend();
    }
  };

  return (
    <div
      className={`${
        className ? className : ''
      } flex items-center gap-1 border dark:border-border/50 rounded-lg shadow-sm bg-white dark:bg-card transition-colors`}
    >
      <Input
        placeholder="Write your message"
        className="focus-visible:ring-0 border-0 txtstlp placeholder:txtstlp text-font1 placeholder:text-font1 bg-transparent"
        value={input}
        onChange={handlechange}
        onKeyDown={handlekeydown}
      />
      <Button
        className="flex items-center gap-1 bg-secondary hover:bg-secondary/80 text-primary dark:text-primary-foreground h-11 px-6 rounded-r-lg transition-all active:scale-95"
        onClick={handleSend}
        disabled={loading}
      >
        {loading ? (
          <Sloading size={20} />
        ) : (
          <>
            <p className="font-bold text-sm">Send</p>
            <IoIosSend size={20} />
          </>
        )}
      </Button>
    </div>
  );
}
