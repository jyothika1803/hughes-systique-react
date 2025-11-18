import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  ChartPie,
  BarChart3,
  ShoppingCart,
  ShoppingBag,
  LineChart,
  MessageSquareMore,
  Settings,
  LogOut,
} from "lucide-react";
import logo from "../assets/logo.jpg";
import logo1 from "../assets/logo1.jpg";

const Sidebar = ({ onHoverChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleMouseEnter = () => {
    setIsOpen(true);
    onHoverChange && onHoverChange(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    onHoverChange && onHoverChange(false);
  };

  return (
    <div
      className={`fixed bg-white top-0 left-0 h-screen shadow-lg z-40 overflow-hidden flex flex-col transition-all duration-300 ease-in-out ${
        isOpen ? "w-72" : "w-20"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Branding */}
      <div className="flex items-center justify-center px-4 py-5 flex-shrink-0">
        <img src={logo} alt="Logo" className="w-8 h-8 object-cover rounded" />
        <span
          className={`ml-4 text-xl font-bold text-black transition-all duration-300 whitespace-nowrap overflow-hidden ${
            isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        >
          Dabang
        </span>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 px-2 ${isOpen ? "overflow-y-auto" : "overflow-hidden"}`}>
        <NavItem to="/dashboard" label="Dashboard" icon={<ChartPie />} isOpen={isOpen} />
        <NavItem to="/leaderboard" label="Leaderboard" icon={<BarChart3 />} isOpen={isOpen} />
        <NavItem to="/orders" label="Orders" icon={<ShoppingCart />} isOpen={isOpen} />
        <NavItem to="/add-products" label="Products" icon={<ShoppingBag />} isOpen={isOpen} />
        <NavItem to="/sales" label="Sales Report" icon={<LineChart />} isOpen={isOpen} />
        <NavItem to="/messages" label="Messages" icon={<MessageSquareMore />} isOpen={isOpen} />
        <NavItem to="/settings" label="Settings" icon={<Settings />} isOpen={isOpen} />
        <NavItem to="/login" label="Sign Out" icon={<LogOut />} isOpen={isOpen} />
      </nav>

      {/* Pro Box */}
      {/* Pro Box */}
      <div
        className={`mx-4 mb-6 mt-4 transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative p-4 rounded-2xl text-center overflow-hidden bg-blue-800 shadow-lg">
          {/* Top-right solid white semi-circle */}
          <div className="absolute top-0 right-0 w-25 h-25 bg-white/30 rounded-bl-full"></div>

          {/* Bottom-left solid white semi-circle */}
          <div className="absolute bottom-0 left-0 w-25 h-25 bg-white/30 rounded-tr-full"></div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex justify-center mb-2">
              <img src={logo1} alt="Pro" className="w-8 h-8 object-cover rounded shadow-md" />
            </div>
            <h3 className="text-lg font-semibold text-white">Dabang Pro</h3>
            <p className="text-sm text-white my-2">Unlock more features with Pro!</p>
            <button className="mt-2 bg-white text-blue-800 text-sm px-4 py-1 rounded-full hover:bg-cyan-200 transition">
              Get Pro
            </button>
          </div>
        </div>
      </div>

      {/* <div
        className={`mx-4 mb-6 mt-4 transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4 bg-blue-800 rounded-2xl text-center">
          <div className="flex justify-center mb-2">
            <img src={logo1} alt="Pro" className="w-8 h-8 object-cover rounded" />
          </div>
          <h3 className="text-lg font-semibold text-white">Dabang Pro</h3>
          <p className="text-sm text-white my-2">Unlock more features with Pro!</p>
          <button className="mt-2 bg-white text-blue-800 text-sm px-4 py-1 rounded-full hover:bg-cyan-200 transition">
            Get Pro
          </button>
        </div>
      </div> */}
    </div>
  );
};

const NavItem = ({ to, label, icon, isOpen }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center rounded-lg text-base font-medium transition-all duration-300 mb-1 relative ${
        isOpen ? "gap-4 px-4 py-3" : "justify-center px-2 py-3"
      } ${
        isActive ? "bg-blue-800 text-white" : "text-gray-600 hover:bg-blue-800 hover:text-white"
      }`
    }
  >
    <span className="text-xl">{icon}</span>
    <span
      className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${
        isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      }`}
    >
      {label}
    </span>
  </NavLink>
);

export default Sidebar;
