import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className=" bg-neutral text-neutral-content">
      <div className="bg-neutral text-neutral-content p-10 w-11/12 mx-auto">
        <div className="footer justify-between border-b pb-6 mb-6">
          <div>
            <div>
              <a className="text-3xl flex items-center justify-start font-bold bg-gradient-to-r from-primary to-secondary to-[50%] text-transparent bg-clip-text">
                <img src={logo} alt="" />
                BloodHope
              </a>
              <p className="w-3/5 text-justify">
                Powered by BloodHope, the trusted platform dedicated to saving
                lives by connecting donors with those in need.
              </p>
            </div>
            <div></div>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <nav>
              <h2 className="font-bold text-xl mb-4">Donate</h2>
              <ul className="">
                <Link to="/">Home</Link>
                <Link to="/blood-donation-requests" className="ml-2">
                  All Campaigns
                </Link>
                <br />
                <Link to="/login">Login</Link>
                <Link to="/register" className="ml-2">
                  Register
                </Link>
              </ul>
            </nav>
            <nav>
              <h2 className="font-bold text-xl mb-4">Help</h2>
              <ul className="">
                <Link to="/">Home</Link>

                <Link to="/" className="ml-2">
                  About Us
                </Link>
                <br />
                <Link to="/" className="">
                  Contact Us
                </Link>
              </ul>
            </nav>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-2 justify-between">
          <div>
            <p>&copy;BloodHope 2025</p>
            <p>All rights reserved</p>
          </div>
          <div className="flex flex-wrap  gap-4">
            <button className="flex border rounded-full justify-center items-center px-4 py-2 gap-2">
              <p className="text-white text-2xl">
                <FaInstagram />
              </p>
              Instagram
            </button>
            <button className="flex border rounded-full justify-center items-center px-4 py-2 gap-2">
              <p className="text-white text-2xl">
                <FaFacebook />
              </p>
              Facebook
            </button>
            <button className="flex border rounded-full justify-center items-center px-4 py-2 gap-2">
              <p className="text-white text-2xl">
                <FaXTwitter />
              </p>
              Twitter
            </button>
            <button className="flex border rounded-full justify-center items-center px-4 py-2 gap-2">
              <p className="text-white text-2xl">
                <FaLinkedin />
              </p>
              Linkedin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
