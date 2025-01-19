import React, { useState } from "react";
import { Link } from "react-router-dom";
import Payment from "./Payment";
import Modal from "react-modal";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
Modal.setAppElement("#root");

export default function Funding() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [fund, setFund] = useState(0);
  const { data: funding, isLoading } = useQuery({
    queryKey: ["funding"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/funding`);
      return data;
    },
  });
  console.log(funding);

  return (
    <div className="mt-24">
      <button onClick={openModal} className="btn btn-warning">
        Give Fund
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {funding?.map((fundItem) => (
          <div
            key={fundItem._id}
            className="p-4 border rounded-lg shadow-lg bg-white"
          >
            <h3 className="font-bold text-lg">{fundItem.name}</h3>
            <p>
              <strong>Fund Amount:</strong> ${fundItem.fund}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(fundItem.date).toLocaleDateString()}{" "}
              {new Date(fundItem.date).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Donation Modal"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg max-w-lg w-full"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
      >
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">User Name</span>
            </label>
            <input
              type="text"
              defaultValue={user?.displayName}
              className="input input-bordered"
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Fund</span>
            </label>
            <input
              type="number"
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setFund(isNaN(value) || value <= 0 ? 0 : value);
              }}
              placeholder="Fund"
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6">
            <Payment fund={fund} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
