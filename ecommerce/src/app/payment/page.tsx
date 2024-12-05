/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Api } from "@/api/Api";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { env } from "process";
import { stripePublishableKey, stripeSecretKey } from "@/utils/BaseUrl";
import { error } from "console";
import PaymentForm from "./_components/PaymentForm";

// import CheckoutForm from "../components/CheckoutForm";
// import CompletePage from "../components/CompletePage";

if (!stripePublishableKey) {
  throw new Error(
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined in .env.local"
  );
}

const stripePromise = loadStripe(stripePublishableKey);

type PaymentData = {
  data: {
    amount: number;
    sessionId: string;
    // Add other properties here if needed
  };
};

// console.log("KEYYY:::",stripePublishableKey)

const Page = ({ params }: { params: { sessionId: string } }) => {
  const searchParams = useSearchParams();

  const orderID = searchParams.get("orderID");
  // console.log("ordderr::::",orderID)

  const [paymentData, setPaymentData] = useState<PaymentData | null>();
  // const [dpmCheckerLink, setDpmCheckerLink] = useState(false)
  // const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    if (orderID) {
      const fetchData = async () => {
        const response = await Api.payment(orderID!);
        console.log("resss:::", response);

        setPaymentData(response);
      };
      fetchData();
    }
  }, [orderID]);

  const amount = paymentData?.data?.amount;

  const clientSecret = paymentData?.data?.sessionId;

  const options = {
    clientSecret,
  };

  // console.log("amount:::::",amount)
  // console.log("options:::::",options)

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {/* {confirmed ? (
            <CompletePage />
          ) : ( */}
          <PaymentForm />
          {/* )} */}
        </Elements>
      )}
    </div>
  );
};

export default Page;
