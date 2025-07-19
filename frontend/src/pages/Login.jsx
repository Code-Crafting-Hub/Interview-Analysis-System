/* eslint-disable no-unused-vars */
import React from "react";
import LoginButton from "../components/LoginButton";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginType, setLoginType] = React.useState("");

     const submitForm = async (e) => {
      e.preventDefault();
      try {
        const data = {email, password, loginType}
        if(!email || !password || !loginType){
          Swal.fire({
          position: "center",
          icon: "error",
          title: "Fill all details to login",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
        }
        const res = await axios.post("", data, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error while submitting form",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border-2 p-5 rounded-md shadow-md shadow-black">
        <p className="pb-2 text-center text-2xl font-semibold">Login</p>
        <form type="submit" onSubmit={submitForm}>
          <div className="flex gap-2">
            <label htmlFor="">Email:</label>
            <input
              type="email"
              placeholder="Enter your mail id"
              className="outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="">Password:</label>
            <input
              type="password"
              placeholder="Password"
              className="outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <p>Login as:</p>
            <input
              type="radio"
              id="admin"
              name="login"
              value="admin"
              onClick={() => setLoginType("admin")}
            />
            <label htmlFor="admin">Admin</label>
            <input
              type="radio"
              id="employee"
              name="login"
              value="employee"
              onClick={() => setLoginType("employee")}
            />
            <label htmlFor="employee">Employee</label>
          </div>
          <div className="text-center">
            <LoginButton name="Login" />
          </div>
        </form>
      </div>
    </div>
  );
}
