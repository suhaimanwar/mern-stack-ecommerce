import React from "react";
import Image, { StaticImageData } from "next/image";
import cn from "@/utils/tailwind";
import Link from "next/link";

type Props = {
  name: string;
  src: StaticImageData | string;
  className: string;
  id: string;
  slug: string
};

const CategoryImage = async ({ id, name, src, className,slug }: Props) => {
  return (
    <div className={cn("relative h-full w-full ", className)}>
      <Link href={`/shop/${id}`}>
        <div className="relative h-full w-full">
          <Image src={src} alt="Image" className="object-cover  " fill />
        </div>

        <div className="absolute bottom-5 left-5 bg-white p-3  font-bold uppercase">
          {name}
        </div>
      </Link>
    </div>
  );
};

export default CategoryImage;
