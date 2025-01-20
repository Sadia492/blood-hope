import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import registerAnimation from "../../assets/animation/register.json";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_Image_Hosting_Key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function Register() {
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { createUser, setUser, updateUser, setLoading } = useAuth();
  const { data: districts = [], isLoading } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/districts");
      return data;
    },
  });
  const { data: upazilas = [], isPending } = useQuery({
    queryKey: ["upazilas"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/upazilas");
      return data;
    },
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const avatar = form.avatar.files[0];
    const bloodGroup = form.bloodGroup.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      return setError("Password did not match");
    }

    if (!/[A-Z]/.test(password)) {
      return setError("Must have an Uppercase letter in the password ");
    }
    if (!/[a-z]/.test(password)) {
      return setError("Must have a Lowercase letter in the password");
    }
    if (password.length < 6) {
      return setError("Password length must be at least 6 character");
    }

    try {
      // Create FormData and append the image file
      const formData = new FormData();
      formData.append("image", avatar);

      // Upload image to imgbb
      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      // Extract the image URL from the response
      const image = res?.data?.data?.url;

      if (res.data.success) {
        const user = {
          name,
          email,
          role: "donor",
          status: "active",
          image,
          bloodGroup,
          district,
          upazila,
        };
        createUser(email, password)
          .then(async (result) => {
            setUser(result.user);
            updateUser({ displayName: name, photoURL: image }).then(() => {});

            const { data } = await axiosPublic.post("/users", user);

            if (data.insertedId) {
              navigate("/");
              toast.success("Registration successful");
            }
          })
          .catch((error) => toast.error(error.code))
          .finally(() => setLoading(false));
        form.reset();
      }

      // Proceed with registration logic (e.g., calling `createUser`)
    } catch (error) {
      setError("Failed to upload the avatar. Please try again.");
    }
  };
  if (isLoading || isPending) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-center items-center min-h-screen w-11/12 mx-auto">
      <Helmet>
        <title>BloodHope | Register</title>
      </Helmet>
      <div className="card bg-base-100 w-full flex-1 shadow-2xl">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary from-0 to-70% to-secondary text-transparent bg-clip-text text-center">
          REGISTER NOW
        </h2>
        <form
          onSubmit={handleRegister}
          className="card-body grid   grid-cols-1 md:grid-cols-2"
        >
          {/* name field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-error font-semibold">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              name="name"
              className="input input-bordered input-error"
              required
            />
          </div>
          {/* email field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-error font-semibold">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered input-error"
              required
            />
          </div>
          {/* image field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-error font-semibold">
                Avatar
              </span>
            </label>
            <input
              type="file"
              name="avatar"
              className="file-input file-input-bordered input-error file-input-error w-full "
              accept="image/*"
              required
            />
          </div>
          {/* blood group field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-error font-semibold">
                Blood Group
              </span>
            </label>
            <select
              required
              className="w-full px-4 py-3 rounded-md select select-error bg-white input input-bordered input-error"
              name="bloodGroup"
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
          {/* district field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-error font-semibold">
                District
              </span>
            </label>
            <select
              required
              className="w-full px-4 py-3 select select-error rounded-md bg-white input input-bordered input-error"
              name="district"
            >
              <option value="">Select your District</option>
              {districts?.map((district) => (
                <option value={district?.name} key={district._id}>
                  {district?.name}
                </option>
              ))}
            </select>
          </div>
          {/* upazila field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-error font-semibold">
                Upazila
              </span>
            </label>
            <select
              required
              className="w-full px-4 py-3 select select-error rounded-md bg-white input input-bordered input-error"
              name="upazila"
            >
              <option value="">Select your Upazila</option>
              {upazilas?.map((upazila) => (
                <option value={upazila?.name} key={upazila._id}>
                  {upazila?.name}
                </option>
              ))}
            </select>
          </div>
          {/* password field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-error font-semibold">
                Password
              </span>
            </label>
            <label className="input input-bordered input-error flex  justify-between items-center gap-2">
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="password"
                className=""
                required
              />
              <button onClick={() => setShow(!show)} type="button" className="">
                {show ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </button>
            </label>
          </div>
          {/* confirm password field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-error font-semibold">
                Confirm Password
              </span>
            </label>
            <label className="input input-bordered input-error flex  justify-between items-center gap-2">
              <input
                type={confirmShow ? "text" : "password"}
                name="confirmPassword"
                placeholder="password"
                className=""
                required
              />
              <button
                onClick={() => setConfirmShow(!confirmShow)}
                type="button"
                className=""
              >
                {confirmShow ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </button>
            </label>
          </div>
          <div className="form-control mt-6 md:col-span-2">
            <button className="btn bg-gradient-to-r from-primary to-secondary text-white">
              Register
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-center col-span-2">{error}</p>
          )}
          <p className="text-center md:col-span-2">
            Already have an account? Please{" "}
            <Link className="text-red-500 font-bold" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <Lottie
          className="lg:w-4/5 "
          animationData={registerAnimation}
          loop={true}
        />
      </div>
    </div>
  );
}
