import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";
import Select from 'react-select'; 

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

// 1. Ma'lumotlarni komponentdan tashqariga chiqaramiz (xato bermasligi uchun)
const locationData = {
  Uzbekistan: ["Tashkent city", "Andijan", "Bukhara", "Fergana", "Jizzakh", "Namangan", "Navoi", "Kashkadarya", "Samarkand", "Sirdarya", "Surkhandarya", "Tashkent region", "Khorezm", "Karakalpakstan"],
  Kazakhstan: ["Almaty", "Astana", "Shymkent", "Aktobe", "Karaganda"],
  Russia: ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan"],
  Turkey: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"],
  USA: ["New York", "California", "Texas", "Florida", "Illinois"],
  Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"],
  UK: ["London", "Manchester", "Birmingham", "Glasgow", "Liverpool"],
  UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"],
  China: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu"],
  Japan: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Nagoya"]
};

const countryOptions = Object.keys(locationData).map(country => ({
  value: country,
  label: country
}));

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("company");
  const [modal, setModal] = useState({ show: false, message: "" });

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("signup_form_storage");
    return savedData ? JSON.parse(savedData) : {
      companyName: "",
      phone: "",
      email: "",
      password: "",
      website: "",
      industry: "",
      country: "",
      city: "",
    };
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fieldsToTrack = ["companyName", "phone", "email", "website", "industry", "country", "city"];
  const filledFields = fieldsToTrack.filter(
    (field) => formData[field] && formData[field].toString().trim() !== ""
  ).length;
  const completionPercentage = Math.round((filledFields / fieldsToTrack.length) * 100);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (name === "country") {
      updatedData.city = "";
    }

    setFormData(updatedData);
    localStorage.setItem("signup_form_storage", JSON.stringify(updatedData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.phone || !formData.email || !formData.password) {
      setModal({ show: true, message: "Phone, Email va Password majburiy!" });
      return;
    }

    fetch("https://workifyback-production.up.railway.app/register/createRegister", {
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
                if (modal.message === "Form submitted successfully!") navigate("/register");
              }}
            >OK</button>
          </div>
        </div>
      )}
      <div className="signup-container">
        <div className="signup-box">
          <div className="registration-progress" style={{ padding: "0 20px 20px 20px", width: '100%' }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>
              <span>Profile Completion</span>
              <span>{completionPercentage}%</span>
            </div>
            <div style={{ width: "100%", height: "10px", backgroundColor: "#eee", borderRadius: "5px", overflow: "hidden" }}>
              <div style={{ width: `${completionPercentage}%`, height: "100%", backgroundColor: completionPercentage === 100 ? "#4CAF50" : "#3b82f6", transition: "width 0.4s ease-in-out" }}></div>
            </div>
          </div>

          <div className="tabs">
            <button type="button" className={`tab ${activeTab === "talent" ? "active" : ""}`} onClick={() => setActiveTab("talent")}>
              <FaUser className="tab-icon" /> Talent
            </button>
            <button type="button" className={`tab ${activeTab === "company" ? "active" : ""}`} onClick={() => setActiveTab("company")}>
              <FaBuilding className="tab-icon" /> Company
            </button>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label>Company name</label>
              <div className="input-box">
                <span className="icon"><FaBuilding /></span>
                <input type="text" placeholder="Company name" name="companyName" value={formData.companyName} onChange={handleChange} />
              </div>
            </div>

            <div className="field">
              <label>Phone</label>
              <div className="input-box">
                <span className="icon"><FaPhone /></span>
                <input type="text" placeholder="+998" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>

            <div className="field">
              <label>Email</label>
              <div className="input-box">
                <span className="icon"><FaEnvelope /></span>
                <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="field">
              <label>Password</label>
              <div className="input-box">
                <span className="icon"><FaLock /></span>
                <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
                <span className="eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="field">
              <label>Website</label>
              <div className="input-box">
                <span className="icon"><FaGlobe /></span>
                <input type="text" placeholder="Website" name="website" value={formData.website} onChange={handleChange} />
              </div>
            </div>

            <div className="field">
              <label>Industry</label>
              <div className="input-box">
                <span className="icon"><FaIndustry /></span>
                <input type="text" placeholder="Industry" name="industry" value={formData.industry} onChange={handleChange} />
              </div>
            </div>

            {/* Country qismi */}
            <div className="field">
              <label>Country</label>
              <div style={{ position: 'relative' }}>
                <span className="icon" style={{ position: 'absolute', zIndex: 1, top: '5px', left: '6px' }}><FaFlag /></span>
                <Select
                  options={countryOptions}
                  placeholder="Select country"
                  value={countryOptions.find(o => o.value === formData.country) || null}
                  onChange={(selected) => handleChange({ target: { name: 'country', value: selected.value } })}
                  styles={customSelectStyles}
                />
              </div>
            </div>

            {/* City qismi */}
            <div className="field">
              <label>City / Region</label>
              <div style={{ position: 'relative' }}>
                <span className="icon" style={{ position: 'absolute', zIndex: 1, top: '5px', left: '6px' }}><FaCity /></span>
                <Select
                  options={formData.country ? locationData[formData.country].map(city => ({ value: city, label: city })) : []}
                  placeholder={formData.country ? "Select city" : "Select country first"}
                  isDisabled={!formData.country}
                  value={formData.city ? { value: formData.city, label: formData.city } : null}
                  onChange={(selected) => handleChange({ target: { name: 'city', value: selected ? selected.value : "" } })}
                  styles={customSelectStyles}
                />
              </div>
            </div>

            <div className="buttons">
              <button type="button" className="btn back" onClick={() => navigate("/")}>Back</button>
              <button type="submit" className="btn next">Next</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    height: '50px',
    borderRadius: '12px',
    border: state.isFocused ? '1px solid #163d5c' : '1px solid #dbe1ea',
    boxShadow: state.isFocused ? '0 0 0 3px rgba(22, 61, 92, 0.1)' : 'none',
    '&:hover': { border: '1px solid #163d5c' },
    paddingLeft: '45px', 
    fontSize: '14px',
    background: '#fff'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#163d5c' : state.isFocused ? '#f1f4f8' : '#fff',
    color: state.isSelected ? '#fff' : '#333',
    cursor: 'pointer',
    '&:active': { backgroundColor: '#163d5c' }
  }),
  placeholder: (provided) => ({ ...provided, color: '#8b8b8b' }),
  menu: (provided) => ({ ...provided, zIndex: 9999 }) // Ro'yxat boshqa elementlar ostida qolib ketmasligi uchun
};

export default Signup;