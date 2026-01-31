import inbox_data, { inboxes_type } from '@/assets/datas/inbox'
import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useState } from 'react'
import { IoIosSend } from 'react-icons/io'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export default function Inboxinput({
  className,
  recever,
  setinbox
}: {
  className?: string
  recever: number
  setinbox: Dispatch<SetStateAction<inboxes_type[]>>
}) {
  const [input, setinput] = useState<string>('')
  const handleSend = () => {
    if (input === '') {
      alert('Empty Message not allow to send write something at first')
      return
    }
    setinbox((pre) => [
      ...pre,
      {
        id: inbox_data[inbox_data.length - 1]?.id + 1,
        sender_id: 4,
        recever_id: recever,
        message: input,
        send_at: new Date().toISOString(),
        isseen: false
      }
    ])
    setinput('')
  }
  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    setinput(e.target.value)
  }
  const handlekeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      handleSend()
    }
  }
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
      >
        <p className="txtstlh4">Send</p>
        <IoIosSend size={25} color="#000" />
      </Button>
    </div>
  )
}
