import React from "react";
import "./CompanyProfile";

import Dashboard from "./Dashboard";

const CompanyProfile = () => {
  return (
    <div className="company-page">
      {/* Top bar */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Company profile"
          className="search-input"
        />
        <button className="post-job-btn">Post a Job</button>
      </div>

      <div className="content">
        {/* Left card */}
        <div className="left-card">
          <div className="logo-box">
            <img src="" alt="Company logo" />
            <span className="edit-icon">✎</span>
          </div>

          <h3>TechCells LLC</h3>
          <p className="subtitle">Computer Software Company</p>

          <div className="rating">
            ⭐⭐⭐⭐☆
            <span>(4.0)</span>
            <span className="reviews">1K reviews</span>
          </div>

          <div className="company-info">
            <p>
              <b>Since:</b> 2015
            </p>
            <p>
              <b>City:</b> Tashkent
            </p>
            <p>
              <b>Country:</b> Uzbekistan
            </p>
            <p>
              <b>Phone:</b> +99894-498-65-65
            </p>
            <p>
              <b>Email:</b> TechCells@gmail.ru
            </p>
            <p>
              <b>Telegram:</b> @TechCells
            </p>
            <p>
              <b>Website:</b> www.TechCells.com
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="right-side">
          {/* Statistics */}
          <div className="stats-card">
            <div className="stat">
              <h2>300</h2>
              <p>Active jobs</p>
            </div>
            <div className="divider" />
            <div className="stat">
              <h2>5210</h2>
              <p>Posted Jobs</p>
            </div>
            <div className="divider" />
            <div className="stat">
              <h2>56</h2>
              <p>Hired talents</p>
            </div>
          </div>

          {/* About company */}
          <div className="about-card">
            <div className="about-header">
              <h3>About company</h3>
              <span className="edit-icon">✎</span>
            </div>
            <p className="placeholder">
              Please tell us something about your company...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
