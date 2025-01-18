import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Modal from "react-modal";
import toast from "react-hot-toast";

Modal.setAppElement("#root");

export default function DonationDetails() {
  const { id } = useParams(); // Get the request ID from URL params
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth(); // Get logged-in user info
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {
    data: donationRequest,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donationRequest", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donation-request/${id}`);
      return data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (donationRequest?.donationStatus === "pending") {
      try {
        const { data } = await axiosSecure.patch(`/donation-request/${id}`, {
          status: "inprogress",
        });
        console.log(data);
        if (data.modifiedCount) {
          toast.success("Donation status updated to 'In Progress'!");
          refetch();
          // Close the modal after 3 seconds
          setTimeout(() => {
            closeModal();
          }, 3000);
        }
      } catch (error) {
        toast.error("Failed to update donation status.");
        console.error(error);
      }
    } else {
      toast.error("Donation request is already in progress");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Donation Request Details</h2>

      {/* Donation Request Information */}
      <div className="mb-6">
        <p>
          <strong>Recipients Name:</strong> {donationRequest.recipientName}
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
        <p>
          <strong>Request Status:</strong> {donationRequest.requestMessage}
        </p>
        <p>
          <strong>Donation Status:</strong> {donationRequest.donationStatus}
        </p>
      </div>

      {/* Donate Button */}
      <button
        onClick={openModal}
        className="btn bg-gradient-to-r mt-3 from-primary to-secondary text-white"
      >
        Donate
      </button>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Donation Modal"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg max-w-lg w-full"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
      >
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">User Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              name="name"
              defaultValue={user?.displayName}
              className="input input-bordered"
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">User Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              defaultValue={user?.email}
              name="email"
              className="input input-bordered"
              readOnly
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-gradient-to-r from-primary to-secondary text-white">
              Confirm
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
