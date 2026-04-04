import { useEffect, useState, useRef } from "react";
import { Droplets, Send, ChevronLeft, CloudRain, Gauge, Home, Building2, Zap } from "lucide-react";

export default function ChatPage() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
const [showChat, setShowChat] = useState(window.innerWidth >= 640);
  const messagesEndRef = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/user/reports`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setReports(data.reports || data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReports();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
useEffect(() => {
  if (!selectedReport) {
    setShowChat(false);
  }
}, [selectedReport]);
  const handleSelectReport = (r) => {
    setSelectedReport(r);
    setShowChat(true);
  };

  const sendMessage = async () => {
    if (!input.trim() || !selectedReport) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/user/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ message: input, reportId: selectedReport._id }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-teal-50 overflow-hidden">

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-teal-700 to-teal-600 shadow-md flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <Droplets className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-white text-base leading-tight tracking-tight">JalMitra</p>
            <p className="text-white/60 text-xs hidden sm:block">Rainwater Assistant</p>
          </div>
        </div>

        {showChat && (
          <button
            onClick={() => setShowChat(false)}
            className="flex sm:hidden items-center gap-1 bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Reports
          </button>
        )}
      </div>

      {/* ── BODY ── */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* ── LEFT PANEL ── */}
        <div className={`
          absolute sm:relative inset-0
          w-full sm:w-72 md:w-80
          flex-shrink-0 flex flex-col
          bg-white border-r border-gray-100
          overflow-hidden z-10
          transition-transform duration-300 ease-in-out
          ${showChat ? "-translate-x-full sm:translate-x-0" : "translate-x-0"}
        `}>
          <div className="px-4 pt-4 pb-3 border-b border-gray-100">
            <p className="text-xs font-semibold text-teal-700 uppercase tracking-widest">Your Reports</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {reports.length} report{reports.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2.5">
            {reports.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 gap-3 opacity-40">
                <CloudRain className="w-10 h-10 text-teal-400" />
                <p className="text-sm text-gray-400">No reports yet</p>
              </div>
            )}

            {reports.map((r) => (
              <div
                key={r._id}
                onClick={() => handleSelectReport(r)}
                className={`rounded-2xl border p-3.5 cursor-pointer transition-all duration-200
                  ${selectedReport?._id === r._id
                    ? "border-teal-400 bg-teal-50 shadow-sm"
                    : "border-gray-100 bg-gray-50 hover:border-teal-300 hover:bg-teal-50 hover:-translate-y-px hover:shadow-sm"
                  }`}
              >
                {/* Stat grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { icon: <CloudRain className="w-3 h-3 text-teal-600" />, label: "Rainfall", value: `${r.annualRainfall} mm` },
                    { icon: <Droplets className="w-3 h-3 text-teal-600" />, label: "Harvested", value: `${r.harvestedWater} L` },
                    { icon: <Home className="w-3 h-3 text-teal-600" />, label: "Tank", value: `${r.tankSize} L` },
                    { icon: <Gauge className="w-3 h-3 text-teal-600" />, label: "Feasibility", value: r.feasibilityText },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                        {icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                        <p className="text-xs font-semibold text-gray-800 truncate">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
                  <span className="flex items-center gap-1 bg-gray-100 text-gray-500 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                    <Building2 className="w-2.5 h-2.5" />
                    {r.city}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full
                    ${r.surplusOrShortage === "Surplus"
                      ? "bg-teal-100 text-teal-700"
                      : "bg-red-50 text-red-400"
                    }`}>
                    {r.surplusOrShortage === "Surplus" ? "▲ Surplus" : "▼ Shortage"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className={`
          absolute sm:relative inset-0
          flex-1 flex flex-col overflow-hidden bg-teal-50
          transition-transform duration-300 ease-in-out
          ${showChat ? "translate-x-0" : "translate-x-full sm:translate-x-0"}
        `}>

          {/* Active report bar */}
          {selectedReport ? (
            <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white border-b border-gray-100 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0 ring-4 ring-teal-100 animate-pulse" />
              <p className="text-xs text-teal-700 font-medium truncate">
                <span className="font-bold">{selectedReport.city}</span>
                {" · "}{selectedReport.harvestedWater} L harvested · Tank {selectedReport.tankSize} L
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border-b border-gray-100 text-xs text-gray-400 flex-shrink-0">
              <Zap className="w-3.5 h-3.5" />
              Select a report to start chatting
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center flex-1 gap-3 opacity-40">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-teal-600" />
                </div>
                <p className="text-sm text-gray-400 text-center max-w-[180px] leading-relaxed">
                  Ask me anything about your rainwater report
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                <div className={`
                  px-4 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[75%] sm:max-w-[60%] break-words
                  ${msg.sender === "user"
                    ? "bg-gradient-to-br from-teal-600 to-teal-500 text-white rounded-br-md shadow-sm"
                    : "bg-white text-gray-800 border border-gray-100 rounded-bl-md shadow-sm"
                  }
                `}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          {selectedReport && (
            <div className="px-4 pb-2 flex gap-2 flex-wrap flex-shrink-0">
              {[
                { emoji: "📐", label: "Try scenario", msg: "What if I increase roof size?" },
                { emoji: "💡", label: "Worth it?", msg: "Is this worth it?" },
                { emoji: "🌿", label: "Improve harvest", msg: "How can I improve my harvest?" },
              ].map(({ emoji, label, msg }) => (
                <button
                  key={label}
                  onClick={() => setInput(msg)}
                  className="text-xs bg-white border border-teal-200 text-teal-700 font-medium px-3 py-1.5 rounded-full hover:bg-teal-50 hover:border-teal-400 transition-all"
                >
                  {emoji} {label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 py-3 bg-white border-t border-gray-100 flex items-center gap-2 flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!selectedReport}
              placeholder={selectedReport ? "Ask about your report…" : "Select a report first…"}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={sendMessage}
              disabled={!selectedReport || !input.trim()}
              className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-600 to-teal-500 text-white flex items-center justify-center flex-shrink-0 shadow-md hover:shadow-lg hover:-translate-y-px transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}