import React from "react";
import { BsGraphUp } from "react-icons/bs";
import { FaHome, FaPenAlt, FaUserCog, FaUsers } from "react-icons/fa";
import MenuItem from "../../../shared/MenuItem";
import { MdBloodtype } from "react-icons/md";

export default function VolunteerMenu() {
  return (
    <>
      <MenuItem icon={FaHome} label="Home" address="/dashboard" />
      <MenuItem
        icon={MdBloodtype}
        label="All Blood Donation Request"
        address="all-blood-donation-request"
      />
      <MenuItem
        icon={FaPenAlt}
        label="Content Management"
        address="content-management"
      />
    </>
  );
}
