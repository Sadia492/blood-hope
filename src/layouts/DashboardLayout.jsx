import React from "react";

import { Link, NavLink, Outlet } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";
import { FaHome, FaUserCog } from "react-icons/fa";
import MenuItem from "../shared/MenuItem";
import { CgProfile } from "react-icons/cg";
import { BsBoxArrowUpLeft } from "react-icons/bs";
import { IoCreateSharp } from "react-icons/io5";
import { TbBrandMyOppo } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import DonorMenu from "../pages/Dashboard/Donor/DonorMenu";
import AdminMenu from "../pages/Dashboard/Admin/AdminMenu";

export default function DashboardLayout() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userRole, isLoading } = useQuery({
    queryKey: ["userRole", user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/role/${user?.email}`);
      return data;
    },
  });

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

            {userRole?.role === "donor" && <DonorMenu></DonorMenu>}

            {userRole?.role === "admin" && <AdminMenu></AdminMenu>}

            <MenuItem
              icon={CgProfile}
              label="Profile"
              address="/dashboard/profile"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
