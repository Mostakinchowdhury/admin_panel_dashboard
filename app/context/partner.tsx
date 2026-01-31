import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
// create a conext for user page

const partnerpagecontext = createContext<{
  partner_sortopen: boolean
  partner_setsortopen: Dispatch<SetStateAction<boolean>>
  partner_filteropen: boolean
  partner_setfilteropen: Dispatch<SetStateAction<boolean>>
  partner_sortby: string
  partner_setsortby: Dispatch<SetStateAction<string>>
}|null>(null)

export const Partnerpageprovider = ({ children }: { children: React.ReactNode }) => {
  const [partner_sortopen, partner_setsortopen] = useState<boolean>(false)
  const [partner_filteropen, partner_setfilteropen] = useState<boolean>(false)
  const [partner_sortby, partner_setsortby] = useState<string>('df')
  const values = {
    partner_sortopen,
    partner_setsortopen,
    partner_filteropen,
    partner_setfilteropen,
    partner_sortby,
    partner_setsortby
  }
  return <partnerpagecontext.Provider value={values}>{children}</partnerpagecontext.Provider>
}

export default function usePartnercontext(): {
  partner_sortopen: boolean
  partner_setsortopen: Dispatch<SetStateAction<boolean>>
  partner_filteropen: boolean
  partner_setfilteropen: Dispatch<SetStateAction<boolean>>
  partner_sortby: string
  partner_setsortby: Dispatch<SetStateAction<string>>
} {
  return useContext(partnerpagecontext)
}
