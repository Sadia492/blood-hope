import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import bgImg from "../../../assets/trianglify-lowres.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";

export default function AllUser() {
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const limit = 10; // Number of items per page
  const {
    data: allUser,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUser", statusFilter, currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users?status=${statusFilter}&page=${currentPage}&limit=${limit}`
      );
      return data;
    },
    keepPreviousData: true,
  });

  // Fetch total count for pagination
  const { data: totalUsers, isLoading: totalLoading } = useQuery({
    queryKey: ["totalUsers", statusFilter],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/total-users?status=${statusFilter}`
      );
      return data;
    },
  });
  console.log(totalUsers);
  console.log(allUser);
  const totalPages = totalUsers ? Math.ceil(totalUsers.count / limit) : 1;

  const handleBlockUnblock = async (userEmail, status) => {
    try {
      const { data } = await axiosSecure.patch(`/user/role/${userEmail}`, {
        status,
      });
      if (data.modifiedCount) {
        toast.success(
          `User ${status === "blocked" ? "blocked" : "unblocked"} successfully.`
        );
        refetch();
      } else {
        toast.error("Failed to update user status.");
      }
    } catch (error) {
      toast.error("An error occurred while updating user status.");
      console.error(error);
    }
  };

  const handleRoleChange = async (userEmail, currentRole, newRole) => {
    if (currentRole === newRole) {
      return toast.error(`User role is already ${newRole}`);
    }

    try {
      const { data } = await axiosSecure.patch(`/user/role/${userEmail}`, {
        role: newRole,
      });
      if (data.modifiedCount) {
        toast.success(`Role updated to ${newRole} successfully!`);
        refetch();
      } else {
        toast.error("Failed to update user role.");
      }
    } catch (error) {
      toast.error("An error occurred while updating user role.");
      console.error(error);
    }
  };
  if ((isLoading, totalLoading)) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="w-11/12 mx-auto mt-8">
      <Helmet>
        <title>BloodHope | All Users</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center">All Users</h2>

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

      {/* User Table */}
      <div className="">
        {allUser?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table text-center border-separate border-spacing-y-3 w-full ">
              <thead
                style={{
                  backgroundImage: `url(${bgImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "right",
                }}
              >
                <tr>
                  <th>#</th>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allUser?.map((user, idx) => (
                  <tr
                    key={user?._id}
                    className="bg-white shadow-lg rounded-lg hover:scale-105 duration-300 ease-in-out transition-all"
                  >
                    <td>{idx + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="w-12 rounded-full">
                          <img src={user?.image} alt="Avatar" />
                        </div>
                      </div>
                    </td>
                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td>{user?.role}</td>
                    <td>
                      <span
                        className={`badge ${
                          user?.status === "active"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {user?.status}
                      </span>
                    </td>
                    <td>
                      <div className="dropdown dropdown-left">
                        <label tabIndex={0} className="btn btn-sm btn-ghost">
                          <BsThreeDotsVertical></BsThreeDotsVertical>
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content dropdown-top menu z-50 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <button
                              className="btn btn-sm bg-gradient-to-r text-white from-primary to-secondary"
                              onClick={() =>
                                handleBlockUnblock(
                                  user?.email,
                                  user.status === "active"
                                    ? "blocked"
                                    : "active"
                                )
                              }
                            >
                              {user.status === "active" ? "Block" : "Unblock"}
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn btn-sm bg-gradient-to-r text-white from-primary to-secondary"
                              onClick={() =>
                                handleRoleChange(
                                  user?.email,
                                  user?.role,
                                  "volunteer"
                                )
                              }
                            >
                              Make Volunteer
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn btn-sm bg-gradient-to-r text-white from-primary to-secondary"
                              onClick={() =>
                                handleRoleChange(
                                  user?.email,
                                  user?.role,
                                  "admin"
                                )
                              }
                            >
                              Make Admin
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="font-bold text-center text-3xl">No Data Found</p>
        )}
      </div>

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
