"use client";

import React from "react";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { adminApi } from "@/api/adminApi";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

import Cookies from "js-cookie";

const LoginPage = () => {
  const loginSchema = z.object({
    username: z.string().min(1, "Username is required."),
    password: z.string().min(1, "Password is required."),
  });

  type TLoginSchema = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    shouldFocusError: false, // prevents auto-focus on errors
  });

  const router = useRouter();

  const submit = async (data: TLoginSchema) => {
    // console.log("submitteddata::::", data);

    try {
      const response = await adminApi.loginAdmin(data);
      // console.log("response::", response.data);
      toast.success(response.data.message)

      if (response.data.success) {
        window.localStorage.setItem("accessToken",response.data.accessToken) //Storing access token in the local storage
        Cookies.set("accessToken", response.data.accessToken)//Storing access token in the browser cookies
        router.push("/tables/brand");
        router.refresh()
      }  
      // else {
      //   toast.error(response.data.message)
      // }
      
    } catch (error: any) {
      // console.log(error.response?.data);
      toast.error(error.response?.data.message)
    }
  };

  return (
    <section className="bg-gray-900">
  
      <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="bg-gray-800border-gray-700 w-full rounded-lg border shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight  text-white md:text-2xl">
              Admin Panel - BH
            </h1>
            <form
              onSubmit={handleSubmit(submit)}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                {/* <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium  text-white"
                >
                  Your Name
                </label> */}
                <input
                  {...register("username")}
                  type="text"
                  name="username" // updated
                  id="username" // updated
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Username"
                />

                {errors.username && (
                  <p className="mt-1 text-left  text-red-500">{`${errors.username.message}`}</p>
                )}
              </div>
              <div>
                {/* <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium  text-white"
                >
                  Password
                </label> */}
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className=" focus:ring-primary-600   focus:border-primary-600 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />

                {errors.password && (
                  <p className="mt-1 text-left  text-red-500">{`${errors.password.message}`}</p>
                )}
              </div>
              {/* <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="focus:ring-3 focus:ring-primary-300 focus:ring-primary-600  h-4  w-4 rounded border border-gray-600 bg-gray-700 ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className=" text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-primary-600 text-primary-500 text-sm font-medium hover:underline"
                >
                  Forgot password?
                </a>
              </div> */}
              <button
                type="submit"
                className="hover:bg-primary-700 focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
              >
                Sign in
              </button>
              {/* <p className="text-sm font-light  text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="text-primary-600 text-primary-500 font-medium hover:underline"
                >
                  Sign up
                </a>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
