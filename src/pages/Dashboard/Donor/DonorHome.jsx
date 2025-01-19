import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function DonorHome() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: lastRequests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["lastRequests", user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/last-donation-requests/${user.email}?limit=3`
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
            {lastRequests.map((request) => (
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
                    <Link
                      to={`/donation/${request._id}`}
                      className="btn btn-sm"
                    >
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
