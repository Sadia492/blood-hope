import React from "react";
import { BsGraphUp } from "react-icons/bs";
import { FaHome, FaUserCog, FaUsers } from "react-icons/fa";
import MenuItem from "../../../shared/MenuItem";
import { MdBloodtype } from "react-icons/md";
export default function AdminMenu() {
  return (
    <>
      <MenuItem icon={FaHome} label="Home" address="/dashboard" />
      <MenuItem icon={FaUsers} label="All Users" address="all-users" />
      <MenuItem
        icon={MdBloodtype}
        label="All Blood Donation Request"
        address="all-blood-donation-request"
      />
    </>
  );
}
