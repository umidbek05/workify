import { useState, useEffect, useRef, useCallback } from "react";
import TecCells from "./pompany.png";
import "./MyCompany.css";
import Update from "./Update";
import { BsCamera } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";

const BASE_URL = "https://workifyback-production.up.railway.app";

const CompanyProfile = () => {
  const [companyData, setCompanyData] = useState({
    companyName: "",
    phone: "",
    email: "",
    website: "",
    industry: "",
    country: "",
    city: "",
    about: "",
    logo: "",
  });

  const [open, setOpen] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [tempAbout, setTempAbout] = useState(""); // Textarea uchun state
  const [logo, setLogo] = useState(TecCells);

  const fileInputRef = useRef(null);

  // 1. MA'LUMOTLARNI YUKLASH
  const fetchData = useCallback(async () => {
    const email = localStorage.getItem("email");
    if (!email) return;

    try {
      // Keshni tozalash uchun t=Date.now()
      const res = await fetch(`${BASE_URL}/register/getRegister?t=${Date.now()}`);
      const resp = await res.json();
      const data = resp.data || resp;

      if (Array.isArray(data)) {
        const myCo = data.find(c => c.email?.toLowerCase() === email.toLowerCase());
        if (myCo) {
          setCompanyData(myCo);
          
          // Agar bazada about bo'sh bo'lsa, localStorage'dan tekshiramiz
          const localAbout = localStorage.getItem(`about_${email}`);
          setTempAbout(myCo.about || localAbout || "");
          
          if (myCo.logo) setLogo(myCo.logo);
        }
      }
    } catch (e) {
      console.error("Yuklashda xato:", e);
    }
  }, []);

  useEffect(() => {
    fetchData();
    window.addEventListener("companyUpdated", fetchData);
    return () => window.removeEventListener("companyUpdated", fetchData);
  }, [fetchData]);

  // 2. LOGO O'ZGARTIRISH
  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${BASE_URL}/uploader/upload`, { method: "POST", body: formData });
      const uploadData = await res.json();
      const rawPath = uploadData.url || uploadData.image || uploadData.path;

      if (rawPath) {
        const email = localStorage.getItem("email");
        await fetch(`${BASE_URL}/uploader/save-image`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, logo: rawPath }),
        });
        setLogo(rawPath);
        localStorage.setItem("companyLogo", rawPath);
        alert("Logo yangilandi!");
        fetchData();
      }
    } catch (err) {
      console.error("Logo xatosi:", err);
    }
  };

  // 3. ABOUT QISMINI SAQLASH (Xatosiz variant)
  const handleAboutUpdate = async () => {
    const email = localStorage.getItem("email");
    const companyId = companyData?._id || companyData?.id;

    if (!companyId) {
      alert("Xatolik: Kompaniya ID topilmadi!");
      return;
    }

    try {
      // Zaxira: LocalStorage'ga yozish (Backend saqlamasa ham refreshda qolishi uchun)
      localStorage.setItem(`about_${email}`, tempAbout);

      // Backendga yuborish
      const response = await fetch(`${BASE_URL}/register/updateRegister/${companyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...companyData,
          about: tempAbout 
        }),
      });

      if (response.ok) {
        alert("Saqlandi!");
        setCompanyData(prev => ({ ...prev, about: tempAbout }));
        setOpenAbout(false);
        window.dispatchEvent(new Event("companyUpdated"));
        await fetchData();
      } else {
        alert("Server saqlamadi, lekin brauzerda vaqtinchalik saqlandi.");
      }
    } catch (error) {
      console.error("Saqlashda xato:", error);
      alert("Tarmoq xatosi!");
    }
  };

  return (
    <div className="main-content-area">
      <input type="file" ref={fileInputRef} onChange={handleLogoChange} style={{ display: "none" }} />
      
      <div className="company-profile-wrapper">
        {/* CHAP TOMON: Profil kartasi */}
        <div className="company-info-card">
          <button className="edit-profile-btn" onClick={() => setOpen(true)}>
            <RiPencilFill color="#9ca3af" size={20} />
          </button>

          <div className="profile-logo-wrapper">
            <img 
              src={logo} 
              onError={(e) => { e.target.src = TecCells; }} 
              className="main-logo-img" 
              alt="Logo" 
            />
            <button className="edit-logo-btn" onClick={() => fileInputRef.current.click()}>
              <BsCamera size={16} />
            </button>
          </div>

          <h1 className="company-name-text">{companyData.companyName || "Company Name"}</h1>
          <p className="industry-text">{companyData.industry || "Industry"}</p>
          <p className="rating-stars">⭐⭐⭐⭐⭐ (4.0) | 1K reviews</p>

          <div className="info-list">
            <h3 className="info-title">Company info:</h3>
            <div className="info-item"><span className="info-label">Since:</span> <span className="info-value">2015</span></div>
            <div className="info-item"><span className="info-label">City:</span> <span className="info-value">{companyData.city || "N/A"}</span></div>
            <div className="info-item"><span className="info-label">Country:</span> <span className="info-value">{companyData.country || "N/A"}</span></div>
            <div className="info-item"><span className="info-label">Phone:</span> <span className="info-value">{companyData.phone || "N/A"}</span></div>
            <div className="info-item"><span className="info-label">Email:</span> <span className="info-value">{companyData.email || "N/A"}</span></div>
            <div className="info-item"><span className="info-label">Website:</span> <span className="info-value">{companyData.website || "N/A"}</span></div>
          </div>
        </div>

        {/* O'NG TOMON: Statistika va About */}
        <div className="right-side-layout">
          <div className="stats-card">
            <h3 className="stats-header">Statistics</h3>
            <div className="stats-grid">
              <div className="stat-box"><h2>300</h2><p>Active jobs</p></div>
              <div className="stat-box"><h2>5210</h2><p>Posted Jobs</p></div>
              <div className="stat-box"><h2>56</h2><p>Hired talents</p></div>
            </div>
          </div>

          <div className="about-card">
            <div className="about-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3>About company</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* Faqat matn o'zgargandagina Save tugmasi chiqadi */}
                {tempAbout !== (companyData.about || "") && (
                  <button className="inline-save-btn" onClick={handleAboutUpdate} style={{ backgroundColor: "#1d3f61", color: "white", border: "none", padding: "5px 12px", borderRadius: "4px", cursor: "pointer" }}>
                    Save Changes
                  </button>
                )}
                <RiPencilFill
                  style={{ cursor: "pointer", color: "#9ca3af" }}
                  onClick={() => setOpenAbout(true)}
                />
              </div>
            </div>

            <textarea
              className="about-direct-input"
              value={tempAbout} 
              onChange={(e) => setTempAbout(e.target.value)} // Bu qator yozishga imkon beradi
              placeholder="Tell us something about your company..."
              style={{
                width: "100%",
                minHeight: "150px",
                border: "none",
                outline: "none",
                fontSize: "16px",
                color: "#4b5563",
                resize: "none",
                marginTop: "15px",
                background: "transparent"
              }}
            />
          </div>
        </div>
      </div>

      {/* MODALLAR */}
      {open && (
        <Update 
          setOpen={setOpen} 
          currentData={companyData} 
          onUpdate={fetchData} 
        />
      )}
      
      {openAbout && (
        <div className="about-modal-overlay">
          <div className="about-modal-content">
            <h3>Edit Company Description</h3>
            <textarea
              className="about-modal-textarea"
              value={tempAbout} 
              onChange={(e) => setTempAbout(e.target.value)}
              placeholder="Write here..."
              style={{ width: "100%", minHeight: "200px", padding: "10px" }}
            />
            <div className="about-modal-actions">
              <button onClick={() => { setTempAbout(companyData.about || ""); setOpenAbout(false); }} className="btn-cancel">Cancel</button>
              <button onClick={handleAboutUpdate} className="btn-save">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;