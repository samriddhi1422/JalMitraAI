import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Cloud, Calculator, FileText, Droplets } from "lucide-react";

function CalculationLoading() {
  const navigate = useNavigate();
  const location = useLocation();

  const userInputId = location.state?.userInputId;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Cloud, text: "Fetching real rainfall data..." },
    { icon: Calculator, text: "Running engineering calculations..." },
    { icon: FileText, text: "Preparing your AI report..." },
  ];

  const runCalculation = useCallback(async () => {
    if (!userInputId) {
      navigate("/"); 
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/user/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userInputId }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("CALC ID SENT TO REPORT:", data.data._id);
        navigate("/report", {
         state: {
         calId: data.data._id,
               },
        });
      }
    } catch (error) {
      console.error("Calculation failed:", error);
    }
  }, [API_BASE_URL, navigate, userInputId]);

  // Step animation
  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) =>
        prev < steps.length - 1 ? prev + 1 : prev
      );
    }, 2000);

    return () => clearInterval(stepTimer);
  }, []);

  // Run calculation once after animation
  useEffect(() => {
    const calculationTimer = setTimeout(() => {
      runCalculation();
    }, 6000);

    return () => clearTimeout(calculationTimer);
  }, [runCalculation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center animate-pulse">
              <Droplets className="w-12 h-12 text-teal-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full animate-bounce" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-teal-500 rounded-full animate-bounce delay-150" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Analyzing Your Data
          </h1>
          <p className="text-gray-600">This will take just a moment...</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === index;
            const isCompleted = currentStep > index;

            return (
              <div
                key={index}
                className={`flex items-center gap-4 transition-all duration-500 ${
                  isActive ? "scale-105" : ""
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isCompleted
                      ? "bg-green-100"
                      : isActive
                      ? "bg-teal-100 animate-pulse"
                      : "bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      isCompleted
                        ? "text-green-600"
                        : isActive
                        ? "text-teal-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>

                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      isActive ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {step.text}
                  </p>

                  {isActive && (
                    <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-600 animate-[loading_2s_ease-in-out_infinite]" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <style>{`
          @keyframes loading {
            0% { width: 0%; }
            50% { width: 100%; }
            100% { width: 0%; }
          }
        `}</style>
      </div>
    </div>
  );
}

export default CalculationLoading;
