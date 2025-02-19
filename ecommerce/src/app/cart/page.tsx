/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useCart } from "@mrvautin/react-shoppingcart";
import Link from "next/link";

const page = () => {
  const {
    items,
    removeItem,
    updateItemQuantity,
    totalItemsAmount,
    cartNetTotal,
  } = useCart();

  const [isClient, setIsClient] = useState(false);

  // console.log("items::::", items);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient]);
  if (!isClient) {
    return;
  }

  return (
    <div className="min-h-[33rem] flex flex-col items-center justify-center">
      <div className="grid  grid-cols-3 gap-1 max-md:grid-cols-1 w-full p-3 ">
        <div className="col-span-2  max-md:col-span-1 overflow-auto rounded-lg shadow-lg h-fit">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold">Your cart is empty</h2>
              <p className="mt-4">
                Looks like you haven’t added anything to your cart yet.
              </p>
              <Link href="/shop">
                <button className="mt-6 bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition">
                  Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            <table className="w-full bg-black text-white table-auto border-separate border-spacing-0">
              <thead className="bg-gray-950">
                <tr>
                  <th className="px-4 py-2 text-left uppercase font-semibold border-b border-gray-700"></th>
                  <th className="px-4 py-2 text-left uppercase font-semibold border-b border-gray-700">
                    Product
                  </th>
                  <th className="px-4 py-2 text-left uppercase font-semibold border-b border-gray-700">
                    Price
                  </th>
                  <th className="px-4 py-2 text-left uppercase font-semibold border-b border-gray-700">
                    Quantity
                  </th>
                  <th className="px-4 py-2 text-left uppercase font-semibold border-b border-gray-700">
                    Subtotal
                  </th>
                  <th className="px-4 py-2 text-left uppercase font-semibold border-b border-gray-700"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-900 transition-colors">
                    <td className="relative px-4 py-3 border-b border-gray-700 flex items-center space-x-4">
                      <div className="relative w-[4rem] h-[4rem]">
                        <Image
                          src={item.image}
                          alt="Malm"
                          fill
                          className="rounded-md object-cover"
                        />
                      </div>
                    </td>

                    <td className="px-4 py-3 border-b border-gray-700">
                      {" "}
                      {item.name}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-700">
                      ₹{item.price}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-700 ">
                      {" "}
                      <div className="flex gap-3 ">
                        <button
                          onClick={() =>
                            updateItemQuantity(item, "decrease", 1)
                          }
                        >
                          -
                        </button>{" "}
                        <span className="text-center border-2 p-1 w-10">
                          {" "}
                          {item.quantity}{" "}
                        </span>{" "}
                        <button
                          onClick={() =>
                            updateItemQuantity(item, "increase", 1)
                          }
                        >
                          +
                        </button>
                      </div>{" "}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-700">
                      ₹{item.itemTotal?.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-700 ">
                      {" "}
                      <FontAwesomeIcon
                        onClick={() => removeItem(item)}
                        icon={faTrash}
                        className="cursor-pointer size-5"
                      />{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="col-span-1 max-md:col-span-1 w-full bg-gray-100 p-6 rounded-lg shadow-lg">
          <h1 className="font-bold text-3xl mb-4 text-gray-800">Cart Total</h1>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-600">Item Total</h3>
              <h3 className="text-gray-800">{totalItemsAmount.toFixed(2)}</h3>
            </div>

            {/* <div className="flex justify-between items-center">
              <h3 className="text-gray-600">Shipping</h3>
              <h3 className="text-gray-800">{totalShippingAmount.toFixed(2)}</h3>
            </div> */}

            <div className="flex justify-between items-center border-t pt-4">
              <h3 className="text-gray-600">Total</h3>
              <h3 className="text-gray-800 font-bold">
                {cartNetTotal.toFixed(2)}
              </h3>
            </div>

            <Link href="/checkout">
              <button className="w-full mt-4 bg-gray-900 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
