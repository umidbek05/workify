import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaCalendarAlt,
  FaBuilding,
  FaEye,
  FaEyeSlash,
  FaMale,      // Erkak uchun odamcha
  FaFemale,   // Ayol uchun odamcha (yoki farqliroq user ikonkasi)
} from "react-icons/fa";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";

const UZBEKISTAN_CITIES = [
  "Toshkent shahri", "Toshkent viloyati", "Andijon", "Buxoro", "Farg'ona",
  "Jizzax", "Xorazm", "Namangan", "Navoiy", "Qashqadaryo",
  "Qoraqalpog'iston Respublikasi", "Samarqand", "Sirdaryo", "Surxondaryo",
];

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("talent");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    gender: "male",
    date_of_birth: "",
    location: "",
    phone: "+998",
  });

  // To'ldirilganlik foizini hisoblash
  const fieldsToTrack = ["first_name", "last_name", "email", "password", "location", "date_of_birth"];
  const filledFields = fieldsToTrack.filter((f) => formData[f]?.trim() !== "").length;
  const isPhoneFilled = formData.phone.replace(/[^\d]/g, "").length >= 12;
  const totalFilled = filledFields + (isPhoneFilled ? 1 : 0);
  const completionPercentage = Math.round((totalFilled / (fieldsToTrack.length + 1)) * 100);

  useEffect(() => {
    const savedData = localStorage.getItem("step1_data");
    if (savedData) setFormData(JSON.parse(savedData));

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, "");
    const size = phoneNumber.length;
    if (size <= 3) return `+${phoneNumber}`;
    if (size <= 5) return `+${phoneNumber.slice(0, 3)} (${phoneNumber.slice(3, 5)}`;
    if (size <= 8) return `+${phoneNumber.slice(0, 3)} (${phoneNumber.slice(3, 5)}) ${phoneNumber.slice(5, 8)}`;
    if (size <= 10) return `+${phoneNumber.slice(0, 3)} (${phoneNumber.slice(3, 5)}) ${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8, 10)}`;
    return `+${phoneNumber.slice(0, 3)} (${phoneNumber.slice(3, 5)}) ${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8, 10)}-${phoneNumber.slice(10, 12)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = name === "phone" ? formatPhoneNumber(value.startsWith("+998") ? value : "+998") : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      localStorage.setItem("step1_data", JSON.stringify(formData));
      navigate("/TalentSignup2");
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Toaster position="top-right" />
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-4 md:p-10">
        <div className="w-full max-w-[720px] bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/60 flex flex-col items-center">
          
          {/* Progress Bar */}
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

          {/* Talent / Company Switcher */}
          <div className="flex w-full max-w-[500px] bg-gray-100 p-1.5 rounded-2xl mb-10 h-14">
            <button
              type="button"
              onClick={() => setActiveTab("talent")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl font-semibold transition-all ${
                activeTab === "talent" ? "bg-white text-[#163d5c] shadow-sm" : "text-gray-400"
              }`}
            >
              <FaUser size={18} /> Talent
            </button>
            <button
              type="button"
              onClick={() => navigate("/signup")} // Sahifaga o'tish mantiqi
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl font-semibold transition-all ${
                activeTab === "company" ? "bg-white text-[#163d5c] shadow-sm" : "text-gray-400"
              }`}
            >
              <FaBuilding size={18} /> Company
            </button>
          </div>

          <form onSubmit={handleNext} className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            
            {/* First Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">First name *</label>
              <div className="relative group">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-[#163d5c]">
                  <FaUser />
                </div>
                <input
                  name="first_name" type="text" value={formData.first_name} onChange={handleChange}
                  placeholder="Ismingiz"
                  className="w-full h-[52px] pl-14 pr-4 border border-gray-200 rounded-xl outline-none focus:border-[#163d5c] focus:ring-4 focus:ring-[#163d5c]/5 transition-all text-sm"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">Last name *</label>
              <div className="relative group">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-[#163d5c]">
                  <FaUser />
                </div>
                <input
                  name="last_name" type="text" value={formData.last_name} onChange={handleChange}
                  placeholder="Familiyangiz"
                  className="w-full h-[52px] pl-14 pr-4 border border-gray-200 rounded-xl outline-none focus:border-[#163d5c] focus:ring-4 focus:ring-[#163d5c]/5 transition-all text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">Email address *</label>
              <div className="relative group">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-[#163d5c]">
                  <FaEnvelope />
                </div>
                <input
                  name="email" type="email" value={formData.email} onChange={handleChange}
                  placeholder="example@mail.com"
                  className="w-full h-[52px] pl-14 pr-4 border border-gray-200 rounded-xl outline-none focus:border-[#163d5c] focus:ring-4 focus:ring-[#163d5c]/5 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">Password *</label>
              <div className="relative group">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-[#163d5c]">
                  <FaLock />
                </div>
                <input
                  name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full h-[52px] pl-14 pr-12 border border-gray-200 rounded-xl outline-none focus:border-[#163d5c] transition-all text-sm"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">Phone *</label>
              <div className="relative group">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-[#163d5c]">
                  <FaPhone />
                </div>
                <input
                  name="phone" type="tel" value={formData.phone} onChange={handleChange}
                  className="w-full h-[52px] pl-14 pr-4 border border-gray-200 rounded-xl outline-none focus:border-[#163d5c] transition-all text-sm"
                />
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1.5 relative" ref={dropdownRef}>
              <label className="text-sm font-semibold text-gray-600 ml-1">Location *</label>
              <div className="relative group">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-[#163d5c]">
                  <FaMapMarkerAlt />
                </div>
                <input
                  name="location" type="text" value={formData.location} onFocus={() => setShowDropdown(true)}
                  onChange={(e) => { setFormData({ ...formData, location: e.target.value }); setShowDropdown(true); }}
                  placeholder="Search city..."
                  className="w-full h-[52px] pl-14 pr-4 border border-gray-200 rounded-xl outline-none focus:border-[#163d5c] transition-all text-sm"
                />
              </div>
              {showDropdown && (
                <div className="absolute z-50 w-full top-[75px] bg-white border border-gray-100 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
                  {UZBEKISTAN_CITIES.filter(c => c.toLowerCase().includes(formData.location.toLowerCase())).map((city) => (
                    <div key={city} onClick={() => { setFormData({ ...formData, location: city }); setShowDropdown(false); }}
                      className="p-3 hover:bg-gray-50 cursor-pointer text-sm border-b last:border-0">
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">Date of birth *</label>
              <div className="relative">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-[#163d5c]">
                  <FaCalendarAlt />
                </div>
                <input
                  name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleChange}
                  className="w-full h-[52px] pl-14 pr-4 border border-gray-200 rounded-xl outline-none focus:border-[#163d5c] text-sm"
                />
              </div>
            </div>

            {/* Gender with User Icons */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">Gender</label>
              <div className="flex bg-gray-100 p-1 rounded-xl h-[52px]">
                <button 
                  type="button" 
                  onClick={() => setFormData({ ...formData, gender: "male" })}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all ${
                    formData.gender === "male" 
                      ? "bg-white text-[#163d5c] shadow-sm" 
                      : "text-gray-400"
                  }`}
                >
                  <FaMale size={14} /> Male
                </button>
                <button 
                  type="button" 
                  onClick={() => setFormData({ ...formData, gender: "female" })}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all ${
                    formData.gender === "female" 
                      ? "bg-white text-[#163d5c] shadow-sm" 
                      : "text-gray-400"
                  }`}
                >
                  <FaFemale size={15} /> Female
                </button>
              </div>
            </div>

            {/* Action Buttons */}
{/* Action Buttons - Company qismidagi kabi */}
<div className="md:col-span-2 pt-6 flex flex-row gap-4 w-full">
  <button
    type="button"
    onClick={() => navigate("/")}
    className="flex-1 h-12 border-2 border-[#163d5c] text-[#163d5c] rounded-xl font-bold hover:bg-gray-50 transition-all text-sm"
  >
    Back
  </button>
  <button
    type="submit"
    disabled={isSubmitting}
    className="flex-1 h-12 bg-[#163d5c] text-white rounded-xl font-bold hover:bg-[#1a4d73] shadow-lg shadow-blue-900/10 transition-all text-sm"
  >
    {isSubmitting ? "Processing..." : "Next Step"}
  </button>
</div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}