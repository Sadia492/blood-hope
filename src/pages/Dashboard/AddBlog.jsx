import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_Image_Hosting_Key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function AddBlog() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const image = form.image.files[0];

    // Validate inputs
    if (!image || !image.type.startsWith("image/")) {
      return toast.error("Please upload a valid image file.");
    }

    if (!content.trim()) {
      return toast.error("Content cannot be empty.");
    }

    try {
      const formData = new FormData();
      formData.append("image", image);

      // Upload image to imgbb
      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const uploadedImageUrl = res?.data?.data?.url;
      if (res.data.success) {
        const blog = {
          title,
          image: uploadedImageUrl,
          content,
          blogStatus: "draft",
        };

        const { data } = await axiosSecure.post("/blogs", blog);
        if (data.insertedId) {
          toast.success("Blog added successfully");
          form.reset();
          setContent(""); // Reset editor content
        }
      }
    } catch (error) {
      toast.error("Failed to upload image or save blog. Please try again.");
    }
  };

  return (
    <div className="w-11/12 mx-auto mt-8">
      <h2
        className={`text-3xl font-bold bg-gradient-to-r text-center from-primary to-secondary text-transparent bg-clip-text`}
      >
        Add Blog
      </h2>
      <p className="text-center lg:w-3/5 mx-auto  text-gray-600 mt-2 mb-8">
        Add a new blog here—write, format, and share valuable content with our
        users to keep them informed and engaged.
      </p>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            className="input input-bordered w-full input-error"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input
            type="file"
            name="image"
            className="file-input file-input-bordered file-input-error w-full"
            accept="image/*"
            required
          />
        </div>
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text">Content</span>
          </label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
        <button
          type="submit"
          className="btn md:col-span-2 bg-gradient-to-r text-white from-primary to-secondary"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}
