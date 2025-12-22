import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  FileText,
  Droplets,
  TrendingUp,
  Calendar,
  ChevronRight,
} from "lucide-react";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [calculations, setCalculations] = useState([]);
  const [loading, setLoading] = useState(true);

  const getReports = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/user/reports`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        console.log("REPORT API RESPONSE:", data)
        setCalculations(data.reports || []);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name || "User"}!
            </h1>
            <p className="text-gray-600">
              Track your rainwater harvesting potential and optimize your water
              conservation strategy
            </p>
          </div>

          {/* New Calculation */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/calculation")}
              className="px-6 py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all shadow-lg flex items-center gap-3 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Start New Calculation
            </button>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-bold mb-6">Quick Stats</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <FileText className="w-8 h-8 text-blue-600 mb-2" />
                <div className="text-3xl font-bold">
                  {calculations.length}
                </div>
                <div className="text-sm text-gray-600">Total Reports</div>
              </div>

              <div className="bg-teal-50 rounded-xl p-6">
                <Droplets className="w-8 h-8 text-teal-600 mb-2" />
                <div className="text-3xl font-bold">
                  {calculations.length > 0
                    ? Math.round(
                        calculations.reduce(
                          (sum, c) => sum + c.harvestedWater,
                          0
                        ) / calculations.length
                      ).toLocaleString("en-IN")
                    : 0}
                </div>
                <div className="text-sm text-gray-600">
                  Avg. Water Harvested (L)
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
                <div className="text-3xl font-bold">
                  {calculations.length > 0
                    ? Math.round(
                        calculations.reduce(
                          (sum, c) => sum + (c.roi || 0),
                          0
                        ) / calculations.length
                      )
                    : 0}
                  %
                </div>
                <div className="text-sm text-gray-600">Avg. ROI</div>
              </div>
            </div>
          </div>

          {/* Reports List */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-6">Recent Reports</h2>

            {loading ? (
              <div className="text-center py-12 text-gray-500">
                Loading reports...
              </div>
            ) : calculations.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No reports yet
              </div>
            ) : (
              <div className="space-y-4">
                {calculations.map((calc) => (
                  <div
                    key={calc._id}
                   onClick={() =>
                    navigate(`/view-report/${calc._id}`, {
                     state: { reportId: calc._id },
                             })
                                  }

                    className="border rounded-xl p-5 hover:shadow-md cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {calc.location}
                        </h3>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(calc.createdAt)}
                        </div>
                      </div>
                      <ChevronRight className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
