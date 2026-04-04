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
      console.log(error)
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
    }
  );
};




  return (
   <div className="flex h-full w-full bg-gray-50">
  <div className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-8 py-4">

    {/* PAGE TITLE */}
    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 mt-10">
      New Calculation
    </h1>
    <p className="text-sm sm:text-base text-gray-600 mb-6">
      Let's calculate your rainwater harvesting potential
    </p>

    {/* CARD */}
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">

      {/* STEP INDICATOR */}
      <div className="flex items-center justify-between sm:justify-start sm:gap-4 mb-8">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold ${
              n < step
                ? "bg-teal-600 text-white"
                : n === step
                ? "bg-teal-100 text-teal-700"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {n < step ? <Check size={16} /> : n}
          </div>
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Home className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold">House Details</h2>
              <p className="text-sm text-gray-600">Tell us about your property</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Roof Area (sq. meters)
            </label>
            <input
              type="number"
              value={formData.roofArea}
              onChange={(e) => updateFormData("roofArea", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Building Type
            </label>
            <select
              value={formData.buildingType}
              onChange={(e) => updateFormData("buildingType", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
              <option value="mixed">Mixed Use</option>
            </select>
          </div>

          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={formData.hasOpenArea}
              onChange={(e) => updateFormData("hasOpenArea", e.target.checked)}
              className="w-4 h-4 text-teal-600"
            />
            Has open area for additional harvesting
          </label>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Location</h2>
              <p className="text-sm text-gray-600">
                Where is your property located?
              </p>
            </div>
          </div>

          <input
            type="text"
            value={formData.city}
            onChange={(e) => updateFormData("city", e.target.value)}
            placeholder="Enter city"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
          />

          <button
            type="button"
            onClick={handleUseCurrentLocation}
            className="text-sm text-teal-600 font-medium"
          >
            Use Current Location
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Family Details</h2>
              <p className="text-sm text-gray-600">
                Help us estimate your water needs
              </p>
            </div>
          </div>

          <input
            type="number"
            value={formData.familyMembers}
            onChange={(e) => updateFormData("familyMembers", e.target.value)}
            placeholder="Family members"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
          />

          <div className="bg-blue-50 p-4 rounded-xl border">
            <p className="text-sm text-gray-600">Estimated Daily Usage</p>
            <div className="text-2xl font-bold text-blue-600">
              {formData.familyMembers
                ? formData.familyMembers * (formData.dailyUsage || 135)
                : 0}{" "}
              L
            </div>
          </div>
        </div>
      )}

      {/* CONTROLS */}
      <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
        <button
          disabled={step === 1}
          onClick={() => setStep(step - 1)}
          className="px-4 py-2 border rounded"
        >
          Back
        </button>

        <button
          disabled={!isStepValid()}
          onClick={() =>
            step < 3 ? setStep(step + 1) : handleSubmit()
          }
          className="px-5 py-2 bg-teal-600 text-white rounded"
        >
          {step < 3 ? "Next" : "Calculate"}
        </button>
      </div>

    </div>
  </div>
</div>

  );

}
