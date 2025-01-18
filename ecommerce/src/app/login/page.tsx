/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import Image2 from "@public/images/login.png";
import Image from "next/image";
import { Bebas_Neue } from "next/font/google";
import Link from "next/link";
import Eye from "../svg/eye";
import EyeOff from "../svg/eye-off";

import { calcLength, motion } from "framer-motion";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Api } from "@/api/Api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

import { signIn } from "next-auth/react";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Page = () => {
  const loginSchema = z.object({
    email: z.string().min(1, "This field is required."),
    password: z.string().min(1, "This field is required."),
  });

  type TLoginSchema = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  // const submit = async (data: TLoginSchema) => {
  //   // console.log("submitteddata::::", data);

  //   try {
  //     const response = await Api.loginUser(data);
  //     console.log("response::",response)

  //     if (response.success) {

  //       window.localStorage.setItem("userAccessToken",response.userAccessToken)
  //       //Storing access token in the local storage
  //       Cookies.set("userAccessToken", response.userAccessToken)//Storing access token in the browser cookies
  //       toast.success(response.message);

  //       router.push("/");

  //     }
  //   } catch (error: any) {
  //     toast.error(error.response?.data.message);
  //   }
  // };

  const submit = async (data: TLoginSchema) => {
    // console.log("submitteddata::::", data);

    try {
      const signedIn = await signIn("Credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      console.log("signedIn::", signedIn);

      if (signedIn?.ok) {
        toast.success("Successfully Logged In");
      } else {
        toast.error("Something Went Wrong");
        console.log(signedIn?.error);
      }
    } catch (error: any) {
      toast.error("error");
      console.log(error);
    }
  };

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

        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-4"
          action=""
        >
          <input
            {...register("email")}
            className="rounded-md pl-3 py-3 bg-white/80 w-full text-black outline-none focus:ring-2 focus:ring-white focus:bg-white"
            type="email"
            placeholder="Email"
          />

          {errors.email && (
            <p className="text-red-500 text-left  mt-1">{`${errors.email.message}`}</p>
          )}

          <div className="relative">
            <input
              {...register("password")}
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

          {errors.password && (
            <p className="text-red-500 text-left  mt-1">{`${errors.password.message}`}</p>
          )}

          <button
            className="bg-white select-none text-black py-2 rounded-lg font-bold hover:bg-black hover:text-white hover:border-white transition-colors duration-300 w-full"
            type="submit"
          >
            Login
          </button>
        </form>

        <div className="text-white flex justify-center gap-1 mt-4 text-sm">
          <p className="select-none">Don&apos;t have an account?</p>
          <Link className="font-semibold underline select-none" href="/signup">
            Sign Up
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
