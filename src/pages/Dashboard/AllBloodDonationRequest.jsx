import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";

export default function AllBloodDonationRequest() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState(""); // For filtering requests by status
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const limit = 2; // Number of items per page

  // Use the new format for useQuery in React Query v5
  const { data: donationRequests, isLoading } = useQuery({
    queryKey: ["allDonation", user.email, statusFilter, currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/donation-requests?status=${statusFilter}&page=${currentPage}&limit=${limit}`
      );
      return data;
    },
    keepPreviousData: true, // Prevents blank data during page transition
  });

  const { data: totalData } = useQuery({
    queryKey: ["totalData", user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/total-donation-requests`);
      return data;
    },
  });

  // Calculate total pages
  const totalPages = totalData ? Math.ceil(totalData.count / limit) : 1;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Blood Donation Request</h2>

      {/* Filter Dropdown */}
      <label className="block mb-2">
        Filter by Status:
        <select
          className="ml-2 p-2 border rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </label>

      {/* Table */}
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Recipient Name</th>
            <th className="px-4 py-2 border">Request Location</th>
            <th className="px-4 py-2 border">Donation Date</th>
            <th className="px-4 py-2 border">Donation Time</th>
            <th className="px-4 py-2 border">Blood Group</th>
            <th className="px-4 py-2 border">Donation Status</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {donationRequests?.map((request) => (
            <tr key={request._id}>
              <td className="px-4 py-2 border">{request.recipientName}</td>
              <td className="px-4 py-2 border">
                {request.recipientDistrict}, {request.recipientUpazila}
              </td>
              <td className="px-4 py-2 border">{request.donationDate}</td>
              <td className="px-4 py-2 border">{request.donationTime}</td>
              <td className="px-4 py-2 border">{request.bloodGroup}</td>
              <td className="px-4 py-2 border">{request.donationStatus}</td>

              <td className="px-4 py-2 space-x-2 border">
                <Link to={`/donation/${request._id}`} className="btn">
                  <FaEye />
                </Link>
                <Link className="btn">
                  <FaPen />
                </Link>
                <button className="btn">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
