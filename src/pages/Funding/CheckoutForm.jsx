import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import "./CheckoutForm.css";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import axios from "axios";

const CheckoutForm = ({ fund, refetch, closeModal }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (fund > 0) {
      getPaymentIntent();
    }
  }, [fund]);

  const getPaymentIntent = async () => {
    try {
      const response = await axiosSecure.post("/create-payment-intent", {
        amount: fund * 100,
        currency: "usd",
      });
      setClientSecret(response.data.clientSecret);
    } catch (error) {}
  };

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    setProcessing(true);
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      setProcessing(false);
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setProcessing(false);
    } else {
    }
    // confirm payment
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || "Anonymous Donor",
          email: user?.email || "unknown@example.com",
        },
      },
    });

    if (paymentIntent.status === "succeeded") {
      try {
        // Save funding data in the database
        const fundingData = {
          name: user?.displayName, // Assuming you have user data available
          fund: fund || 0, // Amount being funded
          date: new Date().toISOString(), // Current date
          transactionId: paymentIntent?.id, // Payment intent ID
        };

        const { data } = await axiosSecure.post("/funding", fundingData);
        if (data.insertedId) {
          toast.success("Funding Successful!");
          refetch(); // Refetch data if needed
        }
      } catch (err) {
      } finally {
        setProcessing(false);
        closeModal();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex justify-around mt-2 gap-2">
        <button
          className="btn"
          disabled={!stripe || !clientSecret || processing}
          type="submit"
        >
          Pay
        </button>
      </div>
    </form>
  );
};
export default CheckoutForm;
