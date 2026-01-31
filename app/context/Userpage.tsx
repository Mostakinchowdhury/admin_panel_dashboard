import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
// create a conext for user page

const userpagecontext = createContext<{
  user_sortopen: boolean
  user_setsortopen: Dispatch<SetStateAction<boolean>>
  user_filteropen: boolean
  user_setfilteropen: Dispatch<SetStateAction<boolean>>
  user_sortby: string
  user_setsortby: Dispatch<SetStateAction<string>>
}|null>(null)

export const Userpageprovider = ({ children }: { children: React.ReactNode }) => {
  const [user_sortopen, user_setsortopen] = useState<boolean>(false)
  const [user_filteropen, user_setfilteropen] = useState<boolean>(false)
  const [user_sortby, user_setsortby] = useState<string>('df')
  const values = {
    user_sortopen,
    user_setsortopen,
    user_filteropen,
    user_setfilteropen,
    user_sortby,
    user_setsortby
  }
  return <userpagecontext.Provider value={values}>{children}</userpagecontext.Provider>
}

export default function useUsercontext(): {
  user_sortopen: boolean
  user_setsortopen: Dispatch<SetStateAction<boolean>>
  user_filteropen: boolean
  user_setfilteropen: Dispatch<SetStateAction<boolean>>
  user_sortby: string
  user_setsortby: Dispatch<SetStateAction<string>>
} {
  return useContext(userpagecontext)
}
