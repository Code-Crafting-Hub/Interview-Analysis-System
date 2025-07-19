/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import axios from "axios";
import Swal from "sweetalert2";

export default function ProfileE() {
  const [data, setData] = React.useState([]);
  const back_url = import.meta.env.VITE_BACKEND_URL
  
    const profileHandler = async () => {
      try {
        const res = await axios.get(`${back_url}admin/employee/`);
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Internal server error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };
  return (
    <div className="static md:flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="lg:hidden border-b-2 p-5">
          <p className="text-3xl font-semibold text-[#0D3D66]">Profile</p>
        </div>
        <Navbar name="Profile" />
        {/* Section div */}
        <div className="flex justify-around flex-wrap gap-6 p-6 w-full">
          <div className="w-full text-[#0D3D66] font-semibold border-b-2">
            <p className="text-4xl py-4 px-2">Information</p>
          </div>
          {data.map((detail) => {
            const { id, name, image, phoneNo, address, email } = detail;
            return (
              <div
                key={id}
                className="bg-white p-6 text-black flex w-full justify-between lg:mx-[15rem]"
              >
                <div className="space-y-1 w-[50%]">
                  <p className="text-xl"><strong>Name:</strong> {name}</p>
                  <p className="text-xl"><strong>Phone:</strong> {phoneNo}</p>
                  <p className="text-xl"><strong>Email:</strong> {email}</p>
                  <p className="text-xl"><strong>Address:</strong> {address}</p>
                </div>
                <div>
                  <img
                  src={image}
                  alt={name}
                  className="h-42 w-36 object-cover border mx-auto mb-4"
                />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
