import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'


type Props = {
    src: StaticImageData,
    product: string,
    brand: string,
    price: string
}

const FeaturedProductsImage = ({src, product, brand, price}:Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow  relative">
    <Link href="#">
      <div className='relative h-[18.75rem] w-full'>
          <Image
            className="rounded-t-lg object-cover"
            src={src}
            alt="Featured product"
            
            fill
          />
      </div>
      <div className="p-5">
        <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900 ">
          {product}
        </h5>
        <p className="mb-0 font-normal text-gray-700 ">
          {brand}
        </p>
        <p className="">{price}</p>
      </div>
    </Link>
  </div>
  )
}

export default FeaturedProductsImage