import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";

export default function PendingDonationRequest() {
  const axiosPublic = useAxiosPublic();

  // Fetch pending donation requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["pendingRequests"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/donation-request/status/${"pending"}`
      );
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="w-11/12 mx-auto mt-24">
      <Helmet>
        <title>BloodHope | Donation Requests</title>
      </Helmet>
      <h1
        className={`text-3xl font-bold bg-gradient-to-r text-center from-primary to-secondary text-transparent bg-clip-text`}
      >
        Blood Donation Requests
      </h1>
      <p className="text-center lg:w-3/5 mx-auto  text-gray-600  mb-8">
        View all pending donation requests in one place. Respond promptly and
        make a difference in someone's life today.
      </p>

      {requests?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {requests.map((request) => (
            <div
              key={request._id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-bold mb-2">
                {request.recipientName}
              </h2>
              <p className="text-gray-600">
                Location: {request.recipientDistrict},{" "}
                {request.recipientDistrict}
              </p>
              <p className="text-gray-600">Blood Group: {request.bloodGroup}</p>
              <p className="text-gray-600">Date: {request.donationDate}</p>
              <p className="text-gray-600">Time: {request.donationTime}</p>
              <Link
                to={`/donation/${request._id}`}
                className="btn bg-primary text-white mt-4"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No Data Found</p>
      )}
    </div>
  );
}
