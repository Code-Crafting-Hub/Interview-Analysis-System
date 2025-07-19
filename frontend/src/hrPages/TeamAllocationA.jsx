/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function TeamAllocationA() {
  return (
    <div className="static md:flex">
          <Sidebar />
          <div className="flex flex-col w-full">
            <div className="lg:hidden border-b-2 p-5">
              <p className="text-3xl font-semibold text-[#0D3D66]">Team Allocation</p>
            </div>
            <Navbar name="Team Allocation" />
            {/* Section div */}
            <div></div>
          </div>
        </div>
  );
}
