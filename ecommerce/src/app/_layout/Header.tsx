
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../../public/images/logo.png";
import SmallScreenMenu from "@/components/SmallScreenMenu";
import Cart from "../svg/Cart";
import HeaderLink from "./HeaderLink";

const Links = [
  {
    name:"Home",
    href:"/"
  },
  {
    name:"Shop",
    href:"/shop"
  },
  {
    name:"Contact",
    href:"/contact"
  },
  {
    name:"Login",
    href:"/login"
  },
  

]

const Header = () => {
  return (
    <>
      <div className="bg-image w-full text-white p-3 flex justify-between  items-center sticky top-0 z-20">
        <div>
          <Image alt="logo" src={Logo} className="w-8" />
        </div>

        <div className="flex gap-2 items-center ">

          <div className="flex gap-2 max-md:hidden" >

            {Links.map((items,i)=>(
              <HeaderLink key={i} name={items.name} href={items.href} />
            ))}
            
            

          </div>

         

          <Link href="/">
            <div className="relative mr-3">
              <Cart className="size-[1.5rem] " />

              <p className="absolute -top-2 -right-3 flex items-center justify-center bg-slate-300 p-1 text-black rounded-full size-4 font-bold">
                1
              </p>
            </div>
          </Link>

          <SmallScreenMenu links={Links} />
        </div>
      </div>
    </>
  );
};

export default Header;
