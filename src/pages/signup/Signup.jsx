import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";

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
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("company");
  const [modal, setModal] = useState({ show: false, message: "" });

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

  // --- FOIZNI HISOBLASH QISMI ---
  const fieldsToTrack = [
    "companyName",
    "phone",
    "email",
    "website",
    "industry",
    "country",
    "city",
  ];
  const filledFields = fieldsToTrack.filter(
    (field) => formData[field] && formData[field].toString().trim() !== ""
  ).length;
  const completionPercentage = Math.round(
    (filledFields / fieldsToTrack.length) * 100
  );
  // ------------------------------

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.phone || !formData.email || !formData.password) {
      setModal({ show: true, message: "Phone, Email va Password majburiy!" });
      return;
    }

    fetch("http://localhost:5000/register/createRegister", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        localStorage.setItem("email", formData.email);
        setModal({ show: true, message: "Form submitted successfully!" });
      })
      .catch(() => setModal({ show: true, message: "Something went wrong!" }));
  };

  return (
    <div>
      <Header />
      {modal.show && (
        <div className="modal-overlay">
          <div className="custom-alert">
            <p>{modal.message}</p>
            <button
              className="alert-btn"
              onClick={() => {
                setModal({ show: false, message: "" });
                if (modal.message === "Form submitted successfully!")
                  navigate("/register");
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
      <div className="signup-container">
        <div className="signup-box">
          {/* PROGRESS BAR JOYLASHTIRILDI */}
          <div
            className="registration-progress"
            style={{ padding: "0 20px 20px 20px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
                marginBottom: "8px",
                fontWeight: "bold",
                color: "#555",
              }}
            >
              <span>Profile Completion</span>
              <span>{completionPercentage}%</span>
            </div>
            <div
              style={{
                width: "100%",
                height: "10px",
                backgroundColor: "#eee",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${completionPercentage}%`,
                  height: "100%",
                  backgroundColor:
                    completionPercentage === 100 ? "#4CAF50" : "#3b82f6",
                  transition: "width 0.4s ease-in-out",
                }}
              ></div>
            </div>
          </div>

          <div className="tabs">
            <button
              type="button"
              className={`tab ${activeTab === "talent" ? "active" : ""}`}
              onClick={() => setActiveTab("talent")}
            >
              <FaUser className="tab-icon" /> Talent
            </button>

            <button
              type="button"
              className={`tab ${activeTab === "company" ? "active" : ""}`}
              onClick={() => setActiveTab("company")}
            >
              <FaBuilding className="tab-icon" /> Company
            </button>
          </div>

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
      <Footer />
    </div>
  );
};

export default Signup;
