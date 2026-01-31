import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
// create a conext for user page

const riderpagecontext = createContext<{
  rider_sortopen: boolean
  rider_setsortopen: Dispatch<SetStateAction<boolean>>
  rider_filteropen: boolean
  rider_setfilteropen: Dispatch<SetStateAction<boolean>>
  rider_sortby: string
  rider_setsortby: Dispatch<SetStateAction<string>>
}|null>(null)

export const Riderpageprovider = ({ children }: { children: React.ReactNode }) => {
  const [rider_sortopen, rider_setsortopen] = useState<boolean>(false)
  const [rider_filteropen, rider_setfilteropen] = useState<boolean>(false)
  const [rider_sortby, rider_setsortby] = useState<string>('df')
  const values = {
    rider_sortopen,
    rider_setsortopen,
    rider_filteropen,
    rider_setfilteropen,
    rider_sortby,
    rider_setsortby
  }
  return <riderpagecontext.Provider value={values}>{children}</riderpagecontext.Provider>
}

export default function useRidercontext(): {
  rider_sortopen: boolean
  rider_setsortopen: Dispatch<SetStateAction<boolean>>
  rider_filteropen: boolean
  rider_setfilteropen: Dispatch<SetStateAction<boolean>>
  rider_sortby: string
  rider_setsortby: Dispatch<SetStateAction<string>>
} {
  return useContext(riderpagecontext)
}
