import { useState, useEffect, useRef } from "react";
import TecCells from "./pompany.png";
import Qalam from "./qalam.png";
import "./MyCompany.css";

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
      // 1. Rasmni uploaderga yuborish
      const res = await fetch("http://localhost:5000/uploader/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await res.json();

      if (uploadData?.url) {
        const imageUrl = uploadData.url;
        const currentUserEmail = localStorage.getItem("email");

        // 2. PostgreSQL bazasiga rasm URL'ini saqlash
        const dbRes = await fetch(
          "http://localhost:5000/register/updateProfile",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: currentUserEmail,
              logo: imageUrl,
            }),
          }
        );

        if (dbRes.ok) {
          // UI'ni yangilash
          setLogo(imageUrl);
          setCompanyData((prev) => ({ ...prev, logo: imageUrl }));
          localStorage.setItem("companyLogo", imageUrl);
          alert("Logotip bazaga saqlandi va endi o'chib ketmaydi!");
        }
      }
    } catch (err) {
      console.error("Xatolik:", err);
    }
  };
  useEffect(() => {
    const currentUserEmail = localStorage.getItem("email");
    if (!currentUserEmail) return;

    fetch("http://localhost:5000/register/getRegister")
      .then((res) => res.json())
      .then((resp) => {
        const data = resp.data || resp;
        if (Array.isArray(data)) {
          const userCompanies = data.filter(
            (c) =>
              c.email?.trim().toLowerCase() ===
              currentUserEmail.trim().toLowerCase()
          );

          if (userCompanies.length > 0) {
            const latestCompany = userCompanies[userCompanies.length - 1];
            setCompanyData(latestCompany);

            // AGAR BAZADA RASM BO'LSA, UNI O'RNATAMIZ
            if (latestCompany.logo) {
              setLogo(latestCompany.logo);
              localStorage.setItem("companyLogo", latestCompany.logo);
            }
          }
        }
      })
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  return (
    <>
      <div className="top-nav">
        <h1 className="nav-title">Dashboard</h1>
        <div className="nav-actions">
          <button className="post-job-btn">Post a Job</button>
        </div>
      </div>

      <div className="company-main">
        <div className="TecCells">
          <div className="logo-wrapper">
            <img
              src={logo}
              alt="Company Logo"
              className="company-logo"
              onError={(e) => (e.target.src = TecCells)}
            />
            <button className="edit-logo-btn" onClick={handleEditLogo}>
              <img src={Qalam} alt="edit logo" />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleLogoChange}
              hidden
            />
          </div>

          <h1>{companyData.companyName || "No Name Provided"}</h1>
          <h2 className="h22">{companyData.industry || "Industry not set"}</h2>
          <p>4.0 | 1K reviews</p>

          <div className="ichki">
            <h1>Company info:</h1>
            <div className="info-row">
              <p>City:</p> <p>{companyData.city || "N/A"}</p>
            </div>
            <div className="info-row">
              <p>Country:</p> <p>{companyData.country || "N/A"}</p>
            </div>
            <div className="info-row">
              <p>Phone:</p> <p>{companyData.phone || "N/A"}</p>
            </div>
            <div className="info-row">
              <p>Email:</p> <p>{companyData.email || "N/A"}</p>
            </div>
            <div className="info-row">
              <p>Website:</p> <p>{companyData.website || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="Statistcs">
          <h1>Statistics</h1>
          <div className="stats-row">
            <div className="stat-item">
              <h2>{companyData.activeJobs || 0}</h2>
              <p>Active jobs</p>
            </div>
            <div className="stat-item">
              <h2>{companyData.postedJobs || 0}</h2>
              <p>Posted Jobs</p>
            </div>
            <div className="stat-item">
              <h2>{companyData.hiredTalents || 0}</h2>
              <p>Hired talents</p>
            </div>
          </div>
        </div>

        <div className="about-company">
          <div className="about-header">
            <h1>About company</h1>
            <img src={Qalam} alt="edit" className="edit-icon" />
          </div>

          <textarea
            className="about-input"
            // value ni companyData dan oladi
            value={companyData.about || ""}
            placeholder="Please tell us something about your company..."
            // readOnly olib tashlandi, endi yozib bo'ladi
            onChange={(e) =>
              setCompanyData({ ...companyData, about: e.target.value })
            }
          />
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
