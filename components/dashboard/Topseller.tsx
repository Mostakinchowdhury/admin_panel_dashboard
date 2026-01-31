'use client'
import { useCallback, useLayoutEffect, useState } from 'react'

type prop = {
  className?: string
  salecount: number
  h4: string
  maxsalecount: number
}
const Topseller = ({ className, salecount, h4, maxsalecount }: prop) => {
  const percentbaseontop = Math.round((salecount / maxsalecount) * 100) //57
  const [basis, setbasis] = useState<string>('0%')

  const calculateBasis = useCallback(() => {
    const hundred_p = window.innerWidth > 450 ? 192 : 150
    const calw = `${(hundred_p * percentbaseontop) / 100}px`
    setbasis(calw)
  }, [percentbaseontop])

  useLayoutEffect(() => {
    // Initial calculation
    calculateBasis()

    // Resize listener
    const handleResize = () => {
      calculateBasis()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [percentbaseontop, calculateBasis])

  return (
    <div className={`${className ? className : ''} flex items-center gap-0 w-full`}>
      <h3 className="txtstlh3 whitespace-nowrap min-w-[120px]">
        {h4.length > 10
          ? h4.slice(0, 7) + '...'
          : h4.length < 10
          ? h4 + ' '.repeat(10 - h4.length)
          : h4}
      </h3>
      <div
        className={`h-6 rounded-r-md bg-primary shrink-0`}
        style={{
          flexBasis: basis
        }}
      />

      <h3 className="txtstlh3 whitespace-nowrap ml-2.5">
        {salecount > 1000 ? `${(salecount / 1000).toFixed(1)}K` : salecount}
      </h3>
    </div>
  )
}

export default Topseller
