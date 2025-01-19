import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
// import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Public_Key);
export default function Payment({ fund, refetch }) {
  return (
    <Elements stripe={stripePromise}>
      {/* Form component */}
      <CheckoutForm fund={fund} refetch={refetch} />
    </Elements>
  );
}
