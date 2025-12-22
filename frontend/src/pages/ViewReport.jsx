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
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">

          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Calculation Report
                </h1>
                <p className="text-gray-600">
                  • Generated on{" "}
                  {new Date(data.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex gap-3">
                <button className="px-4 py-2 border rounded-lg flex gap-2">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg flex gap-2">
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Input Parameters */}
          <div className="bg-white rounded-2xl border p-8 mb-6">
            <h2 className="text-xl font-bold mb-6">Input Parameters</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-gray-600">Roof Area</div>
                <div className="text-lg font-semibold">{data.roofArea} m²</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">City</div>
                <div className="text-lg font-semibold">{data.city}</div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl border p-8 mb-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-gray-600">Feasibility</div>
                <div className="text-lg font-semibold">
                  {data.feasibilityText}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">ROI</div>
                <div className="text-lg font-semibold">{data.roi}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Payback</div>
                <div className="text-lg font-semibold">
                  {data.paybackPeriod} yrs
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <Stat icon={<Droplets />} label="Water Harvested" value={`${data.harvestedWater.toLocaleString("en-IN")} L`} />
            <Stat icon={<Package />} label="Tank Size" value={`${data.tankSize.toLocaleString("en-IN")} L`} />
            <Stat icon={<Cloud />} label="Annual Rainfall" value={`${data.annualRainfall} mm`} />
            <Stat icon={<DollarSign />} label="Estimated Cost" value={`₹${data.cost.toLocaleString("en-IN")}`} />
          </div>

          {/* AI Report */}
          <div className="bg-white rounded-2xl border p-8">
            <h3 className="text-lg font-semibold mb-4">AI Analysis</h3>
            <ReactMarkdown>{data.aiReportText}</ReactMarkdown>
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

