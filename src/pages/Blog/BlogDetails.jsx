import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";

export default function BlogDetails() {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { data: blog = [], isLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/blog/${id}`);
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  return (
    <div className="w-11/12 mx-auto mt-24">
      <Helmet>
        <title>BloodHope | Blog Details</title>
      </Helmet>
      <div className="bg-white flex flex-col lg:flex-row items-center gap-6 rounded-lg shadow-lg p-8">
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
