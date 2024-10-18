import React from "react";
import Image2 from "@public/images/carousel (4).png";
import Image from "next/image";
import AddToCart from "./_components/AddToCart";

// const ProductData = {
//   productTitle: "Apple AirPods Pro",
//   productSubtitle: "Immerse yourself in unparalleled sound.",
//   price: 249,
//   availability: "In Stock",
//   productDesc: `The Apple AirPods Pro offers the perfect blend of advanced noise cancellation and immersive sound. With customizable silicone tips, a 45dB active noise cancellation (ANC) system, and adaptive EQ, experience your music, podcasts, and calls like never before. Ideal for both work and play, these earphones are designed for a secure fit, ensuring comfort even during extended use. The Transparency mode lets you tune back into the world when needed.`,
//   src: Image2,
// };

const page = async ({ params }: { params: { product: string } }) => {
  // Fetch all products
  const res = await fetch('https://dummyjson.com/products/'+ params.product);
  const data = await res.json();
  
  // Find the product by title
  
  // const productData = data.products.find((product: any) => product.title === decodeURIComponent(params.product));

  // console.log('dataaaaa:::',productData)

  // if (productData) {
  //   console.log('Product Found:', productData);
  // } else {
  //   console.log("Product not found");
  // }

  return (
    <>
      <div className="bg-blue-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300  mb-4 relative">
                <Image
                  className="w-full h-full object-cover rounded-lg"
                  src={data.thumbnail}
                  alt="Product"
                  fill
                />
              </div>
            </div>
            <div className="md:flex-1 px-4 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-800  mb-2">
                {data.title}
              </h2>
              <p className="text-gray-600  text-sm mb-4">
                {data.brand}
              </p>
              <div className="flex mb-4 ">
                <div className="mr-4 flex gap-2">
                  <span className="font-bold text-gray-700 ">Price:</span>
                  <span className="text-gray-600 ">${data.price}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-gray-700 ">
                    Availability:
                  </span>
                  <span className="text-gray-600 ">
                    {data.availabilityStatus}
                  </span>
                </div>
              </div>
              {/* <div className="mb-4">
              <span className="font-bold text-gray-700 ">Select Color:</span>
              <div className="flex items-center mt-2">
                <button className="w-6 h-6 rounded-full bg-gray-800  mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-red-500 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-blue-500  mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-yellow-500  mr-2"></button>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 ">Select Size:</span>
              <div className="flex items-center mt-2">
                <button className="bg-gray-300  text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 ">
                  S
                </button>
                <button className="bg-gray-300  text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 ">
                  M
                </button>
                <button className="bg-gray-300  text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 ">
                  L
                </button>
                <button className="bg-gray-300  text-gray-700  py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 ">
                  XL
                </button>
                <button className="bg-gray-300  text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 ">
                  XXL
                </button>
              </div>
            </div> */}
              <div>
                <span className="font-bold text-gray-700 ">
                  Product Description:
                </span>
                <p className="text-gray-600  text-sm mt-2">
                  {data.description}
                </p>
              </div>

              <div className="flex mt-4 mb-4">
                <div className="w-full   ">
                  <AddToCart id={data.id} name={data.title} price={data.price} image={data.thumbnail}  />
                </div>
                {/* <div className="w-1/2 px-2">
                <button className="w-full bg-gray-200  text-gray-800  py-2 px-4 rounded-full font-bold hover:bg-gray-300 ">
                  Add to Wishlist
                </button>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
