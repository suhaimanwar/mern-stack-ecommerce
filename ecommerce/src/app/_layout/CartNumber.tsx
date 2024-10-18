'use client'
import React from "react";
import useClient from "../hook/useClient";

import {useCart} from '@mrvautin/react-shoppingcart'


const CartNumber = () => {

    const {totalUniqueItems} = useCart()

    const client = useClient()
    if (!client) return;

  return (
    <p className="absolute -top-2 -right-3 flex items-center justify-center bg-slate-300 p-1 text-black rounded-full size-4 font-bold">
      {totalUniqueItems}
    </p>
  );
};

export default CartNumber;
