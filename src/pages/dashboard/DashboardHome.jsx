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

import "./DashboardHome.css";

const DashboardHome = () => {
  const [activeTab, setActiveTab] = useState("week");
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // 🔹 BAZADAN MA'LUMOT OLIB FOIZNI TO'G'RI HISOBLASH
  useEffect(() => {
    const currentUserEmail = localStorage.getItem("email");
    if (!currentUserEmail) return;
    fetch("https://workifyback-production.up.railway.app/register/getRegister")
      .then((res) => res.json())
      .then((resp) => {
        const data = resp.data || resp;
        if (Array.isArray(data)) {
          // Foydalanuvchining eng oxirgi kiritgan ma'lumotini olish
          const myData = data
            .filter(
              (c) => c.email?.toLowerCase() === currentUserEmail.toLowerCase()
            )
            .pop();

          if (myData) {
            // Signup sahifasida to'ldirilgan 7 ta asosiy maydon
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
              // Ma'lumot borligini, bo'sh emasligini va "N/A" emasligini tekshiramiz
              if (
                myData[field] &&
                String(myData[field]).trim() !== "" &&
                myData[field] !== "N/A"
              ) {
                filledCount++;
              }
            });

            // Foizni hisoblash: (to'lganlar / 7) * 100
            const percent = Math.round((filledCount / fields.length) * 100);
            setCompletionPercentage(percent > 100 ? 100 : percent);
          }
        }
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  // 🔹 Grafik ma'lumotlari
  const profileViewsData = {
    week: [
      { day: "Mon", views: 24 },
      { day: "Tue", views: 18 },
      { day: "Wed", views: 32 },
      { day: "Thu", views: 28 },
      { day: "Fri", views: 35 },
      { day: "Sat", views: 20 },
      { day: "Sun", views: 15 },
    ],
    month: [
      { day: "W1", views: 1200 },
      { day: "W2", views: 1500 },
      { day: "W3", views: 800 },
      { day: "W4", views: 2100 },
    ],
  };

  const jobPostsData = {
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
      { day: "Week 1", posts: 202 },
      { day: "Week 2", posts: 185 },
      { day: "Week 3", posts: 220 },
      { day: "Week 4", posts: 210 },
    ],
  };

  const activeViewsData = profileViewsData[activeTab];
  const activeJobsData = jobPostsData[activeTab];

  return (
    <div className="dashboard-container">
      <div className="dashboard-big">
        <div className="dashboard-h1">
          <h1>Dashboard</h1>
        </div>
          <button>Post a Job</button>
      </div>
      <div className="main-content">
        {/* 1. FOIZ KO'RSATKICHI (Circular Progress) */}
        <div className="card profile-completed-card">
          <h2 className="card-title">Profile completed</h2>

          <div className="progress-container">
            <div
              className="circular-progress"
              style={{
                background: `conic-gradient(#E8989E ${
                  completionPercentage * 3.6
                }deg, rgba(255,255,255,0.1) 0deg)`,
              }}
            >
              <div className="inner-circle">
                <span className="percent-number">{completionPercentage}%</span>
                <span className="percent-text">Completed</span>
              </div>
            </div>
          </div>

          <p className="card-footer-text">
            Complete all parts of your profile and increase your chances of
            finding a job
          </p>
        </div>

        {/* 2. PROFILE VIEWS CHART */}
        <div className="card chart-card">
          <div className="card-header">
            <h2 className="card-title">Profile views</h2>
            <div className="time-tabspill">
              <button
                className={`tab-btn ${activeTab === "week" ? "active" : ""}`}
                onClick={() => setActiveTab("week")}
              >
                This week
              </button>
              <button
                className={`tab-btn ${activeTab === "month" ? "active" : ""}`}
                onClick={() => setActiveTab("month")}
              >
                This month
              </button>
            </div>
          </div>

          <div className="chart-date-label">24 Dec 2021</div>

          <div
            className="chart-container"
            style={{ height: "200px", marginTop: "10px" }}
          >
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={activeViewsData}
                margin={{ top: 10, right: 10, left: -30, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#999", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#999", fontSize: 12 }}
                />
                <Tooltip cursor={{ fill: "transparent" }} content="" />
                <Bar dataKey="views" radius={[6, 6, 0, 0]} barSize={12}>
                  {activeViewsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="url(#viewsGradient)" />
                  ))}
                </Bar>
                <defs>
                  <linearGradient
                    id="viewsGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#2D2D5A" stopOpacity={1} />
                    <stop offset="100%" stopColor="#8A74F9" stopOpacity={1} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. JOB POSTS CHART */}
      <div className="card chart-card custom-job-card">
        <div className="card-header">
          <h2 className="card-title">Job posts</h2>
          <div className="time-tabs-pilll">
            <button
              className={`tab-pill-btn ${activeTab === "week" ? "active" : ""}`}
              onClick={() => setActiveTab("week")}
            >
              This week
            </button>
            <button
              className={`tab-pill-btn ${
                activeTab === "month" ? "active" : ""
              }`}
              onClick={() => setActiveTab("month")}
            >
              This month
            </button>
          </div>
        </div>

        <div className="chart-date-label">24 Dec 2021</div>

        <div className="area-chart-wrapper">
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={activeJobsData}>
              <defs>
                <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#999", fontSize: 12 }}
                dy={10}
              />
              <YAxis hide={true} domain={[0, "maxData + 50"]} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="posts"
                stroke="#82ca9d"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorPosts)"
                dot={{ r: 4, fill: "#fff", stroke: "#82ca9d", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip-box">
        <p className="label">You have posted</p>
        <p className="value">{payload[0].value} jobs</p>
      </div>
    );
  }
  return null;
};

export default DashboardHome;
