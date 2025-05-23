'use client';

import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  src: StaticImageData | string;
  product: string;
  brand: string;
  price: string;
  id: string;
  slug: string;
};

const FeaturedProductsImage = ({ src, product, brand, price, slug }: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow relative">
      <Link href={`shop/featured/${slug}` } scroll={false} prefetch={true}>
        <motion.div
          // layoutId={`product-image-${slug}`} 
          // Unique layoutId
          className="relative h-[18.75rem] w-full"
        >
          <Image
            className="rounded-t-lg object-cover"
            src={src}
            alt="Featured product"
            fill
          />
        </motion.div>
        <div className="p-5">
          <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900">
            {product}
          </h5>
          <p className="mb-0 font-normal text-gray-700">{brand}</p>
          <p className="font-semibold mt-2">₹{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedProductsImage;
