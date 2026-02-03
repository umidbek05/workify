import React, { useState } from "react";
import "./Update.css";

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

  // 🔥 Toast (xabarnoma) uchun state
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
      // 🔥 MUHIM: CompanyProfile dagi kabi LocalStorage ni ham yangilash
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
        
        // Ma'lumot yangilangani haqida xabar berish
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
    <div className="modal-overlay">
      {toast.show && (
        <div className="custom-toast-overlay">
          <div className="custom-toast-box">{toast.message}</div>
        </div>
      )}

      <div className="modal-box">
        <button className="close-btn" onClick={() => setOpen(false)}>×</button>
        <h2>Edit Company Details</h2>
        <div className="form-grid">
          <input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company name" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
          <input name="website" value={formData.website} onChange={handleChange} placeholder="Website" />
          <input name="industry" value={formData.industry} onChange={handleChange} placeholder="Industry" />
          <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
          <input name="city" value={formData.city} onChange={handleChange} placeholder="City" />
        </div>
        <textarea name="about" value={formData.about} onChange={handleChange} placeholder="About"></textarea>
        <button className="save-btn" onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default Update;