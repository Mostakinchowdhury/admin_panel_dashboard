'use client'
import useHeader from '@/app/context/Headercontext'
import inbox_data, { filter_userlist, findlastmessage, inboxes_type } from '@/assets/datas/inbox'
import profile from '@/assets/images/image-avatar.webp'
import Inboxinput from '@/components/support/Inboxinput'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { MdDelete } from 'react-icons/md'

const Support_page = () => {
  const [recever, setrecever] = useState<number>(0)
  const { exinput, setexinput, setsearchvalue } = useHeader()
  const [inbox, setinbox] = useState<inboxes_type[]>([])
  const [userlist, setuserlist] = useState<number[]>([])
  const scrollRef = useRef<HTMLUListElement>(null)
  const secRef = useRef(null)
  const hanldedelete = (id: number) => {
    setinbox((pre) => pre.filter((i) => i.id != id))
  }

  useEffect(() => {
    return () => {
      setexinput('')
      setsearchvalue('')
      setrecever(0)
    }
  }, [])

  useEffect(() => {
    setinbox(
      inbox_data.filter(
        (ind) =>
          (ind.sender_id == 4 && ind.recever_id == recever) ||
          (ind.sender_id == recever && ind.recever_id == 4)
      )
    )
    setuserlist(
      filter_userlist(4).filter((i) => `User ${i}`.toLowerCase().includes(exinput.toLowerCase()))
    )
  }, [recever, exinput])
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [inbox, recever])

  return (
    <div className="p-3 md:p-6 space-y-5 overflow-y-auto grow flex gap-6 !overflow-hidden min-h-0">
      {/* left side users listing section */}
      <section className="bg-white p-3 space-y-2 md:flex flex-col items-center hidden md:w-1/3 lg:w-2/4 max-w-sm h-full min-h-0">
        <h2 className="txtstlh2">Inbox</h2>
        <ul className="w-full h-full overflow-y-auto scroll-custom flex flex-col gap-3 p-4">
          {userlist.map((userid) => (
            <li
              className={`cursor-pointer flex items-center gap-1 hover:bg-gray-200 p-2 rounded-lg ${
                recever == userid ? 'bg-gray-200' : 'bg-green-100'
              }`}
              key={userid}
              onClick={() => {
                setrecever(userid)
              }}
            >
              <div className={`size-5 rounded-full bg-green-600 mx-2`}></div>
              <Image alt="Profile" src={profile} width={50} height={50} />
              <div>
                <h3 className="txtstlh3 font-bold">{`User ${userid}`}</h3>
                <p className="txtstlp text-font3 text-font1">
                  {findlastmessage(userid).length > 30
                    ? findlastmessage(userid).slice(0, 27) + '...'
                    : findlastmessage(userid)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      {/* right side messsage section */}
      <section className="bg-white p-4 space-y-2 h-full min-h-0 flex-1 relative">
        <ul
          className="space-y-2 flex flex-col !overflow-y-auto scroll-custom h-full pb-[80px] min-h-0 scroll-hide"
          ref={scrollRef}
        >
          {inbox.length == 0 ? (
            <h2 className="txtstlh3 absolute top-1/2 left-1/2 -translate-1/2 text-gray-600">
              Select at first any one one
            </h2>
          ) : (
            inbox.map((itm) =>
              itm.recever_id == 4 ? (
                <li className={`w-fit flex items-end gap-1.5 max-w-[80%]`} key={itm.id}>
                  <Image src={profile} alt="profile" width={25} height={25} />
                  <div className="space-y-2 bg-gray-200 p-2.5 rounded-lg rounded-bl-none mb-2">
                    <p className="txtstlp font-normal text-font1">{itm.message}</p>
                    <div className="ml-auto w-fit flex items-center gap-2">
                      <h4 className="txtstlp font-bold ml-auto w-fit text-font1">
                        {new Date(itm.send_at).getDate() == new Date().getDate()
                          ? new Date(itm.send_at).toLocaleString('en-UK', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : new Date(itm.send_at).toLocaleString('en-UK', {
                              year: 'numeric',
                              month: 'short',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                      </h4>
                      <Button
                        className="w-fit ml-auto !p-0 !rounded-none"
                        variant={'ghost'}
                        onClick={() => hanldedelete(itm.id)}
                      >
                        <MdDelete color="#000" size={25} />
                      </Button>
                    </div>
                  </div>
                </li>
              ) : (
                <li className={`w-fit flex items-end gap-1.5 ml-auto max-w-[80%]`} key={itm.id}>
                  <div className="space-y-2 bg-gray-200 p-2.5 rounded-lg rounded-br-none mb-2">
                    <p className="txtstlp font-normal text-font1">{itm.message}</p>
                    <div className="ml-auto w-fit flex items-center gap-2">
                      <h4 className="txtstlp font-bold ml-auto w-fit text-font1">
                        {new Date(itm.send_at).getDate() == new Date().getDate()
                          ? new Date(itm.send_at).toLocaleString('en-UK', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : new Date(itm.send_at).toLocaleString('en-UK', {
                              year: 'numeric',
                              month: 'short',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                      </h4>
                      <Button
                        className="w-fit ml-auto !p-0 !rounded-none"
                        variant={'ghost'}
                        onClick={() => hanldedelete(itm.id)}
                      >
                        <MdDelete color="#000" size={25} />
                      </Button>
                    </div>
                  </div>
                  <Image src={profile} alt="profile" width={25} height={25} />
                </li>
              )
            )
          )}
        </ul>
        {recever != 0 && (
          <Inboxinput
            recever={recever}
            setinbox={setinbox}
            className="min-h-[55px] sticky bottom-2 left-0 w-full z-50 backdrop-blur-2xl"
          />
        )}
      </section>
    </div>
  )
}

export default Support_page
