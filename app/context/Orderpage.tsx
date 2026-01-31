import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
// create a conext for user page

const orderpagecontext = createContext<{
  sortopen: boolean
  setsortopen: Dispatch<SetStateAction<boolean>>
  filteropen: boolean
  setfilteropen: Dispatch<SetStateAction<boolean>>
  sortby: string
  setsortby: Dispatch<SetStateAction<string>>
} | null>(null)

export const Orderpageprovider = ({ children }: { children: React.ReactNode }) => {
  const [sortopen, setsortopen] = useState<boolean>(false)
  const [filteropen, setfilteropen] = useState<boolean>(false)
  const [sortby, setsortby] = useState<string>('df')
  const values = { sortopen, setsortopen, filteropen, setfilteropen, sortby, setsortby }
  return <orderpagecontext.Provider value={values}>{children}</orderpagecontext.Provider>
}

export default function useOrdercontext(): {
  sortopen: boolean
  setsortopen: Dispatch<SetStateAction<boolean>>
  filteropen: boolean
  setfilteropen: Dispatch<SetStateAction<boolean>>
  sortby: string
  setsortby: Dispatch<SetStateAction<string>>
} | null {
  return useContext(orderpagecontext)
}
