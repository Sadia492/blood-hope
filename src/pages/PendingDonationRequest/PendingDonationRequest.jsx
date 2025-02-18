import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";

export default function PendingDonationRequest() {
  const axiosPublic = useAxiosPublic();
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("All"); // Blood group filter state
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
  // Function to sort requests by date
  const sortedRequests = [...requests]
    .sort((a, b) => {
      const dateA = new Date(a.donationDate);
      const dateB = new Date(b.donationDate);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    })
    // Filter by selected blood group if not "All"
    .filter((request) =>
      selectedBloodGroup === "All"
        ? true
        : request.bloodGroup === selectedBloodGroup
    );

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
      {/* Sort Button */}
      <div className="flex justify-end mb-4 gap-4">
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
          className="select border-primary border-2 w-full max-w-xs"
        >
          <option value="asc">Sort by Date: Oldest First</option>
          <option value="desc">Sort by Date: Newest First</option>
        </select>
        {/* Filter by Blood Group Dropdown */}
        <select
          onChange={(e) => setSelectedBloodGroup(e.target.value)}
          value={selectedBloodGroup}
          className="select border-primary border-2 w-full max-w-xs"
        >
          <option value="All">All Blood Groups</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
      </div>

      {sortedRequests?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedRequests.map((request) => (
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
        <p className="text-center font-bold text-primary text-2xl mt-6">
          No Data Found
        </p>
      )}
    </div>
  );
}
