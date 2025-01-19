import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export default function BlogDetails() {
  const { id } = useParams();
  //   const [blog, setBlog] = useState(null);
  //   const [loading, setLoading] = useState(true);

  const axiosPublic = useAxiosPublic();
  const { data: blog = [], isLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/blog/${id}`);
      return data;
    },
  });

  //   useEffect(() => {
  //     const fetchBlog = async () => {
  //       try {
  //         const { data } = await axios.get(`/blogs/${id}`);
  //         setBlog(data);
  //       } catch (error) {
  //         console.error("Error fetching blog details", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchBlog();
  //   }, [id]);

  if (isLoading) {
    return <div>Loading blog...</div>;
  }

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  return (
    <div className="w-11/12 mx-auto mt-24">
      <div className="bg-white flex items-center gap-6 rounded-lg shadow-lg p-8">
        <div className="flex-1">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full object-cover rounded-md mb-6"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

          <div
            className="blog-content text-justify"
            dangerouslySetInnerHTML={{ __html: blog?.content }}
          />
        </div>
      </div>
    </div>
  );
}
