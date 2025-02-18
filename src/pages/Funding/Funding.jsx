import React, { useState } from "react";
import { Link } from "react-router-dom";
import Payment from "./Payment";
import Modal from "react-modal";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import bgImg from "../../assets/trianglify-lowres.png";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";
Modal.setAppElement("#root");

export default function Funding() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [fund, setFund] = useState(0);
  const {
    data: funding,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["funding"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/funding`);
      return data;
    },
  });
  if (isLoading || loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="mt-24 w-11/12 mx-auto">
      <Helmet>
        <title>BloodHope | Funding</title>
      </Helmet>
      <h2
        className={`text-3xl font-bold bg-gradient-to-r text-center from-primary to-secondary text-transparent bg-clip-text`}
      >
        Funding
      </h2>
      <p className="text-center lg:w-3/5 mx-auto     mt-2 mb-2">
        Contribute to support life-saving campaigns and initiatives. Every
        donation brings us closer to making a greater impact together.
      </p>
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className={` btn bg-gradient-to-r from-primary to-secondary text-white`}
        >
          Give Fund
        </button>
      </div>
      {funding?.length ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-center border-separate border-spacing-y-3 table-layout-auto">
            <thead
              style={{
                backgroundImage: `url(${bgImg})`,
                backgroundSize: "cover",
                backgroundPosition: "right",
              }}
            >
              <tr className="text-white">
                <th className="px-4 py-4 ">#</th>
                <th className="px-4 py-4 ">User Name</th>
                <th className="px-4 py-4 ">Fund Amount</th>
                <th className="px-4 py-4 ">Funding Date</th>
              </tr>
            </thead>
            <tbody>
              {funding?.map((fund, index) => (
                <tr
                  key={fund.id}
                  className=" shadow-lg rounded-lg hover:scale-105 duration-300 ease-in-out transition-all"
                >
                  <td className="px-4 py-2 border border-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {fund.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    ${fund.fund}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {fund.date.split("T")[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center font-bold text-primary text-2xl mt-6">
          No Data found
        </p>
      )}

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
            <Payment fund={fund} refetch={refetch} closeModal={closeModal} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
