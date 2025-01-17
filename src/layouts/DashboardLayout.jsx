import React from "react";

import { Link, NavLink, Outlet } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";
import { FaHome, FaUserCog } from "react-icons/fa";
import MenuItem from "../shared/MenuItem";
import { CgProfile } from "react-icons/cg";
import { BsBoxArrowUpLeft } from "react-icons/bs";

export default function DashboardLayout() {
  return (
    <div className="">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ">
          {/* content from here */}
          <Outlet></Outlet>
          <div className="flex justify-end">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full p-6 w-80">
            {/* Sidebar content here */}
            <Link to={"/"}>
              <BsBoxArrowUpLeft />
            </Link>

            <MenuItem icon={FaHome} label="Home" address="/dashboard" />
            <MenuItem
              icon={CgProfile}
              label="Profile"
              address="/dashboard/profile"
            />
            <MenuItem
              icon={BsGraphUp}
              label="Statistics"
              address="/dashboard/statistics"
            />
            <MenuItem
              icon={FaUserCog}
              label="Manage Users"
              address="manage-users"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
