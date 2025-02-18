import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Modal from "react-modal";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import animation from "../../assets/animation/bloodMan.json";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";

Modal.setAppElement("#root");

export default function DonationDetails() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, loading } = useAuth();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {
    data: donationRequest,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donationRequest", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/donation-request/${id}`);
      return data;
    },
  });
  console.log(donationRequest);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (donationRequest?.donationStatus === "pending") {
      try {
        const { data } = await axiosSecure.patch(`/donation-request/${id}`, {
          status: "inprogress",
        });
        if (data.modifiedCount) {
          toast.success("Donation status updated to 'In Progress'!");
          refetch();
          setTimeout(() => {
            closeModal();
          }, 3000);
        }
      } catch (error) {
        toast.error("Failed to update donation status.");
      }
    } else {
      toast.error(
        `Donation request is already ${donationRequest.donationStatus}`
      );
    }
  };

  if (isLoading || loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="w-11/12 mt-24 mx-auto ">
      <Helmet>
        <title>BloodHope | Donation Details</title>
      </Helmet>
      <h2
        className={`text-3xl font-bold bg-gradient-to-r text-center from-primary to-secondary text-transparent bg-clip-text`}
      >
        Donation Request Details
      </h2>
      <p className="text-center lg:w-3/5 mx-auto  text-gray-600 mt-2 mb-8">
        View all the details of the donation request here—track the status,
        urgency, and any additional information provided by the requester.
      </p>
      <div className="flex-1 flex justify-center items-center">
        <Lottie className="w-48 " animationData={animation} loop={true} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Donation Details */}
        <div className="p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Recipient Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Recipient Name:</strong>{" "}
              {donationRequest.recipientName || ""}
            </p>
            <p>
              <strong>District:</strong> {donationRequest.recipientDistrict}
            </p>
            <p>
              <strong>Upazila:</strong> {donationRequest.recipientUpazila}
            </p>
            <p>
              <strong>Road:</strong> {donationRequest.fullAddress}
            </p>
            <p>
              <strong>Date:</strong> {donationRequest.donationDate}
            </p>
            <p>
              <strong>Time:</strong> {donationRequest.donationTime}
            </p>
          </div>
        </div>

        {/* Status Information */}
        <div className="p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-2 ">Donation Status</h3>
          <p className="mb-2">
            <strong>Request Message:</strong> {donationRequest.requestMessage}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-3 py-1 rounded-full text-white ${
                donationRequest.donationStatus === "pending"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            >
              {donationRequest.donationStatus}
            </span>
          </p>
        </div>
      </div>

      {/* Donate Button */}
      <div className="text-center mt-8">
        <button
          onClick={openModal}
          className="btn bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 text-lg font-semibold rounded-md shadow-md hover:opacity-90"
        >
          Donate Now
        </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Donation Modal"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-xl max-w-lg w-full"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Confirm Donation
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-gray-600">User Name</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              className="input input-bordered w-full"
              readOnly
            />
          </div>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-gray-600">User Email</span>
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              className="input input-bordered w-full"
              readOnly
            />
          </div>
          <button
            type="submit"
            className="btn bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 text-lg font-semibold w-full rounded-md shadow-md hover:opacity-90"
          >
            Confirm Donation
          </button>
        </form>
      </Modal>
    </div>
  );
}
