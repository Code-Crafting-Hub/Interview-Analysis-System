/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SettingsA() {
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    darkMode: false,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSave = () => {
    Swal.fire("Success", "Settings updated successfully!", "success");
  };

  return (
    <div className="static md:flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        {/* Topbar for mobile */}
        <div className="lg:hidden border-b-2 p-5">
          <p className="text-3xl font-semibold text-[#0D3D66]">Settings</p>
        </div>

        <Navbar name="Settings" />

        {/* Main Settings Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#0D3D66] mb-4">
            Account Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Info */}
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="text-lg font-semibold text-[#0D3D66] mb-4">
                Profile Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border p-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border p-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full border p-2 rounded-md"
                  />
                </div>
                <div className="flex items-center mt-4">
                  <input
                    id="darkMode"
                    name="darkMode"
                    type="checkbox"
                    checked={formData.darkMode}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="darkMode"
                    className="ml-2 block text-sm text-gray-800"
                  >
                    Enable Dark Mode
                  </label>
                </div>
              </div>
            </div>

            {/* Password Update */}
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="text-lg font-semibold text-[#0D3D66] mb-4">
                Change Password
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full border p-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full border p-2 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6">
            <button
              onClick={handleSave}
              className="bg-[#0D3D66] text-white px-6 py-2 rounded-lg hover:bg-[#094067] transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
