'use client'
import React, { useState } from "react";
import Image2 from "@public/images/login.png";
import Image from "next/image";
import { Bebas_Neue } from "next/font/google";
import Link from "next/link";
import Eye from "../svg/eye";
import EyeOff from "../svg/eye-off";

const bebasNeue = Bebas_Neue({
    weight: "400",
    subsets: ["latin"],
  });

const page = () => {

const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative h-screen flex flex-col items-center justify-center">
      <Image src={Image2} fill className="object-cover" alt="s" />

      <div className="relative bg-black p-5  w-2/4 max-md:w-full rounded-md">
     
            <h1 className={`${bebasNeue.className} font-bold text-white text-6xl max-md:text-4xl tracking-wide text-center`}>Login to your Account</h1>
            <p className={`${bebasNeue.className} font-bold text-white text-2xl tracking-wide text-center pb-3`}>Please enter your details.</p>
            <form className="flex flex-col gap-2" action="">
              <input className="rounded-md pl-1 p-2" type="text" placeholder="Username" />

              <div className="relative">
              <input className="rounded-md pl-1 p-2 w-full " type={showPassword==false?"password":"text"} placeholder="Password" />

              <div onClick={()=>setShowPassword(!showPassword)} className="absolute top-1/4 right-2 cursor-pointer"> 
              {showPassword==false?<Eye className="size-5"/>: <EyeOff className="size-5"/> }
              </div>

              </div>
              <button className="bg-white border-2 border-black rounded-lg font-bold hover:bg-black hover:border-white hover:text-white transition-1 select-none" type="submit">Login</button>
            </form> 
            
            <div className="text-white flex gap-1 select-none"><p>Don&apos;t have an account?</p> <Link className="font-semibold " href='/'>Sign Up</Link></div>
      </div>
    </div>
  );
};

export default page;
