import React, { useEffect, useState } from "react";
import useLocationData from "../../hooks/useLocationData";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function DonationUpdate() {
  const { id } = useParams();
  const { districts, upazilas, isLoading } = useLocationData();
  // States to manage the dropdown selections
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { data: request, isLoading: requestLoading } = useQuery({
    queryKey: ["request", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donation-request/${id}`);
      return data;
    },
  });
  useEffect(() => {
    if (request) {
      setSelectedDistrict(request?.recipientDistrict || "");
      setSelectedUpazila(request?.recipientUpazila || "");
    }
  }, [request]);
  console.log(selectedDistrict, selectedUpazila);
  const {
    bloodGroup,
    donationDate,
    donationStatus,
    donationTime,
    fullAddress,
    hospitalName,
    recipientDistrict,
    recipientName,
    recipientUpazila,
    requestMessage,
  } = request || {};
  const [district, setDistrict] = useState(recipientDistrict);
  console.log(district);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const requesterName = user.displayName;
    const requesterEmail = user.email;
    const recipientName = form.recipientName.value;
    // const recipientDistrict = form.recipientDistrict.value;
    // const recipientUpazila = form.recipientUpazila.value;
    const hospitalName = form.hospitalName.value;
    const fullAddress = form.fullAddress.value;
    const bloodGroup = form.bloodGroup.value;
    const donationDate = form.donationDate.value;
    const donationTime = form.donationTime.value;
    const requestMessage = form.requestMessage.value;

    const donationRequest = {
      recipientName,
      selectedDistrict,
      selectedDistrict,
      hospitalName,
      fullAddress,
      bloodGroup,
      donationDate,
      donationTime,
      requestMessage,
    };
    console.log(donationTime);
    // if (userData?.status === "active") {
    const { data } = await axiosSecure.put(
      `/donation-request/${id}`,
      donationRequest
    );
    console.log(data);
    if (data.modifiedCount) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "donation updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    // } else {
    //   toast.error("you have been blocked by the admin");
    // }

    // console.log(donationRequest); // Replace this with an API call to save the dat
    form.reset();
  };

  if (isLoading || requestLoading || loading)
    return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="w-11/12 mx-auto mt-24">
      <h1 className="text-2xl font-bold text-center form-control">
        Update Donation Request
      </h1>
      <form
        onSubmit={handleFormSubmit}
        className="grid gap-x-6 gap-y-4 grid-cols-2"
      >
        {/* Requester Info (Read-Only) */}
        <div className="form-control">
          <label className="label text-error">Requester Name</label>
          <input
            type="text"
            name="requesterName"
            defaultValue={user?.displayName}
            readOnly
            className="w-full px-4 py-3 rounded-md input input-bordered input-error bg-gray-100"
          />
        </div>
        <div className="form-control">
          <label className="label text-error">Requester Email</label>
          <input
            type="email"
            name="requesterEmail"
            defaultValue={user?.email}
            readOnly
            className="w-full px-4 py-3 rounded-md input input-bordered input-error bg-gray-100"
          />
        </div>

        {/* Recipient Info */}
        {/* name */}
        <div className="form-control">
          <label className="label text-error">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            placeholder="Recipient's full name"
            defaultValue={recipientName}
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered input-error"
          />
        </div>

        {/* District */}
        <div className="form-control">
          <label className="label text-error">
            <span className="label-text">District</span>
          </label>
          <select
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered input-error"
            name="district"
            value={selectedDistrict}
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
          <label className="label text-error">
            <span className="label-text">Upazila</span>
          </label>
          <select
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered input-error"
            name="upazila"
            value={selectedUpazila}
            disabled={!selectedDistrict} // Disable if not in edit mode or district not selected
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

        <div className="form-control">
          <label className="label text-error">Hospital Name</label>
          <input
            type="text"
            defaultValue={hospitalName}
            name="hospitalName"
            placeholder="e.g., Dhaka Medical College Hospital"
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered input-error"
          />
        </div>

        <div className="form-control">
          <label className="label text-error">Full Address Line</label>
          <input
            type="text"
            defaultValue={fullAddress}
            name="fullAddress"
            placeholder="e.g., Zahir Raihan Rd, Dhaka"
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered input-error"
          />
        </div>

        {/* Blood Group Selector */}
        {bloodGroup && (
          <div className="form-control">
            <label className="label text-error">
              <span className="label-text">Blood Group</span>
            </label>
            <select
              required
              className="w-full px-4 py-3 rounded-md bg-white input input-bordered input-error"
              name="bloodGroup"
              defaultValue={bloodGroup || ""}
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

        {/* Date and Time */}
        <div className="form-control">
          <label className="label text-error">Donation Date</label>
          <input
            type="date"
            defaultValue={donationDate}
            name="donationDate"
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered input-error"
          />
        </div>
        <div className="form-control">
          <label className="label text-error">Donation Time</label>
          <input
            type="time"
            defaultValue={donationTime}
            name="donationTime"
            required
            className="w-full px-4 py-3 rounded-md bg-white input input-bordered input-error"
          />
        </div>

        {/* Request Message */}
        <div className="form-control col-span-2">
          <label className="label text-error">Request Message</label>
          <textarea
            name="requestMessage"
            defaultValue={requestMessage}
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
}
