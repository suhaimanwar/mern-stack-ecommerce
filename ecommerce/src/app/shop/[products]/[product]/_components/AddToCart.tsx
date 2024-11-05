"use client";
import React from "react";
import { useCart } from "@mrvautin/react-shoppingcart";


type Props = {
  id: string;
  name: string;
  image: string;
  price: number;
};

const AddToCart = (product: Props) => {
  const { addItem,
    // items, 
    addShipping } = useCart();
  // console.log('ppro',product)
  // console.log("........items..",items)
  return (
    <>
      <button
        onClick={() => {
          addItem(product);
          addShipping({description: '', cost:20})
        }}
        className="w-full bg-gray-900  text-white py-2 px-4 rounded-lg font-bold hover:bg-gray-800 "
      >
        Add to Cart
      </button>
    </>
  );
};

export default AddToCart;
