import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import BlogCard from "../../components/BlogCard";

export default function ContentManagement() {
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState("");

  const {
    data: blogs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs", statusFilter],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/blogs?status=${statusFilter}`);
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-11/12 mt-8 mx-auto">
      <div className="flex flex-row-reverse justify-between items-center mb-4">
        <Link
          to="/dashboard/content-management/add-blog"
          className="btn bg-gradient-to-r text-white from-primary to-secondary"
        >
          Add Blog
        </Link>
        {/* Filter Dropdown */}
        <label className="block mb-4 text-gray-700 font-semibold">
          Filter by Status:
          <select
            className="ml-2 p-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff563d] focus:border-[#ff563d] bg-white text-gray-800 transition duration-300"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.map((blog) => (
          <BlogCard key={blog._id} blog={blog} refetch={refetch}></BlogCard>
        ))}
      </div>
    </div>
  );
}
