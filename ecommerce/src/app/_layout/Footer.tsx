import Link from "next/link";
import React from "react";
import Image from "next/image";
import Logo from "../../../public/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <>
      <div className="w-full p-5 bg-image2 flex justify-evenly items-center md:text-left md:flex-row flex-col text-center gap-8">

        <div className="w-full flex justify-center">
        <Image className="w-7 object-contain" alt="logo" src={Logo} />
        </div>

        <div className="flex flex-col w-full items-center">
          <h4 className="text-global-font-h5 text-white font-bold">Links</h4>
          <div className="flex gap-3 text-white ">
            <Link className="hover:text-zinc-400 transition-1" href="/">
              Home
            </Link>

            <Link className="hover:text-zinc-400 transition-1" href="/">
              Shop
            </Link>

            <Link className="hover:text-zinc-400 transition-1" href="/">
              Contact
            </Link>

            <Link className="hover:text-zinc-400 transition-1" href="/">
              Login
            </Link>
          </div>
        </div>

        <div className="flex items-center flex-col w-full">
          <div>
            <h1 className="text-global-font-h5 font-bold text-white text-center">
              Get in Touch
            </h1>
            <p className="text-global-font-text3 text-white">
              Kannur, Kerala, India.
            </p>
          </div>

          <div className="flex gap-2 text-white text-global-font-text3  max-sm:justify-center mt-1">
            <Link className="size-5 hover:text-zinc-400 transition-1 mt-[0.1px]" href="/">
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
            <Link className="size-5 hover:text-zinc-400 transition-1 " href="/">
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link className="size-5 hover:text-zinc-400 transition-1 mt-[0.1px]" href="/">
              <FontAwesomeIcon icon={faXTwitter} />
            </Link>
          </div>

        </div>
      </div>

      <div className="w-full bg-black p-2">
        <p className="font-semibold text-white text-center text-global-font-text3">
          Crafted by Urbanhub Innovations
        </p>
      </div>
    </>
  );
};

export default Footer;
