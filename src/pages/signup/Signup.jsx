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
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const getStoredData = () => {
    try {
      const savedData = localStorage.getItem("signup_form_storage");
      if (savedData) return JSON.parse(savedData);
    } catch (e) {
      console.error("Storage error:", e);
    }
    return {
      companyName: "",
      phone: "+998 ",
      email: "",
      password: "",
      website: "",
      industry: "",
      country: "",
      city: "",
    };
  };

  const [formData, setFormData] = useState(getStoredData());

  useEffect(() => {
    window.scrollTo(0, 0);
    const data = getStoredData();
    setFormData(data);
  }, []);

  useEffect(() => {
    let timer;
    if (toast.show && toast.type === "success") {
      timer = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [toast.show, toast.type]);

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, "");
    if (phoneNumber.length <= 3) return "+998 ";
    let digits = phoneNumber.slice(3, 12);
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

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: newValue };
      if (name === "country") updatedData.city = "";
      localStorage.setItem("signup_form_storage", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.phone.length < 17 ||
      !formData.email ||
      !formData.password ||
      !formData.country
    ) {
      setToast({
        show: true,
        message: "Please fill in all required fields!",
        type: "error",
      });
      return;
    }

    try {
      const response = await fetch(
        "https://workifyback-production.up.railway.app/register/createRegister",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setToast({
          show: true,
          message: "Information saved, proceeding to verification!",
          type: "success",
        });
        localStorage.setItem("email", formData.email);
        setTimeout(() => {
          navigate("/register", {
            state: { userId: result.id, email: formData.email },
          });
        }, 1500);
      } else {
        setToast({
          show: true,
          message: result.message || "Xatolik yuz berdi!",
          type: "error",
        });
      }
    } catch (error) {
      setToast({
        show: true,
        message: "Server bilan aloqa uzildi.",
        type: "error",
      });
    }
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

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "50px",
      borderRadius: "12px",
      border: state.isFocused ? "1px solid #163d5c" : "1px solid #dbe1ea",
      boxShadow: "none",
      "&:hover": { border: "1px solid #163d5c" },
      paddingLeft: "48px", // Cleaned up conflict value
      fontSize: "14px",
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
    }),
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Header />
      {toast.show && (
        <div
          className={`fixed top-10 right-5 md:right-10 z-[10000] min-w-[300px] p-4 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col gap-2 animate-bounce-short border-l-8 ${
            toast.type === "success"
              ? "bg-white/90 border-green-500"
              : "bg-white/90 border-red-500"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                toast.type === "success"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {toast.type === "success" ? "✓" : "!"}
            </div>
            <p className="text-gray-800 font-medium text-sm">{toast.message}</p>
          </div>
          <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full animate-progress ${
                toast.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
          </div>
        </div>
      )}

      <main className="flex-grow flex items-center justify-center p-4 md:p-10">
        <div className="w-full max-w-[720px] bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/60 flex flex-col items-center">
          <div className="w-full mb-8">
            <div className="flex justify-between text-sm font-bold text-gray-500 mb-2">
              <span>Profile Completion</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ease-out ${
                  completionPercentage === 100 ? "bg-green-500" : "bg-[#163d5c]"
                }`}
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="flex w-full max-w-[500px] bg-gray-100 p-1.5 rounded-2xl mb-10 h-14">
            <button
              type="button"
              onClick={() => {
                navigate("/TalentSignup");
              }}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl font-semibold transition-all ${
                activeTab === "talent"
                  ? "bg-white text-[#163d5c] shadow-sm"
                  : "text-gray-400"
              }`}
            >
              <FaUser size={18} /> Talent
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("company");
              }}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl font-semibold transition-all ${
                activeTab === "company"
                  ? "bg-white text-[#163d5c] shadow-sm"
                  : "text-gray-400"
              }`}
            >
              <FaBuilding size={18} /> Company
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">
                {activeTab === "company" ? "Company name" : "Full name"}
              </label>
              <div className="relative group">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-[#163d5c] group-focus-within:bg-blue-50 transition-colors">
                  {activeTab === "company" ? <FaBuilding /> : <FaUser />}
                </div>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder={
                    activeTab === "company" ? "Company name" : "Full name"
                  }
                  className="w-full h-[52px] pl-14 pr-4 border border-gray-200 rounded-xl outline-none focus:border-[#163d5c] focus:ring-4 focus:ring-[#163d5c]/5 transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">
                Phone
              </label>
              <div className="relative group">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-[#163d5c] group-focus-within:bg-blue-50 transition-colors">
                  <FaPhone />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+998 90-123-45-67"
                  className="w-full h-[52px] pl-14 pr-4 border border-gray-200 rounded-xl outline-none focus:border-[#163d5c] focus:ring-4 focus:ring-[#163d5c]/5 transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">
                Email
              </label>
              <div className="relative group">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-[#163d5c] group-focus-within:bg-blue-50 transition-colors">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full h-[52px] pl-14 pr-4 border border-gray-200 rounded-xl outline-none focus:border-[#163d5c] focus:ring-4 focus:ring-[#163d5c]/5 transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-[#163d5c] group-focus-within:bg-blue-50 transition-colors">
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full h-[52px] pl-14 pr-12 border border-gray-200 rounded-xl outline-none focus:border-[#163d5c] focus:ring-4 focus:ring-[#163d5c]/5 transition-all text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#163d5c] hover:opacity-70 transition-opacity"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">
                Website (Optional)
              </label>
              <div className="relative group">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-[#163d5c] group-focus-within:bg-blue-50 transition-colors">
                  <FaGlobe />
                </div>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full h-[52px] pl-14 pr-4 border border-gray-200 rounded-xl outline-none focus:border-[#163d5c] focus:ring-4 focus:ring-[#163d5c]/5 transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">
                Industry
              </label>
              <div className="relative group">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-[#163d5c] group-focus-within:bg-blue-50 transition-colors">
                  <FaIndustry />
                </div>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="e.g. IT, Finance"
                  className="w-full h-[52px] pl-14 pr-4 border border-gray-200 rounded-xl outline-none focus:border-[#163d5c] focus:ring-4 focus:ring-[#163d5c]/5 transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">
                Country
              </label>
              <div className="relative group">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-[#163d5c] z-10 group-focus-within:bg-blue-50 transition-colors pointer-events-none">
                  <FaFlag />
                </div>
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

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">
                City / Region
              </label>
              <div className="relative group">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-[#163d5c] z-10 group-focus-within:bg-blue-50 transition-colors pointer-events-none">
                  <FaCity />
                </div>
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

            <div className="md:col-span-2 flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-6 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full sm:w-[140px] h-12 rounded-xl border border-gray-300 text-[#163d5c] font-bold hover:bg-gray-50 transition-all active:scale-95"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-full sm:w-[140px] h-12 rounded-xl bg-[#163d5c] text-white font-bold shadow-lg shadow-[#163d5c]/20 hover:bg-[#1e5078] transition-all active:scale-95"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
      <style>{`
        @keyframes progress { from { width: 100%; } to { width: 0%; } }
        .animate-progress { animation: progress 1.5s linear forwards; }
        @keyframes bounce-short { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-bounce-short { animation: bounce-short 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default Signup;
