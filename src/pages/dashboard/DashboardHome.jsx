import React, { useState } from "react";
import "./DashboardHome.css";

const DashboardHome = () => {
  const [activeTab, setActiveTab] = useState("week");

  // 🔹 Profile completion data
  const profileData = {
    completed: 25,
    total: 100,
  };

  // 🔹 Profile Views Data
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
      { week: "Week 1", views: 202 },
      { week: "Week 2", views: 185 },
      { week: "Week 3", views: 220 },
      { week: "Week 4", views: 210 },
    ],
  };

  // 🔹 Job Posts Data
  const jobPostsData = {
    week: [
      { day: "Mon", posts: 30 },
      { day: "Tue", posts: 25 },
      { day: "Wed", posts: 32 },
      { day: "Thu", posts: 28 },
      { day: "Fri", posts: 35 },
      { day: "Sat", posts: 20 },
      { day: "Sun", posts: 15 },
    ],
    month: [
      { week: "Week 1", posts: 202 },
      { week: "Week 2", posts: 185 },
      { week: "Week 3", posts: 220 },
      { week: "Week 4", posts: 210 },
    ],
  };

  // Get active data
  const activeViewsData = profileViewsData[activeTab];
  const activeJobsData = jobPostsData[activeTab];

  // Calculate totals
  const totalViews = activeViewsData.reduce((sum, item) => sum + item.views, 0);
  const totalPosts = activeJobsData.reduce((sum, item) => sum + item.posts, 0);

  // Find max for charts
  const maxViews = Math.max(...activeViewsData.map((d) => d.views));
  const maxPosts = Math.max(...activeJobsData.map((d) => d.posts));

  return (
    <div className="dashboard-container">
      {/* HEADER - Top Navigation */}
      <div className="top-nav">
        <h1 className="nav-title">Dashboard</h1>
        <div className="nav-actions">
          <button className="post-job-btn">Post a Job</button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* LEFT CARD - Profile Completion */}
        <div className="card profile-card">
          <div className="card-header">
            <h2 className="card-title">Profile completed</h2>
            <div className="completion-badge">
              <span className="percentage">{profileData.completed}%</span>
            </div>
          </div>

          {/* Progress Circle */}
          <div className="progress-circle-container">
            <div
              className="progress-circle"
              style={{
                background: `conic-gradient(#4361EE ${
                  profileData.completed * 3.6
                }deg, #f0f0f0 0deg)`,
              }}
            >
              <div className="progress-inner">
                <span className="progress-percent">
                  {profileData.completed}%
                </span>
              </div>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="progress-stats">
            <div className="stat-item">
              <div className="stat-info">
                <span className="stat-value">{profileData.completed}%</span>
                <span className="stat-label">Completed</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-info">
                <span className="stat-value">
                  {100 - profileData.completed}%
                </span>
                <span className="stat-label">Remaining</span>
              </div>
            </div>
          </div>
          <p>
            Complete all parts of your profile and increase your chances of
            finding a job
          </p>
        </div>

        {/* MIDDLE CARD - Profile Views */}
        <div className="card chart-card">
          <div className="card-header">
            <h2 className="card-title">Profile views</h2>
            <div className="time-tabs">
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

          {/* Chart */}
          <div className="chart-container">
            <div className="simple-bar-chart">
              {activeViewsData.map((item, index) => {
                const height = (item.views / maxViews) * 100;

                return (
                  <div key={index} className="bar-wrapper">
                    <div
                      className="bar"
                      style={{ height: `${height}%` }}
                      title={`${item.views} views`}
                    >
                      <span className="bar-value">{item.views}</span>
                    </div>
                    <div className="bar-label">
                      {activeTab === "week" ? item.day : item.week}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="summary-section">
            <div className="summary-item">
              <span className="summary-title">This {activeTab}</span>
              <span className="summary-value">30 Dec 2013</span>
            </div>
            <div className="summary-item">
              <span className="summary-title">Total</span>
              <span className="summary-value total">{totalViews}</span>
            </div>
          </div>
        </div>
      </div>
      {/* RIGHT CARD - Job Posts */}
      <div className="card chart-cart">
        <div className="card-header">
          <h2 className="card-title">Job posts</h2>
          <div className="time-tabs">
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

        {/* Chart */}
        <div className="chart-container">
          <div className="simple-bar-chart">
            {activeJobsData.map((item, index) => {
              const height = (item.posts / maxPosts) * 100;

              return (
                <div key={index} className="bar-wrapper">
                  <div
                    className="bar job-bar"
                    style={{ height: `${height}%` }}
                    title={`${item.posts} posts`}
                  >
                    <span className="bar-value">{item.posts}</span>
                  </div>
                  <div className="bar-label">
                    {activeTab === "week" ? item.day : item.week}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="summary-section">
          <div className="summary-item">
            <span className="summary-title">This {activeTab}</span>
            <span className="summary-value">30 Dec 2013</span>
          </div>
          <div className="summary-item">
            <span className="summary-title">Total</span>
            <span className="summary-value total">{totalPosts}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
