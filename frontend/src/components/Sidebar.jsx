import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Droplets,
  LayoutDashboard,
  Plus,
  Award,
  TrendingUp,
  Box,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/calculation", label: "New Calculation", icon: Plus },
    { path: "/GovtSchemes", label: "Gov Schemes", icon: Award },
    { path: "/monthly", label: "Monthly Report", icon: TrendingUp },
    { path: "/ar", label: "AR Visualizer", icon: Box },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Droplets className="w-8 h-8 text-teal-600" />
          <span className="text-xl font-bold text-gray-900">JalMitra</span>
        </div>
        <div className="text-sm text-gray-600 truncate">
          {user?.name || user?.email}
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
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
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
