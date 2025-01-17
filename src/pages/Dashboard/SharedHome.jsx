import React from "react";
import useAuth from "../../hooks/useAuth";
import { FaDollarSign, FaUserAlt } from "react-icons/fa";
import { BsFillCartPlusFill, BsFillHouseDoorFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function SharedHome() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: stat, isLoading } = useQuery({
    queryKey: ["stat"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/admin-stat`);
      return data;
    },
  });
  return (
    <div>
      <h2 className="text-center text-4xl font-bold">
        Welcome {user?.displayName}
      </h2>
      <div className="mt-12">
        {/* small cards */}
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-grow">
          {/* Users Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
            >
              <FaUserAlt className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total User
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {stat?.totalUsers}
              </h4>
            </div>
          </div>
          {/* Funding Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
            >
              <FaDollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Funding
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {/* ${totalRevenue} */}0
              </h4>
            </div>
          </div>

          {/* Total Requests */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
            >
              <BsFillHouseDoorFill className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Blood Donation Request
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {stat?.totalRequests}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
