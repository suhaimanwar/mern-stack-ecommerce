import React from "react";

import { Bebas_Neue } from "next/font/google";

import ShopCategory from "@/app/shop/_components/ShopCategory";

// import image2 from "@public/images/carousel (4).png";
import { Api } from "@/api/Api";
import { TShopCategory } from "@/api/type";
import { StorageUrl } from "@/utils/BaseUrl";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: 'swap', adjustFontFallback: false
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


const shopCategory = async():Promise<TShopCategory>  => {
  const response = await Api.getAllCategories()

  return response 
}

const Shop = async () => {

  const ShopData = await shopCategory()

  const shopCategories = ShopData.categories

  // console.log('shopCategories::::',shopCategories)



  // console.log('shooopppp:::',ShopData)

  // const res = await fetch("https://dummyjson.com/products/category-list");
  // const ShopData = await res.json();



  // console.log(":::::::::::",ShopData)

  return (
    <>
      <div className="min-h-[31.9rem] flex flex-col justify-center ">
        <div className={`${bebasNeue.className} flex flex-col items-center py-5`}>
          <h2 className="font-bold text-6xl tracking-wide">Categories</h2>
          <p className="font-bold text-2xl tracking-normal">Shop by category</p>
        </div>
  
        <div className="grid w-full grid-cols-4 max-md:grid-cols-1 gap-2 mb-1 px-1">
          {shopCategories.map((data, i) => (
            <ShopCategory key={i} name={data.name} id={data._id} 
            slug={data.slug}
            src={StorageUrl + data.image}
             />
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
