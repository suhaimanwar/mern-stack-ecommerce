"use client";
import React from "react";
import Image2 from "@public/images/login.png";
import Image from "next/image";
import { Bebas_Neue } from "next/font/google";
import Link from "next/link";


import { motion } from "framer-motion";
import SignupForm from "@/components/SignupForm";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Signup = () => {

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
          Sign Up to your Account
        </h1>

        <p
          className={`${bebasNeue.className} font-bold text-white text-xl max-sm:text-lg mb-6`}
        >
          Please enter your details.
        </p>

        <SignupForm />

        

        <div className="text-white flex justify-center gap-1 mt-4 text-sm">
          <p className="select-none">Already have an account?</p>
          <Link className="font-semibold underline select-none" href="/login">
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
