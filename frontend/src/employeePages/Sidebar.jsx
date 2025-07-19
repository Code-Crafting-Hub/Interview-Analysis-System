/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import logo from "../assets/logo2.png";
import { PiDownloadSimple } from "react-icons/pi";
import Swal from "sweetalert2";
import axios from "axios";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const bgColor = "#0D3D66";

  const back_url = import.meta.env.VITE_BACKEND_URL

  const logoutHandler = async () => {
    try {
      const access = localStorage.getItem("token");

      if (!access) {
         Swal.fire({
          icon: "error",
          title: "User not login",
          showConfirmButton: false,
          timer: 1500,
        })
        return;
      }

      const response = await axios.post(`${back_url}employee/logout/`, {
         headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        Swal.fire({
          icon: "success",
          title: "Logged out successfully",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/login");
        });
      } else {
        const data = await response.json();
        console.error("Logout failed:", data);
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timer: 1500,
        })
      }
    } catch (error) {
      console.error("Logout error:", error);
      Swal.fire({
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timer: 1500,
        })
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex w-full items-center justify-between p-4 bg-white shadow-lg">
        <h1 className="text-xl font-semibold">HR Dashboard</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-screen w-[18rem] text-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ backgroundColor: bgColor }}
      >
        <h1 className="border-b-2 text-center text-xl font-semibold py-1 px-2">
          <img src={logo} alt="Logo" className="h-[70px] mx-auto" />
        </h1>
        <nav className="flex flex-col p-4 space-y-4 h-[72%]">
          <Link
            to="/performance"
            className="w-full py-3 px-2 rounded-md hover:bg-white/20 flex items-center gap-1.5"
          >
            <BsGraphUpArrow />
            Performance Report
          </Link>
          <Link
            to="/downloads"
            className="w-full py-3 px-2 rounded-md hover:bg-white/20 flex items-center gap-1.5"
          >
            <PiDownloadSimple />
            Downloads
          </Link>
        </nav>
        <footer className="border-t-2 p-4 flex flex-col items-baseline">
          <Link
            to="/settings"
            className="w-full py-3 px-2 rounded-md hover:bg-white/20 flex items-center gap-1.5"
          >
            <IoSettingsOutline />
            Settings
          </Link>
          <button
            onClick={logoutHandler}
            className="w-full py-3 px-2 rounded-md hover:bg-white/20 flex items-center gap-1.5"
          >
            <IoIosLogOut />
            Logout
          </button>
        </footer>
      </div>
    </>
  );
}
