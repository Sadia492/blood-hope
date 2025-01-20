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
import useRole from "../hooks/useRole";
import VolunteerMenu from "../pages/Dashboard/volunteer/VolunteerMenu";
import logo from "../assets/logo.png";
import { AiOutlineMenu } from "react-icons/ai";

export default function DashboardLayout() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, roleLoading] = useRole();

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
          <div className="flex justify-end my-8">
            <label
              htmlFor="my-drawer-2"
              className="btn bg-primary text-white drawer-button lg:hidden"
            >
              <AiOutlineMenu />
            </label>
          </div>
          {/* content from here */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-primary text-white min-h-full p-6 w-80">
            {/* Sidebar content here */}
            <div className="mb-8">
              <Link to={"/"}>
                <BsBoxArrowUpLeft />
                <div className="flex justify-center items-center">
                  <img className="w-14" src={logo} alt="" />
                  <h3 className="text-3xl font-bold">BloodHope</h3>
                </div>
              </Link>
            </div>
            <MenuItem
              icon={CgProfile}
              label="Profile"
              address="/dashboard/profile"
            />
            {role === "donor" && <DonorMenu></DonorMenu>}
            {role === "admin" && <AdminMenu></AdminMenu>}
            {role === "volunteer" && <VolunteerMenu></VolunteerMenu>}
          </ul>
        </div>
      </div>
    </div>
  );
}
