/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function TeamAllocationA() {
  const departments = [
    {
      name: "Human Resources",
      lead: "Priya Sharma",
      members: ["Ravi Kumar", "Nikita Verma", "Anil Singh", "Sonal Patel"],
    },
    {
      name: "Engineering",
      lead: "Rahul Mehta",
      members: ["Karan Thakur", "Meena Roy", "Tushar Sinha", "Isha Malhotra"],
    },
    {
      name: "Marketing",
      lead: "Riya Joshi",
      members: ["Abhay Singh", "Komal Yadav", "Nikhil Goyal", "Jaspreet Kaur"],
    },
    {
      name: "Finance",
      lead: "Deepak Ahuja",
      members: ["Mohit Jain", "Swati Sharma", "Rajiv Nair", "Divya Kapoor"],
    },
  ];

  return (
    <div className="static md:flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        {/* Topbar */}
        <div className="lg:hidden border-b-2 p-5">
          <p className="text-3xl font-semibold text-[#0D3D66]">Team Allocation</p>
        </div>
        <Navbar name="Team Allocation" />

        {/* Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#0D3D66] mb-4">Department-wise Teams</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl shadow hover:shadow-md transition duration-200"
              >
                <h3 className="text-xl font-semibold text-[#0D3D66] mb-2">{dept.name}</h3>
                <p className="text-gray-600 mb-2">
                  <strong>Team Lead:</strong> {dept.lead}
                </p>
                <p className="text-gray-700 font-medium mb-1">Team Members:</p>
                <ul className="list-disc list-inside text-gray-600">
                  {dept.members.map((member, i) => (
                    <li key={i}>{member}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
