/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function EmployeeManagementA() {
  const [employeeForm, setEmployeeForm] = React.useState(false);
  const [full_name, setFullname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [image, setImage] = React.useState(null);

  const [departments, setDepartments] = React.useState([
    {
      name: "Human Resources",
      employees: [
        {
          id: 1,
          name: "Priya Sharma",
          email: "priya@company.com",
          phone: "+91-9876543210",
          birthday: "1995-08-12",
          position: "HR Manager",
          image: "https://randomuser.me/api/portraits/women/12.jpg",
        },
        {
          id: 2,
          name: "Ankit Verma",
          email: "ankit@company.com",
          phone: "+91-9123456780",
          birthday: "1993-03-20",
          position: "HR Executive",
          image: "https://randomuser.me/api/portraits/men/10.jpg",
        },
      ],
    },
    {
      name: "Engineering",
      employees: [
        {
          id: 3,
          name: "Rahul Mehta",
          email: "rahul@company.com",
          phone: "+91-9988776655",
          birthday: "1990-06-15",
          position: "Software Engineer",
          image: "https://randomuser.me/api/portraits/men/22.jpg",
        },
        {
          id: 4,
          name: "Sneha Kapoor",
          email: "sneha@company.com",
          phone: "+91-8899776655",
          birthday: "1996-11-05",
          position: "Frontend Developer",
          image: "https://randomuser.me/api/portraits/women/32.jpg",
        },
      ],
    },
  ]);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newEmp = {
      id: Date.now(),
      name: full_name,
      email,
      password,
      phone: "N/A",
      birthday: "N/A",
      position,
      image: image ? URL.createObjectURL(image) : "",
    };

    const updatedDepartments = departments.map((dept) => {
      if (dept.name.toLowerCase() === department.toLowerCase()) {
        return { ...dept, employees: [...dept.employees, newEmp] };
      }
      return dept;
    });

    // If department doesn't exist, add new
    const deptExists = departments.some(
      (d) => d.name.toLowerCase() === department.toLowerCase()
    );

    if (!deptExists) {
      updatedDepartments.push({
        name: department,
        employees: [newEmp],
      });
    }

    setDepartments(updatedDepartments);
    setFullname("");
    setEmail("");
    setPassword("");
    setPosition("");
    setDepartment("");
    setImage(null);
    setEmployeeForm(false);
  };

  return (
    <div className="static md:flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar name="Employee Management" />

        <div className="p-5 space-y-10">
          {departments.map((dept, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold mb-4 text-[#0D3D66]">
                {dept.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dept.employees.map((emp) => (
                  <div
                    key={emp.id}
                    className="bg-white rounded-xl shadow-lg p-4 space-y-2 hover:shadow-2xl transition"
                  >
                    <img
                      src={emp.image}
                      alt={emp.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover"
                    />
                    <h3 className="text-xl font-semibold text-center">
                      {emp.name}
                    </h3>
                    <p className="text-sm text-center text-gray-500">
                      {emp.position}
                    </p>
                    <p className="text-sm text-center text-gray-500">
                      📧 {emp.email}
                    </p>
                    <p className="text-sm text-center text-gray-500">
                      📞 {emp.phone}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

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
            className="inset-0 fixed flex bg-black/30 backdrop-blur-sm justify-center items-center z-50"
            onClick={() => setEmployeeForm(false)}
          >
            <div
              className="bg-white text-black p-6 rounded-xl w-[90%] md:w-[60%] lg:w-[50%] 2xl:w-[40%] border-2 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-semibold text-center mb-4">
                Add New Employee
              </h2>
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
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                  className="w-full border px-4 py-2 rounded outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#0D3D66] text-white px-4 py-2 rounded hover:bg-[#145a96] w-full"
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
