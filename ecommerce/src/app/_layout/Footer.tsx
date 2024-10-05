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
import HeaderLink from "./HeaderLink";

const Links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Login",
    href: "/login",
  },
];

const Footer = () => {
  return (
    <>
      <div className="w-full p-5 bg-image2 flex justify-evenly items-center md:text-left md:flex-row flex-col text-center gap-8">
        <div className="w-full flex justify-center">
          <Image className="w-7 object-contain select-none" alt="logo" src={Logo} />
        </div>

        <div className="flex flex-col w-full items-center">
          <h4 className="text-global-font-h5 text-white font-bold select-none">Links</h4>
          <div className="flex gap-3 text-white ">

            {Links.map((items,i) => (
              <HeaderLink key={i} name={items.name} href={items.href} />
            ))}
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
            <Link
              className="size-5 hover:text-zinc-400 transition-1 mt-[0.1px]"
              href="/"
            >
              <FontAwesomeIcon icon={faFacebook} className="size-5" />
            </Link>
            <Link className="size-5 hover:text-zinc-400 transition-1 " href="/">
              <FontAwesomeIcon icon={faInstagram} className="size-5" />
            </Link>
            <Link
              className="size-5 hover:text-zinc-400 transition-1 mt-[0.1px]"
              href="/"
            >
              <FontAwesomeIcon icon={faXTwitter} className="size-5" />
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
