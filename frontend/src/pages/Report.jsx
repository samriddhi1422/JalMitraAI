import React, { useEffect } from 'react'
import { useNavigate , useLocation } from 'react-router-dom';
import { useState } from 'react';
import ReactMarkdown from "react-markdown";
import { Download, Share2, Trash2, ArrowLeft, Droplets, Cloud, Package, DollarSign, FileText } from 'lucide-react';
function Report() {

 //const navigate = useNavigate();
 const navigate = useNavigate()
  const location = useLocation();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const calId = location.state?.calId;
  const [data, setData] = useState(null);


  const generateReport = async()=>{
//     console.log("BASE URL:", API_BASE_URL);
// console.log("FINAL URL:", `${API_BASE_URL}/api/user/aireport`);
// console.log("TOKEN:", localStorage.getItem("token"));

    try {
      const res = await fetch(`${API_BASE_URL}/api/user/aireport`,{
 method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ calId }),
    })
    const data = await res.json();
    if(data.success){
      console.log(data.data)
      setData(data.data)
    }
    } catch (error) {
      console.log(error)
    }
    
  }
 useEffect(() => {
  if (calId) {
    generateReport();
  }
}, [calId]);

if (!data) {
  return (
    <div className="flex items-center justify-center h-screen text-gray-500">
      Loading report...
    </div>
  );
}

  return (
    <div> <div className="flex h-screen bg-gray-50">
    

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          <div className="mb-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Calculation Report</h1>
                <p className="text-gray-600">
                   • Generated on {new Date(data.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all font-medium flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
                {/* <button
                  onClick={handleDelete}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-all font-medium flex items-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete
                </button> */}
              </div>
            </div>
          </div>
           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Input Parameters</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Roof Area</div>
                <div className="text-lg font-semibold text-gray-900">{data.roofArea} m²</div>
              </div>
             
              <div>
                <div className="text-sm text-gray-600 mb-1">City</div>
                <div className="text-lg font-semibold text-gray-900">{data.city}</div>
              </div>
          
             
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
           
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Feasibility</div>
                <div className="text-lg font-semibold text-gray-900">{data.feasibilityText}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">ROI:</div>
                <div className="text-lg font-semibold text-gray-900 capitalize">  <b>{data.roi}%</b></div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Payback:</div>
                <div className="text-lg font-semibold text-gray-900">  <b>{data.paybackPeriod} yrs</b></div>
              </div>
              
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                <Droplets className="w-6 h-6 text-teal-600" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Water Harvested</div>
              <div className="text-2xl font-bold text-gray-900">{data.harvestedWater.toLocaleString('en-IN')} L</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Tank Size</div>
              <div className="text-2xl font-bold text-gray-900">{data.tankSize.toLocaleString('en-IN')} L</div>
            </div>
             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Annual Rainfall</div>
              <div className="text-2xl font-bold text-gray-900">{data.annualRainfall} mm</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Estimated Cost</div>
              <div className="text-2xl font-bold text-gray-900">₹{data.cost.toLocaleString('en-IN')}</div>
            </div>
          </div>

          
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              
             <div className="bg-white rounded-xl p-6 shadow mt-6">
  <h3 className="text-lg font-semibold mb-4">
    AI Analysis
  </h3>
<div >
  <ReactMarkdown>
    {data.aiReportText}
  </ReactMarkdown>
</div>

  </div>
            </div>
        
        </div>
      </div>
    </div></div>
  )
}

export default Report