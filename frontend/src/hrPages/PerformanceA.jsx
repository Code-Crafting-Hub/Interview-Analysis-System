/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function PerformanceA() {
  return (
    <div className="static md:flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="lg:hidden border-b-2 p-5">
          <p className="text-3xl font-semibold text-[#0D3D66]">
            Performance Report
          </p>
        </div>
        <Navbar name="Performance Report" />
        {/* Section div */}
        <div></div>
      </div>
    </div>
  );
}
