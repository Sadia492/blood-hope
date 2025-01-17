import React from "react";
import { FaHome } from "react-icons/fa";
import { IoCreateSharp } from "react-icons/io5";
import { TbBrandMyOppo } from "react-icons/tb";
import MenuItem from "../../../shared/MenuItem";

export default function DonorMenu() {
  return (
    <>
      <MenuItem icon={FaHome} label="Home" address="/dashboard" />
      <MenuItem
        icon={TbBrandMyOppo}
        label="My Donation Request"
        address="/dashboard/my-donation-requests"
      />
      <MenuItem
        icon={IoCreateSharp}
        label="Create Donation Request"
        address="/dashboard/create-donation-request"
      />
    </>
  );
}
