import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

export default function Blog() {
  const axiosPublic = useAxiosPublic();
  const { data: publishedBlogs = [], isLoading } = useQuery({
    queryKey: ["publishedBlogs"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/blogs/status/${"published"}`);
      return data;
    },
  });

  return (
    <div className="mt-24 w-11/12 mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Blog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishedBlogs?.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{
                  __html:
                    (blog?.content?.substring(0, 100) || "") +
                    (blog?.content?.length > 100 ? "..." : ""),
                }}
              />

              <Link
                to={`/blog/${blog._id}`}
                className="btn mt-4 bg-gradient-to-r from-primary to-secondary text-white"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
