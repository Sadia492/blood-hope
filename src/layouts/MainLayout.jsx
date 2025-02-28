import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div>
      <ScrollRestoration />
      <Navbar></Navbar>
      <div className=" min-h-[calc(100vh-68px)] ">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
}
