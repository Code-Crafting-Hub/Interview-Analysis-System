import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DashboardA() {
  const navigate = useNavigate();
  const Token = localStorage.getItem("token");
  const backend_Url = import.meta.env.VITE_BACKEND_URL;

  const verifyToken = async () => {
    const verifyAuth = await axios.post(`${backend_Url}/admin/verify`,"",{
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      withCreadentials: true,
    });
    if (!verifyAuth.data.message) {
      navigate("/");
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${verifyAuth.data.errors}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  React.useEffect(() => {
    verifyToken();
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
          <p className="text-2xl font-semibold text-gray-700">
            Page is in under construction...
          </p>
        </div>
      </div>
    </div>
  );
}
