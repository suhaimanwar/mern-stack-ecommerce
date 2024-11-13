"use client";

import React, { useState } from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons/faChevronCircleLeft";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import cn from "@/utils/tailwind";
 

import { AnimatePresence, motion } from "framer-motion";

import { Bebas_Neue } from "next/font/google";
import { TBanners } from "@/api/type";
import { StorageUrl } from "@/utils/BaseUrl";


const bebasNeue = Bebas_Neue({
  weight: '400', // You can specify different weights like '400', '700' based on your design.
  subsets: ['latin'],
  display: 'swap', adjustFontFallback: false
});

// const gallery = [
//   {
//     image: Carousel1,
//     text: {
//       subHeading: "SUMMER 2024",
//       heading: "BLACK FRIDAY",
//       description:
//         "Discover unbeatable deals and offers, perfect for your summer essentials.",
//     },
//   },
//   {
//     image: Carousel2,
//     text: {
//       subHeading: "SUMMER 2024",
//       heading: "NEW COLLECTION",
//       description:
//         "Explore our latest collection, where style meets innovation.",
//     },
//   },
//   {
//     image: Carousel3,
//     text: {
//       subHeading: "LIMITED EDITION",
//       heading: "EXCLUSIVE OFFER",
//       description: "Unlock special pricing on our newest releases. Elevate your style with our limited-time collection.",
//     },
//   },
// ];

type Props = {
  bannerData : TBanners
}

const Carousel = ({bannerData}: Props) => {

  // console.log("banner:::",bannerData)
  const gallery = bannerData.banners
  const [activeImage, setActiveImage] = useState(0);
  //activeImage index = 2.  (0,1,2)

  const totalImages = gallery.length; // gallery length = 3 (1,2,3)

  const next = () => {
    //if active image is equal to the total image-1 (i.e which is the last image, ) It has to go to the very first index.
    if (activeImage == totalImages - 1) {
      setActiveImage(0);
    } else {
      setActiveImage(activeImage + 1);
    }
  };

  const previous = () => {
    if (activeImage == 0) {
      setActiveImage(totalImages - 1);
    } else {
      setActiveImage(activeImage - 1);
    }
  };

  return (
    <>
      <div className="relative">
        <FontAwesomeIcon
          onClick={previous}
          icon={faChevronCircleLeft}
          className="absolute top-1/2 size-5 text-white opacity-25 cursor-pointer hover:size-6 hover:opacity-50 pl-3 transition-2 z-10"
        />

        <FontAwesomeIcon
          onClick={next}
          icon={faChevronCircleRight}
          className="absolute top-1/2 right-0 size-5 text-white opacity-25  cursor-pointer hover:size-6 hover:opacity-50 pr-3 transition-2 z-10"
        />

        <div className="relative h-screen w-full bg-black overflow-hidden">
          <AnimatePresence >
            {/* 
            Animate Presence is mainly used for the exit animation
            mode= "wait" It ensures that only one animation happens at a time, ensuring smoothness
              
            */}
            <motion.div
              key={activeImage} // Used to import the state.
              initial={{ opacity: 0, x: 100 }} // Start with image off-screen
              animate={{ opacity: 1, x: 0 }} // Animate to visible position
              transition={{ duration: 0.5 }}
              className="absolute inset-0 h-full w-full overflow-clip"
            >
              <Image
                alt="Carousel"
                fill
                src={StorageUrl + gallery!.at(activeImage)!.image}
                className="select-none absolute  inset-0 h-full w-full object-cover"
              />

              {/* 

            in src ={}
                gallery! - Has to be there
                gallery? - Can or cannot be there 

                added select-none in order for the image not to be selected when the next button is clicked.
        */}
            </motion.div>
          </AnimatePresence>
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, y: -50 }} // Off-screen from the y axis
            animate={{ opacity: 1, y: 0 }} // Slide to visible
            exit={{ opacity: 0, x: 100 }} // Slide off to the right
            transition={{ duration: 0.5 }}
            className={cn(
              "absolute w-full h-full flex flex-col justify-center pl-20 max-sm:p-5",
              { "w-full items-center pl-0 ": activeImage == 2 }
            )}
          >
            {/* Condition to add and overwrite classes when an index value reaches a specified point. */}

            <p className={` ${bebasNeue.className} tracking-wider font-bold text-2xl text-white max-sm:text-center`}>
              {" "}
              {gallery!.at(activeImage)!.subtitle}
            </p>
            <h3 className={`${bebasNeue.className} font-bold text-8xl  text-white max-sm:text-6xl max-sm:text-center`}>
              {gallery!.at(activeImage)!.title}{" "}
            </h3>
            <h5 className={` ${bebasNeue.className}  font-bold text-xl tracking-wider text-white max-sm:text-center`}>
              {" "}
              {gallery!.at(activeImage)?.description}
            </h5>
          </motion.div>
        </div>

        <div className="absolute bottom-2 w-full justify-center flex gap-3">
          <div className={cn("bg-white rounded-full size-2 opacity-30", {"opacity-70 " : activeImage == 0})}></div>
          <div className={cn("bg-white rounded-full size-2 opacity-30", {"opacity-70 " : activeImage == 1})}></div>
          <div className={cn("bg-white rounded-full size-2 opacity-30", {"opacity-70 " : activeImage == 2})}></div>
          
        </div>
      </div>
    </>
  );
};

export default Carousel;
