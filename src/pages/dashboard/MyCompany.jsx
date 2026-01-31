import { useState, useEffect, useRef } from "react";
import TecCells from "./pompany.png";
import Qalam from "./qalam.png";
import "./MyCompany.css";
import Update from "./Update";

import { BsCamera } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";

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
  const [tempAbout, setTempAbout] = useState("");
  const [customAlert, setCustomAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [logo, setLogo] = useState(() => {
    return localStorage.getItem("companyLogo") || TecCells;
  });

  const fileInputRef = useRef(null);

  const handleEditLogo = () => {
    fileInputRef.current?.click();
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        "https://workifyback-production.up.railway.app/uploader/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const uploadData = await res.json();

      if (uploadData?.url) {
        const imageUrl = uploadData.url;
        const currentUserEmail = localStorage.getItem("email");

        const dbRes = await fetch(
          "https://workifyback-production.up.railway.app/uploader/save-image",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: currentUserEmail, logo: imageUrl }),
          }
        );

        if (dbRes.ok) {
          setLogo(imageUrl);
          setCompanyData((prev) => ({ ...prev, logo: imageUrl }));
          localStorage.setItem("companyLogo", imageUrl);
          alert("Logotip bazaga saqlandi!");
        }
      }
    } catch (err) {
      console.error("Xatolik:", err);
    }
  };

  const showAlert = (msg, type = "success") => {
    setCustomAlert({ show: true, message: msg, type: type });
    // 3 soniyadan keyin o'zi yopiladi
    setTimeout(
      () => setCustomAlert({ show: false, message: "", type: "success" }),
      3000
    );
  };

  // --- YANGILANGAN FETCH LOGIKASI (REFRESH UCHUN) ---
  const fetchData = async () => {
    const currentUserEmail = localStorage.getItem("email");
    if (!currentUserEmail) return;

    try {
      // 1. Register ma'lumotlarini olish
      const regRes = await fetch(
        "https://workifyback-production.up.railway.app/register/getRegister"
      );
      const regResp = await regRes.json();
      const data = regResp.data || regResp;

      if (Array.isArray(data)) {
        const userCompanies = data.filter(
          (c) =>
            c.email?.trim().toLowerCase() ===
            currentUserEmail.trim().toLowerCase()
        );

        if (userCompanies.length > 0) {
          const latestCompany = userCompanies[userCompanies.length - 1];

          // Registerdan kelgan boshlang'ich 'about'
          let finalAbout = latestCompany.about || "";

          // 2. Maxsus About API'dan tekshirish
          try {
            const aboutRes = await fetch(
              `https://workifyback-production.up.railway.app/about/getAbout?email=${currentUserEmail}`
            );
            if (aboutRes.ok) {
              const aboutData = await aboutRes.json();
              // Backend 'text' yoki 'about' maydonida qaytarishi mumkin
              const freshAbout =
                aboutData?.about || aboutData?.text || aboutData?.data?.about;
              if (freshAbout) {
                finalAbout = freshAbout;
              }
            }
          } catch (e) {
            console.log("About API-dan olishda xato, registerdagisi qoladi.");
          }

          // 3. Hamma ma'lumot jam bo'lgach bir marta set qilish
          setCompanyData({ ...latestCompany, about: finalAbout });
          setTempAbout(finalAbout);

          if (latestCompany.logo) {
            setLogo(latestCompany.logo);
          }
        }
      }
    } catch (err) {
      console.error("Ma'lumot yuklashda xatolik:", err);
    }
  };
  // --- YANGILANGAN SAQLASH LOGIKASI ---
  const handleAboutUpdate = async () => {
    // LocalStorage-dan emailni olish
    const currentUserEmail = localStorage.getItem("email");

    // DEBUG: Konsolda email nima kelayotganini ko'rish (Null bo'lsa, LocalStorage-da "email" kaliti yo'q)
    console.log("LocalStorage-dan kelgan email:", currentUserEmail);

    if (!currentUserEmail || currentUserEmail === "null") {
      showAlert(
        "Email topilmadi! Iltimos, profilingizga qayta kiring.",
        "error"
      );
      return;
    }

    try {
      const res = await fetch(
        "https://workifyback-production.up.railway.app/about/createAbout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: currentUserEmail, text: tempAbout }),
        }
      );

      if (res.ok) {
        setCompanyData((prev) => ({ ...prev, about: tempAbout }));
        setOpenAbout(false);
        showAlert("Ma'lumot muvaffaqiyatli saqlandi!", "success");
      } else {
        const errData = await res.json();
        // Agar "email is not allowed" chiqsa, backend validation-da emailga ruxsat berish kerak
        showAlert(errData.message || "Saqlashda xatolik!", "error");
      }
    } catch (err) {
      showAlert("Server bilan aloqa yo'q!", "error");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main-content-area">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleLogoChange}
        style={{ display: "none" }}
      />

      <div className="company-profile-wrapper">
        <div className="company-info-card">
          <button className="edit-profile-btn" onClick={() => setOpen(true)}>
            <RiPencilFill color="#9ca3af" size={20} />
          </button>

          <div className="profile-logo-wrapper">
            <img src={logo} className="main-logo-img" alt="Logo" />
            <button
              className="edit-logo-btn"
              type="button"
              onClick={handleEditLogo}
            >
              <BsCamera size={16} />
            </button>
          </div>

          <h1 className="company-name-text">
            {companyData.companyName || "Company Name"}
          </h1>
          <p className="industry-text">{companyData.industry || "Industry"}</p>
          <p className="rating-stars">⭐⭐⭐⭐⭐ (4.0) | 1K reviews</p>

          <div className="info-list">
            <h3 className="info-title">Company info:</h3>
            <div className="info-item">
              <span className="info-label">Since:</span>
              <span className="info-value">2015</span>
            </div>
            <div className="info-item">
              <span className="info-label">City:</span>
              <span className="info-value">{companyData.city || "N/A"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Country:</span>
              <span className="info-value">{companyData.country || "N/A"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone:</span>
              <span className="info-value">{companyData.phone || "N/A"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{companyData.email || "N/A"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Website:</span>
              <span className="info-value">{companyData.website || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className="right-side-layout">
          <div className="stats-card">
            <h3 className="stats-header">Statistics</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <h2>{companyData.activeJobs || 300}</h2>
                <p>Active jobs</p>
              </div>
              <div className="stat-box">
                <h2>{companyData.postedJobs || 5210}</h2>
                <p>Posted Jobs</p>
              </div>
              <div className="stat-box">
                <h2>{companyData.hiredTalents || 56}</h2>
                <p>Hired talents</p>
              </div>
            </div>
          </div>

          <div className="about-card">
            <div
              className="about-header-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>About company</h3>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {companyData.about !== tempAbout && (
                  <button
                    className="inline-save-btn"
                    onClick={handleAboutUpdate}
                  >
                    Save
                  </button>
                )}
                <RiPencilFill
                  style={{ cursor: "pointer", color: "#9ca3af" }}
                  onClick={() => {
                    setTempAbout(companyData.about || "");
                    setOpenAbout(true);
                  }}
                />
              </div>
            </div>

            <textarea
              className="about-direct-input"
              value={tempAbout}
              onChange={(e) => setTempAbout(e.target.value)}
              placeholder="Please tell us something about your company..."
            />
          </div>
        </div>
      </div>

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
            <h3>Edit About</h3>
            <textarea
              value={tempAbout}
              onChange={(e) => setTempAbout(e.target.value)}
              placeholder="Write about your company..."
            />
            <div className="about-modal-actions">
              <button
                onClick={() => setOpenAbout(false)}
                className="btn-cancel"
              >
                Cancel
              </button>
              <button onClick={handleAboutUpdate} className="btn-save">
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
      {customAlert.show && (
        <div className={`custom-alert-overlay ${customAlert.type}`}>
          <div className="custom-alert-content">
            <div className="alert-icon">
              {customAlert.type === "success" ? "✅" : "❌"}
            </div>
            <p>{customAlert.message}</p>
            <div className="progress-bar"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
