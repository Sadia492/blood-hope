import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { authContext } from "../AuthProvider/AuthProvider";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { user, signOutUser } = useAuth();
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = () => {
    signOutUser().then(() => {
      toast.success("Logout successful");
    });
  };
  return (
    <div
      className={`w-full fixed top-0 z-10 transition-all duration-500 ease-in-out text-white ${
        pathname === "/"
          ? isScrolled
            ? "bg-secondary/50 backdrop-blur-md" // Background color when scrolled on homepage
            : "bg-transparent" // Transparent background on homepage
          : "bg-secondary/45 backdrop-blur-xl" // Non-transparent background on other pages
      }`}
    >
      <div className="navbar w-11/12 mx-auto">
        <div className="flex-1">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-primary rounded-box z-[1] mt-3 w-52 p-2"
            >
              <NavLink to="/">
                <li>Home</li>
              </NavLink>
              <NavLink to="/search">
                <li>Search</li>
              </NavLink>
              <NavLink to="/requests">
                <li>Donation Requests</li>
              </NavLink>
              <NavLink to="/blog">
                <li>Blog</li>
              </NavLink>

              <NavLink className={`${user ? "" : "hidden"}`} to="/funding">
                <li>Funding</li>
              </NavLink>
            </ul>
          </div>
          <a className="flex justify-center items-center gap-2">
            <img className="w-10 h-10" src={logo} alt="" />
            <h2 className="text-3xl flex items-center justify-center font-bold ">
              BloodHope
            </h2>
          </a>
        </div>
        <div className="flex-none">
          <div>
            <ul className="menu menu-horizontal gap-3 font-semibold px-1  hidden lg:flex">
              <NavLink to="/">
                <li>Home</li>
              </NavLink>
              <NavLink to="/search">
                <li>Search</li>
              </NavLink>
              <NavLink to="/blood-donation-requests">
                <li>Donation Requests</li>
              </NavLink>
              <NavLink to="/blog">
                <li>Blog</li>
              </NavLink>

              <NavLink className={`${user ? "" : "hidden"}`} to="/funding">
                <li>Funding</li>
              </NavLink>
            </ul>
          </div>

          <div className="ml-2 flex justify-center items-center">
            {user ? (
              <>
                <div className="dropdown dropdown-end mr-2">
                  <div className="flex">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar flex"
                    >
                      <div className="w-10 rounded-full">
                        <img
                          data-tooltip-id="my-tooltip"
                          // data-tooltip-content={user?.displayName}
                          alt="User"
                          src={user?.photoURL}
                        />
                        {/* <Tooltip id="my-tooltip" /> */}
                      </div>
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-primary rounded-box z-[1] mt-3 w-52 p-2 gap-3"
                  >
                    <NavLink
                      className="btn bg-gradient-to-r from-primary to-secondary text-white"
                      to="/dashboard"
                    >
                      <li>Dashboard</li>
                    </NavLink>
                    <Link
                      onClick={handleSignOut}
                      className="btn bg-gradient-to-r from-primary to-secondary text-white"
                    >
                      Logout
                    </Link>
                  </ul>
                </div>
              </>
            ) : (
              <Link
                className="btn bg-gradient-to-r from-primary to-secondary text-white"
                to="/login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
