import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function AllUser() {
  const axiosSecure = useAxiosSecure();
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
  const handleBlockUnblock = async (userId, status) => {
    console.log(userId, status);
    const { data } = await axiosSecure.patch(`/user/${userId}`, { status });
    if (data.modifiedCount && status === "blocked") {
      toast.success("user blocked");
    } else {
      toast.success("user unblocked");
    }
    refetch();
  };

  const handleRoleChange = (userId, role) => {
    // Update user role in the backend
    // fetch(`/api/users/${userId}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ role }),
    // }).then(() => fetchUsers());
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
                              user._id,
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
                            handleRoleChange(user._id, "volunteer")
                          }
                        >
                          Make Volunteer
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleRoleChange(user._id, "admin")}
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
