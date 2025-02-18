import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
export default function DashboardNav() {
  const { user, signOutUser } = useAuth();
  const handleSignOut = () => {
    signOutUser().then(() => {
      toast.success("Logout successful");
    });
  };
  return (
    <div className="navbar bg-base-100 px-10">
      <div className="flex-1">
        <Link to={"/"}>
          <div className="flex justify-center items-center">
            <img className="w-10" src={logo} alt="" />
            <h3 className="text-2xl font-bold">BloodHope</h3>
          </div>
        </Link>{" "}
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/dashboard/profile"} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <button onClick={handleSignOut}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
