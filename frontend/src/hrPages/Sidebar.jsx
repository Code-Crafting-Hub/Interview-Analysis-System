/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { SlCalender } from "react-icons/sl";
import { RiTeamLine } from "react-icons/ri";
import { AiOutlineTeam } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Route-to-color mapping
  const routeColors = {
    "/hr/dashboard": "#1F2937", // Dashboard - Gray
    "/employee": "#0f766e", // Employee Management - Teal
    "/leave": "#4f46e5", // Leave Management - Indigo
    "/payroll": "#7c3aed", // Payroll - Purple
    "/team": "#dc2626", // Team Allocation - Red
    "/performance": "#15803d", // Performance Report - Green
    "/settings": "#52525b", // Settings - Zinc
  };

  const currentPath = location.pathname;
  const sidebarColor = routeColors[currentPath] || "#1F2937";

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden p-4 bg-white shadow-lg flex justify-between items-center">
        <h1 className="text-xl font-bold">HR Dashboard</h1>
        <button onClick={toggleSidebar}>
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-screen transition-all duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-[16rem] flex flex-col justify-between`}
        style={{ backgroundColor: sidebarColor }}
      >
        <div>
          <h1 className="border-b text-center text-xl font-semibold py-4 px-2 text-white">
            HR Dashboard
          </h1>
          <nav className="flex flex-col p-4 space-y-2 text-white">
            <Link
              to="/hr/dashboard"
              className="w-full py-3 rounded-md hover:bg-white/20 flex items-center gap-2 px-3"
            >
              <RxDashboard />
              Dashboard
            </Link>
            <Link
              to="/employee"
              className="w-full py-3 rounded-md hover:bg-white/20 flex items-center gap-2 px-3"
            >
              <AiOutlineTeam />
              Employee Management
            </Link>
            <Link
              to="/leave"
              className="w-full py-3 rounded-md hover:bg-white/20 flex items-center gap-2 px-3"
            >
              <SlCalender />
              Leave Management
            </Link>
            <Link
              to="/payroll"
              className="w-full py-3 rounded-md hover:bg-white/20 flex items-center gap-2 px-3"
            >
              <RiMoneyRupeeCircleLine />
              Payroll
            </Link>
            <Link
              to="/team"
              className="w-full py-3 rounded-md hover:bg-white/20 flex items-center gap-2 px-3"
            >
              <RiTeamLine />
              Team Allocation
            </Link>
            <Link
              to="/performance"
              className="w-full py-3 rounded-md hover:bg-white/20 flex items-center gap-2 px-3"
            >
              <BsGraphUpArrow />
              Performance Report
            </Link>
          </nav>
        </div>
        <footer className="border-t border-white/30 p-4 text-white">
          <Link
            to="/settings"
            className="w-full py-3 rounded-md hover:bg-white/20 flex items-center gap-2 px-3"
          >
            <IoSettingsOutline />
            Settings
          </Link>
        </footer>
      </div>
    </>
  );
}
