/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Download } from "lucide-react";

export default function Downloads() {
  const [filters, setFilters] = useState({
    month: "",
    year: "",
  });

  // Dummy data for a single employee
  const payslips = [
    { month: "May", year: "2025", fileUrl: "/files/may-2025.pdf" },
    { month: "June", year: "2025", fileUrl: "/files/june-2025.pdf" },
    { month: "April", year: "2025", fileUrl: "/files/april-2025.pdf" },
  ];

  const filteredPayslips = payslips.filter((p) => {
    return (
      (filters.month ? p.month === filters.month : true) &&
      (filters.year ? p.year === filters.year : true)
    );
  });

  return (
    <div className="static md:flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="lg:hidden border-b-2 p-5">
          <p className="text-3xl font-semibold text-[#0D3D66]">My Payslips</p>
        </div>
        <Navbar name="My Payslips" />

        {/* Filters */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-[#0D3D66] mb-4">Filter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <select
              className="p-3 rounded border border-gray-300"
              value={filters.month}
              onChange={(e) => setFilters({ ...filters, month: e.target.value })}
            >
              <option value="">Select Month</option>
              {["January", "February", "March", "April", "May", "June"].map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <select
              className="p-3 rounded border border-gray-300"
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            >
              <option value="">Select Year</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>

          {/* Payslip Table */}
          <div className="bg-white rounded-lg shadow p-4">
            <table className="w-full table-auto text-sm md:text-base">
              <thead>
                <tr className="bg-[#0D3D66] text-white text-left">
                  <th className="p-3">Month</th>
                  <th className="p-3">Year</th>
                  <th className="p-3 text-center">Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayslips.length > 0 ? (
                  filteredPayslips.map((p, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-3">{p.month}</td>
                      <td className="p-3">{p.year}</td>
                      <td className="p-3 text-center">
                        <a
                          href={p.fileUrl}
                          download
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded inline-flex items-center gap-1"
                        >
                          <Download size={16} /> Download
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-gray-500 py-6">
                      No payslips found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
