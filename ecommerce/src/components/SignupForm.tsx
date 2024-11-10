/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from "react";


import CustomInput from "./CustomInput";
import { useForm } from "react-hook-form";

import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  username: z.string().min(1,"This field is required."),
  email: z.string().email("Please enter a valid email."),
  pw: z.string().min(8,"Your password should have a minimum of 8 characters."),
  cpw: z.string().min(8,"Your password should have a minimum of 8 characters.")
}).superRefine(({ cpw,pw},ctx)=> {
  if(cpw!==pw){
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match.",
      path:['cpw']

    });
  }
})

type TLoginSchema = z.infer<typeof loginSchema>;

const SignupForm = () => {

const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
} = useForm<TLoginSchema>({
  resolver: zodResolver(loginSchema)
});
 
const submit = async(data:TLoginSchema) => {
    // console.log('submitteddata::::', data.username)
}

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4" action="">

        <CustomInput register={register('username')}  error={errors.username} placeholder="Username" type="text" />
        <CustomInput register={register('email')} error={errors.email} placeholder="Email" type="email" />

        <CustomInput register={register('pw')} error={errors.pw} placeholder="Password" type="password" />
        <CustomInput register={register('cpw')} error={errors.cpw} placeholder="Confirm Password" type="password" />
 

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
