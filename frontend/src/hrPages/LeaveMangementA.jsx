/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function LeaveMangementA() {
  return (
    <div className="flex">
      <Sidebar />
      <Navbar name="Leave Management" />
    </div>
  );
}
