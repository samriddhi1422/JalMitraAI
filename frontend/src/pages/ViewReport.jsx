import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  Download,
  Share2,
  ArrowLeft,
  Droplets,
  Cloud,
  Package,
  DollarSign,
} from "lucide-react";

function ViewReport() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const fetchReport = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/user/view-report/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const result = await res.json();
      if (result.success) {
        setData(result.report);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      navigate("/dashboard");
      return;
    }
    fetchReport();
  }, [id]);

  const downloadReport = async (id) => {
  const res = await fetch(
    `${API_BASE_URL}/api/user/download/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "Report.pdf";
  a.click();

  window.URL.revokeObjectURL(url);
};


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading report...
      </div>
    );
  }

  if (!data) {
    return <div className="text-center mt-20">Report not found</div>;
  }

  return (
     <div className="flex min-h-screen min-h-[100dvh] bg-gray-50">
      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    
          {/* Header */}
          <div className="mb-6 sm:mb-8 mt-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm sm:text-base"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
    
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  Calculation Report
                </h1>
                <p className="text-sm text-gray-600">
                  • Generated on{" "}
                  {new Date(data.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
    
              <button
                className="w-full sm:w-auto px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium flex items-center justify-center gap-2"
                onClick={() => downloadReport(id)}
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>
    
          {/* Input Parameters */}
          <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
              Input Parameters
            </h2>
    
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Roof Area</div>
                <div className="text-base sm:text-lg font-semibold">
                  {data.roofArea} m²
                </div>
              </div>
    
              <div>
                <div className="text-sm text-gray-600 mb-1">City</div>
                <div className="text-base sm:text-lg font-semibold">
                  {data.city}
                </div>
              </div>
            </div>
          </div>
    
          {/* Feasibility */}
          <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-6 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Feasibility</div>
                <div className="text-base sm:text-lg font-semibold">
                  {data.feasibilityText}
                </div>
              </div>
    
              <div>
                <div className="text-sm text-gray-600 mb-1">ROI</div>
                <div className="text-base sm:text-lg font-semibold">
                  {data.roi}%
                </div>
              </div>
    
              <div>
                <div className="text-sm text-gray-600 mb-1">Payback</div>
                <div className="text-base sm:text-lg font-semibold">
                  {data.paybackPeriod} yrs
                </div>
              </div>
            </div>
          </div>
    
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            {[
              {
                icon: <Droplets className="w-6 h-6 text-teal-600" />,
                label: "Water Harvested",
                value: `${data.harvestedWater.toLocaleString("en-IN")} L`,
                bg: "bg-teal-100",
              },
              {
                icon: <Package className="w-6 h-6 text-purple-600" />,
                label: "Tank Size",
                value: `${data.tankSize.toLocaleString("en-IN")} L`,
                bg: "bg-purple-100",
              },
              {
                icon: <Cloud className="w-6 h-6 text-blue-600" />,
                label: "Annual Rainfall",
                value: `${data.annualRainfall} mm`,
                bg: "bg-blue-100",
              },
              {
                icon: <DollarSign className="w-6 h-6 text-green-600" />,
                label: "Estimated Cost",
                value: `₹${data.cost.toLocaleString("en-IN")}`,
                bg: "bg-green-100",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 sm:p-6 border">
                <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-3`}>
                  {item.icon}
                </div>
                <div className="text-sm text-gray-600">{item.label}</div>
                <div className="text-xl sm:text-2xl font-bold">{item.value}</div>
              </div>
            ))}
          </div>
    
          {/* AI Analysis */}
          <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">AI Analysis</h3>
            <ReactMarkdown >
              {data.aiReportText}
            </ReactMarkdown>
          </div>
    
        </div>
      </div>
    </div>
  );
}

const Stat = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-2xl border">
    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
      {icon}
    </div>
    <div className="text-sm text-gray-600">{label}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

export default ViewReport;

