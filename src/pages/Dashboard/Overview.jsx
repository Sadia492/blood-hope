import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function Overview() {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { data: stat, isLoading } = useQuery({
    queryKey: ["stat"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/admin-stat/${"donor"}`);
      return data;
    },
  });

  // Fetch pending donation requests
  const { data: requests = [], isLoading: loading } = useQuery({
    queryKey: ["pendingRequests"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/donation-request/status/${"pending"}`
      );
      return data;
    },
  });
  const { data: allRequests = [], isLoading: reqLoading } = useQuery({
    queryKey: ["allRequests"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/all-donation-request`);
      return data;
    },
  });

  // Function to count donation requests by blood group
  const countByBloodGroup = () => {
    const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
    return bloodGroups.map((group) => ({
      name: group,
      value: allRequests.filter((request) => request.bloodGroup === group)
        .length,
    }));
  };

  // Function to count donations per month
  const getMonthlyDonations = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const donationsByMonth = allRequests.reduce((acc, request) => {
      const monthIndex = new Date(request.donationDate).getMonth();
      acc[months[monthIndex]] = (acc[months[monthIndex]] || 0) + 1;
      return acc;
    }, {});

    return months.map((month) => ({
      month: month,
      donations: donationsByMonth[month] || 0,
    }));
  };
  console.log(getMonthlyDonations());

  // Sample Data for Charts
  const donationData = getMonthlyDonations();

  const bloodGroupData = countByBloodGroup();
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28FEF",
    "#E85A4F",
    "#6D9886",
    "#D72638",
  ];

  return (
    <div className="w-11/12 mx-auto mt-10">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text text-center">
        Dashboard Overview
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Get insights into donations, donor statistics, and requests.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white mb-8">
        <div className="bg-primary p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold">Total Donations</h2>
          <p className="text-4xl font-extrabold mt-2">{stat?.totalRequests}</p>
        </div>
        <div className="bg-secondary p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold">Active Donors</h2>
          <p className="text-4xl font-extrabold mt-2">{stat?.totalUsers}</p>
        </div>
        <div className="bg-red-500 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold">Pending Requests</h2>
          <p className="text-4xl font-extrabold mt-2">{requests?.length}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-center">Donations Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={donationData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="donations" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-center">
            Blood Group Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={bloodGroupData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {bloodGroupData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
