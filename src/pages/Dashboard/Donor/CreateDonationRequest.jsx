import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useLocationData from "../../../hooks/useLocationData";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const CreateDonationRequest = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { districts, upazilas, userData, isLoading } = useLocationData();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const requesterName = user.displayName;
    const requesterEmail = user.email;
    const recipientName = form.recipientName.value;
    const recipientDistrict = form.recipientDistrict.value;
    const recipientUpazila = form.recipientUpazila.value;
    const hospitalName = form.hospitalName.value;
    const fullAddress = form.fullAddress.value;
    const bloodGroup = form.bloodGroup.value;
    const donationDate = form.donationDate.value;
    const donationTime = form.donationTime.value;
    const requestMessage = form.requestMessage.value;

    const donationRequest = {
      requesterName,
      requesterEmail,
      recipientName,
      recipientDistrict,
      recipientUpazila,
      hospitalName,
      fullAddress,
      bloodGroup,
      donationDate,
      donationTime,
      requestMessage,
      donationStatus: "pending",
    };

    if (userData?.status === "active") {
      const { data } = await axiosSecure.post(
        "/donation-requests",
        donationRequest
      );

      if (data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "donation requested successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      toast.error("you have been blocked by the admin");
    }

    form.reset();
  };
  if (isLoading || loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="w-11/12 mx-auto p-8 rounded-md shadow-md ">
      <Helmet>
        <title>BloodHope | Create Donation Request</title>
      </Helmet>
      <h1
        className={`text-3xl font-bold bg-gradient-to-r text-center from-primary to-secondary text-transparent bg-clip-text`}
      >
        Create Donation Request
      </h1>
      <p className="text-center lg:w-3/5 mx-auto  text-gray-600 mt-2 mb-8">
        Fill out the details to create your blood donation request and get the
        help you need when it matters most.
      </p>
      <form
        onSubmit={handleFormSubmit}
        className="grid gap-x-6 gap-y-4 grid-cols-1 md:grid-cols-2"
      >
        {/* Requester Info (Read-Only) */}
        <div className="form-control">
          <label className="label text-error font-semibold">
            Requester Name
          </label>
          <input
            type="text"
            name="requesterName"
            value={user.displayName}
            readOnly
            className="w-full px-4 py-3 rounded-md input input-bordered input-error  bg-gray-100"
          />
        </div>
        <div className="form-control">
          <label className="label text-error font-semibold">
            Requester Email
          </label>
          <input
            type="email"
            name="requesterEmail"
            value={user.email}
            readOnly
            className="w-full px-4 py-3 rounded-md input input-bordered input-error  bg-gray-100"
          />
        </div>

        {/* Recipient Info */}
        {/* name */}
        <div className="form-control">
          <label className="label text-error font-semibold">
            Recipient Name
          </label>
          <input
            type="text"
            name="recipientName"
            placeholder="Recipient's full name"
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered input-error "
          />
        </div>

        {/* district field */}
        <div className="form-control">
          <label className="label ">
            <span className="label-text text-error font-semibold">
              District
            </span>
          </label>
          <select
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered input-error "
            name="recipientDistrict"
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
          <label className="label ">
            <span className="label-text text-error font-semibold">Upazila</span>
          </label>
          <select
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered input-error "
            name="recipientUpazila"
          >
            <option value="">Select your Upazila</option>
            {upazilas?.map((upazila) => (
              <option value={upazila?.name} key={upazila._id}>
                {upazila?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label text-error font-semibold">
            Hospital Name
          </label>
          <input
            type="text"
            name="hospitalName"
            placeholder="e.g., Dhaka Medical College Hospital"
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered input-error "
          />
        </div>

        <div className="form-control">
          <label className="label text-error font-semibold">
            Full Address Line
          </label>
          <input
            type="text"
            name="fullAddress"
            placeholder="e.g., Zahir Raihan Rd, Dhaka"
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered input-error "
          />
        </div>

        {/* Blood Group Selector */}
        <div className="form-control">
          <label className="label text-error font-semibold">Blood Group</label>
          <select
            name="bloodGroup"
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered input-error "
          >
            <option value="">Select Blood Group</option>
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

        {/* Date and Time */}
        <div className="form-control">
          <label className="label text-error font-semibold">
            Donation Date
          </label>
          <input
            type="date"
            name="donationDate"
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered input-error "
          />
        </div>
        <div className="form-control">
          <label className="label text-error font-semibold">
            Donation Time
          </label>
          <input
            type="time"
            name="donationTime"
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered input-error "
          />
        </div>

        {/* Request Message */}
        <div className="form-control md:col-span-2">
          <label className="label text-error font-semibold">
            Request Message
          </label>
          <textarea
            name="requestMessage"
            rows="4"
            placeholder="Explain why blood is needed in detail..."
            required
            className="textarea textarea-bordered textarea-error w-full px-4 py-3 rounded-md bg-white"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-gradient-to-r md:col-span-2 text-white from-primary to-secondary"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
