import { useState } from "react";
import "../../pages/dashboard/dashboard.css";

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState("week");
  const [profileProgress] = useState(25); // 25% profile completed

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">TC</div>
          <div>
            <h4>TechCells Corp.</h4>
              <p>Tashkent</p>
          </div>
        </div>

        <nav>
          <a className="active">Dashboard</a>
          <a>My company</a>
          <a>My jobs</a>
          <a>Talents</a>
          <a>FAQ</a>
          <a>Contacts</a>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="main">
        {/* TOP */}
        <div className="topbar">
          <h2>Dashboard</h2>
          <button className="post-btn">Post a Job</button>
        </div>

        {/* TOP CARDS SECTION */}
        <div className="top-cards">
          {/* PROFILE COMPLETED CARD */}
          <div className="card profile-card">
            <div className="card-header">
              <h4>Profile completed</h4>
              <span className="progress-percent">{profileProgress}%</span>
            </div>
            <p className="card-description">
              Complete all parts of your profile and increase your chances
            </p>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${profileProgress}%` }}
              ></div>
            </div>
          </div>

          {/* PROFILE VIEWS CARD */}
          <div className="card views-card">
            <div className="card-header">
              <h4>Profile views</h4>
              <span className="views-count">2,245</span>
            </div>
            <p className="card-description">This week</p>
            <div className="views-bars">
              {[50, 80, 60, 90, 70, 85, 95].map((height, index) => (
                <div key={index} className="bar-container">
                  <div 
                    className="bar" 
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="day-label">
                    {["M", "T", "W", "T", "F", "S", "S"][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* JOB POSTS */}
        <div className="job-posts">
          <div className="job-posts-header">
            <h4>Job posts</h4>

            <div className="time-filters">
              <button
                className={timeFilter === "week" ? "active" : ""}
                onClick={() => setTimeFilter("week")}
              >
                This week
              </button>
              <button
                className={timeFilter === "month" ? "active" : ""}
                onClick={() => setTimeFilter("month")}
              >
                This month
              </button>
            </div>
          </div>

          <p className="date-text">24 Dec 2021</p>

          <div className="chart-wrapper">
            {/* Y-AXIS */}
            <div className="y-axis">
              <span>500</span>
              <span>100</span>
              <span>0</span>
            </div>

            {/* SVG AREA CHART */}
            <div className="green-chart">
              <svg viewBox="0 0 700 250" className="area-chart">
                <defs>
                  <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6FCF97" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#6FCF97" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* AREA */}
                <path
                  d="
                    M 0 220
                    C 80 80, 140 100, 200 120
                    C 260 140, 320 60, 380 90
                    C 440 120, 500 160, 560 110
                    C 620 60, 660 80, 700 100
                    L 700 250
                    L 0 250
                    Z
                  "
                  fill="url(#greenGradient)"
                />

                {/* LINE */}
                <path
                  d="
                    M 0 220
                    C 80 80, 140 100, 200 120
                    C 260 140, 320 60, 380 90
                    C 440 120, 500 160, 560 110
                    C 620 60, 660 80, 700 100
                  "
                  fill="none"
                  stroke="#58B989"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* ACTIVE DOT */}
                <circle
                  cx="560"
                  cy="110"
                  r="8"
                  fill="#58B989"
                  stroke="#fff"
                  strokeWidth="4"
                />
              </svg>

              {/* TOOLTIP */}
              <div className="green-tooltip">
                You have posted<br />
                <strong>50 jobs</strong>
              </div>

              {/* X AXIS */}
              <div className="x-axis">
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span>S</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;  