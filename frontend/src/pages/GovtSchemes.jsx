import { useState, useMemo } from "react";
import subsidiesData from "../components/subsidies.json";
import {
  Award,
  Search,
  MapPin,
  ExternalLink
} from "lucide-react";

export default function GovtSchemes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("all");

  const schemes = subsidiesData.subsidies;

  const states = useMemo(() => {
    const uniqueStates = schemes
      .map(s => s.state)
      .filter(Boolean);
    return ["all", ...new Set(uniqueStates)];
  }, [schemes]);

  

  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      const matchesSearch =
        scheme.scheme_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (scheme.state || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesState =
        selectedState === "all" ||
        scheme.state === selectedState ||
        scheme.level === "Central";

      return matchesSearch && matchesState;
    });
  }, [searchQuery, selectedState, schemes]);

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 mt-10" >
            Government Schemes
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Explore subsidies and incentives for rainwater harvesting across India
          </p>
        </div>

        {/* Highlight Card */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-lg">
          <div className="flex items-center gap-3 mb-4 ">
            <Award className="w-7 h-7 " />
            <h2 className="text-xl sm:text-sm font-bold">
              Financial Support Available
            </h2>
          </div>
          <p className="text-teal-50 mb-6 text-sm sm:text-base">
            Government subsidies can cover up to 50% of rainwater harvesting costs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard label="Active Schemes" value={`${schemes.length}+`} />
            <StatCard label="Max Coverage" value="50%" />
            <StatCard label="States Covered" value={states.length - 1} />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search schemes or states..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              {states.map(state => (
                <option key={state} value={state}>
                  {state === "all" ? "All States" : state}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Schemes List */}
        {filteredSchemes.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No schemes found
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredSchemes.map((scheme, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border p-5 sm:p-6 hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      {scheme.scheme_name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                      <MapPin className="w-4 h-4" />
                      {scheme.level === "Central" ? "All India" : scheme.state}
                    </div>
                  </div>

                  {scheme.link && (
                    <a
                      href={scheme.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 font-medium flex items-center gap-1 hover:underline"
                    >
                      Visit Portal
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <p className="text-gray-700 text-sm mb-3">
                  {scheme.details}
                </p>

                <div className="bg-gray-50 rounded-xl p-4 text-sm">
                  <span className="font-semibold">Benefits:</span>{" "}
                  {scheme.benefits}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="bg-white/10 rounded-xl p-4 text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-teal-100">{label}</div>
    </div>
  );
}
