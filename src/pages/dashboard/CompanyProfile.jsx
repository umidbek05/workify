import React, { useState, useEffect } from "react";
import "./CompanyProfile.css";
import Update from "./Update"; // Tahrirlash oynasini import qilamiz
import { RiPencilFill } from "react-icons/ri"; // Ikonka uchun

const CompanyProfile = () => {
  const [companyData, setCompanyData] = useState(null);
  const [open, setOpen] = useState(false); // Modal holati

  // Ma'lumotni qayta yuklash funksiyasi (Tahrirlashdan keyin kerak bo'ladi)
  const fetchData = () => {
    const currentUserEmail = localStorage.getItem("email");
    if (!currentUserEmail) return;

    fetch("http://localhost:5000/register/getRegister")
      .then((res) => res.json())
      .then((resp) => {
        const data = resp.data || resp;
        if (Array.isArray(data)) {
          const myData = data.find(
            (c) => c.email?.toLowerCase() === currentUserEmail.toLowerCase()
          );
          if (myData) setCompanyData(myData);
        }
      })
      .catch((err) => console.error("Xatolik:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!companyData) return <div className="loading">Yuklanmoqda...</div>;

  return (
    <div className="company-page">
      <div className="top-bar">
        <input
          type="text"
          placeholder="Company profile"
          className="search-input"
        />
        <button className="post-job-btn">Post a Job</button>
      </div>

      <div className="content">
        <div className="left-card">
          <div className="logo-box">
            <img
              src={companyData.logo || "https://via.placeholder.com/150"}
              alt="Logo"
            />
            {/* Logo tahrirlash tugmasi */}
            <span className="edit-icon" onClick={() => setOpen(true)}>
              ✎
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <h3>{companyData.companyName || "Nomi yo'q"}</h3>
            {/* Asosiy ma'lumotlarni tahrirlash tugmasi */}
            <button className="ichki-btn" onClick={() => setOpen(true)}>
              <RiPencilFill />
            </button>
          </div>

          <p className="subtitle">
            {companyData.industry || "Soha kiritilmagan"}
          </p>

          <div className="company-info">
            <p>
              <b>City:</b> {companyData.city || "N/A"}
            </p>
            <p>
              <b>Country:</b> {companyData.country || "N/A"}
            </p>
            <p>
              <b>Phone:</b> {companyData.phone || "N/A"}
            </p>
            <p>
              <b>Email:</b> {companyData.email || "N/A"}
            </p>
            <p>
              <b>Website:</b> {companyData.website || "N/A"}
            </p>
          </div>
        </div>

        <div className="right-side">
          <div className="stats-card">
            <div className="stat">
              <h2>{companyData.activeJobs || 0}</h2>
              <p>Active jobs</p>
            </div>
            <div className="divider" />
            <div className="stat">
              <h2>{companyData.postedJobs || 0}</h2>
              <p>Posted Jobs</p>
            </div>
            <div className="divider" />
            <div className="stat">
              <h2>{companyData.hiredTalents || 0}</h2>
              <p>Hired talents</p>
            </div>
          </div>

          <div className="about-card">
            <div
              className="about-header"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h3>About company</h3>
              <span className="edit-icon" onClick={() => setOpen(true)}>
                ✎
              </span>
            </div>
            <p>
              {companyData.about || "Kompaniya haqida ma'lumot kiritilmagan..."}
            </p>
          </div>
        </div>
      </div>

      {/* Tahrirlash Modal oynasi */}
      {open && (
        <Update
          setOpen={setOpen}
          currentData={companyData}
          onUpdate={fetchData}
        />
      )}
    </div>
  );
};

export default CompanyProfile;
