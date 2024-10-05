import React from "react";

import { Bebas_Neue } from "next/font/google";
import Image from "next/image";

import bgImage from "@public/images/carousel (4).png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Roboto } from "next/font/google";

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

const page = () => {
  return (
    <div className={`relative h-screen `}>
    
      <Image alt="" src={bgImage} fill className="object-cover" />

      <div className="absolute bg-black h-screen w-full opacity-40"> </div> 

      <div className="relative flex flex-col h-full justify-center gap-2 ">
        <h1
          className={`${bebasNeue.className} font-bold text-white text-6xl tracking-wide text-center`}>
          Contact Us
        </h1>

        <p
          className={`${roboto.className} font-bold  text-xl text-center text-white pt-5 px-20 max-md:px-10`}
        >
          We&apos;d love to hear from you! Whether you have questions, feedback,
          or would like to inquire about our services, feel free to get in touch
          with us. Our team is here to assist you with any of your needs.
        </p>

        <div className="flex justify-center w-full items-center p-5">
          <div className="flex justify-center gap-6 bg-slate-200/20 w-fit rounded-md p-5 max-md:flex-col ">
            <div className="flex  gap-3">
              <div className="text-white  size-9">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>

              <div className="text-white">
                <h1 className="font-bold ">Address</h1>
                <p>
                  1908, 19th Floor, Prism Tower, Business Bay, Kannur, Kerala
                </p>
              </div>
            </div>

            <div className="flex  gap-3 items-center">
              <div className="text-white  size-9">
                <FontAwesomeIcon icon={faContactCard} />
              </div>

              <div className="text-white">
                <h1 className="font-bold ">Contact</h1>
                <p>+91 70000000</p>
              </div>
            </div>

            <div className="flex  gap-3">
              <div className="text-white  size-9">
                <FontAwesomeIcon icon={faMailReply} />
              </div>

              <div className="text-white">
                <h1 className="font-bold ">Email</h1>
                <p>info@blackhatclothing.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
