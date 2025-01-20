import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLoaderData } from "react-router-dom";
import useLocationData from "../../hooks/useLocationData";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";

export default function Search() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { districts, upazilas } = useLocationData();

  // States for form fields
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila, isLoading] = useState("");

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sending request to the backend with query parameters
      const { data } = await axiosPublic.get("/users/donor", {
        params: {
          bloodGroup,
          district,
          upazila,
        },
      });

      setDonors(data);

      if (data.length === 0) {
        toast.error("No donors found for the selected criteria.");
      }
    } catch (error) {
      toast.error("Error fetching donor data.");
    }

    setLoading(false);
  };
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="w-11/12 mx-auto mt-24">
      <Helmet>
        <title>BloodHope | Search</title>
      </Helmet>
      <h1
        className={`text-3xl font-bold bg-gradient-to-r text-center from-primary to-secondary text-transparent bg-clip-text`}
      >
        Search for Donors
      </h1>
      <p className="text-center lg:w-3/5 mx-auto  text-gray-600 mt-4 mb-8">
        Find life-saving blood donors in your area effortlessly. Connect with
        volunteers ready to help in emergencies.
      </p>
      {/* Form for Search */}
      <form
        onSubmit={handleSubmit}
        className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
        {/* Blood Group */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Blood Group</span>
          </label>
          <select
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
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

        {/* District */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">District</span>
          </label>
          <select
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="">Select your District</option>
            {/* Render districts dynamically from state */}
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
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
          >
            <option value="">Select your Upazila</option>
            {/* Render upazilas dynamically from state */}
            {upazilas?.map((upazila) => (
              <option value={upazila?.name} key={upazila._id}>
                {upazila?.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="form-control mt-8">
          <button
            className="btn bg-gradient-to-r from-primary to-secondary text-white"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {/* Display Donor Results */}
      {donors.length > 0 && (
        <div className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {donors.map((donor) => (
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Total Donors Found {donors?.length}
                </h2>

                <div
                  key={donor._id}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-xl font-semibold mb-2">{donor.name}</h3>
                  <p className="text-gray-600">
                    Blood Group: {donor.bloodGroup}
                  </p>
                  <p className="text-gray-600">District: {donor.district}</p>
                  <p className="text-gray-600">Upazila: {donor.upazila}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
