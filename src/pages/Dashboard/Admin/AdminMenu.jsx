import React from "react";
import { BsGraphUp } from "react-icons/bs";
import { FaHome, FaUserCog } from "react-icons/fa";
import MenuItem from "../../../shared/MenuItem";

export default function AdminMenu() {
  return (
    <>
      <MenuItem icon={FaHome} label="Home" address="/dashboard" />
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
    </>
  );
}
