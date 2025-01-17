import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useLocationData from "../../../hooks/useLocationData";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { districts, upazilas, userData, isLoading } = useLocationData();
  console.log(userData);
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
      const { data } = await axiosPublic.post(
        "/donation-requests",
        donationRequest
      );
      console.log(data);
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

    // console.log(donationRequest); // Replace this with an API call to save the dat
    form.reset();
  };

  return (
    <div className="p-6 w-full mx-auto bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-center form-control">
        Create Donation Request
      </h1>
      <form
        onSubmit={handleFormSubmit}
        className="grid gap-x-6 gap-y-4 grid-cols-2"
      >
        {/* Requester Info (Read-Only) */}
        <div className="form-control">
          <label className="label">Requester Name</label>
          <input
            type="text"
            name="requesterName"
            value={user.displayName}
            readOnly
            className="w-full px-4 py-3 rounded-md input input-bordered bg-gray-100"
          />
        </div>
        <div className="form-control">
          <label className="label">Requester Email</label>
          <input
            type="email"
            name="requesterEmail"
            value={user.email}
            readOnly
            className="w-full px-4 py-3 rounded-md input input-bordered bg-gray-100"
          />
        </div>

        {/* Recipient Info */}
        {/* name */}
        <div className="form-control">
          <label className="label">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            placeholder="Recipient's full name"
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered"
          />
        </div>

        {/* district field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">District</span>
          </label>
          <select
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered"
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
          <label className="label">
            <span className="label-text">Upazila</span>
          </label>
          <select
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered"
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
          <label className="label">Hospital Name</label>
          <input
            type="text"
            name="hospitalName"
            placeholder="e.g., Dhaka Medical College Hospital"
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">Full Address Line</label>
          <input
            type="text"
            name="fullAddress"
            placeholder="e.g., Zahir Raihan Rd, Dhaka"
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered"
          />
        </div>

        {/* Blood Group Selector */}
        <div className="form-control">
          <label className="label">Blood Group</label>
          <select
            name="bloodGroup"
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered"
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
          <label className="label">Donation Date</label>
          <input
            type="date"
            name="donationDate"
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">Donation Time</label>
          <input
            type="time"
            name="donationTime"
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered"
          />
        </div>

        {/* Request Message */}
        <div className="form-control col-span-2">
          <label className="label">Request Message</label>
          <textarea
            name="requestMessage"
            rows="4"
            placeholder="Explain why blood is needed in detail..."
            required
            className="textarea textarea-bordered w-full px-4 py-3 rounded-md bg-white"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full col-span-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
