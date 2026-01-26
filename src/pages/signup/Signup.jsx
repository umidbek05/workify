import React, { useState } from "react";
import {
  FaBuilding,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGlobe,
  FaIndustry,
  FaFlag,
  FaCity,
  FaUser,
} from "react-icons/fa";

import "./Signup.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("company");

  // FORM STATE
  const [formData, setFormData] = useState({
    companyName: "",
    phone: "",
    email: "",
    password: "",
    website: "",
    industry: "",
    country: "",
    city: "",
  });

  // INPUT O‘ZGARTIRISH FUNKSIYASI
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    // POST request backendga
    fetch("http://localhost:3000/register/createRegister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server Error!");
        return res.json();
      })
      .then((data) => {
        console.log("Server Response:", data);
        alert("Form submitted successfully!");
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Something went wrong!");
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">

        {/* TABS */}
        <div className="tabs">
          <button
            type="button"
            className={`tab ${activeTab === "talent" ? "active" : ""}`}
            onClick={() => setActiveTab("talent")}
          >
            <FaUser className="tab-icon" />
            Talent
          </button>

          <button
            type="button"
            className={`tab ${activeTab === "company" ? "active" : ""}`}
            onClick={() => setActiveTab("company")}
          >
            <FaBuilding className="tab-icon" />
            Company
          </button>
        </div>

        {/* FORM */}
        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Company name</label>
            <div className="input-box">
              <span className="icon">
                <FaBuilding />
              </span>
              <input
                type="text"
                placeholder="Company name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label>Phone</label>
            <div className="input-box">
              <span className="icon">
                <FaPhone />
              </span>
              <input
                type="text"
                placeholder="+998"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label>Email</label>
            <div className="input-box">
              <span className="icon">
                <FaEnvelope />
              </span>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label>Password</label>
            <div className="input-box">
              <span className="icon">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="field">
            <label>Website</label>
            <div className="input-box">
              <span className="icon">
                <FaGlobe />
              </span>
              <input
                type="text"
                placeholder="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label>Industry</label>
            <div className="input-box">
              <span className="icon">
                <FaIndustry />
              </span>
              <input
                type="text"
                placeholder="Industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label>Country</label>
            <div className="input-box">
              <span className="icon">
                <FaFlag />
              </span>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Select country</option>
                <option>Uzbekistan</option>
                <option>Kazakhstan</option>
                <option>Russia</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label>City</label>
            <div className="input-box">
              <span className="icon">
                <FaCity />
              </span>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              >
                <option value="">Select city</option>
                <option>Tashkent</option>
                <option>Samarkand</option>
                <option>Bukhara</option>
              </select>
            </div>
          </div>

          <div className="buttons">
            <button
              type="button"
              className="btn back"
              onClick={() => alert("Going back!")}
            >
              Back
            </button>
            <button type="submit" className="btn next">
              Next
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Signup;
