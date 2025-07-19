/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function TeamAllocationA() {
  return (
    <div className="flex">
      <Sidebar />
      <Navbar name="Team Allocation" />
    </div>
  );
}
