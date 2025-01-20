import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import gradientAnimation from "../../assets/animation/gradient.json";
import Lottie from "lottie-react";
import useLocationData from "../../hooks/useLocationData";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_Image_Hosting_Key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function Profile() {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState("");
  const { user, setLoading, updateUser, loading } = useAuth();
  const { districts, upazilas, userData, refetch, isLoading } =
    useLocationData();
  // States to manage the dropdown selections
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");

  useEffect(() => {
    if (userData) {
      setSelectedDistrict(userData.district || "");
      setSelectedUpazila(userData.upazila || "");
      setSelectedBloodGroup(userData?.bloodGroup || "");
    }
  }, [userData]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const avatar = form.avatar.files[0];
    const bloodGroup = form.bloodGroup.value;
    const district = form.district.value;
    const upazila = form.upazila.value;

    try {
      let imageURL = userData?.image; // Default to current image URL

      if (avatar) {
        // Only upload the image if one is selected
        const formData = new FormData();
        formData.append("image", avatar);

        // Upload image to imgbb
        const res = await axiosPublic.post(image_hosting_api, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });

        if (res.data.success) {
          imageURL = res.data.data.url; // Get the new image URL
        }
      }

      const updatedUserData = {
        name,
        image: imageURL, // Use the new image URL if uploaded
        bloodGroup,
        district,
        upazila,
      };

      // Update user profile in Firebase
      await updateUser({ displayName: name, photoURL: imageURL });

      // Update user data in the database
      const { data } = await axiosSecure.put(
        `/user/${user?.email}`,
        updatedUserData
      );

      if (data.modifiedCount) {
        toast.success("User updated successfully");
        setSelectedDistrict(district); // Update state after success
        setSelectedUpazila(upazila); // Update state after success
        setSelectedBloodGroup(bloodGroup);
      }
      refetch();

      form.reset();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setEditMode(false); // Exit edit mode after saving
    }
  };

  if (isLoading || loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      <Helmet>
        <title>BloodHope | Profile</title>
      </Helmet>
      <div className="flex justify-center items-center h-screen">
        <div className=" shadow-2xl rounded-2xl md:w-4/5 lg:w-3/5">
          <div className="flex flex-col items-center justify-center p-8">
            <img
              alt="profile"
              src={user.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white"
            />

            <p className="p-2 px-4 text-xs text-white bg-primary rounded-full">
              {userData?.role}
            </p>

            {!editMode && (
              <div className="mt-4 w-full flex justify-end">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="btn bg-gradient-to-r text-white from-primary to-secondary"
                >
                  Edit
                </button>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 w-full gap-4"
            >
              {/* Avatar */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Avatar</span>
                </label>
                <input
                  type="file"
                  name="avatar"
                  className="file-input file-input-bordered file-input-error w-full max-w-xs"
                  accept="image/*"
                  disabled={!editMode}
                />
              </div>

              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={userData?.name}
                  className="input input-bordered"
                  disabled={!editMode}
                />
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={userData?.email}
                  className="input input-bordered"
                  disabled // Email is always disabled
                />
              </div>

              {/* Blood Group */}
              {userData?.bloodGroup && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Blood Group</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-md bg-white input input-bordered"
                    name="bloodGroup"
                    value={selectedBloodGroup}
                    disabled={!editMode}
                    onChange={(e) => {
                      setSelectedBloodGroup(e.target.value);
                    }}
                  >
                    <option value="">Select your Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              )}

              {/* District */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">District</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-md bg-white input input-bordered"
                  name="district"
                  value={selectedDistrict}
                  disabled={!editMode}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                  }}
                >
                  <option value="">Select your District</option>
                  {districts?.map((district) => (
                    <option value={district?.name} key={district._id}>
                      {district?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upazila */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Upazila</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-md bg-white input input-bordered"
                  name="upazila"
                  value={selectedUpazila}
                  disabled={!editMode || !selectedDistrict} // Disable if not in edit mode or district not selected
                  onChange={(e) => setSelectedUpazila(e.target.value)}
                >
                  <option value="">Select your Upazila</option>
                  {upazilas?.map((upazila) => (
                    <option value={upazila?.name} key={upazila._id}>
                      {upazila?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-center md:col-span-2 gap-4">
                {editMode && (
                  <button
                    type="submit"
                    className="btn bg-gradient-to-r text-white from-primary to-secondary"
                  >
                    Save
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="absolute top-0 right-0 lg:flex hidden ">
          <Lottie
            className="w-52 "
            animationData={gradientAnimation}
            loop={true}
          />
        </div>
        <div className="absolute bottom-0 left-80 lg:flex hidden">
          <Lottie
            className="w-52 "
            animationData={gradientAnimation}
            loop={true}
          />
        </div>
      </div>
    </div>
  );
}
