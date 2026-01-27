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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // faqat shu 3 tasi majburiy
    if (!formData.phone || !formData.email || !formData.password) {
      alert("Phone, Email va Password majburiy!");
      return;
    }

    fetch("http://localhost:3000/register/createRegister", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Form submitted successfully!");
        navigate("/register");
      })
      .catch(() => alert("Something went wrong!"));
  };

  return (
    <div>
      <Header />

      <div className="signup-container">
        <div className="signup-box">

          <div className="tabs">
            <button
              type="button"
              className={`tab ${activeTab === "talent" ? "active" : ""}`}
              onClick={() => setActiveTab("talent")}
            >
              <FaUser /> Talent
            </button>
            <button
              type="button"
              className={`tab ${activeTab === "company" ? "active" : ""}`}
              onClick={() => setActiveTab("company")}
            >
              <FaBuilding /> Company
            </button>
          </div>

          <form className="form" onSubmit={handleSubmit}>

            <div className="input-box">
              <FaBuilding />
              <input
                name="companyName"
                placeholder="Company name"
                onChange={handleChange}
              />
            </div>  

            <div className="input-box">
              <FaPhone />
              <input
                name="phone"
                placeholder="+998"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <FaEnvelope />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <FaLock />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="input-box">
              <FaGlobe />
              <input
                name="website"
                placeholder="Website"
                onChange={handleChange}
              />
            </div>

            <div className="input-box">
              <FaIndustry />
              <input
                name="industry"
                placeholder="Industry"
                onChange={handleChange}
              />
            </div>
              

            <div className="input-box">
              <FaFlag />
              <select name="country" onChange={handleChange}>
                <option value="">Select country</option>
                <option>Uzbekistan</option>
                <option>Kazakhstan</option>
                <option>Russia</option>
              </select>
            </div>

            <div className="input-box">
              <FaCity />
              <select name="city" onChange={handleChange}>
                <option value="">Select city</option>
                <option>Tashkent</option>
                <option>Samarkand</option>
                <option>Bukhara</option>
              </select>
            </div>

            <div className="buttons">
              <button type="button" className="btn back">Back</button>
              <button type="submit" className="btn next">Next</button>
            </div>

          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;
