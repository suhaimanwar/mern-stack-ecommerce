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
     <div className="min-h-[31.9rem] flex flex-col justify-center bg-gray-50 px-4 md:px-8">
  {/* Header Section */}
  <div className={`${bebasNeue.className} flex flex-col items-center py-8`}>
    <h2 className="font-bold text-4xl md:text-6xl tracking-wide text-gray-800">
      Categories
    </h2>
    <p className="font-medium text-lg md:text-2xl tracking-normal text-gray-600 mt-2">
      Shop by category
    </p>
  </div>

  {/* Categories Grid */}
  <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
    {shopCategories.map((data, i) => (
      <div
        key={i}
        className="group relative overflow-hidden rounded-lg  bg-white w-full"
      >
        <ShopCategory
          name={data.name}
          id={data._id}
          slug={data.slug}
          src={StorageUrl + data.image}
        />
        {/* Hover Effect */}
       
      </div>
    ))}
  </div>
</div>


    </>
  );
};

export default Shop;
