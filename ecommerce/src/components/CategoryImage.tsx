import React from "react";
import Image, { StaticImageData } from "next/image";
import cn from "@/utils/tailwind";

type Props = {
    name: string,
    src: StaticImageData | string,
    className: string,
}

const CategoryImage = ({name, src, className} : Props) => {
  return (
 
      <div className={cn("relative h-full w-full", className)}>
        <Image  src={src} alt="Image" className="object-cover"  fill />

        <div className="absolute bottom-5 left-5 bg-white p-3  font-bold uppercase">
         {name}
        </div>
      </div>
  
  );
};

export default CategoryImage;
