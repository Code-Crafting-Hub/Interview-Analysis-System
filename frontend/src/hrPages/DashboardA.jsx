/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardA() {
  return (
    <div className="static md:flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="lg:hidden border-b-2 p-5">
          <p className="text-3xl font-semibold text-[#0D3D66]">HR Dashboard</p>
        </div>
        <Navbar name="HR Dashboard" />
        {/* Section div */}
        <div></div>
      </div>
    </div>
  );
}
