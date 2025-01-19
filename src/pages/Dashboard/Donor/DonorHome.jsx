import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import WelcomeUser from "../../../components/WelcomeUser";
import { BsThreeDotsVertical } from "react-icons/bs";
import bgImg from "../../../assets/trianglify-lowres.png";

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
    <div className="w-11/12 mx-auto mt-4">
      <WelcomeUser></WelcomeUser>
      <h2 className="text-center text-4xl font-bold mt-8">
        Recent Donation Requests
      </h2>
      {lastRequests?.length > 0 ? (
        <table className="table text-center border-separate border-spacing-y-3 w-full ">
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
              <th className="px-4 py-4 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {lastRequests.map((request) => (
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
                        onClick={() => handleUpdateStatus(request._id, "done")}
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
                <td className="px-4 py-2 space-y-2 text-center">
                  <div className="dropdown dropdown-left">
                    <label tabIndex={0} className="btn btn-sm z-50 btn-ghost">
                      <BsThreeDotsVertical />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content dropdown-top z-50 p-2 shadow bg-base-100 rounded-box w-52 flex justify-between"
                    >
                      <li>
                        <Link
                          to={`/donation/${request._id}`}
                          className="btn btn-sm"
                        >
                          <FaEye className="mx-2 cursor-pointer text-blue-500" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/donation/update/${request._id}`}
                          className="btn btn-sm"
                        >
                          <FaPen className="mx-2 cursor-pointer text-green-500" />
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => handleDelete(request._id)}
                          className="btn btn-sm"
                        >
                          <FaTrashAlt className="mx-2 cursor-pointer text-red-500" />
                        </button>
                      </li>
                    </ul>
                  </div>
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
          className="btn bg-gradient-to-r text-white from-primary to-secondary"
        >
          View My All Requests
        </Link>
      </div>
    </div>
  );
}
