import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="pt-24 min-h-[calc(100vh-68px)] w-11/12 mx-auto">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
}
