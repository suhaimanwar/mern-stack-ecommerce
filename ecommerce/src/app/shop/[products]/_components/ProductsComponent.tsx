import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    id: string,
    params: unknown,
    src: string | StaticImageData,
    product:  string,
    brand: string,
    price: number,
    slug: string
}

const 
ProductsComponent = ({src,product,brand,price,slug,params}:Props) => {
  // console.log("srccccccccccc::",src)
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow  relative">
    <Link href={`/shop/${params}/${slug}`}>
      <div className="relative h-[18.75rem] w-full">
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
        <p className="mb-0 font-semibold  text-gray-700 ">{brand}</p>
        <p className="">₹{price}</p>
      </div>
    </Link>
  </div>
  )
}

export default ProductsComponent