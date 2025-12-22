import { useState } from "react";
import {
  Home,
  MapPin,
  Users,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Calculation() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    roofArea: "",
    hasOpenArea: false,
    buildingType: "residential",
    city: "",
    familyMembers: "",
    dailyUsage: "",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    if (step === 1) return Number(formData.roofArea) > 0;
    if (step === 2) return formData.city.trim().length > 0;
    if (step === 3) return Number(formData.familyMembers) > 0;
    return false;
  };

  
  const handleSubmit = async () => {
    const payload = {
      userId: user?._id,
      name: user?.name,
      roofArea: Number(formData.roofArea),
      location: formData.city,
      familyMembers: Number(formData.familyMembers),
      openArea: formData.hasOpenArea,
      buildingType: formData.buildingType,
    };

    console.log("FINAL PAYLOAD ", payload);

    
    
    const res=  await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/saveUserInput`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json()
    if(data.success){
      console.log(data.data)
  navigate("/CalculationLoading", {
  state: {
    userInputId: data.data._id,
  },
});

    }
  }



   const handleUseCurrentLocation = () => {
  if (!("geolocation" in navigator)) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

     
      try {
        const res = await fetch(
          `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();

        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          "";

        updateFormData("city", city);
      } catch (err) {
        console.error("Reverse geocode failed", err);
      }
    },
    (error) => {
      alert("Please allow location access");
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
    }
  );
};




  return (
    <div className="flex h-screen bg-gray-50">
      

      <div className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold mb-3">New Calculation</h1>
       < p className="text-gray-600 mb-8">Let's calculate your rainwater harvesting potential</p>

        {/* STEP INDICATOR */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center gap-4 mb-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                n < step
                  ? "bg-teal-600 text-white"
                  : n === step
                  ? "bg-teal-100 text-teal-700"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {n < step ? <Check size={18} /> : n}
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
           <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Home className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">House Details</h2>
                      <p className="text-gray-600 text-sm">Tell us about your property</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Roof Area (sq. meters) *
                    </label>
                    <input
                      type="number"
                      value={formData.roofArea}
                      onChange={(e) => updateFormData('roofArea', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g., 100"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Building Type *
                    </label>
                    <select
                      value={formData.buildingType}
                      onChange={(e) => updateFormData('buildingType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="industrial">Industrial</option>
                      <option value="mixed">Mixed Use</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasOpenArea}
                        onChange={(e) => updateFormData('hasOpenArea', e.target.checked)}
                        className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Has open area for additional harvesting
                      </span>
                    </label>
                  </div>
                </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Location</h2>
                      <p className="text-gray-600 text-sm">Where is your property located?</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => updateFormData('city', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g., Mumbai, Bangalore, Delhi"
                      list="cities"
                    />
                    <datalist id="cities">
                      <option value="Mumbai" />
                      <option value="Delhi" />
                      <option value="Bangalore" />
                      <option value="Hyderabad" />
                      <option value="Chennai" />
                      <option value="Kolkata" />
                      <option value="Pune" />
                      <option value="Ahmedabad" />
                    </datalist>
                  </div>

                <button
  type="button"
  onClick={()=>handleUseCurrentLocation()}
  className="mt-3 text-sm text-teal-600 hover:text-teal-700 font-medium"
>
  Use Current Location
</button>

                </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Family Details</h2>
                      <p className="text-gray-600 text-sm">Help us estimate your water needs</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Family Members *
                    </label>
                    <input
                      type="number"
                      value={formData.familyMembers}
                      onChange={(e) => updateFormData('familyMembers', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g., 4"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Daily Water Usage per Person (Liters)
                    </label>
                    <input
                      type="number"
                      value={formData.dailyUsage}
                      onChange={(e) => updateFormData('dailyUsage', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Default: 135 liters/person/day"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Average Indian household uses 135 liters per person per day
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Estimated Daily Usage</h4>
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {formData.familyMembers
                        ? (parseInt(formData.familyMembers) * (parseFloat(formData.dailyUsage) || 135)).toLocaleString('en-IN')
                        : '0'}{' '}
                      Liters
                    </div>
                    <div className="text-sm text-gray-600">per day for your household</div>
                  </div>
                </div>
              )}
    

        {/* CONTROLS */}
        <div className="mt-10 flex justify-between">
          <button
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 border rounded flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Back
          </button>

          {step < 3 ? (
            <button
              disabled={!isStepValid()}
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 bg-teal-600 text-white rounded flex items-center gap-2"
            >
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button
              disabled={!isStepValid()}
              onClick={handleSubmit}
              className="px-6 py-2 bg-teal-600 text-white rounded"
            >
              Calculate Harvesting Potential
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
  );

}
