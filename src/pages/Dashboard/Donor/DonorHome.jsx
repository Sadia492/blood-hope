import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

export default function DonorHome() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: lastRequests, isLoading } = useQuery({
    queryKey: ["lastRequests", user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/last-donation-requests/${user.email}?limit=3`
      );
      return data;
    },
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        const { data } = await axiosSecure.delete(`/donation-requests/${id}`);
        if (data.deletedCount) {
          toast.success("Donation request deleted successfully.");
        }
      } catch (error) {
        toast.error("Failed to delete the donation request.");
      }
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const { data } = await axiosSecure.patch(`/donation-requests/${id}`, {
        donationStatus: status,
      });
      if (data.modifiedCount) {
        toast.success(`Donation status updated to '${status}'.`);
      }
    } catch (error) {
      toast.error("Failed to update donation status.");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-8">
      <h2 className="text-center text-4xl font-bold">
        Welcome {user?.displayName}
      </h2>
      {lastRequests?.length > 0 ? (
        <table className="min-w-full bg-white border rounded-lg mt-6">
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
            {lastRequests.map((request) => (
              <tr key={request._id}>
                <td className="px-4 py-2 border">{request.recipientName}</td>
                <td className="px-4 py-2 border">
                  {request.recipientDistrict}, {request.recipientUpazila}
                </td>
                <td className="px-4 py-2 border">{request.donationDate}</td>
                <td className="px-4 py-2 border">{request.donationTime}</td>
                <td className="px-4 py-2 border">{request.bloodGroup}</td>
                <td className="px-4 py-2 border">{request.donationStatus}</td>
                <td className="px-4 py-2 border">
                  <Link to={`/donation/${request._id}`}>
                    <FaEye className="mx-2 cursor-pointer text-blue-500" />
                  </Link>
                  {request.donationStatus === "pending" && (
                    <>
                      <Link to={`/dashboard/edit-donation/${request._id}`}>
                        <FaPen className="mx-2 cursor-pointer text-green-500" />
                      </Link>
                      <button onClick={() => handleDelete(request._id)}>
                        <FaTrashAlt className="mx-2 cursor-pointer text-red-500" />
                      </button>
                    </>
                  )}
                  {request.donationStatus === "inprogress" && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(request._id, "done")}
                        className="btn btn-sm btn-success mx-1"
                      >
                        Done
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(request._id, "canceled")
                        }
                        className="btn btn-sm btn-error mx-1"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-6">
          You haven't made any donation requests yet.
        </p>
      )}
      <div className="flex justify-center items-center mt-6">
        <Link
          to={"/dashboard/my-donation-requests"}
          className="btn btn-secondary"
        >
          View My All Requests
        </Link>
      </div>
    </div>
  );
}
