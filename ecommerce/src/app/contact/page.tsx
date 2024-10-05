"use client";

import React from "react";
import { Bebas_Neue } from "next/font/google";
import Image from "next/image";
import bgImage from "@public/images/carousel (4).png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Roboto } from "next/font/google";
import { motion } from "framer-motion";
import {
  faMailReply,
  faLocationDot,
  faContactCard,
} from "@fortawesome/free-solid-svg-icons";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: "700",
  subsets: ["latin"],
});

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const page = () => {
  return (
    <div className="relative h-screen">
      <Image alt="" src={bgImage} fill className="object-cover" />

      <div className="absolute bg-black h-screen w-full opacity-40"></div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 0.3, type: "tween" }}
        className="relative flex flex-col h-full justify-center gap-2"
      >
        <h1
          className={`${bebasNeue.className} font-bold text-white text-6xl max-md:text-4xl tracking-wide text-center`}
        >
          Contact Us
        </h1>

        <p
          className={`${roboto.className} font-bold text-xl max-lg:text-lg max-md:text-base text-center text-white pt-5 px-20 max-lg:px-10 max-sm:px-4`}
        >
          We&apos;d love to hear from you! Whether you have questions, feedback,
          or would like to inquire about our services, feel free to get in touch
          with us. Our team is here to assist you with any of your needs.
        </p>

        <div className="flex justify-center w-full items-center p-5">
          <div className="flex justify-center gap-6 max-md:gap-3 bg-slate-200/20 w-fit rounded-md p-5 max-md:flex-col ">
            <div className="flex gap-3 items-center max-md:items-start">
              <div className="text-white text-lg">
                <FontAwesomeIcon icon={faLocationDot} className="size-9" />
              </div>
              <div className="text-white">
                <h1 className="font-bold">Address</h1>
                <p>
                  1908, 19th Floor, Prism Tower, Business Bay, Kannur, Kerala
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-center max-md:items-start">
              <div className="text-white text-lg">
                <FontAwesomeIcon icon={faContactCard} className="size-9" />
              </div>
              <div className="text-white">
                <h1 className="font-bold">Contact</h1>
                <p>+91 70000000</p>
              </div>
            </div>

            <div className="flex gap-3 items-center max-md:items-start">
              <div className="text-white text-lg">
                <FontAwesomeIcon icon={faMailReply} className="size-9" />
              </div>
              <div className="text-white">
                <h1 className="font-bold">Email</h1>
                <p>info@blackhatclothing.com</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default page;
