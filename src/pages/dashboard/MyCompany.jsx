import { useState, useEffect, useRef, useCallback } from "react";
import TecCells from "./pompany.png";
import "./MyCompany.css";
import Update from "./Update";
import { BsCamera } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";

const BASE_URL = "https://workifyback-production.up.railway.app";

const CompanyProfile = () => {
  const [companyData, setCompanyData] = useState(() => {
    const saved = localStorage.getItem("signup_form_storage");
    return saved
      ? JSON.parse(saved)
      : {
          companyName: "",
          phone: "",
          email: "",
          website: "",
          industry: "",
          country: "",
          city: "",
          about: "",
          logo: "",
        };
  });

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [tempAbout, setTempAbout] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [logo, setLogo] = useState(
    localStorage.getItem("companyLogo") || TecCells
  );

  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const getCorrectUrl = (path) => {
    if (!path) return TecCells;
    if (path.startsWith("blob:") || path.startsWith("data:")) return path;
    let cleanPath = path;
    if (path.includes("localhost:5000")) {
      cleanPath = path.split("/uploads/")[1];
      return `${BASE_URL}/uploads/${cleanPath}`;
    }
    if (!path.startsWith("http"))
      return `${BASE_URL}/${path.replace(/^\//, "")}`;
    return path;
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    const signupData = JSON.parse(
      localStorage.getItem("signup_form_storage") || "{}"
    );
    const rawEmail = localStorage.getItem("email") || signupData.email;

    if (!rawEmail) {
      setLoading(false);
      return;
    }
    const email = rawEmail.trim().toLowerCase();

    try {
      const res = await fetch(
        `${BASE_URL}/register/getRegister?t=${Date.now()}`
      );
      const resp = await res.json();
      const data = resp.data || resp;

      if (Array.isArray(data)) {
        const myCo = data.find(
          (c) => c.email && c.email.trim().toLowerCase() === email
        );

        if (myCo) {
          setCompanyData(myCo);
          const localAbout = localStorage.getItem(`about_${email}`);
          setTempAbout(localAbout !== null ? localAbout : myCo.about || "");

          if (myCo.logo) {
            const finalUrl = getCorrectUrl(myCo.logo);
            setLogo(finalUrl);
            localStorage.setItem("companyLogo", finalUrl);
          }
        }
      }
    } catch (e) {
      console.error("Yuklashda xato:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    window.addEventListener("companyUpdated", fetchData);
    return () => window.removeEventListener("companyUpdated", fetchData);
  }, [fetchData]);

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogo(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${BASE_URL}/uploader/upload`, {
        method: "POST",
        body: formData,
      });
      const uploadData = await res.json();
      const rawPath = uploadData.url || uploadData.image || uploadData.path;
      if (rawPath) {
        const email = localStorage.getItem("email") || companyData.email;
        await fetch(`${BASE_URL}/uploader/save-image`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, logo: rawPath }),
        });
        const finalUrl = getCorrectUrl(rawPath);
        setLogo(finalUrl);
        localStorage.setItem("companyLogo", finalUrl);
        showToast("Logo muvaffaqiyatli yangilandi!");
        fetchData();
      }
    } catch (err) {
      console.error("Logo xatosi:", err);
      setLogo(TecCells);
    }
  };

  // --- TO'G'IRLANGAN VA INTEGRATSIYA QILINGAN HANDLEABOUTUPDATE ---
  const handleAboutUpdate = async () => {
    const email = localStorage.getItem("email") || companyData.email;

    // ID-ni qat'iy tekshirish
    const companyId = companyData?._id || companyData?.id;

    if (!companyId) {
      showToast("ID yuklanmoqda, iltimos qayta urining...");
      await fetchData(); // ID topilmasa, ma'lumotni qayta tortish
      return;
    }

    try {
      localStorage.setItem(`about_${email}`, tempAbout);

      const response = await fetch(
        `${BASE_URL}/register/updateRegister/${companyId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...companyData, about: tempAbout }),
        }
      );

      if (response.ok) {
        showToast("Ma'lumotlar muvaffaqiyatli saqlandi!");
        setCompanyData((prev) => ({ ...prev, about: tempAbout }));
        setOpenAbout(false);
        window.dispatchEvent(new Event("companyUpdated"));
      } else {
        const errJson = await response.json();
        showToast(errJson.message || "Serverda xatolik yuz berdi.");
      }
    } catch (error) {
      console.error("Saqlashda xato:", error);
      showToast("Xatolik: Tarmoqni tekshiring.");
    }
  };

  if (loading && !companyData.companyName) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="main-content-area">
      {toast.show && (
        <div className="custom-toast-overlay">
          <div className="custom-toast-box">{toast.message}</div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleLogoChange}
        style={{ display: "none" }}
        accept="image/*"
      />

      <div className="company-profile-wrapper">
        <div className="company-info-card">
          <button className="edit-profile-btn" onClick={() => setOpen(true)}>
            <RiPencilFill color="#9ca3af" size={20} />
          </button>

          <div className="profile-logo-wrapper">
            <img
              src={logo}
              onError={(e) => {
                if (e.target.src !== TecCells) e.target.src = TecCells;
              }}
              className="main-logo-img"
              alt="Logo"
            />
            <button
              className="edit-logo-btn"
              onClick={() => fileInputRef.current.click()}
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
              <span className="info-label">City:</span>{" "}
              <span className="info-value">{companyData.city || "N/A"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Country:</span>{" "}
              <span className="info-value">{companyData.country || "N/A"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone:</span>{" "}
              <span className="info-value">{companyData.phone || "N/A"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>{" "}
              <span className="info-value">{companyData.email || "N/A"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Website:</span>{" "}
              <span className="info-value">{companyData.website || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className="right-side-layout">
          <div className="stats-card">
            <h3 className="stats-header">Statistics</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <h2>300</h2>
                <p>Active jobs</p>
              </div>
              <div className="stat-box">
                <h2>5210</h2>
                <p>Posted Jobs</p>
              </div>
              <div className="stat-box">
                <h2>56</h2>
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
                {tempAbout !== (companyData.about || "") && (
                  <button
                    className="inline-save-btn"
                    onClick={handleAboutUpdate}
                    style={{
                      backgroundColor: "#1d3f61",
                      color: "white",
                      border: "none",
                      padding: "5px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
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
              onChange={(e) => {
                setTempAbout(e.target.value);
                localStorage.setItem(
                  `about_${localStorage.getItem("email") || companyData.email}`,
                  e.target.value
                );
              }}
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
                background: "transparent",
              }}
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
            <h3>Edit Company Description</h3>
            <textarea
              className="about-modal-textarea"
              value={tempAbout}
              onChange={(e) => setTempAbout(e.target.value)}
              style={{ width: "100%", minHeight: "200px", padding: "10px" }}
            />
            <div className="about-modal-actions">
              <button
                onClick={() => {
                  const oldAbout =
                    localStorage.getItem(
                      `about_${
                        localStorage.getItem("email") || companyData.email
                      }`
                    ) || companyData.about;
                  setTempAbout(oldAbout);
                  setOpenAbout(false);
                }}
                className="btn-cancel"
              >
                Cancel
              </button>
              <button onClick={handleAboutUpdate} className="btn-save">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
