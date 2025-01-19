import React from "react";
import useAuth from "../../hooks/useAuth";
import { FaDollarSign, FaUserAlt } from "react-icons/fa";
import { BsFillCartPlusFill, BsFillHouseDoorFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import WelcomeUser from "../../components/WelcomeUser";
import { MdBloodtype } from "react-icons/md";

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

  const { data: funding, isLoading: isFunding } = useQuery({
    queryKey: ["funding"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/funding`);
      return data;
    },
  });

  const totalFund = funding?.reduce(
    (curr, prev) => curr + parseInt(prev.fund),
    0
  );
  console.log(totalFund);

  return (
    <div className="w-11/12 mx-auto mt-8">
      <WelcomeUser></WelcomeUser>

      <div className="mt-12">
        {/* small cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 flex-grow">
          {/* Users Card */}
          <div className="relative flex flex-col bg-white rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-50 p-8">
            <div className="flex justify-center items-center mb-4 bg-secondary/40 w-20 h-20 rounded-full p-3">
              <FaUserAlt className="text-secondary w-12 h-12" />
            </div>
            <div className="flex justify-between items-center">
              <div className="text-primary font-bold text-lg">Total Users</div>
              <h4 className="text-2xl font-semibold text-primary">
                {stat?.totalUsers}
              </h4>
            </div>
          </div>

          {/* Funding Card */}
          <div className="relative flex flex-col bg-white rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-50 p-6">
            <div className="flex justify-center items-center mb-4 bg-secondary/40 w-20 h-20 rounded-full p-3">
              <FaDollarSign className="text-secondary w-12 h-12" />
            </div>
            <div className="flex justify-between items-center">
              <div className="text-primary font-bold text-lg">
                Total Funding
              </div>
              <h4 className="text-2xl font-semibold text-primary">
                ${totalFund && totalFund}
              </h4>
            </div>
          </div>

          {/* Total Requests */}
          <div className="relative flex flex-col bg-white rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-50 p-6">
            <div className="flex justify-center items-center mb-4 bg-secondary/40 w-20 h-20 rounded-full p-3">
              <MdBloodtype className="text-secondary w-12 h-12" />
            </div>
            <div className="flex justify-between items-center">
              <div className="text-primary font-bold text-lg">
                Total Blood Donation Requests
              </div>
              <h4 className="text-2xl font-semibold text-primary">
                {stat?.totalRequests}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
