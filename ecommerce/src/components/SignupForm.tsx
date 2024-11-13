/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

import CustomInput from "./CustomInput";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Api } from "@/api/Api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const signupSchema = z
  .object({
    username: z.string().min(1, "This field is required."),
    email: z.string().email("Please enter a valid email."),
    password: z
      .string()
      .min(8, "Your password should have a minimum of 8 characters."),
    confirmpass: z
      .string()
      .min(8, "Your password should have a minimum of 8 characters."),
  })
  .superRefine(({ confirmpass, password }, ctx) => {
    if (confirmpass !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match.",
        path: ["confirmpass"],
      });
    }
  });

type TSignupSchema = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter()

  const submit = async (data: TSignupSchema) => {
    // console.log('submitteddata::::', data)
    try {
      const response = await Api.createUser(data);
      // console.log('response:::',response)
      toast.success(response.message);

      if (response.success) {
        router.push("/login")
      } 
    } catch (error:any) {
      toast.error(error.response?.data.message)
      // console.error("error:::",error.response?.data.message)
      
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-4"
        action=""
      >
        <CustomInput
          register={register("username")}
          error={errors.username}
          placeholder="Username"
          type="text"
        />
        <CustomInput
          register={register("email")}
          error={errors.email}
          placeholder="Email"
          type="email"
        />

        <CustomInput
          register={register("password")}
          error={errors.password}
          placeholder="Password"
          type="password"
        />
        <CustomInput
          register={register("confirmpass")}
          error={errors.confirmpass}
          placeholder="Confirm Password"
          type="password"
        />

        <button
          disabled={isSubmitting}
          className="bg-white select-none text-black py-2 rounded-lg font-bold hover:bg-black hover:text-white hover:border-white transition-colors duration-300 w-full"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignupForm;
