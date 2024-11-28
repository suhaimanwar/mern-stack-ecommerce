/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import useClient from "@/app/hook/useClient";
import { useCart } from "@mrvautin/react-shoppingcart";
import React from "react";


const Billing = () => {
  
  const client = useClient()
    if (!client) return;

    const { cartNetTotal, cartTotal, totalShippingAmount } = useCart();
  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-gray-600">Item Total</h3>
        <h3 className="text-gray-800">₹{cartNetTotal.toFixed(2)}</h3>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-gray-600">Shipping</h3>
        <h3 className="text-gray-800">₹{totalShippingAmount.toFixed(2)}</h3>
      </div>

      <div className="flex justify-between items-center border-t pt-4">
        <h3 className="text-gray-600">Total</h3>
        <h3 className="text-gray-800 font-bold">₹{cartTotal.toFixed(2)}</h3>
      </div>
    </>
  );
};

export default Billing;
