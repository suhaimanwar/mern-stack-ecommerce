'use client';

import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';
import AddToCart from './_components/AddToCart';
import { Api } from '@/api/Api';
import { StorageUrl } from '@/utils/BaseUrl';

const product = async (id: string) => {
  const response = await Api.getProductbyId(id);
  return response;
};

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const page = async ({ params }: { params: { product: string } }) => {
  const data = await product(params.product);
  const productData = data.product[0];

  return (
    <div className="bg-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <motion.div
              layoutId={`product-image-${params.product}`}
               // Match the layoutId
               initial="hidden" animate="visible" transition={{ duration: 0.3, type: "linear" }} variants={containerVariants}
              className="h-[460px] rounded-lg bg-gray-300 mb-4 relative"
            >
              <Image
                className="w-full h-full object-cover rounded-lg"
                src={StorageUrl + productData.image}
                alt="Product"
                fill
              />
            </motion.div>
          </div>
          <motion.div initial="hidden" animate="visible" transition={{ duration: 0.3, type: "linear" }} variants={containerVariants} className="md:flex-1 px-4 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {productData.name}
            </h2>
            <p className="text-gray-600 text-sm mb-4">{productData.brandName}</p>
            <div className="flex mb-4">
              <div className="mr-4 flex gap-2">
                <span className="font-bold text-gray-700">Price:</span>
                <span className="text-gray-600">₹{productData.price}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-gray-700">Availability:</span>
                <span className="text-gray-600">
                  {productData.availabilityStatus}
                </span>
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700">Product Description:</span>
              <p className="text-gray-600 text-sm mt-2">
                {productData.description}
              </p>
            </div>
            <div className="flex mt-4 mb-4">
              <div className="w-full">
                <AddToCart
                  id={productData._id}
                  name={productData.name}
                  price={productData.price}
                  image={StorageUrl + productData.image}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default page;
