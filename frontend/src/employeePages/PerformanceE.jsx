/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function PerformanceSingle() {
  const employee = {
    name: "Yashkaran Singh",
    department: "HR",
    designation: "HR Manager",
    employeeId: "EMP0243",
    attendance: "96%",
    rating: 4.8,
    projectsCompleted: 12,
    ongoingProjects: 3,
    achievements: [
      "Implemented new leave policy",
      "Conducted 3 successful recruitment drives",
      "Automated payroll process",
    ],
    profileImg: "https://res.cloudinary.com/dnn6zwo7p/image/upload/v1710000000/employee-placeholder.jpg", // Replace with real Cloudinary image if needed
  };

  return (
    <div className="static md:flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="lg:hidden border-b-2 p-5">
          <p className="text-3xl font-semibold text-[#0D3D66]">Performance Report</p>
        </div>

        <Navbar name="Performance Report" />

        <div className="p-6">
          <div className="bg-white rounded-lg shadow-lg p-6 md:flex gap-6">
            {/* Profile Card */}
            <div className="md:w-1/3 text-center md:text-left">
              <img
                src={employee.profileImg}
                alt="profile"
                className="w-40 h-40 mx-auto md:mx-0 rounded-full shadow"
              />
              <h2 className="text-2xl font-bold text-[#0D3D66] mt-4">{employee.name}</h2>
              <p className="text-gray-600">{employee.designation}</p>
              <p className="text-sm text-gray-500">Employee ID: {employee.employeeId}</p>
            </div>

            {/* Performance Details */}
            <div className="md:w-2/3 mt-6 md:mt-0">
              <h3 className="text-xl font-semibold mb-4 text-[#0D3D66]">Performance Summary</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-100 p-4 rounded shadow-sm">
                  <p className="text-gray-600">Department</p>
                  <p className="font-medium">{employee.department}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded shadow-sm">
                  <p className="text-gray-600">Attendance</p>
                  <p className="font-medium">{employee.attendance}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded shadow-sm">
                  <p className="text-gray-600">Rating</p>
                  <p className="font-medium">{employee.rating} ★</p>
                </div>
                <div className="bg-gray-100 p-4 rounded shadow-sm">
                  <p className="text-gray-600">Projects Completed</p>
                  <p className="font-medium">{employee.projectsCompleted}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded shadow-sm">
                  <p className="text-gray-600">Ongoing Projects</p>
                  <p className="font-medium">{employee.ongoingProjects}</p>
                </div>
              </div>

              {/* Achievements */}
              <h4 className="text-lg font-semibold text-[#0D3D66] mb-2">Key Achievements</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {employee.achievements.map((achieve, index) => (
                  <li key={index}>{achieve}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
