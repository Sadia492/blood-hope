import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function FeaturedRequest() {
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
      <h1
        className={`text-3xl font-bold bg-gradient-to-r text-center from-primary to-secondary text-transparent bg-clip-text`}
      >
        Featured Donation Requests
      </h1>
      <p className="text-center lg:w-3/5 mx-auto      mb-8">
        View pending donation requests. Respond promptly and make a difference
        in someone's life today.
      </p>

      {requests?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {requests.slice(0, 4).map((request) => (
            <div key={request._id} className="border p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">
                {request.recipientName}
              </h2>
              <p className="  ">
                Location: {request.recipientDistrict},{" "}
                {request.recipientDistrict}
              </p>
              <p className="  ">Blood Group: {request.bloodGroup}</p>
              <p className="  ">Date: {request.donationDate}</p>
              <p className="  ">Time: {request.donationTime}</p>
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
        <p className="text-center font-bold text-primary text-2xl mt-6">
          No Data Found
        </p>
      )}
      <div className="text-center">
        <Link
          to={"/blood-donation-requests"}
          className="btn bg-primary text-white mt-4"
        >
          View All
        </Link>
      </div>
    </div>
  );
}
