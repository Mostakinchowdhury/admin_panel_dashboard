'use client';
import useHeader from '@/app/context/Headercontext';
import api from '@/app/utils/api';
import { inboxes_type } from '@/assets/datas/inbox';
import profile from '@/assets/images/image-avatar.webp';
import Inboxinput from '@/components/support/Inboxinput';
import { IoMail } from 'react-icons/io5';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { toast } from 'sonner';
import Sloading from '@/components/nessasery/Sloading';
import { useUserDetail } from '@/app/context/Globalcontex';
type userlist_type = {
  id: number;
  profile: string | null;
  name: string;
  lastmessage: string;
  time: string;
  last_is_read: boolean;
};
const Support_page = () => {
  const [recever, setrecever] = useState<number>(0);
  const { exinput: searchvalue, setexinput, setsearchvalue } = useHeader();
  const [inbox, setinbox] = useState<inboxes_type[]>([]);
  const [userlist, setuserlist] = useState<userlist_type[]>([]);
  const scrollRef = useRef<HTMLUListElement>(null);
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const [listLoading, setListLoading] = useState<boolean>(true);
  const { user } = useUserDetail();
  const [duserlist, setduserlist] = useState<userlist_type[]>([]);
  const hanldedelete = async (id: number) => {
    // In a real app, we'd call an API here
    setChatLoading(true);
    setListLoading(true);
    try {
      await api.delete(`support/chatting/${id}/`);
      await Promise.all([fetch_inbox(), fetch_userlist()]);
    } catch (error: unknown) {
      console.error('failed to fetch messages:', error);
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
        'Failed to delete messages';
      toast.error(message);
    } finally {
      setChatLoading(false);
      setListLoading(false);
    }
  };
  // fetch inbox
  const fetch_inbox = async (recever_id?: number) => {
    if (recever === 0 && !recever_id) return;
    setChatLoading(true);
    try {
      const chatres = await api.get<inboxes_type[]>(
        `support/chatting/?opponent=${recever_id || recever}`,
      );
      setinbox(chatres.data);
    } catch (error: unknown) {
      console.error('failed to fetch messages:', error);
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
        'Failed to fetch messages';
      toast.error(message);
    } finally {
      setChatLoading(false);
    }
  };

  const fetch_userlist = async () => {
    setListLoading(true);
    try {
      const userres = await api.get<{
        conversation: userlist_type[];
        duserlist: userlist_type[];
      }>('support/chatting/userlist/');
      setuserlist(userres.data.conversation);
      setduserlist(userres.data.duserlist);
    } catch (error: unknown) {
      console.error('Failed to fetch user list:', error);
    } finally {
      setListLoading(false);
    }
  };

  // useMemo for filtered lists
  const filteredUserlist = useMemo(() => {
    return userlist.filter(u =>
      u.name.toLowerCase().includes(searchvalue.toLowerCase()),
    );
  }, [userlist, searchvalue]);
  // handle user click
  const handleuserclick = async (id: number, is_emty: boolean) => {
    setrecever(id);
    if (is_emty) {
      return;
    }
    setChatLoading(true);
    setListLoading(true);
    try {
      await api.get(`support/chatting/${id}/last_read_true/`);
      await fetch_userlist();
    } catch (e) {
      console.log(e);
    } finally {
      setChatLoading(false);
      setListLoading(false);
    }
  };

  const filteredDuserlist = useMemo(() => {
    return duserlist.filter(u =>
      u.name.toLowerCase().includes(searchvalue.toLowerCase()),
    );
  }, [duserlist, searchvalue]);

  // fetch userlist
  useEffect(() => {
    fetch_userlist();

    return () => {
      setexinput('');
      setsearchvalue('');
    };
  }, []);
  //  fetch inbox
  useEffect(() => {
    fetch_inbox(recever);
  }, [recever]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [inbox]);

  return (
    <div className="p-4 md:p-6 h-full flex flex-col md:flex-row gap-0 overflow-y-auto scroll-custom md:gap-6 bg-gray-50/50">
      {/* Users Section - Horizontal on mobile, Sidebar on desktop */}
      <section className="bg-white border-b md:border md:rounded-2xl p-4 md:w-80 lg:w-96 flex flex-col shrink-0 shadow-sm overflow-hidden min-h-0">
        <div className="px-2 mb-4">
          <h2 className="text-xl font-extrabold text-font1">Messages</h2>
        </div>

        {/* Mobile Horizontal Scroll / Desktop Vertical Scroll */}
        <ul className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto scroll-hide pb-2 md:pb-0 px-1">
          {listLoading ? (
            <Sloading size={48} />
          ) : (
            [...filteredUserlist, ...filteredDuserlist].map(user => (
              <li
                className={`flex flex-col md:flex-row items-center gap-3 p-3 rounded-xl cursor-pointer transition-all shrink-0 min-w-[70px] md:min-w-0 md:w-full ${
                  recever == user.id
                    ? 'bg-primary/10 border-primary/20'
                    : 'hover:bg-gray-100 border-transparent'
                } border`}
                key={user.id}
                onClick={() =>
                  handleuserclick(user.id, user.lastmessage ? false : true)
                }
              >
                <div className="relative shrink-0">
                  {user.profile ? (
                    <Image
                      alt={user.name}
                      src={profile}
                      width={48}
                      height={48}
                      className={`rounded-full object-cover border-4  shadow-sm ${user.lastmessage && !user.last_is_read ? 'animate-pulse border-primary shadow-lg shadow-blue-700' : 'border-white'}`}
                    />
                  ) : (
                    <div
                      className={`rounded-full object-cover border-4 shadow-sm size-14 flex items-center justify-center font-bold bg-primary text-primary-foreground text-2xl ${user.lastmessage && !user.last_is_read ? 'animate-pulse border-primary shadow-lg shadow-blue-700' : 'border-white'}`}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <h3
                  className={`truncate text-sm md:hidden block ${user.lastmessage && !user.last_is_read ? 'text-black font-extrabold' : 'font-bold text-black/55'}`}
                >
                  {user.name}
                </h3>
                <div className="hidden md:block overflow-hidden flex-1">
                  <div className="flex justify-between items-center gap-2">
                    <h3 className="font-bold text-font1 truncate text-sm">
                      {user.name}
                    </h3>
                    <span className="text-[10px] text-font3 shrink-0">
                      {user.time
                        ? new Date(user.time).toLocaleString('en-UK', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : 'No message'}
                    </span>
                  </div>
                  <p
                    className={`text-xs truncate mt-0.5 ${user.lastmessage && !user.last_is_read ? 'text-black font-extrabold' : 'font-medium text-black/30'}`}
                  >
                    {user.lastmessage || 'No messages yet'}
                  </p>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>

      {/* Chat Section */}
      <section className="flex-1 flex flex-col md:bg-white md:border md:rounded-2xl shadow-sm overflow-hidden h-full min-h-0 relative bg-blue-50">
        {chatLoading ? (
          <Sloading size={48} />
        ) : recever === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/30">
            <div className="size-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <IoMail size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-font1">
              Select a conversation
            </h2>
            <p className="text-font2 max-w-xs mt-2">
              Choose a person from the list to start chatting or view previous
              messages.
            </p>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center gap-3 backdrop-blur-md md:bg-white/80 bg-blue-100 sticky top-0 z-10">
              {userlist.find(u => u.id == recever)?.profile ? (
                <Image
                  src={profile}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="rounded-full object-cover border-2 border-white shadow-sm size-12 flex items-center justify-center font-bold bg-primary text-primary-foreground text-xl">
                  {userlist
                    .find(u => u.id == recever)
                    ?.name.charAt(0)
                    .toUpperCase() ||
                    duserlist
                      .find(u => u.id == recever)
                      ?.name.charAt(0)
                      .toUpperCase()}
                </div>
              )}

              <div>
                <h3 className="font-bold text-font1 leading-tight">
                  {userlist.find(u => u.id === recever)?.name ||
                    duserlist.find(u => u.id === recever)?.name ||
                    `User ${recever}`}
                </h3>
                <p className="text-xs text-green-500 font-medium">Online</p>
              </div>
            </div>

            {/* Messages Area */}
            <ul
              className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scroll-custom"
              ref={scrollRef}
            >
              {inbox.map(itm => {
                const isMe = itm.sender === user?.id;
                return (
                  <li
                    className={`flex group items-end gap-2 max-w-[85%] md:max-w-[75%] ${isMe ? 'ml-auto flex-row-reverse' : ''}`}
                    key={itm.id}
                  >
                    {!isMe &&
                      (itm.opponent_img ? (
                        <Image
                          src={profile}
                          alt="profile"
                          width={28}
                          height={28}
                          className="rounded-full shrink-0 object-cover mb-1"
                        />
                      ) : (
                        <div className="rounded-full object-cover border-2 border-white shadow-sm size-12 flex items-center justify-center font-bold bg-primary text-primary-foreground text-xl">
                          {userlist
                            .find(u => u.id == recever)
                            ?.name.charAt(0)
                            .toUpperCase()}
                        </div>
                      ))}
                    <div className="flex flex-col gap-1">
                      <div
                        className={`relative px-4 py-2.5 rounded-2xl shadow-sm ${
                          isMe
                            ? 'bg-primary text-white rounded-br-none'
                            : 'bg-gray-100 text-font1 rounded-bl-none border border-gray-200/50'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {itm.message}
                        </p>

                        {/* Hover delete button */}
                        <button
                          onClick={() => hanldedelete(itm.id)}
                          className={`absolute -top-2 ${isMe ? '-left-8' : '-right-8'} p-1 bg-white rounded-full shadow-md border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500`}
                        >
                          <MdDelete size={14} />
                        </button>
                      </div>
                      <span
                        className={`text-[10px] text-font3 px-1 ${isMe ? 'text-right' : ''}`}
                      >
                        {new Date(itm.send_at).toLocaleString('en-UK', {
                          hour: '2-digit',
                          minute: '2-digit',
                          ...(new Date(itm.send_at).toDateString() !==
                            new Date().toDateString() && {
                            month: 'short',
                            day: 'numeric',
                          }),
                        })}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Input Area */}
            <div className="p-4 border-t bg-white">
              <Inboxinput
                recever={recever}
                setinbox={setinbox}
                fetchinbox={() => fetch_inbox()}
                className="max-w-4xl mx-auto"
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Support_page;
