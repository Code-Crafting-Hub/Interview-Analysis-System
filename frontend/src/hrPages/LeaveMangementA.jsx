/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function LeaveMangementA() {
  const [upcomingLeaves, setUpcomingLeaves] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
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

  // Future backend integration
  const fetchLeaveData = async () => {
    try {
      // Replace with your API endpoints
      const upcoming = await axios.get("/api/upcoming-leaves");
      const pending = await axios.get("/api/pending-approvals");
      setUpcomingLeaves(upcoming.data);
      setPendingApprovals(pending.data);
    } catch (err) {
      console.error("Failed to fetch leave data", err);
    }
  };

  useEffect(() => {
    // Static fallback for now
    setUpcomingLeaves([
      {
        name: "Jerome Bell",
        type: "Casual",
        from: "18/12/2023",
        to: "21/12/2023",
        days: "3 Days",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        name: "Albert Flores",
        type: "Sick",
        from: "16/12/2023",
        to: "18/12/2023",
        days: "2 Days",
        image: "https://randomuser.me/api/portraits/men/33.jpg",
      },
      {
        name: "Arlene McCoy",
        type: "Personal",
        from: "15/12/2023",
        to: "18/12/2023",
        days: "3 Days",
        image: "https://randomuser.me/api/portraits/women/30.jpg",
      },
      {
        name: "Robert Fox",
        type: "Casual",
        from: "12/12/2023",
        to: "17/12/2023",
        days: "5 Days",
        image: "https://randomuser.me/api/portraits/men/34.jpg",
      },
    ]);

    setPendingApprovals([
      {
        name: "Ronald Richards",
        type: "Sick Leave",
        from: "15/12/2023",
        to: "18/12/2023",
        days: "3 Days",
        image: "https://randomuser.me/api/portraits/men/40.jpg",
      },
      {
        name: "Ronald Richards",
        type: "Casual Leave",
        from: "15/12/2023",
        to: "18/12/2023",
        days: "3 Days",
        image: "https://randomuser.me/api/portraits/men/40.jpg",
      },
      {
        name: "Ronald Richards",
        type: "Emergency Leave",
        from: "15/12/2023",
        to: "18/12/2023",
        days: "3 Days",
        image: "https://randomuser.me/api/portraits/men/40.jpg",
      },
    ]);

    // Uncomment when backend ready
    // fetchLeaveData();
  }, []);

  return (
    <div className="static md:flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="lg:hidden border-b-2 p-5">
            <p className="text-3xl font-semibold text-[#0D3D66]">Leave management</p>
        </div>
        <Navbar name="Leave Management" />

        {/* Leave Boxes */}
        <div className="grid grid-cols-4 gap-4 p-4">
          {[
            { title: "Annual Leave", count: 15 },
            { title: "Sick Leave", count: 11 },
            { title: "Other Leave", count: 6 },
            { title: "Pending Request", count: 5 },
          ].map((box, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow">
              <p className="text-gray-600">{box.title}</p>
              <h2 className="text-3xl font-bold">{box.count}</h2>
              <span className="text-sm text-gray-400">This month</span>
            </div>
          ))}
        </div>

        {/* Upcoming Leaves */}
        <div className="p-4">
          <div className="bg-white rounded shadow p-4">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-semibold">Upcoming Leaves</h3>
              <select className="border px-2 py-1 rounded text-sm">
                <option>Weekly View</option>
                <option>Monthly View</option>
              </select>
            </div>
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="text-left text-gray-600 ">
                  <th className="py-2">Employee</th>
                  <th>Leave Type</th>
                  <th>From & To</th>
                  <th>No Of Days</th>
                </tr>
              </thead>
              <tbody>
                {upcomingLeaves.map((leave, index) => (
                  <tr key={index} className="">
                    <td className="flex items-center gap-2 py-2">
                      <img
                        src={leave.image}
                        alt={leave.name}
                        className="w-8 h-8 rounded-full"
                      />
                      {leave.name}
                    </td>
                    <td>{leave.type}</td>
                    <td>{leave.from} - {leave.to}</td>
                    <td>{leave.days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="p-4">
          <div className="bg-white rounded shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Pending Approvals</h3>
              <span className="text-sm bg-red-100 text-red-500 px-2 py-1 rounded-full">
                {pendingApprovals.length}
              </span>
            </div>
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="text-left text-gray-600 ">
                  <th className="py-2">Employee</th>
                  <th>Leave Type</th>
                  <th>From & To</th>
                  <th>No Of Days</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingApprovals.map((leave, index) => (
                  <tr key={index} className="">
                    <td className="flex items-center gap-2 py-2">
                      <img
                        src={leave.image}
                        alt={leave.name}
                        className="w-8 h-8 rounded-full"
                      />
                      {leave.name}
                    </td>
                    <td>{leave.type}</td>
                    <td>{leave.from} - {leave.to}</td>
                    <td>{leave.days}</td>
                    <td>
                      <span className="text-orange-500 bg-orange-100 px-2 py-1 rounded-full">
                        Pending
                      </span>
                    </td>
                    <td>
                      <FaInfoCircle className="text-gray-400" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
