import React from "react";
import { BsGraphUp } from "react-icons/bs";
import { FaHome, FaUserCog, FaUsers } from "react-icons/fa";
import MenuItem from "../../../shared/MenuItem";

export default function AdminMenu() {
  return (
    <>
      <MenuItem icon={FaHome} label="Home" address="/dashboard" />
      <MenuItem icon={FaUsers} label="All Users" address="all-users" />
    </>
  );
}
