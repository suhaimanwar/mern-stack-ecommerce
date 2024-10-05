"use client";
import React, { useState } from "react";
import Image2 from "@public/images/login.png";
import Image from "next/image";
import { Bebas_Neue } from "next/font/google";
import Link from "next/link";
import Eye from "../svg/eye";
import EyeOff from "../svg/eye-off";

import { motion } from "framer-motion";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition : { duration: 0.3 } },
};

const page = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-black/50">
 
      <Image
        src={Image2}
        fill
        className="object-cover object-center"
        alt="Background"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>

   
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 bg-white/10 backdrop-blur-md rounded-md p-8 w-full max-w-md mx-auto text-center max-sm:px-5"
      >
        <h1
          className={`${bebasNeue.className} font-bold text-white text-5xl  max-sm:text-4xl `}
        >
          Login to your Account
        </h1>

        <p
          className={`${bebasNeue.className} font-bold text-white text-xl max-sm:text-lg mb-6`}
        >
          Please enter your details.
        </p>

       
        <form className="flex flex-col gap-4" action="">
          <input
            className="rounded-md pl-3 py-3 bg-white/80 w-full text-black outline-none focus:ring-2 focus:ring-white focus:bg-white"
            type="text"
            placeholder="Username"
          />

          <div className="relative">
            <input
              className="rounded-md pl-3 py-3 bg-white/80 w-full text-black outline-none focus:ring-2 focus:ring-white focus:bg-white"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="h-6 w-6" />
              ) : (
                <Eye className="h-6 w-6" />
              )}
            </div>
          </div>

          <button
            className="bg-white select-none text-black py-2 rounded-lg font-bold hover:bg-black hover:text-white hover:border-white transition-colors duration-300 w-full"
            type="submit"
          >
            Login
          </button>
        </form>

      
        <div className="text-white flex justify-center gap-1 mt-4 text-sm">
          <p className="select-none">Don&apos;t have an account?</p>
          <Link className="font-semibold underline select-none" href="/">
            Sign Up
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default page;
