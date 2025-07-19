/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

export default function Navbar({name}) {
  const [profile, setProfile] = React.useState(false);

  return (
    <div className="bg-[#114f85] w-full h-fit flex justify-between items-center text-white py-4 px-6 shadow-md">
      <div className="text-2xl sm:text-3xl font-bold tracking-wide">
        {name}
      </div>

      <div className="flex items-center gap-6 relative">
        {/* Notification Icon */}
        <Link
          to="#"
          className="relative hover:bg-white/10 p-2 rounded-full transition"
        >
          <IoNotificationsOutline className="text-2xl sm:text-3xl" />
          {/* <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span> */}
        </Link>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfile(!profile)}
            className="hover:bg-white/10 p-2 rounded-full transition"
          >
            <CgProfile className="text-2xl sm:text-3xl" />
          </button>

          {profile && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg overflow-hidden z-50 animate-fadeIn">
              <Link
                to="/hr"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Profile
              </Link>
              <Link
                to="/logout"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
