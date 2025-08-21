/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import "animate.css";
import FloatingLabelInput from "../components/FloatingLabelInput";

export default function TeamAllocationA() {
  const [create, setCreate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [selection, setSelection] = useState();

  const [manager, setManager] = useState("");
  const [managerName, setManagerName] = useState("");
  const [employeeName, setEmployeeName] = useState([]);

  const [showEmp, setShowEmp] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [allEmployee, setAllEmployee] = useState([]);

  const backend_Url = import.meta.env.VITE_BACKEND_URL;
  const Token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Token verification
  const verifyToken = async () => {
    const verifyAuth = await axios.post(`${backend_Url}/admin/verify`, "", {
      headers: { Authorization: `Bearer ${Token}` },
      withCredentials: true,
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

  // Get Employees
  const getEmployees = async () => {
    try {
      const employe = await axios.post(`${backend_Url}/employee/getall`, "", {
        headers: { Authorization: `Bearer ${Token}` },
        withCredentials: true,
      });
      setAllEmployee(employe.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Teams
  const getTeams = async () => {
    try {
      const { data } = await axios.get(`${backend_Url}/team/findall`, {
        headers: { Authorization: `Bearer ${Token}` },
        withCredentials: true,
      });
      setTeams(Array.isArray(data) ? data : data.teams || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyToken();
    getTeams();
  }, []);

  // Handle Submit for Create / Edit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Update existing team
        const res = await axios.put(
          `${backend_Url}/team/update/${editId}`,
          {
            name,
            managerId: manager,
            memberIds: employee,
            projects,
          },
          {
            headers: { Authorization: `Bearer ${Token}` },
            withCredentials: true,
          }
        );

        if (res.data.message) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          resetForm();
          getTeams();
        }
      } else {
        // Create new team
        const res = await axios.post(
          `${backend_Url}/team/create`,
          {
            name,
            department,
            managerId: manager,
            memberIds: employee,
            projects,
          },
          {
            headers: { Authorization: `Bearer ${Token}` },
            withCredentials: true,
          }
        );

        if (res.data.message) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          resetForm();
          getTeams();
        }
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Handle Edit
  const handleEdit = (id) => {
    const team = teams.find((t) => t._id === id);
    if (!team) return;

    setName(team.name);
    setDepartment(team.department);
    setManager(team.manager?._id || "");
    setManagerName(team.manager?.name || "");
    setEmployee(team.members?.map((m) => m._id) || []);
    setEmployeeName(team.members?.map((m) => m.name) || []);
    setProjects(team.projects || []);

    setEditId(id);
    setIsEditing(true);
    setCreate(true);
    getEmployees();
  };

  // Handle Delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the team permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`${backend_Url}/team/delete/${id}`, {
            headers: { Authorization: `Bearer ${Token}` },
            withCredentials: true,
          });

          if (res.data.message) {
            Swal.fire("Deleted!", res.data.message, "success");
            getTeams();
          }
        } catch (error) {
          Swal.fire("Error!", "Could not delete team", "error");
        }
      }
    });
  };

  // Reset Form
  const resetForm = () => {
    setCreate(false);
    setIsEditing(false);
    setEditId(null);
    setName("");
    setDepartment("");
    setManager("");
    setManagerName("");
    setEmployee([]);
    setEmployeeName([]);
    setProjects([]);
    setShowEmp(false);
  };

  return (
    <div className="static md:flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        {/* Topbar */}
        <div className="lg:hidden border-b-2 p-5">
          <p className="text-3xl font-semibold text-[#0D3D66]">
            Team Allocation
          </p>
        </div>
        <Navbar name="Team Allocation" />

        {/* Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#0D3D66] mb-4">
            Department-wise Teams
          </h2>
          <div>
            <details className="border-b-2 p-4">
              <summary className="text-2xl font-semibold cursor-pointer text-blue-900 hover:text-blue-700 transition-colors duration-200">
                It Department
              </summary>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {teams
                  .filter((team) => team.department === "It Department")
                  .map((team) => {
                    const { _id, name, manager, members, projects } = team;
                    return (
                      <div
                        key={_id}
                        className="p-5 rounded-xl shadow-md bg-gradient-to-br from-white to-gray-50 border border-gray-200
                         hover:shadow-xl hover:-translate-y-1 hover:border-blue-500 transition-all duration-300 flex flex-col justify-between"
                      >
                        {/* Team Info */}
                        <div>
                          <h2 className="text-xl font-bold text-blue-900 mb-3">
                            <span className="text-gray-600">Team:</span> {name}
                          </h2>
                          <p className="mb-1">
                            <span className="font-semibold text-gray-700">Manager:</span>{" "}
                            {manager?.name || "No Manager"}
                          </p>
                          <p className="mb-1">
                            <span className="font-semibold text-gray-700">Members:</span>{" "}
                            {members?.map((m) => m.name).join(", ") || "No Members"}
                          </p>
                          <p className="mb-3">
                            <span className="font-semibold text-gray-700">Projects:</span>{" "}
                            {projects?.join(", ") || "No Projects"}
                          </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => handleEdit(_id)}
                            className="flex-1 py-2 px-4 rounded-lg bg-yellow-500 text-white font-medium
                             hover:bg-yellow-600 transition-colors duration-300 hover:cursor-pointer"
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(_id)}
                            className="flex-1 py-2 px-4 rounded-lg bg-red-600 text-white font-medium
                             hover:bg-red-700 transition-colors duration-300 hover:cursor-pointer"
                          >
                            🗑 Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </details>

            {/* Other Departments */}
            <details className="border-b-2 p-4">
              <summary className="text-2xl font-semibold cursor-pointer text-blue-900 hover:text-blue-700 transition-colors duration-200">
                Marketing Department
              </summary>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {teams
                  .filter((team) => team.department === "Marketing Department")
                  .map((team) => {
                    const { _id, name, manager, members, projects } = team;
                    return (
                      <div
                        key={_id}
                        className="p-5 rounded-xl shadow-md bg-gradient-to-br from-white to-gray-50 border border-gray-200
                         hover:shadow-xl hover:-translate-y-1 hover:border-blue-500 transition-all duration-300 flex flex-col justify-between"
                      >
                        {/* Team Info */}
                        <div>
                          <h2 className="text-xl font-bold text-blue-900 mb-3">
                            <span className="text-gray-600">Team:</span> {name}
                          </h2>
                          <p className="mb-1">
                            <span className="font-semibold text-gray-700">Manager:</span>{" "}
                            {manager?.name || "No Manager"}
                          </p>
                          <p className="mb-1">
                            <span className="font-semibold text-gray-700">Members:</span>{" "}
                            {members?.map((m) => m.name).join(", ") || "No Members"}
                          </p>
                          <p className="mb-3">
                            <span className="font-semibold text-gray-700">Projects:</span>{" "}
                            {projects?.join(", ") || "No Projects"}
                          </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => handleEdit(_id)}
                            className="flex-1 py-2 px-4 rounded-lg bg-yellow-500 text-white font-medium
                             hover:bg-yellow-600 transition-colors duration-300 hover:cursor-pointer"
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(_id)}
                            className="flex-1 py-2 px-4 rounded-lg bg-red-600 text-white font-medium
                             hover:bg-red-700 transition-colors duration-300 hover:cursor-pointer"
                          >
                            🗑 Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </details>
            <details className="border-b-2 p-4">
              <summary className="text-2xl font-semibold cursor-pointer text-blue-900 hover:text-blue-700 transition-colors duration-200">
                Accounts Department
              </summary>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {teams
                  .filter((team) => team.department === "Accounts Department")
                  .map((team) => {
                    const { _id, name, manager, members, projects } = team;
                    return (
                      <div
                        key={_id}
                        className="p-5 rounded-xl shadow-md bg-gradient-to-br from-white to-gray-50 border border-gray-200
                         hover:shadow-xl hover:-translate-y-1 hover:border-blue-500 transition-all duration-300 flex flex-col justify-between"
                      >
                        {/* Team Info */}
                        <div>
                          <h2 className="text-xl font-bold text-blue-900 mb-3">
                            <span className="text-gray-600">Team:</span> {name}
                          </h2>
                          <p className="mb-1">
                            <span className="font-semibold text-gray-700">Manager:</span>{" "}
                            {manager?.name || "No Manager"}
                          </p>
                          <p className="mb-1">
                            <span className="font-semibold text-gray-700">Members:</span>{" "}
                            {members?.map((m) => m.name).join(", ") || "No Members"}
                          </p>
                          <p className="mb-3">
                            <span className="font-semibold text-gray-700">Projects:</span>{" "}
                            {projects?.join(", ") || "No Projects"}
                          </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => handleEdit(_id)}
                            className="flex-1 py-2 px-4 rounded-lg bg-yellow-500 text-white font-medium
                             hover:bg-yellow-600 transition-colors duration-300 hover:cursor-pointer"
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(_id)}
                            className="flex-1 py-2 px-4 rounded-lg bg-red-600 text-white font-medium
                             hover:bg-red-700 transition-colors duration-300 hover:cursor-pointer"
                          >
                            🗑 Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </details>

            {/* Create Button */}
            <div className="fixed right-5 bottom-5">
              <button
                className="bg-blue-900 text-white py-2 px-4 rounded-md hover:cursor-pointer hover:bg-blue-700"
                onClick={() => {
                  resetForm();
                  setCreate(true);
                  getEmployees();
                }}
              >
                Create new
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit Team Modal */}
      {create && (
        <div
          className="fixed flex justify-center items-center inset-0 bg-transparent backdrop-blur-[4px] z-51"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-white p-6 rounded-md w-[400px] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit Team" : "Create Team"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FloatingLabelInput
                label="Team Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {/* Department Section */}
              <div className="bg-white p-4 rounded-lg shadow space-y-3 text-black w-full">
                <p className="font-semibold text-lg">Department:</p>
                {isEditing ? (
                  <p className="text-gray-700">{department}</p>
                ) : (
                  ["It Department", "Accounts Department", "Marketing Department"].map((dep) => (
                    <label
                      key={dep}
                      className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-orange-50 transition"
                    >
                      <input
                        type="radio"
                        name="depart"
                        value={dep}
                        checked={department === dep}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="accent-orange-600"
                      />
                      {dep}
                    </label>
                  ))
                )}
              </div>

              {/* Manager Input */}
              <FloatingLabelInput
                label="Manager"
                value={managerName}
                onFocus={() => {
                  setShowEmp(true);
                  setSelection(true);
                }}
                readOnly
              />

              {/* Employees Input */}
              <FloatingLabelInput
                label="Employees"
                value={employeeName.join(", ")}
                onFocus={() => {
                  setShowEmp(true);
                  setSelection(false);
                }}
                readOnly
              />

              <FloatingLabelInput
                label="Projects"
                value={projects.join(",")}
                onChange={(e) => setProjects(e.target.value.split(","))}
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 hover:cursor-pointer rounded-md bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 hover:cursor-pointer rounded-md bg-blue-900 text-white hover:bg-blue-700"
                >
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>

          {/* Employee Selection List */}
          <div
            className={`bg-white rounded-md p-2 max-h-[30rem] max-w-[23rem] ms-4 overflow-auto shadow-xl ${
              showEmp ? "block" : "hidden"
            } animate__animated animate__backInLeft`}
            onClick={(e) => e.stopPropagation()}
          >
            {allEmployee.map((data) => {
              const { _id, name, email } = data;
              return (
                <div
                  key={_id}
                  className="flex justify-between my-2 shadow-xl p-2 rounded-md"
                >
                  <div className="w-[19rem]">
                    <h4>{name}</h4>
                    <p>{email}</p>
                  </div>
                  <div className="flex items-center justify-center mx-4">
                    <button
                      className={`${
                        selection
                          ? "bg-orange-600"
                          : employee.includes(_id)
                          ? "bg-red-600"
                          : "bg-orange-600"
                      } py-1 px-4 rounded-md text-white hover:cursor-pointer`}
                      onClick={() => {
                        if (selection) {
                          setManager(_id);
                          setManagerName(name);
                        } else {
                          setEmployee((prev) =>
                            prev.includes(_id)
                              ? prev.filter((empId) => empId !== _id)
                              : [...prev, _id]
                          );
                          setEmployeeName((prev) =>
                            prev.includes(name)
                              ? prev.filter((empName) => empName !== name)
                              : [...prev, name]
                          );
                        }
                      }}
                    >
                      {selection
                        ? "Select"
                        : employee.includes(_id)
                        ? "Remove"
                        : "Add"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
