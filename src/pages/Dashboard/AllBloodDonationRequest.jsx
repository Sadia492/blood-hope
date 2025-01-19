import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import bgImg from "../../assets/trianglify-lowres.png";
import useRole from "../../hooks/useRole";

export default function AllBloodDonationRequest() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [role, roleLoading] = useRole();
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
    <div className="w-11/12 mx-auto mt-8">
      <h2 className="text-3xl font-bold text-center">
        All Blood Donation Request
      </h2>

      {/* Filter Dropdown */}
      <label className="block mb-4 text-gray-700 font-semibold">
        Filter by Status:
        <select
          className="ml-2 p-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff563d] focus:border-[#ff563d] bg-white text-gray-800 transition duration-300"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="" className="text-gray-500">
            All
          </option>
          <option value="active" className="text-gray-800">
            Active
          </option>
          <option value="blocked" className="text-gray-800">
            Blocked
          </option>
        </select>
      </label>

      {/* Table */}
      {donationRequests?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-center border-separate border-spacing-y-3 table-layout-auto">
            <thead
              style={{
                backgroundImage: `url(${bgImg})`,
                backgroundSize: "cover",
                backgroundPosition: "right",
              }}
            >
              <tr className="text-white">
                <th className="px-4 py-4 ">Requester Name</th>
                <th className="px-4 py-4 ">Requester Email</th>
                <th className="px-4 py-4 ">Recipient Name</th>
                <th className="px-4 py-4 ">Request Location</th>
                <th className="px-4 py-4 ">Donation Date</th>
                <th className="px-4 py-4 ">Donation Time</th>
                <th className="px-4 py-4 ">Blood Group</th>
                <th className="px-4 py-4 ">Donation Status</th>
                {role === "admin" && <th className="px-4 py-4 ">Action</th>}
              </tr>
            </thead>
            <tbody>
              {donationRequests?.map((request) => (
                <tr
                  key={request._id}
                  className="bg-white shadow-lg rounded-lg hover:scale-105 duration-300 ease-in-out transition-all"
                >
                  <td className="px-4 py-2">
                    {request.donationStatus === "inprogress" &&
                      request.requesterName}
                  </td>
                  <td className="px-4 py-2">
                    {request.donationStatus === "inprogress" &&
                      request.requesterEmail}
                  </td>
                  <td className="px-4 py-2">{request.recipientName}</td>
                  <td className="px-4 py-2">
                    {request.recipientDistrict}, {request.recipientUpazila}
                  </td>
                  <td className="px-4 py-2">{request.donationDate}</td>
                  <td className="px-4 py-2">{request.donationTime}</td>
                  <td className="px-4 py-2">{request.bloodGroup}</td>
                  <td className="px-4 py-2">
                    {request.donationStatus}
                    {request?.donationStatus === "inprogress" && (
                      <div className="flex mt-2">
                        <button
                          onClick={() =>
                            handleUpdateStatus(request._id, "done")
                          }
                          className="btn btn-xs btn-success mx-1"
                        >
                          Done
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStatus(request._id, "canceled")
                          }
                          className="btn btn-xs btn-error mx-1"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                  {role === "admin" && (
                    <td className="px-4 py-2 space-y-2 text-center">
                      <div className="flex gap-1">
                        <Link
                          to={`/donation/${request._id}`}
                          className="btn btn-sm bg-gradient-to-r text-white from-primary to-secondary"
                        >
                          <FaEye className="cursor-pointer" />
                        </Link>
                        <Link
                          to={`/donation/update/${request._id}`}
                          className="btn btn-sm bg-gradient-to-r text-white from-primary to-secondary"
                        >
                          <FaPen className="cursor-pointer" />
                        </Link>
                        <button
                          onClick={() => handleDelete(request._id)}
                          className="btn btn-sm bg-gradient-to-r text-white from-primary to-secondary"
                        >
                          <FaTrashAlt className="cursor-pointer" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-6">No Data Found</p>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="btn bg-gradient-to-r text-white from-primary to-secondary  disabled:text-gray-400"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn bg-gradient-to-r text-white from-primary to-secondary  disabled:text-gray-400"
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
