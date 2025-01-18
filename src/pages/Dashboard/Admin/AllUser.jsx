import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

export default function AllUser() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState("");
  const {
    data: allUser,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUser"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users`);
      return data;
    },
  });
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

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      {/* Filter Dropdown */}
      <label className="block mb-2">
        Filter by Status:
        <select
          className="ml-2 p-2 border rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="active">active</option>
          <option value="blocked">blocked</option>
        </select>
      </label>

      {/* User Table */}
      <div className="">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUser?.map((user) => (
              <tr key={user?._id}>
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
                      Actions
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content dropdown-top menu z-50 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <button
                          onClick={() =>
                            handleBlockUnblock(
                              user?.email,
                              user.status === "active" ? "blocked" : "active"
                            )
                          }
                        >
                          {user.status === "active" ? "Block" : "Unblock"}
                        </button>
                      </li>
                      <li>
                        <button
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
                          onClick={() =>
                            handleRoleChange(user?.email, user?.role, "admin")
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

      {/* Pagination */}
      {/* <div className="flex justify-center mt-4">
    {Array.from(
      { length: Math.ceil(filteredUsers.length / pageSize) },
      (_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`btn btn-sm mx-1 ${
            currentPage === index + 1 ? "btn-primary" : "btn-outline"
          }`}
        >
          {index + 1}
        </button>
      )
    )}
  </div> */}
    </div>
  );
}
