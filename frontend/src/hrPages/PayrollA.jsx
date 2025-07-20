/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function PayrollA() {
  const payrollData = [
    {
      id: 1,
      name: "Priya Sharma",
      department: "Human Resources",
      salary: "₹55,000",
      status: "Paid",
      date: "2025-07-01",
    },
    {
      id: 2,
      name: "Rahul Mehta",
      department: "Engineering",
      salary: "₹80,000",
      status: "Unpaid",
      date: "2025-07-01",
    },
    {
      id: 3,
      name: "Riya Joshi",
      department: "Marketing",
      salary: "₹60,000",
      status: "Paid",
      date: "2025-07-01",
    },
    {
      id: 4,
      name: "Deepak Ahuja",
      department: "Finance",
      salary: "₹75,000",
      status: "Paid",
      date: "2025-07-01",
    },
  ];

  return (
    <div className="static md:flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        {/* Topbar */}
        <div className="lg:hidden border-b-2 p-5">
          <p className="text-3xl font-semibold text-[#0D3D66]">Payroll</p>
        </div>
        <Navbar name="Payroll" />

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Dashboard Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-gray-600 text-sm">Total Employees</h3>
              <p className="text-2xl font-bold">42</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-gray-600 text-sm">Total Paid</h3>
              <p className="text-2xl font-bold">₹21,50,000</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-gray-600 text-sm">Pending Payments</h3>
              <p className="text-2xl font-bold">₹80,000</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-gray-600 text-sm">Last Payment</h3>
              <p className="text-2xl font-bold">July 1, 2025</p>
            </div>
          </div>

          {/* Payroll Table */}
          <div className="bg-white rounded-xl shadow-md p-5 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 text-[#0D3D66]">Payroll Records</h2>
            <table className="min-w-full table-auto text-sm text-left">
              <thead>
                <tr className="bg-[#0D3D66] text-white">
                  <th className="px-4 py-2">Employee</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Salary</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {payrollData.map((emp) => (
                  <tr key={emp.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{emp.name}</td>
                    <td className="px-4 py-2">{emp.department}</td>
                    <td className="px-4 py-2">{emp.salary}</td>
                    <td
                      className={`px-4 py-2 font-semibold ${
                        emp.status === "Paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {emp.status}
                    </td>
                    <td className="px-4 py-2">{emp.date}</td>
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
