import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";
import Select from "react-select";

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

const locationData = {
  Uzbekistan: [
    "Tashkent city",
    "Andijan",
    "Bukhara",
    "Fergana",
    "Jizzakh",
    "Namangan",
    "Navoi",
    "Kashkadarya",
    "Samarkand",
    "Sirdarya",
    "Surkhandarya",
    "Tashkent region",
    "Khorezm",
    "Karakalpakstan",
  ],
  Kazakhstan: ["Almaty", "Astana", "Shymkent", "Aktobe", "Karaganda"],
  Russia: [
    "Moscow",
    "Saint Petersburg",
    "Novosibirsk",
    "Yekaterinburg",
    "Kazan",
  ],
  Turkey: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"],
  USA: ["New York", "California", "Texas", "Florida", "Illinois"],
  Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"],
  UK: ["London", "Manchester", "Birmingham", "Glasgow", "Liverpool"],
  UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"],
  China: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu"],
  Japan: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Nagoya"],
};

const countryOptions = Object.keys(locationData).map((country) => ({
  value: country,
  label: country,
}));

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("company");

  // TOAST holati (modal o'rniga)
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("signup_form_storage");
    const parsedData = savedData ? JSON.parse(savedData) : null;
    return {
      companyName: parsedData?.companyName || "",
      phone: parsedData?.phone || "+998 ",
      email: parsedData?.email || "",
      password: parsedData?.password || "",
      website: parsedData?.website || "",
      industry: parsedData?.industry || "",
      country: parsedData?.country || "",
      city: parsedData?.city || "",
    };
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Toastni avtomatik yo'qotish mantiqi
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false });
        // Agar muvaffaqiyatli bo'lsa, yo'qolgandan keyin navigate qilish
        if (toast.message === "Form submitted successfully!") {
          navigate("/register");
        }
      }, 1000); // 4 soniyadan keyin yo'qoladi
      return () => clearTimeout(timer);
    }
  }, [toast.show, navigate]);

  const formatPhoneNumber = (value) => {
    if (!value) return "+998 ";
    const phoneNumber = value.replace(/[^\d]/g, "");
    const code = "998";
    let digits = phoneNumber.startsWith(code)
      ? phoneNumber.slice(3)
      : phoneNumber;
    digits = digits.slice(0, 9);
    let formatted = "+998 ";
    if (digits.length > 0) formatted += digits.substring(0, 2);
    if (digits.length >= 3) formatted += "-" + digits.substring(2, 5);
    if (digits.length >= 6) formatted += "-" + digits.substring(5, 7);
    if (digits.length >= 8) formatted += "-" + digits.substring(7, 9);
    return formatted;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = name === "phone" ? formatPhoneNumber(value) : value;
    const updatedData = { ...formData, [name]: newValue };
    if (name === "country") updatedData.city = "";
    setFormData(updatedData);
    localStorage.setItem("signup_form_storage", JSON.stringify(updatedData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Telefon raqami to'liq kiritilganini tekshirish (+998 90-123-45-67 = 17 ta belgi)
    if (formData.phone.length < 17 || !formData.email || !formData.password) {
      setToast({
        show: true,
        message: "Iltimos, barcha maydonlarni to'ldiring!",
        type: "error",
      });
      return;
    }

    fetch(
      "https://workifyback-production.up.railway.app/register/createRegister",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Serverda xatolik");
        return res.json();
      })
      .then((data) => {
        // 1. Eng muhimi: Emailni localStorage ga yozish
        // Ba'zida formData.email emas, serverdan qaytgan data.email ni olish xavfsizroq
        localStorage.setItem("email", formData.email.trim().toLowerCase());

        // 2. Formani tozalash (ixtiyoriy)
        localStorage.removeItem("signup_form_storage");

        setToast({
          show: true,
          message: "Form submitted successfully!",
          type: "success",
        });

        // Toast useEffect ichida navigate qiladi
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        setToast({
          show: true,
          message: "Serverga ulanishda xatolik yuz berdi!",
          type: "error",
        });
      });
  };

  const fieldsToTrack = [
    "companyName",
    "phone",
    "email",
    "website",
    "industry",
    "country",
    "city",
  ];
  const filledFields = fieldsToTrack.filter((f) =>
    f === "phone" ? formData[f].length >= 17 : formData[f]?.trim() !== ""
  ).length;
  const completionPercentage = Math.round(
    (filledFields / fieldsToTrack.length) * 100
  );

  return (
    <div>
      <Header />

      {/* MODERN TOAST NOTIFICATION */}
      {toast.show && (
        <div className={`toast-container ${toast.type}`}>
          <div className="toast-content">
            <div className="toast-icon">
              {toast.type === "success" ? "✓" : "!"}
            </div>
            <div className="toast-message">{toast.message}</div>
          </div>
          <div className="toast-progress"></div>
        </div>
      )}

      <div className="signup-container">
        <div className="signup-box">
          <div
            className="registration-progress"
            style={{ padding: "0 20px 20px 20px", width: "100%" }}
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
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+998 90-123-45-67"
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
              <div style={{ position: "relative" }}>
                <span
                  className="icon"
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    top: "5px",
                    left: "6px",
                  }}
                >
                  <FaFlag />
                </span>
                <Select
                  options={countryOptions}
                  placeholder="Select country"
                  value={
                    countryOptions.find((o) => o.value === formData.country) ||
                    null
                  }
                  onChange={(selected) =>
                    handleChange({
                      target: { name: "country", value: selected.value },
                    })
                  }
                  styles={customSelectStyles}
                />
              </div>
            </div>

            <div className="field">
              <label>City / Region</label>
              <div style={{ position: "relative" }}>
                <span
                  className="icon"
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    top: "5px",
                    left: "6px",
                  }}
                >
                  <FaCity />
                </span>
                <Select
                  options={
                    formData.country
                      ? locationData[formData.country].map((city) => ({
                          value: city,
                          label: city,
                        }))
                      : []
                  }
                  placeholder={
                    formData.country ? "Select city" : "Select country first"
                  }
                  isDisabled={!formData.country}
                  value={
                    formData.city
                      ? { value: formData.city, label: formData.city }
                      : null
                  }
                  onChange={(selected) =>
                    handleChange({
                      target: {
                        name: "city",
                        value: selected ? selected.value : "",
                      },
                    })
                  }
                  styles={customSelectStyles}
                />
              </div>
            </div>

            <div className="buttons">
              <button
                type="button"
                className="btn back"
                onClick={() => navigate("/")}
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
const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    height: "50px",
    borderRadius: "12px",
    border: state.isFocused ? "1px solid #163d5c" : "1px solid #dbe1ea",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(22, 61, 92, 0.1)" : "none",
    "&:hover": { border: "1px solid #163d5c" },
    paddingLeft: "45px",
    fontSize: "14px",
    background: "#fff",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#163d5c"
      : state.isFocused
      ? "#f1f4f8"
      : "#fff",
    color: state.isSelected ? "#fff" : "#333",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "#0b3150",
      color: "#fff",
    },
  }),
  placeholder: (provided) => ({ ...provided, color: "#8b8b8b" }),
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
};

export default Signup;
