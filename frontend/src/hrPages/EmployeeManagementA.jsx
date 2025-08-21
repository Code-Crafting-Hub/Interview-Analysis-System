/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EmployeeManagementA() {
  const [employeeForm, setEmployeeForm] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [salary, setSalary] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const navigate = useNavigate();
  const Token = localStorage.getItem("token");

  const basicSalary = Number(salary);
  const back_url = import.meta.env.VITE_BACKEND_URL;

  React.useEffect(() => {
    if (!Token) {
      navigate("/");
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Access Denied",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, []);

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      password,
      department,
      basicSalary,
      phone,
    };

    if (!name || !email || !password || !department || !phone || !basicSalary) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Fill details properly",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      const res = await axios.post(`${back_url}/employee/signup`, formData, {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.message) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${res.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${res.data.errors}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }

      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setSalary("");
      setDepartment("");
      setEmployeeForm(false);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="static md:flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar name="Employee Management" />

        {/* Employee List Placeholder */}
        <div className="p-5">
          <p className="text-2xl font-semibold text-gray-700">Employees will be listed here...</p>
        </div>

        {/* Add Employee Button */}
        <div className="fixed right-6 w-fit bottom-6">
          <button
            className="bg-[#0D3D66] text-white rounded-full hover:cursor-pointer hover:bg-[#145a96] p-2 px-4"
            onClick={() => setEmployeeForm(true)}
          >
            Add
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
              <h2 className="text-2xl font-semibold text-center mb-4">
                Add New Employee
              </h2>
              <form onSubmit={handleAddEmployee} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border px-4 py-2 rounded outline-none"
                />
                <input
                  type="text"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  placeholder="Salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  required
                  className="w-full border px-4 py-2 rounded outline-none"
                />
                <div className="bg-white p-4 rounded-lg shadow space-y-3 text-black">
                  <p className="font-semibold text-lg">Select Department:</p>

                  <label
                    htmlFor="it"
                    className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-orange-50 transition"
                  >
                    <input
                      type="radio"
                      id="it"
                      name="depart"
                      value="IT Department"
                      onChange={(e) => setDepartment(e.target.value)}
                      className="accent-orange-600"
                    />
                    IT Department
                  </label>

                  <label
                    htmlFor="account"
                    className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-orange-50 transition"
                  >
                    <input
                      type="radio"
                      id="account"
                      name="depart"
                      value="Accounts Department"
                      onChange={(e) => setDepartment(e.target.value)}
                      className="accent-orange-600"
                    />
                    Accounts Department
                  </label>

                  <label
                    htmlFor="marketing"
                    className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-orange-50 transition"
                  >
                    <input
                      type="radio"
                      id="marketing"
                      name="depart"
                      value="Marketing Department"
                      onChange={(e) => setDepartment(e.target.value)}
                      className="accent-orange-600"
                    />
                    Marketing Department
                  </label>
                </div>

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
