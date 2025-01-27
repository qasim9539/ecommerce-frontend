import React from 'react'
// import './ProductCard.css'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { valideURLConvert } from '../utils/valideURLConvert'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import AddToCartButton from './AddToCartButton'

const CardProduct = ({ data }) => {
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`
  const [loading, setLoading] = useState(false)

  return (
    <Link to={url}
     className='border hover:border-gray-400 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white'
      >
      {/* <div className='h-[50rem] w-full max-h-24 lg:max-h-[20rem] rounded overflow-hidden'>
        <img
          src={data.image[0]}
          // className='w-40 h-40 object-scale-down lg:scale-125'
          className='h-full w-full object-cover object-left-top'
        />
      </div> */}

      <div className="h-[10rem]">
        <img className='h-full w-full object-cover object-left-top' src={data.image[0]} alt="" />
      </div>
      <div className='flex items-center gap-1'>
       
        <div>

        </div>
      </div>
      <div className='font-bold opacity-80'>
        {data.name}
      </div>
   

      <div className='px-2 lg:px-0 flex gap-1 lg:gap-3 text-sm lg:text-base'>
        <div className='flex flex-col gap-1'>
          <div className='font-semibold'>
            {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
          </div>
          <div className='flex flex-row items-center justify-center text-sm'><span className='line-through text-gray-400'>Rs {data.price}</span>
            {
              Boolean(data.discount) && (
                <p className='text-[#5355e0] px-2 w-fit text-sm font-semibold '>{data.discount}% off</p>
              )
            }
          </div>
        </div>


        <div className=''>
          {/* {
            data.stock == 0 ? (
              <p className='text-red-500 text-sm text-center'>Out of stock</p>
            ) : (
              <AddToCartButton data={data} />
            )
          } */}

        </div>
      </div>

    </Link>
  )
}


export default CardProduct

