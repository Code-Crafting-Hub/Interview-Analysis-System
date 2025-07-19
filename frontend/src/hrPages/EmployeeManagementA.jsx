/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function EmployeeManagementA() {
  const [full_name, setFullname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [image, setImage] = React.useState("");
  const [employeeForm, setEmployeeForm] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newEmployee = {
      id: Date.now(),
      full_name,
      email,
      password,
      position,
      department,
      image: URL.createObjectURL(image),
    };

    setEmployees([...employees, newEmployee]);

    // Reset fields and close form
    setFullname("");
    setEmail("");
    setPassword("");
    setPosition("");
    setDepartment("");
    setImage(null);
    setEmployeeForm(false);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="static md:flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="lg:hidden border-b-2 p-5">
          <p className="text-3xl font-semibold text-[#0D3D66]">Employee Management</p>
        </div>
        <Navbar name="Employee Management" />

        {/* Employee List */}
        {/* <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((emp) => (
            <div key={emp.id} className="bg-white rounded-lg shadow p-4 space-y-2">
              <img
                src={emp.image}
                alt={emp.full_name}
                className="w-20 h-20 object-cover rounded-full mx-auto"
              />
              <h2 className="text-center text-lg font-semibold">{emp.full_name}</h2>
              <p className="text-center text-sm text-gray-600">{emp.email}</p>
              <p className="text-center text-sm">{emp.position} - {emp.department}</p>
            </div>
          ))}
        </div> */}

        {/* Add Employee Button */}
        <div className="fixed right-6 w-fit bottom-6">
          <button
            className="bg-[#0D3D66] text-white text-4xl h-15 w-15 rounded-full hover:cursor-pointer hover:bg-[#145a96]"
            onClick={() => setEmployeeForm(true)}
          >
            +
          </button>
        </div>

        {/* Form Modal */}
        {employeeForm && (
          <div
            className="inset-0 fixed flex bg-transparent backdrop-blur-[20px] justify-center items-center"
            onClick={() => setEmployeeForm(false)}
          >
            <div
              className="bg-[#0D3D66] text-white p-6 rounded-xl w-[90%] md:w-[60%] lg:w-[50%] 2xl:w-[40%] border-2"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-semibold text-center mb-4">Add New Employee</h2>
              <form onSubmit={handleAddEmployee} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={full_name}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                  className="w-full border px-4 py-2 rounded outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border px-4 py-2 rounded outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border px-4 py-2 rounded outline-none"
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                  className="w-full border px-4 py-2 rounded outline-none"
                />
                <input
                  type="text"
                  placeholder="Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                  className="w-full border px-4 py-2 rounded outline-none"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="w-full border px-4 py-2 rounded outline-none"
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full"
                >
                  Add Employee
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
