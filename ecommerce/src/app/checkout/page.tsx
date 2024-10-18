
import React from "react";

import CheckoutForm from "./_components/CheckoutForm";
import Billing from "./_components/Billing";

const Checkout = () => {
  
  return (

  
    <div className="min-h-[33rem] flex flex-col items-center justify-center">

    
      <div className="grid grid-cols-3 gap-1 max-md:grid-cols-1 w-full p-3">
      <div className="col-span-2 max-md:col-span-1 bg-gray-100 p-6 rounded-lg shadow-lg">
      <h1 className="font-bold text-3xl mb-4 text-gray-800">Checkout</h1>
      <CheckoutForm/>
      </div>

        <div className="col-span-1 max-md:col-span-1 w-full bg-gray-100 p-6 rounded-lg shadow-lg">
          <h1 className="font-bold text-3xl mb-4 text-gray-800">
            Order Summary
          </h1>
          <div className="space-y-4">
            {/* Add your order summary details here */}

            <Billing/>
            

            {/* <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300">
              Place Order
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
