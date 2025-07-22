/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import CheckoutInput from "./CheckoutInput";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Api } from "@/api/Api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CheckoutForm = ({ items }: any) => {
  const checkoutSchema = z.object({
    firstName: z.string().min(1, "This field is required."),
    lastName: z.string().min(1, "This field is required."),
    phone: z.string().min(1, "This field is required."),
    email: z.string().email("Please enter a valid email."),
    address: z.string().min(1, "This field is required."),
    zipcode: z.string().min(1, "This field is required."),
    country: z
      .string()
      .refine((value) => value !== "country", "Please select a country."),
  });

  type TCheckoutSchema = z.infer<typeof checkoutSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TCheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
  });

  const router = useRouter();

  const submit = async (shippingDetails: TCheckoutSchema) => {
    try {
      const cartItems = items.map((item: { quantity: any; id: any }) => {
        return {
          quantity: item.quantity,
          productId: item.id,
        };
      });
      // console.log("submitteddata::::", {shippingDetails ,cartItems});

      const bothDatas = { shippingDetails, cartItems };
      // console.log("bothhh:::",bothDatas)

      const response = await Api.orderCheckout(bothDatas);

      // console.log("res:::::",response)

      if (response.success) {
        toast.success(response.message);
        // router.push(`/payment/?orderID=${response.data.orderID}`)
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      // console.log  ("errr::::",error)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <div className="flex w-full gap-2">
          <CheckoutInput
            register={register("firstName")}
            error={errors.firstName}
            type="text"
            placeholder="First Name"
          />
          <CheckoutInput
            register={register("lastName")}
            error={errors.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <CheckoutInput
          register={register("phone")}
          error={errors.phone}
          type="text"
          placeholder="Phone Number"
        />
        <CheckoutInput
          register={register("email")}
          error={errors.email}
          type="email"
          placeholder="Email Address"
        />
        <CheckoutInput
          register={register("address")}
          error={errors.address}
          type="text"
          placeholder="Address"
        />
        <CheckoutInput
          register={register("zipcode")}
          error={errors.zipcode}
          type="text"
          placeholder="Zip Code"
        />

        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          {...register("country")}
        >
          <option value="country" disabled selected>
            Country / Region
          </option>
          <option value="Sri Lanka">Sri Lanka</option>
          <option value="India">India</option>
          <option value="Qatar">Qatar</option>
          <option value="United Arab Emirates">United Arab Emirates</option>
          <option value="Oman">Oman</option>
        </select>

        {errors.country && (
          <p className="text-red-500 text-left  mt-1">{`${errors.country.message}`}</p>
        )}

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300"
        >
          Place Order
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;
