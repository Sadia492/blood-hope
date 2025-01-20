import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useRole from "../hooks/useRole";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import LoadingSpinner from "./LoadingSpinner";

export default function BlogCard({ blog, refetch }) {
  const axiosSecure = useAxiosSecure();
  const [role, roleLoading] = useRole();

  const handlePublishUnpublish = async (blogId, blogStatus) => {
    if (role === "admin") {
      try {
        const { data } = await axiosSecure.patch(`/blog/${blogId}`, {
          blogStatus, // Use blogStatus field here
        });
        if (data.modifiedCount) {
          toast.success(
            `Blog ${
              blogStatus === "published" ? "published" : "unpublished"
            } successfully.`
          );
          refetch();
        } else {
          toast.error("Failed to update blog status.");
        }
      } catch (error) {
        toast.error("An error occurred while updating blog status.");
        console.error(error);
      }
    } else {
      toast.error("Only admin can perform this action.");
    }
  };
  const handleDelete = async (blogId) => {
    if (role === "admin") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/blog/${blogId}`).then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch();
            }
          });
        }
      });
    } else {
      toast.error("Only admin can perform this action.");
    }
  };
  if (roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl h-full">
        <figure>
          <img src={blog.image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {blog?.title}
            <div className="badge badge-secondary">{blog.blogStatus}</div>
          </h2>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog?.content }}
          />
          <div className="card-actions justify-end">
            <button
              className="btn  bg-gradient-to-r text-white from-primary to-secondary"
              onClick={() =>
                handlePublishUnpublish(
                  blog?._id,
                  blog.blogStatus === "draft" ? "published" : "draft"
                )
              }
            >
              {blog.blogStatus === "draft" ? "Publish" : "Unpublish"}
            </button>
            <button
              className="btn  bg-gradient-to-r text-white from-primary to-secondary"
              onClick={() => handleDelete(blog._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
