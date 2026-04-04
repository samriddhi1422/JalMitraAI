import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Droplets,
  LayoutDashboard,
  Plus,
  Award,
  TrendingUp,
  Bot,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/calculation", label: "New Calculation", icon: Plus },
    { path: "/GovtSchemes", label: "Gov Schemes", icon: Award },
    { path: "/monthly", label: "Monthly Report", icon: TrendingUp },
    { path: "/chat", label: "Assistant", icon: Bot },
   
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/*  TOP NAVBAR Mobile only */}
      <div className="md:hidden flex items-center justify-between px-4 py-3  bg-white fixed top-0 left-0 right-0 z-50 ">
        <div className="flex items-center gap-2">
          <Droplets className="w-7 h-7 text-teal-600" />
          <span className="font-bold text-lg">JalMitra</span>
        </div>

        <button onClick={() => setOpen(true)}>
          <Menu className="w-7 h-7 text-gray-700" />
        </button>
      </div>

      {/*  OVERLAY Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white  z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex`}
      >
        <div className="flex flex-col h-full w-full">
          {/* Header */}
          <div className="p-6 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-7 h-7 text-teal-600" />
                <span className="text-xl font-bold">JalMitra</span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {user?.name || user?.email}
              </p>
            </div>

            {/* Close icon (mobile only) */}
            <button className="md:hidden" onClick={() => setOpen(false)}>
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${
                      isActive
                        ? "bg-teal-50 text-teal-700 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 ">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
