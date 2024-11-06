import React from "react";
import CategoryImage from "./CategoryImage";
// import Image2 from "@public/images/carousel (4).png";
import cn from "@/utils/tailwind";

import { Bebas_Neue } from "next/font/google";
import { THomeCategory } from "@/api/type";
import { StorageUrl } from "@/utils/BaseUrl";

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap', adjustFontFallback: false
})


// const categoryData = [
//   {
//     name: "Men",
//     src: Image2,
//   },

//   {
//     name: "Women",
//     src: Image2,
//   },

//   {
//     name: "Kids",
//     src: Image2,
//   },

//   {
//     name: "Accessories",
//     src: Image2,
//   },
// ];


type Props = {
  homeCategoryData : THomeCategory
}


const Category = ({homeCategoryData}: Props) => {  

  const homeCategories = homeCategoryData.categories

  // console.log('HOOOOOOOME::',homeCategoryData)
  return (
    <div className={` py-5`}>
      <div className={`${bebasNeue.className} flex flex-col items-center py-5`}>
        <h2 className="font-bold text-6xl tracking-wide">Categories</h2>
        <p className="font-bold text-2xl tracking-normal">Shop by category</p>
      </div>

      <div className="grid w-full grid-cols-3 grid-rows-2 gap-3 p-5 max-sm:grid-cols-1  ">
        {homeCategories.map((category, i) => (
          <CategoryImage
            key={i}
            name={category.name}
            id={category._id}
            src={StorageUrl + category.image}
            className={cn("col-span-1 row-span-2 h-[25rem]  ", {
              "col-span-1 row-span-1 h-auto max-sm:h-[25rem]": i == 2 || i == 3,
            })}
          />
          //  cn explanation - 'default classes in all '
        ))}

        {/* <CategoryImage name="Men" src={Image2} className="col-span-1 row-span-2 h-[25rem]" />
          <CategoryImage name="Women" src={Image2} className="col-span-1 row-span-2" />
          <CategoryImage name="Kids" src={Image2} className="col-span-1 row-span-1"/>
          <CategoryImage name="Accessories" src={Image2} className="col-span-1 row-span-1" /> */}
      </div>
    </div>
  );
};

export default Category;
