import useProductcontext from '@/app/context/Products'
import React from 'react'
import { IconType } from 'react-icons'
import { MdOutlineDone } from 'react-icons/md'
import { Button } from '../ui/button'

const Product_Sortdiologsection = ({
  className,
  classNamei,
  isdeafalt,
  icon: Icon
}: {
  className?: string
  classNamei?: string
  isdeafalt?: boolean
  icon: React.ReactNode | IconType
}) => {
  const { product_sortopen, product_setsortopen, product_sortby, product_setsortby } =
    useProductcontext()
  return (
    <Button
      className={`${className ? className : ''} relative flex justify-center items-center`}
      variant={isdeafalt ? 'default' : 'ghost'}
      onClick={() => product_setsortopen(!product_sortopen)}
    >
      {typeof Icon === 'function' ? <Icon className={`${classNamei ? classNamei : ''}`} /> : Icon}
      {/* diolog */}
      <ul
        className={`absolute mt-4 top-full right-0 bg-graybg p-2 rounded-lg flex flex-col gap-2.5 shadow-md z-20 dsdb ${
          product_sortopen ? 'flex' : 'hidden'
        }`}
      >
        <li className="">
          <Button
            variant={'ghost'}
            className="hover:bg-primary w-full hover:text-white text-left !px-2 justify-between"
            onClick={() => product_setsortby('atc')}
          >
            <p>Sort by Cartadded</p>
            {product_sortby === 'dt' && <MdOutlineDone className="block" />}
          </Button>
        </li>
        <li>
          <Button
            variant={'ghost'}
            className="hover:bg-primary w-full hover:text-white text-left !px-2 justify-between"
            onClick={() => product_setsortby('pr')}
          >
            <p> Sort by Price</p>

            {product_sortby === 'pr' && <MdOutlineDone className="block" />}
          </Button>
        </li>

        {/* order by stock */}
        <li className="flex items-center gap-2">
          <Button
            variant={'ghost'}
            className="hover:bg-primary w-full hover:text-white text-left !px-2 justify-between"
            onClick={() => product_setsortby('stk')}
          >
            <p>Sort by Stock</p>
            {product_sortby === 'stk' && <MdOutlineDone className="block" />}
          </Button>
        </li>
        <li className="flex items-center gap-2">
          <Button
            variant={'ghost'}
            className="hover:bg-primary w-full hover:text-white text-left !px-2 justify-between"
            onClick={() => product_setsortby('df')}
          >
            <p>Sort by Deafault</p>
            {product_sortby === 'df' && <MdOutlineDone className="block" />}
          </Button>
        </li>
      </ul>
    </Button>
  )
}

export default Product_Sortdiologsection
