import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function DashboardA() {
  const navigate = useNavigate();
  const Token = localStorage.getItem("token");

  React.useEffect(() => {
    if (!Token) {
      navigate("/");
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Access Denied",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, []);

  return (
    <div className="static md:flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="lg:hidden border-b-2 p-5">
          <p className="text-3xl font-semibold text-[#0D3D66]">HR Dashboard</p>
        </div>
        <Navbar name="HR Dashboard" />
        <div className="p-5">
          <p className="text-2xl font-semibold text-gray-700">Page is in under construction...</p>
        </div>
        
      </div>
    </div>
  );
}
