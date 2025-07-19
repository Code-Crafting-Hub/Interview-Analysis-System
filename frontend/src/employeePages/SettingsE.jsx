/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

export default function SettingsE() {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    department: "Human Resources",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    Swal.fire("Updated!", "Your profile has been updated.", "success");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return Swal.fire("Error", "Passwords do not match", "error");
    }
    Swal.fire("Success", "Password changed successfully!", "success");
  };

  return (
    <div className="md:flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="lg:hidden border-b-2 p-5">
          <p className="text-3xl font-semibold text-[#0D3D66]">Settings</p>
        </div>
        <Navbar name="Settings" />

        <div className="p-6 space-y-10">
          {/* Profile Info Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#0D3D66] mb-4">Profile Information</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Department"
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-[#0D3D66] text-white py-2 px-6 rounded hover:bg-[#0b3254]"
              >
                Update Profile
              </button>
            </form>
          </div>

          {/* Password Change Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#0D3D66] mb-4">Change Password</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Current Password"
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="New Password"
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm New Password"
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-[#0D3D66] text-white py-2 px-6 rounded hover:bg-[#0b3254]"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
