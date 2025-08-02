import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { SlCalender } from "react-icons/sl";
import { RiTeamLine } from "react-icons/ri";
import { AiOutlineTeam } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import logo from "../assets/logo2.png";
import axios from "axios";
import Swal from "sweetalert2";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const bgColor = "#0D3D66";
  const Token = localStorage.getItem("token");
  const navigate= useNavigate()

  const back_Url = import.meta.env.VITE_BACKEND_URL

  const logoutHandler = async () => {
    try {
      await axios.post(
      `${back_Url}admin/logout`,
      {
        headers: {
          "Authorization":`Bearer ${Token}`,
          "Content-Type":"application/json"
        },
        withCreadential:true
      }
    );
      localStorage.removeItem("token")
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logout successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/")
    } catch (error) {
      console.log(error)
      Swal.fire({
        position: "center",
        icon: "error",
        title: "error in logout",
        showConfirmButton: false,
        timer: 1500,
      });
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
          <img src={logo} alt="" className="h-[70px] mx-auto" />
        </h1>
        <nav className="flex flex-col p-4 space-y-4 h-[72%]">
          <Link
            to="/hr/dashboard"
            className="w-full py-3 px-2 rounded-md hover:bg-white/20 flex items-center gap-1.5"
          >
            <RxDashboard />
            Dashboard
          </Link>
          <Link
            to="/hr/employee-management"
            className="w-full py-3 px-2 rounded-md hover:bg-white/20 flex items-center gap-1.5"
          >
            <AiOutlineTeam />
            Employee Management
          </Link>
          <Link
            to="/hr/leave-management"
            className="w-full py-3 px-2 rounded-md hover:bg-white/20 flex items-center gap-1.5"
          >
            <SlCalender />
            Leave Management
          </Link>
          <Link
            to="/hr/payroll"
            className="w-full py-3 px-2 rounded-md hover:bg-white/20 flex items-center gap-1.5"
          >
            <RiMoneyRupeeCircleLine />
            Payroll
          </Link>
          <Link
            to="/hr/team-allocation"
            className="w-full py-3 px-2 rounded-md hover:bg-white/20 flex items-center gap-1.5"
          >
            <RiTeamLine />
            Team Allocation
          </Link>
          <Link
            to="/hr/performance-report"
            className="w-full py-3 px-2 rounded-md hover:bg-white/20 flex items-center gap-1.5"
          >
            <BsGraphUpArrow />
            Performance Report
          </Link>
        </nav>
        <footer className="border-t-2 p-4 flex flex-col items-baseline">
          <Link
            to="/hr/settings"
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
