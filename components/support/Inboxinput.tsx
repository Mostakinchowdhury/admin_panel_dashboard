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
      } flex items-center gap-1 border-[1px] border-gray-200 rounded-lg shadow-2xs`}
    >
      <Input
        placeholder="Write your message"
        className="focus-visible:ring-0 border-0 txtstlp placeholder:txtstlp text-font1 placeholder:text-font1"
        value={input}
        onChange={handlechange}
        onKeyDown={handlekeydown}
      />
      <Button
        className="flex items-center gap-1 bg-green-100 hover:bg-gray-100 h-full"
        onClick={handleSend}
        disabled={loading}
      >
        {' '}
        {loading ? (
          <Sloading size={25} />
        ) : (
          <>
            <p className="txtstlh4">Send</p>
            <IoIosSend size={25} color="#000" />
          </>
        )}
      </Button>
    </div>
  );
}
