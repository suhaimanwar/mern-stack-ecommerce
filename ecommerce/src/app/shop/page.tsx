import React from "react";

import { Bebas_Neue } from "next/font/google";

import ShopCategory from "@/app/shop/_components/ShopCategory";

import image2 from "@public/images/carousel (4).png";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

// const ShopData = [
//     {
//         name: "Men",
//         src: image2
//     },
//     {
//         name: "Women",
//         src: image2
//     },
//     {
//         name: "Kids",
//         src: image2
//     },
//     {
//         name: "Accessories",
//         src: image2
//     },
//     {
//         name: "Gadgets",
//         src: image2
//     },
//     {
//         name: "Sports",
//         src: image2
//     },
//     {
//         name: "Shoes",
//         src: image2
//     },
//     {
//         name: "Home Decor",
//         src: image2
//     },
// ]

const Shop = async () => {

  const res = await fetch("https://dummyjson.com/products/category-list");
  const ShopData = await res.json();

  // console.log(":::::::::::",ShopData)

  return (
    <>
      <div className={`${bebasNeue.className} flex flex-col items-center py-5`}>
        <h2 className="font-bold text-6xl tracking-wide">Categories</h2>
        <p className="font-bold text-2xl tracking-normal">Shop by category</p>
      </div>

      <div className="grid w-full grid-cols-4 gap-2 mb-1 px-1">
        {ShopData.map((data: string, i: React.Key | null | undefined) => (
          <ShopCategory key={i} name={data} 
          src={image2}
           />
        ))}
      </div>
    </>
  );
};

export default Shop;
