import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AllBloodDonationRequest() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState(""); // For filtering requests by status
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const limit = 2; // Number of items per page

  // Use the new format for useQuery in React Query v5
  const {
    data: donationRequests,
    refetch,
    isLoading,
  } = useQuery({
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
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donation-request/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  const handleUpdateStatus = async (id, status) => {
    console.log(id, status);
    // Handle status update

    try {
      const { data } = await axiosSecure.patch(`/donation-request/${id}`, {
        status,
      });
      refetch(); // Refetch data after status update
      console.log(data);
      if (data.modifiedCount) {
        toast.success(
          `You have ${status === "done" ? "completed" : "canceled"} the request`
        );
      }
    } catch (error) {
      console.error("Error updating donation status:", error);
    }
  };

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
            <th className="px-4 py-2 border">Requester Name</th>
            <th className="px-4 py-2 border">Requester Email</th>
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
              <td className="px-4 py-2 border">
                {request.donationStatus === "inprogress" &&
                  request.requesterName}
              </td>
              <td className="px-4 py-2 border">
                {request.donationStatus === "inprogress" &&
                  request.requesterEmail}
              </td>
              <td className="px-4 py-2 border">{request.recipientName}</td>
              <td className="px-4 py-2 border">
                {request.recipientDistrict}, {request.recipientUpazila}
              </td>
              <td className="px-4 py-2 border">{request.donationDate}</td>
              <td className="px-4 py-2 border">{request.donationTime}</td>
              <td className="px-4 py-2 border">{request.bloodGroup}</td>
              <td className="px-4 py-2 border">{request.donationStatus}</td>

              <td className="px-4 py-2 border space-y-2 text-center">
                <div className="flex">
                  <Link to={`/donation/${request._id}`} className="btn btn-sm">
                    <FaEye className="mx-2 cursor-pointer text-blue-500" />
                  </Link>
                  <Link
                    to={`/donation/update/${request._id}`}
                    className="btn btn-sm"
                  >
                    <FaPen className="mx-2 cursor-pointer text-green-500" />
                  </Link>
                  <button
                    onClick={() => handleDelete(request._id)}
                    className="btn btn-sm"
                  >
                    <FaTrashAlt className="mx-2 cursor-pointer text-red-500" />
                  </button>
                </div>

                {request?.donationStatus && (
                  <div className="flex">
                    <button
                      onClick={() => handleUpdateStatus(request._id, "done")}
                      className="btn btn-sm btn-success mx-1"
                    >
                      Done
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateStatus(request._id, "canceled")
                      }
                      className="btn btn-sm btn-error mx-1"
                    >
                      Cancel
                    </button>
                  </div>
                )}
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
