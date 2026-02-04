import { useState } from "react";
import "./footer.css";
import Insta from "../../assets/insta.png";
import Face from "../../assets/face.png";
import Youtube from "../../assets/youtube.png";
import Telegram from "../../assets/telegram.png";

export default function Footer() {
  // Qaysi bo'lim ochiqligini saqlash uchun state (boshida hammasi yopiq - null)
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionName) => {
    // Agar bosilgan bo'lim allaqachon ochiq bo'lsa, uni yopadi (null qiladi)
    // Aks holda bosilgan bo'limni ochadi
    setOpenSection(openSection === sectionName ? null : sectionName);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h1>workify</h1>
          <p>Job posting platform</p>
          <button>
            <a href="">Contacts</a>
          </button>
        </div>

        <div className="footer-links">
          {/* General bo'limi */}
          <div className={`link-column ${openSection === "general" ? "active" : ""}`}>
            <h3 onClick={() => toggleSection("general")}>General</h3>
            <ul>
              <a href="/signup">Sign up</a> <br />
              <a href="">Contacts</a> <br />
              <a href="">About</a> <br />
            </ul>
          </div>

          {/* Company bo'limi */}
          <div className={`link-column ${openSection === "company" ? "active" : ""}`}>
            <h3 onClick={() => toggleSection("company")}>Company</h3>
            <ul>
              <a href="">Post a job</a> <br />
              <a href="">Search talents</a> <br />
              <a href="">Company login</a> <br />
            </ul>
          </div>

          {/* Talents bo'limi */}
          <div className={`link-column ${openSection === "talents" ? "active" : ""}`}>
            <h3 onClick={() => toggleSection("talents")}>Talents</h3>
            <ul>
              <a href="">Search jobs</a> <br />
              <a href="">Talent login</a> <br />
            </ul>
          </div>
        </div>
      </div>

      <div className="foot">
        <div className="footer-bottom">
          <p>All rights reserved 2021</p>
        </div>

        <div className="img">
          <img src={Insta} alt="muhiddin_ks" />
          <img src={Face} alt="Facebook" />
          <img src={Youtube} alt="YouTube" />
          <img src={Telegram} alt="Telegram" />
        </div>
      </div>
    </footer>
  );
}