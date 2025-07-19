/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import img from "../assets/pic1.png";
import img2 from "../assets/pic2.png";
import img1 from "../assets/pic3.png";
import logo from '../assets/logo.png'
import 'animate.css';
import ScrollReveal from "scrollreveal";

export default function Home() {
    useEffect(() => {
    const sr = ScrollReveal({
      distance: "80px",
      duration: 2000,
      delay: 400,
    });

    sr.reveal("#home", { origin: "top" });
    sr.reveal("#box1", { origin: "left" });
    sr.reveal("#home, #box3", { origin: "right" });
    sr.reveal("#reply, #box2", { origin: "bottom" });
  }, []);
  return (
    <div className="bg-[#B3E5FC]">
      <Navbar className="fixed" />
      {/* first section */}
      <section className="flex flex-col h-screen justify-center" id="home">
        <p className="text-[#0C0CF7] font-semibold text-center text-[3rem] animate__animated animate__fadeInLeftBig">
          HR SOLUTION
        </p>
        <p className="text-[#0C0CF7] font-semibold text-center text-[1.5rem] md:text-[1.8rem] animate__animated animate__fadeInRightBig">
          For Modern HR Professionals
        </p>
        <p className="text-[#6164FF] text-center text-[2rem] md:text-[3.5rem] font-semibold animate__animated animate__fadeInLeftBig">
          Manage, Track and Analyze
        </p>
      </section>
      {/* Second section */}
      <section className="flex flex-wrap justify-center items-center gap-10">
        <div className="w-[290px]" id="box1">
          <div className="bg-white rounded-md p-4">
            <img src={img} alt="" />
          </div>
          <h2 className="font-semibold my-2">Onboarding</h2>
          <p className="text-[#999999]">
            Easily track and manage new employee onboarding and documentation
          </p>
        </div>
        <div className="w-[290px]" id="box2">
          <div className="bg-white rounded-md p-4">
            <img src={img1} alt="" />
          </div>
          <h2 className="font-semibold my-2">Performance</h2>
          <p className="text-[#999999]">
            Monitor employee performance and allocate team effciently
          </p>
        </div>
        <div className="w-[290px]" id="box3">
          <div className="bg-white rounded-md p-4">
            <img src={img2} alt="" />
          </div>
          <h2 className="font-semibold my-2">Salary slips</h2>
          <p className="text-[#999999]">
            Generate payslips and download detailed salary reports securely
          </p>
        </div>
      </section>
      {/* Third section */}
      <section className="h-screen flex flex-col justify-center items-center" id="reply">
        <p className="text-4xl font-bold">Instant alerts</p>
        <p className="text-[#999999] font-semibold text-4xl mb-6">Stay up to date</p>
        <input
          type="text"
          className="py-2 px-4 bg-white outline:none w-[280px] rounded-xl"
          placeholder="name@framer.com"
        />
        <div className="text-center w-[280px]">
          <button className="bg-black text-white w-full py-2 rounded-xl mt-2 font-semibold">Subscribe</button>
        </div>
      </section>
      {/* Footer */}
      <section className="mx-20 border-white border-t-2">
        <div className="flex justify-between items-center py-16">
            <div className="w-[200px]"><img src={logo} alt="" className="w-full"/></div>
            <div className="flex space-x-10">
                <div>
                    <h2 className="font-semibold">HR Tools</h2>
                    <p className="font-semibold text-[#999999]">Onboarding</p>
                    <p className="font-semibold text-[#999999]">Leaves</p>
                    <p className="font-semibold text-[#999999]">Salary Slips</p>
                </div>
                <div>
                    <h2 className="font-semibold">Reports</h2>
                    <p className="font-semibold text-[#999999]">Performance</p>
                    <p className="font-semibold text-[#999999]">Team Allocation</p>
                    <p className="font-semibold text-[#999999]">Download</p>
                </div>
                <div>
                    <h2 className="font-semibold">Access</h2>
                    <p className="font-semibold text-[#999999]">Admin Panel</p>
                    <p className="font-semibold text-[#999999]">Employee Login</p>
                    <p className="font-semibold text-[#999999]">Support</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
