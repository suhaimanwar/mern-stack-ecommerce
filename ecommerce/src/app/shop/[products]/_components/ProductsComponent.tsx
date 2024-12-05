"use client"
import { motion } from 'framer-motion'
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

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const 
ProductsComponent = ({src,product,brand,price,slug,params}:Props) => {
  // console.log("srccccccccccc::",src)
  return (
    <motion.div initial="hidden" animate="visible" transition={{ duration: 0.3, type: "linear" }} variants={containerVariants} className="bg-white border border-gray-200 rounded-lg shadow  relative">
    <Link href={`/shop/${params}/${slug}`}>
      <motion.div 
      layoutId={`product-image-${slug}`} 
      className="relative h-[18.75rem] w-full">
        <Image
          className="rounded-t-lg object-cover"
          src={src}
          alt="Featured product"
          fill
        />
      </motion.div>
      <motion.div  className="p-5">
        <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900 ">
          {product}
        </h5>
        <p className="mb-0 font-semibold  text-gray-700 ">{brand}</p>
        <p className="">₹{price}</p>
      </motion.div>
    </Link>
  </motion.div>
  )
}

export default ProductsComponent