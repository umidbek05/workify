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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // Eng muhim nuqta: Bazadagi haqiqiy ID-ni olish
    // Agar currentData._id bo'lmasa, currentData.id ni tekshiramiz
    const realID = currentData?._id || currentData?.id;

    if (!realID) {
      alert("Xatolik: Kompaniya ID-si topilmadi!");
      return;
    }

    const API_URL = `https://workifyback-production.up.railway.app/register/updateRegister/${realID}`;

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Serverdan kelgan javob:", result);
        
        alert("Ma'lumotlar bazaga muvaffaqiyatli yozildi!");
        
        // Asosiy sahifani yangilash
        await onUpdate(); 
        setOpen(false);
      } else {
        alert("Server ma'lumotni qabul qilmadi (404 yoki 500 xatosi)");
      }
    } catch (error) {
      console.error("Fetch xatosi:", error);
      alert("Internet aloqasini tekshiring!");
    }
  };

  return (
    <div className="modal-overlay">
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