/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function PerformanceA() {
  const backend_Url = import.meta.env.VITE_BACKEND_URL;
  const Token = localStorage.getItem("token");
  const navigate = useNavigate();

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
  const performanceData = [
    {
      name: "Priya Sharma",
      department: "HR",
      score: 92,
      status: "Excellent",
    },
    {
      name: "Rahul Mehta",
      department: "Engineering",
      score: 75,
      status: "Good",
    },
    {
      name: "Riya Joshi",
      department: "Marketing",
      score: 68,
      status: "Average",
    },
    {
      name: "Deepak Ahuja",
      department: "Finance",
      score: 85,
      status: "Very Good",
    },
    {
      name: "Nikita Verma",
      department: "HR",
      score: 59,
      status: "Needs Improvement",
    },
  ];

  const getColor = (score) => {
    if (score >= 85) return "bg-green-500";
    if (score >= 70) return "bg-yellow-500";
    if (score >= 50) return "bg-orange-400";
    return "bg-red-500";
  };

  return (
    <div className="static md:flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        {/* Topbar */}
        <div className="lg:hidden border-b-2 p-5">
          <p className="text-3xl font-semibold text-[#0D3D66]">
            Performance Report
          </p>
        </div>
        <Navbar name="Performance Report" />

        {/* Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#0D3D66] mb-4">
            Employee Performance Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {performanceData.map((emp, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold text-[#0D3D66]">
                  {emp.name}
                </h3>
                <p className="text-gray-600 mb-2">{emp.department}</p>
                <div className="mb-2">
                  <div className="w-full bg-gray-200 h-3 rounded-full">
                    <div
                      className={`${getColor(
                        emp.score
                      )} h-3 rounded-full transition-all`}
                      style={{ width: `${emp.score}%` }}
                    ></div>
                  </div>
                  <p className="text-sm mt-1 text-gray-700">
                    Score: {emp.score}%
                  </p>
                </div>
                <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-700 mt-2">
                  {emp.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
