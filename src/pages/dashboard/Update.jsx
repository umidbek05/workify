import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const Update = ({ setOpen, currentData, onUpdate }) => {
  const [formData, setFormData] = useState({
    companyName: currentData?.companyName || "",
    phone: currentData?.phone || "",
    website: currentData?.website || "",
    industry: currentData?.industry || "",
    country: currentData?.country || "",
    city: currentData?.city || "",
    about: currentData?.about || "",
  });

  const [toast, setToast] = useState({ show: false, message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const handleSave = async () => {
    const realID = currentData?._id || currentData?.id;
    if (!realID) {
      showToast("Xatolik: ID topilmadi!");
      return;
    }

    const API_URL = `https://workifyback-production.up.railway.app/register/updateRegister/${realID}`;

    try {
      const email = localStorage.getItem("email");
      if (email) {
        localStorage.setItem(`about_${email}`, formData.about);
      }

      const response = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showToast("Ma'lumotlar saqlandi! ✅");
        window.dispatchEvent(new Event("companyUpdated"));
        setTimeout(async () => {
          await onUpdate();
          setOpen(false);
        }, 800);
      } else {
        showToast("Serverda xatolik! ❌");
      }
    } catch (error) {
      console.error("Xato:", error);
      showToast("Internetni tekshiring!");
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm p-4">
      {toast.show && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[1000] bg-white shadow-2xl rounded-xl px-6 py-3 border-l-4 border-green-500">
          <p className="text-gray-800 font-medium">{toast.message}</p>
        </div>
      )}

      {/* Modal Box - Ixchamlashtirilgan o'lchamlar */}
      <div className="bg-white w-full max-w-[700px] rounded-[25px] shadow-2xl relative p-6 md:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:bg-gray-100 rounded-full transition-all"
          onClick={() => setOpen(false)}
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-[24px] font-bold text-[#444] text-center mb-6">
          Edit Company details
        </h2>

        {/* Grid - gap kamaytirildi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {[
            { label: "Company name", name: "companyName", placeholder: "Name" },
            { label: "Phone", name: "phone", placeholder: "Phone" },
            { label: "Website", name: "website", placeholder: "Website" },
            { label: "Industry", name: "industry", placeholder: "Industry" },
            { label: "Country", name: "country", placeholder: "Country" },
            { label: "City", name: "city", placeholder: "City" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col gap-1">
              <label className="text-[14px] font-semibold text-[#666] ml-1">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full h-[45px] px-4 rounded-[12px] border border-gray-200 bg-[#fcfcfc] outline-none focus:border-[#82C6A0] transition-all text-[15px] text-gray-700"
              />
            </div>
          ))}
        </div>

        {/* About Section - Balandlik kamaytirildi */}
        <div className="mt-4 flex flex-col gap-1">
          <label className="text-[14px] font-semibold text-[#666] ml-1">
            About
          </label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="Tell us about your company..."
            className="w-full h-[120px] p-4 rounded-[15px] border border-gray-200 bg-[#fcfcfc] outline-none focus:border-[#82C6A0] transition-all text-[15px] text-gray-700 resize-none"
          ></textarea>
        </div>

        {/* Save Button - Ixchamroq */}
        <div className="mt-6 flex justify-center">
          <button
            className="w-full md:w-[200px] h-[50px] bg-[#82C6A0] text-white text-[16px] font-bold rounded-[12px] shadow-md hover:bg-[#72b58f] active:scale-95 transition-all"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
