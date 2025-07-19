/* eslint-disable no-unused-vars */
import React from "react";
import LoginButton from "../components/LoginButton";
import axios from "axios";
import Swal from "sweetalert2";
import back from "../assets/background.png";
import img from "../assets/img1.png";
import { IoPerson } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginType, setLoginType] = React.useState("");
  const [passView, setPassview] = React.useState(false);
  const [pass, setPass] = React.useState("password");
  const navigate = useNavigate("/hr/dashboard");

  const back_Url = import.meta.env.VITE_BACKEND_URL

  const passViewHandler = () => {
    setPassview((prev) => {
      const newState = !prev;
      setPass(newState ? "text" : "password");
      return newState;
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password || !loginType) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Fill all details to login",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      const data = { email, password };
      const dataType = loginType
      if (dataType === "admin") {
        const res = await axios.post(`${back_Url}admin/login/`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        localStorage.setItem("atoken", res.data.tokens.access);
        localStorage.setItem("rtoken", res.data.tokens.refresh);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successfull",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/hr/dashboard");
      }
      if(dataType === 'employee'){
        const res = await axios.post(`${back_Url}employee/login/`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        localStorage.setItem("token", res.data.tokens.access);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successfull",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/performance");
      }
    } catch (error) {
        console.log(error)
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid credentials",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div
      className="h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${back})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="h-16 left-0 w-fit me-auto ms-6">
        <img src={logo} alt="" className="h-full" />
      </div>
      <div
        className="w-[85%] h-[85%] flex rounded-2xl shadow-xl"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-5 rounded-e-2xl rounded-s-2xl md:rounded-s-none shadow-md bg-transparent border-[#ffffff]/20 backdrop-blur-[20px] ms-auto w-full md:w-[45%] lg:w-[35%] text-white flex flex-col justify-center">
          <p className="pb-2 text-center text-4xl font-semibold my-8">Login</p>
          <form type="submit" onSubmit={submitForm}>
            <div className="flex gap-2 text-xl my-2 border-b-2 w-full items-center">
              <IoPerson className="text-white" />
              <input
                type="email"
                placeholder="Enter your mail id"
                className="outline-none w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex gap-2 text-xl my-2 border-b-2 w-full items-center">
              <RiLockPasswordFill className="text-white" />
              <input
                type={pass}
                placeholder="Password"
                className="outline-none w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="ms-auto hover:cursor-pointer"
                onClick={passViewHandler}
              >
                {passView ? <FaRegEye /> : <FaEyeSlash />}
              </div>
            </div>
            <div className="text-xl my-2 space-x-1">
              <p className="my-2 ">Login as:</p>
              <input
                type="radio"
                id="admin"
                name="login"
                value="admin"
                onClick={() => setLoginType("admin")}
                className="text-blue-500 hover:cursor-pointer"
              />
              <label htmlFor="admin" className="hover:cursor-pointer">
                Admin
              </label>
              <input
                type="radio"
                id="employee"
                name="login"
                value="employee"
                onClick={() => setLoginType("employee")}
                className="text-blue-500 hover:cursor-pointer"
              />
              <label htmlFor="employee" className="hover:cursor-pointer">
                Employee
              </label>
            </div>
            <div className="text-center">
              <LoginButton name="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
