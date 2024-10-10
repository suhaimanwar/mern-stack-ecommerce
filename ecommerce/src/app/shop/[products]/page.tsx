/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

import React, { 
  // useState

 } from "react";

// import Image1 from "@public/images/carousel (4).png";

import { Bebas_Neue } from "next/font/google";
import ProductsComponent from "./_components/ProductsComponent";



// import Filter from "./_components/Filter";


const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

// const ProductsData = [
//   {
//     src: Image1,
//     product: "Bleu De Perfume",
//     brand: "Swiss Arabia",
//     price: 2999,
//   },

//   {
//     src: Image1,
//     product: "Bleu De Perfume",
//     brand: "Swiss Arabia",
//     price: 999,
//   },

//   {
//     src: Image1,
//     product: "cleu De Perfume",
//     brand: "Swiss Arabia",
//     price: 299,
//   },

//   {
//     src: Image1,
//     product: "Bleu De Perfume",
//     brand: "Swiss Arabia",
//     price: 2299,
//   },

//   {
//     src: Image1,
//     product: "Bleu De Perfume",
//     brand: "Swiss Arabia",
//     price: 229,
//   },

//   {
//     src: Image1,
//     product: "aleu De Perfume",
//     brand: "Swiss Arabia",
//     price: 5000,
//   },

//   {
//     src: Image1,
//     product: "Bleu De Perfume",
//     brand: "Swiss Arabia",
//     price: 2399,
//   },

//   {
//     src: Image1,
//     product: "zleu De Perfume",
//     brand: "Swiss Arabia",
//     price: 299,
//   },
// ];

const Page = async ({ params }: { params: { products: string } }) => {
  const decoded = decodeURIComponent(params.products);

  const res = await fetch('https://dummyjson.com/products/category/' + params.products)
  const ProductsData = await res.json()
  console.log(ProductsData.products)

  const productss = ProductsData.products

  // const [products, setProducts] = useState(ProductsData);

  // const spreadedArray = [...products];

  // const SortbyName = () => {
  //   setProducts(
  //     spreadedArray.sort((a: any, b: any) => a.product.localeCompare(b.product))
  //   );
  // };

  // const SortbyNumber = () => {
  //   const sortedArray = [...products].sort((a, b) => a.price - b.price);
  //   setProducts(sortedArray);
  // };

  return (
    <div className="py-5">
      <div className={` ${bebasNeue.className} flex flex-col items-center`}>
        <h1
         
          className="font-bold  text-6xl tracking-wide text-center"
        >
          {decoded}
        </h1>
        <p className="font-bold text-2xl tracking-normal text-center">
          Top picks just for {decoded}
        </p>
      </div>

      <div className="flex justify-between items-center px-5 py-4 bg-gray-100">
        <p className="font-semibold text-gray-800">
          {productss.length} Products
        </p>

        {/* <Filter SortbyNumber={SortbyNumber} SortbyName={SortbyName} /> */}
      </div>

      <div className=" grid grid-cols-4 gap-3 justify-center p-5 py-10 max-md:grid-cols-2 max-sm:grid-cols-1">
        {productss.map((data:any, i:any) => (
          <ProductsComponent
            key={i}
            product={data.title}
            brand={data.brand}
            price={data.price}
            src={data.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
