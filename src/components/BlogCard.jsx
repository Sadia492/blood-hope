import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useRole from "../hooks/useRole";
import toast from "react-hot-toast";

export default function BlogCard({ blog, refetch }) {
  const axiosSecure = useAxiosSecure();
  const [role, isLoading] = useRole();

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
      console.log(blogId);
      try {
        const { data } = await axiosSecure.delete(`/blog/${blogId}`);
        if (data.deletedCount) {
          toast.success("Blog deleted successfully.");
          refetch();
        } else {
          toast.error("Failed to delete blog.");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the blog.");
        console.error(error);
      }
    } else {
      toast.error("Only admin can delete a blog.");
    }
  };
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
              className="btn btn-primary"
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
              className="btn btn-error ml-2"
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
