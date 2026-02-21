import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

const DashboardHome = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("week");
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // --- PROFILE COMPLETED MANTIG'I ---
  useEffect(() => {
    const calculatePercent = (data) => {
      const fields = [
        "companyName",
        "phone",
        "email",
        "website",
        "industry",
        "country",
        "city",
      ];
      let filledCount = 0;
      fields.forEach((field) => {
        if (
          data[field] &&
          String(data[field]).trim() !== "" &&
          data[field] !== "N/A"
        ) {
          filledCount++;
        }
      });
      return Math.round((filledCount / fields.length) * 100);
    };

    const localData = JSON.parse(
      localStorage.getItem("signup_form_storage") || "{}"
    );
    if (localData.email) setCompletionPercentage(calculatePercent(localData));

    const currentUserEmail = localStorage.getItem("email") || localData.email;
    if (!currentUserEmail) return;

    fetch("https://workifyback-production.up.railway.app/register/getRegister")
      .then((res) => res.json())
      .then((resp) => {
        const data = resp.data || resp;
        if (Array.isArray(data)) {
          const myData = data.find(
            (c) => c.email?.toLowerCase() === currentUserEmail.toLowerCase()
          );
          if (myData) setCompletionPercentage(calculatePercent(myData));
        }
      });
  }, []);

  const activeViewsData = {
    week: [
      { day: "M", views: 24 },
      { day: "T", views: 18 },
      { day: "W", views: 32 },
      { day: "T", views: 28 },
      { day: "F", views: 35 },
      { day: "S", views: 20 },
      { day: "S", views: 15 },
    ],
    month: [
      { day: "W1", views: 400 },
      { day: "W2", views: 700 },
      { day: "W3", views: 500 },
      { day: "W4", views: 900 },
    ],
  }[activeTab];

  const activeJobsData = {
    week: [
      { day: "M", posts: 30 },
      { day: "T", posts: 150 },
      { day: "W", posts: 120 },
      { day: "T", posts: 200 },
      { day: "F", posts: 150 },
      { day: "S", posts: 250 },
      { day: "S", posts: 50 },
    ],
    month: [
      { day: "W1", posts: 200 },
      { day: "W2", posts: 185 },
      { day: "W3", posts: 220 },
      { day: "W4", posts: 210 },
    ],
  }[activeTab];

  const CustomTabSwitcher = () => (
    <div
      className={`flex p-1 rounded-[14px] mt-4 self-center transition-all ${
        isDarkMode ? "bg-[#1a1a1a]" : "bg-[#F4F7FE]"
      }`}
    >
      {["week", "month"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-7 py-2 rounded-[11px] text-[13px] font-bold transition-all duration-300 ${
            activeTab === tab
              ? isDarkMode
                ? "bg-[#333] text-white shadow-md"
                : "bg-white text-[#2D3A61] shadow-[0_4px_10px_rgba(0,0,0,0.06)]"
              : isDarkMode
              ? "text-gray-500"
              : "text-[#A3AED0] hover:text-[#707EAE]"
          }`}
        >
          This {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );

  return (
    <div
      className={`min-h-screen p-4 md:p-6 transition-all duration-300 ${
        isDarkMode ? "bg-[#0b0b0b]" : "bg-[#F4F7FE]"
      }`}
    >
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div
          className={`w-full md:flex-1 h-[56px] rounded-[15px] flex items-center px-6 transition-colors ${
            isDarkMode
              ? "bg-[#1a1a1a] border border-[#2a2a2a]"
              : "bg-white shadow-sm"
          }`}
        >
          <h1
            className={`text-[18px] font-bold ${
              isDarkMode ? "text-gray-200" : "text-[#2D3A61]"
            }`}
          >
            Dashboard
          </h1>
        </div>
        <button className="w-full md:w-[170px] h-[56px] bg-[#82ca9d] hover:bg-[#71ba8e] text-white font-bold rounded-[15px] shadow-sm active:scale-95 transition-all">
          Post a Job
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
          {/* 1. PROFILE CARD */}
          <div
            className="rounded-[24px] p-6 text-center flex flex-col items-center justify-between min-h-[400px] shadow-lg"
            style={{
              background: `linear-gradient(180deg, #2d3a61 0%, #b669b8 100%)`,
            }}
          >
            <h2 className="text-2xl font-bold text-white">Profile completed</h2>
            <div className="relative flex justify-center items-center my-5">
              <div
                className="w-[180px] h-[180px] rounded-full flex justify-center items-center"
                style={{
                  background: `conic-gradient(#4CAF50 ${
                    completionPercentage * 3.6
                  }deg, rgba(255,255,255,0.15) 0deg)`,
                }}
              >
                <div
                  className="w-[160px] h-[160px] rounded-full flex flex-col justify-center items-center"
                  style={{
                    background:
                      "linear-gradient(180deg, #2d3a61 0%, #b669b8 100%)",
                  }}
                >
                  <span className="text-[42px] font-extrabold text-white">
                    {completionPercentage}%
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-white opacity-80">
              Complete your profile to increase your chances!
            </p>
          </div>

          {/* 2. PROFILE VIEWS (TUZATILGAN QISMI) */}
          <div
            className={`rounded-[24px] p-6 shadow-sm flex flex-col h-[400px] border transition-colors ${
              isDarkMode
                ? "bg-[#1a1a1a] border-[#2a2a2a]"
                : "bg-white border-transparent"
            }`}
          >
            <h2
              className={`text-[18px] font-bold text-center ${
                isDarkMode ? "text-white" : "text-[#2D3A61]"
              }`}
            >
              Profile views
            </h2>
            <CustomTabSwitcher />
            <div className="flex-1 w-full mt-8" style={{ minHeight: 0 }}>
              {" "}
              {/* minHeight: 0 muhim */}
              <ResponsiveContainer width="100%" height="100%" minHeight={200}>
                <BarChart data={activeViewsData} margin={{ left: -25 }}>
                  <CartesianGrid
                    vertical={false}
                    stroke={isDarkMode ? "#333" : "#F4F7FE"}
                  />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#A3AED0", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#A3AED0", fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: isDarkMode ? "#252525" : "#F4F7FE" }}
                    content={<CustomTooltip isDarkMode={isDarkMode} />}
                  />
                  <Bar dataKey="views" radius={[5, 5, 0, 0]} barSize={12}>
                    {activeViewsData.map((e, i) => (
                      <Cell key={i} fill="url(#barGradient)" />
                    ))}
                  </Bar>
                  <defs>
                    <linearGradient
                      id="barGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#2D3A61" />
                      <stop offset="100%" stopColor="#8A74F9" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 3. JOB POSTS (TUZATILGAN QISMI) */}
        <div
          className={`rounded-[24px] p-6 shadow-sm flex flex-col h-[400px] border transition-colors ${
            isDarkMode
              ? "bg-[#1a1a1a] border-[#2a2a2a]"
              : "bg-white border-transparent"
          }`}
        >
          <h2
            className={`text-[18px] font-bold text-center ${
              isDarkMode ? "text-white" : "text-[#2D3A61]"
            }`}
          >
            Job posts
          </h2>
          <CustomTabSwitcher />
          <div className="flex-1 w-full mt-8" style={{ minHeight: 0 }}>
            {" "}
            {/* minHeight: 0 muhim */}
            <ResponsiveContainer width="100%" height="100%" minHeight={200}>
              <AreaChart data={activeJobsData} margin={{ left: -25 }}>
                <defs>
                  <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke={isDarkMode ? "#333" : "#F4F7FE"}
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#A3AED0", fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltipJobs />} />
                <Area
                  type="monotone"
                  dataKey="posts"
                  stroke="#82ca9d"
                  strokeWidth={3}
                  fill="url(#colorPosts)"
                  dot={{
                    r: 5,
                    fill: "#fff",
                    stroke: "#82ca9d",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- TOOLTIP DIZAYNLARI ---
const CustomTooltip = ({ active, payload, label, isDarkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`p-2 shadow-xl rounded-lg ${
          isDarkMode ? "bg-[#2a2a2a] text-white" : "bg-white text-[#2D3A61]"
        }`}
      >
        <p className="text-[12px] font-bold">
          {label}: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const CustomTooltipJobs = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#82ca9d] text-white p-2 px-3 rounded-lg text-xs shadow-lg font-bold">
        You have posted {payload[0].value} jobs
      </div>
    );
  }
  return null;
};

export default DashboardHome;
