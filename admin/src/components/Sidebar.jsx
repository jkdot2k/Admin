import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const menuItems = [
    { to: "/add", icon: assets.add_icon, label: "Add Items" },
    { to: "/list", icon: assets.order_icon, label: "List Items" },
    { to: "/orders", icon: assets.order_icon, label: "Orders" },
  ];

  return (
    <div className="w-[18%] min-h-screen border-r-2 bg-gray-50 shadow-md flex flex-col">
      {/* Logo / Brand */}


      {/* Navigation Links */}
      <div className="flex flex-col gap-2 pt-6 px-4 text-[15px]">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
              ${
                isActive
                  ? "bg-gray-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            <img className="w-5 h-5" src={item.icon} alt="" />
            <p className="hidden md:block">{item.label}</p>
          </NavLink>
        ))}
      </div>

      {/* Footer (optional) */}
      <div className="mt-auto mb-6 px-4">
        <p className="text-xs text-gray-500 text-center">© 2025 MyStore</p>
      </div>
    </div>
  );
};

export default Sidebar;
