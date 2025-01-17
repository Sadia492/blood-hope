import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function DonorHome() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: lastRequests, isLoading } = useQuery({
    queryKey: ["lastRequests", user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/last-donation-requests/${user.email}`
      );
      return data;
    },
  });
  console.log(lastRequests);

  return (
    <div className="p-8">
      <h2 className="text-center text-4xl font-bold">
        Welcome {user?.displayName}
      </h2>
      {lastRequests && (
        <div>
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
              {lastRequests?.map((request) => (
                <tr key={request._id}>
                  <td className="px-4 py-2 border">{request.recipientName}</td>
                  <td className="px-4 py-2 border">
                    {request.recipientDistrict}, {request.recipientUpazila}
                  </td>
                  <td className="px-4 py-2 border">{request.donationDate}</td>
                  <td className="px-4 py-2 border">{request.donationTime}</td>
                  <td className="px-4 py-2 border">{request.bloodGroup}</td>
                  <td className="px-4 py-2 border">{request.donationStatus}</td>
                  {request?.donationStatus === "inprogress" ? (
                    <td className="px-4 py-2 border">
                      <Link>
                        <FaEye />
                      </Link>
                      <Link>
                        <FaPen />
                      </Link>
                      <button>
                        <FaTrashAlt />
                      </button>
                    </td>
                  ) : (
                    <td colSpan="7" className="px-4 py-2 border text-center">
                      No Action Allowed
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center mt-6">
            <Link
              to={"/dashboard/my-donation-requests"}
              className="btn btn-secondary"
            >
              View my all request
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
