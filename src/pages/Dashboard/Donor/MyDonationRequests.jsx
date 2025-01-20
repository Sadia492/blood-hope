import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import bgImg from "../../../assets/trianglify-lowres.png";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";

export default function MyDonationRequests() {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [statusFilter, setStatusFilter] = useState(""); // For filtering const [currentPage, setCurrentPage] = useState(1); // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const limit = 10; // Number of items per page

  // Fetch paginated and filtered donation requests
  const {
    data: donationRequest,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myDonation", user.email, statusFilter, currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/donation-requests/${user.email}?status=${statusFilter}&page=${currentPage}&limit=${limit}`
      );
      return data;
    },
    keepPreviousData: true,
  });

  // Fetch total count for pagination
  const { data: totalData, isLoading: totalLoading } = useQuery({
    queryKey: ["total", user.email, statusFilter],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/total-donation-requests/${user.email}?status=${statusFilter}`
      );
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
    // Handle status update

    try {
      const { data } = await axiosSecure.patch(`/donation-request/${id}`, {
        status,
      });
      refetch(); // Refetch data after status update

      if (data.modifiedCount) {
        toast.success(
          `You have ${status === "done" ? "completed" : "canceled"} the request`
        );
      }
    } catch (error) {}
  };

  // Calculate total pages
  const totalPages = totalData ? Math.ceil(totalData.count / limit) : 1;

  if (isLoading || loading || totalLoading)
    return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="w-11/12 mx-auto mt-8">
      <Helmet>
        <title>BloodHope | My Donation Requests</title>
      </Helmet>
      <h2
        className={`text-3xl font-bold bg-gradient-to-r text-center from-primary to-secondary text-transparent bg-clip-text`}
      >
        My Donation Requests
      </h2>
      <p className="text-center lg:w-3/5 mx-auto  text-gray-600 mt-4">
        View and track your blood donation requests here. Stay updated on the
        status of your request and connect with potential donors.
      </p>
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
      {donationRequest?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-center border-separate border-spacing-y-3 table-layout-auto">
            <thead
              className="bg-cover bg-right"
              style={{
                backgroundImage: `url(${bgImg})`,
                backgroundSize: "cover",
                backgroundPosition: "right",
              }}
            >
              <tr className="text-white">
                <th className="px-4 py-2 sm:px-2">Requester Name</th>
                <th className="px-4 py-2 sm:px-2">Requester Email</th>
                <th className="px-4 py-2 sm:px-2">Recipient Name</th>
                <th className="px-4 py-2 sm:px-2">Request Location</th>
                <th className="px-4 py-2 sm:px-2">Donation Date</th>
                <th className="px-4 py-2 sm:px-2">Donation Time</th>
                <th className="px-4 py-2 sm:px-2">Blood Group</th>
                <th className="px-4 py-2 sm:px-2">Donation Status</th>
                <th className="px-4 py-2 sm:px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {donationRequest?.map((request) => (
                <tr
                  key={request._id}
                  className="bg-white shadow-lg rounded-lg hover:scale-105 duration-300 ease-in-out transition-all"
                >
                  <td className="px-2 py-2">
                    {request.donationStatus === "inprogress" &&
                      request.requesterName}
                  </td>
                  <td className="px-2 py-2">
                    {request.donationStatus === "inprogress" &&
                      request.requesterEmail}
                  </td>
                  <td className="px-2 py-2">{request.recipientName}</td>
                  <td className="px-2 py-2">
                    {request.recipientDistrict}, {request.recipientUpazila}
                  </td>
                  <td className="px-2 py-2">{request.donationDate}</td>
                  <td className="px-2 py-2">{request.donationTime}</td>
                  <td className="px-2 py-2">{request.bloodGroup}</td>
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
                  <td className="px-2 py-2">
                    <div className="flex gap-1 justify-center">
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
