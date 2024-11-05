import Image, { StaticImageData } from "next/image";
import React from "react";


import Link from "next/link";

type Props = {
    name: string,
    src:  StaticImageData  | string,
    id: string
}

const ShopCategory = ({name,src,id}:Props) => {
  return (
    <>
      <Link href={`/shop/${id}`}>
        <div className="card w-full h-60 flex justify-center items-center rounded-lg relative overflow-hidden group">
          <Image
            src={src}
            alt="Background Image"
            fill
            objectFit="cover"
            objectPosition="center"
            className="z-0 transition-transform duration-500 ease-in-out transform group-hover:scale-110"
          />

          <h3 className="relative uppercase text-2xl text-white font-bold z-10 transition-all duration-500 ease-in-out group-hover:scale-105">
            {name}
          </h3>

          <div className="absolute inset-0 bg-black opacity-10 transition-opacity duration-500  group-hover:opacity-40"></div>
        </div>
      </Link>
    </>
  );
};

export default ShopCategory;
