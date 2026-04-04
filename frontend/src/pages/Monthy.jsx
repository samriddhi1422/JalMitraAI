
import React, { useEffect, useState } from 'react'
import { MapPinned } from 'lucide-react';
import MonthlyBarChart from '../components/MonthlyBarChart';

function Monthy() {
// 
  const[data,setData] = useState([])
  const [location, setLocation] = useState("");
  const monthlyRainfall = async()=>{
    console.log("Monthly component rendered");

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(`${API_BASE_URL}/api/user/getMonthly`, {
          method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",

      },
    body: JSON.stringify({
         location,
  }),
    })
    const data = await res.json()
    if(data.success){
      setData(data.data)
     
      console.log(data.data)
    }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    monthlyRainfall()
  },[location])


 
  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 px-3 sm:px-6 lg:px-8">
    
<div className="mb-6 mt-12  ">
  <div className="flex flex-col gap-3 sm:gap-4 ">

    {/* TITLE */}
    <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
      Monthly Water Optimization Report
    </h1>

    {/* SUBTITLE */}
    <p className="text-xs sm:text-base text-gray-600 max-w-2xl">
      Track your monthly performance and compliance metrics
    </p>

    {/* LOCATION INPUT */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-1 mb-4">
      <div className="flex items-center gap-2 text-green-600">
        <MapPinned/>
       
      </div>

      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="
          w-full
          sm:w-64
          md:w-72
          border
          rounded-lg
          px-3
          py-2
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
          
        "
      />
    </div>

  </div>
<MonthlyBarChart
    title="Monthly Rainfall Trends"
    data={data}
    dataKey="rainfall"
    color="#3B82F6"
    unit="mm"
  />

  <MonthlyBarChart
    title="Water Harvested (Monthly)"
    data={data}
    dataKey="harvestedWater"
    color="#0D9488"
    unit="L"
  />

  <MonthlyBarChart
    title="Water Saved (Monthly)"
    data={data}
    dataKey="waterSaved"
    color="#10B981"
    unit="L"
  />


</div>

</main>
  )
}

export default Monthy