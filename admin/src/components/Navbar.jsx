import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-16 py-6 bg-white shadow-md">
      {/* Left - Logo / Title */}
      <h1 className="text-xl font-bold text-gray-800 tracking-wide">
        Dashboard
      </h1>

      {/* Right - Profile + Logout */}
      <div className="flex items-center gap-4">


        {/* Logout Button */}
        <button
          onClick={() => setToken("")}
          className="bg-gray-700 hover:bg-gray-900 transition-colors px-5 py-2 rounded-full text-white text-sm shadow-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
