"use client";

import { adminApi } from "@/api/adminApi";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const AccountSettings = () => {
  const updatePasswordSchema = z.object({
    username: z.string().min(1, "Username is required."),
    currentpass: z.string().min(1, "Password is required."),
    newpass: z.string().min(1, "New Password is required."),
    confirmpass: z.string().min(1, "You should confirm your password."),
  });

  type TUpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    shouldFocusError: false, // prevents auto-focus on errors
  });

  const submit = async (data: TUpdatePasswordSchema) => {
  console.log("submitteddata::::", data);
    try {
      const response = await adminApi.updatePassword(data)
      toast.success(response.data.message)

    } catch (error:any) {
      toast.error(error.response?.data.message)
    }

    
    
  
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-5.5 p-6.5"
      >
        <div>
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Username
          </label>
          <input
            {...register("username")}
            type="text"
            placeholder="Username"
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />

          {errors.username && (
            <p className="mt-1 text-left  text-red-500">{`${errors.username.message}`}</p>
          )}
        </div>
        <div>
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Current Password
          </label>
          <input
            {...register("currentpass")}
            type="password"
            placeholder="Current Password"
            className="password-dark w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />

          {errors.currentpass && (
            <p className="mt-1 text-left  text-red-500">{`${errors.currentpass.message}`}</p>
          )}
        </div>
        <div>
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            New Password
          </label>
          <input
            {...register("newpass")}
            type="password"
            placeholder="New Password"
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />

          {errors.newpass && (
            <p className="mt-1 text-left  text-red-500">{`${errors.newpass.message}`}</p>
          )}
        </div>
        <div>
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Confirm Password
          </label>
          <input
            {...register("confirmpass")}
            type="password"
            placeholder="Confirm Password"
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />

          {errors.confirmpass && (
            <p className="mt-1 text-left  text-red-500">{`${errors.confirmpass.message}`}</p>
          )}
        </div>

        <button
          type="submit"
          className="hover:bg-primary-700 focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 mt-3 w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
