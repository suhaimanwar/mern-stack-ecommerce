import React from 'react';
import FeaturedProductsImage from './FeaturedProductsImage';
// import Image1 from '@public/images/carousel (4).png';

import { Bebas_Neue } from "next/font/google";
import { TFeaturedProducts } from '@/api/type';
import { StorageUrl } from '@/utils/BaseUrl';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap', adjustFontFallback: false
})


// const FeaturedData = [
//     {
//         src: Image1,
//         product: "Bleu De Perfume",
//         brand: "Swiss Arabia",
//         price: "₹2999"
//     },

//     {
//         src: Image1,
//         product: "Bleu De Perfume",
//         brand: "Swiss Arabia",
//         price: "₹2999"
//     },

//     {
//         src: Image1,
//         product: "Bleu De Perfume",
//         brand: "Swiss Arabia",
//         price: "₹2999"
//     },

//     {
//         src: Image1,
//         product: "Bleu De Perfume",
//         brand: "Swiss Arabia",
//         price: "₹2999"
//     },

//     {
//         src: Image1,
//         product: "Bleu De Perfume",
//         brand: "Swiss Arabia",
//         price: "₹2999"
//     },

//     {
//         src: Image1,
//         product: "Bleu De Perfume",
//         brand: "Swiss Arabia",
//         price: "₹2999"
//     },

//     {
//         src: Image1,
//         product: "Bleu De Perfume",
//         brand: "Swiss Arabia",
//         price: "₹2999"
//     },

//     {
//         src: Image1,
//         product: "Bleu De Perfume",
//         brand: "Swiss Arabia",
//         price: "₹2999"
//     }
// ]

type Props = {
  featuredProductsData : TFeaturedProducts
}

 

const FeaturedProducts = ({featuredProductsData}: Props) => {

  // console.log('feeee:::',featuredProductsData.products)

  const FeaturedData = featuredProductsData.products

  return (
    <div className='py-5'>
      <div className={ ` ${bebasNeue.className} flex flex-col items-center`}>
        <h1 className='font-bold  text-6xl tracking-wide text-center'>Featured Products</h1>
        <p className='font-bold text-2xl tracking-normal text-center'>Top picks just for you</p>
      </div>

      <div className=" grid grid-cols-4 gap-3 justify-center p-5 py-10 max-md:grid-cols-2 max-sm:grid-cols-1">


       {FeaturedData.map((data, i)=>(
        <FeaturedProductsImage key={i} src={StorageUrl + data.image} product={data.name} brand={data.description} price={data.price} />
       ))}
        
        
      </div>
    </div>
  );
};

export default FeaturedProducts;
