import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";

export default function Blog() {
  const axiosPublic = useAxiosPublic();
  const { data: publishedBlogs = [], isLoading } = useQuery({
    queryKey: ["publishedBlogs"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/blogs/status/${"published"}`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="mt-24 w-11/12 mx-auto">
      <Helmet>
        <title>BloodHope | Blog</title>
      </Helmet>
      <h1
        className={`text-3xl font-bold bg-gradient-to-r text-center from-primary to-secondary text-transparent bg-clip-text`}
      >
        Blog
      </h1>
      <p className="text-center lg:w-3/5 mx-auto     mt-2 mb-8">
        Explore insightful articles and stories about the impact of blood
        donation. Stay informed and inspired to make a meaningful difference.
      </p>
      {publishedBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedBlogs?.map((blog) => (
            <div
              key={blog._id}
              className="border rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-60 object-cover"
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
      ) : (
        <p className="text-center font-bold text-primary text-2xl mt-6">
          No Data Found
        </p>
      )}
    </div>
  );
}
