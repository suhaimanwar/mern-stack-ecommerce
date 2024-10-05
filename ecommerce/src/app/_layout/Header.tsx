
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../../public/images/logo.png";
import SmallScreenMenu from "@/components/SmallScreenMenu";
import Cart from "../svg/Cart";

const Header = () => {
  return (
    <>
      <div className="bg-image w-full text-white p-3 flex justify-between  items-center sticky top-0 z-20">
        <div>
          <Image alt="logo" src={Logo} className="w-8" />
        </div>

        <div className="flex gap-2 items-center ">

          <div className="flex gap-2 max-md:hidden" >
            <Link className="hover:text-zinc-400 transition-1" href="/">
              Home
            </Link>

            <Link className="hover:text-zinc-400 transition-1" href="/">
              Shop
            </Link>

            <Link className="hover:text-zinc-400 transition-1" href="/contact">
              Contact
            </Link>

            <Link className="hover:text-zinc-400 transition-1" href="/login">
              Login
            </Link>

          </div>

         

          <Link href="/">
            <div className="relative mr-3">
              <Cart className="size-[1.5rem] " />

              <p className="absolute -top-2 -right-3 flex items-center justify-center bg-slate-300 p-1 text-black rounded-full size-4 font-bold">
                1
              </p>
            </div>
          </Link>

          <SmallScreenMenu />
        </div>
      </div>
    </>
  );
};

export default Header;
