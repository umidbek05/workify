import { useState, useEffect, useCallback } from "react";
import "./Dashboard.css";
import C from "../dashboard/C.png"; 
import page1 from "./page1.png";
import page2 from "./page2.png";
import page3 from "./page3.png";
import page4 from "./page4.png";
import page5 from "./page5.png";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { Contact, LogOut, Menu, X } from "lucide-react";

const BASE_URL = "https://workifyback-production.up.railway.app";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const [company, setCompany] = useState({
    name: "Loading...",
    city: "",
  });
  const [logo, setLogo] = useState(localStorage.getItem("companyLogo") || C);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const fetchData = useCallback(async () => {
    const currentUserEmail = localStorage.getItem("email");
    if (!currentUserEmail) return;

    try {
      const res = await fetch(`${BASE_URL}/register/getRegister?t=${Date.now()}`);
      const resp = await res.json();
      const data = resp.data || resp;

      if (Array.isArray(data)) {
        const myData = data.find(
          (c) => c.email?.toLowerCase() === currentUserEmail?.toLowerCase()
        );

        if (myData) {
          setCompany({
            name: myData.companyName || "No Company Name",
            city: myData.city || "No City",
          });

          if (myData.logo) {
            // 🔥 MUHIM: Localhost yoki noto'g'ri yo'lni tozalab, Railway manzilini qo'yamiz
            let cleanPath = myData.logo;
            if (cleanPath.includes("/uploads/")) {
              cleanPath = "uploads/" + cleanPath.split("/uploads/")[1];
            }
            
            const finalLogo = `${BASE_URL}/${cleanPath.replace(/^\//, "")}`;
            
            setLogo(finalLogo);
            localStorage.setItem("companyLogo", finalLogo);
          }
        }
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setCompany({ name: "Error loading", city: "" });
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Boshqa sahifadan (CompanyProfile) rasm o'zgarganda Dashboard ham yangilanishi uchun
    window.addEventListener("companyUpdated", fetchData);
    return () => {
      window.removeEventListener("companyUpdated", fetchData);
    };
  }, [fetchData]);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    closeMenu();
  };

  const confirmLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="dashboard">
      <header className="mobile-nav">
        <div className="mobile-logo" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={logo}
            alt="logo"
            style={{ width: "35px", height: "35px", borderRadius: "50%", objectFit: "cover" }}
            onError={(e) => {
              if (e.target.src !== C) e.target.src = C;
            }}
          />
          <span style={{ fontWeight: "600", fontSize: "14px" }}>
            {company.name !== "Loading..." ? company.name : ""}
          </span>
        </div>
        <button className="hamburger-btn" onClick={toggleMenu} style={{ background: "none", border: "none", cursor: "pointer" }}>
          {isMenuOpen ? <X size={28} color="#1d3f61" /> : <Menu size={28} color="#1d3f61" />}
        </button>
      </header>

      {isMenuOpen && <div className="sidebar-overlay" onClick={closeMenu}></div>}

      <aside className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <div className="company-info">
          <img 
            src={logo} 
            alt="Company logo" 
            className="sidebar-logo" 
            onError={(e) => {
              if (e.target.src !== C) e.target.src = C;
            }} 
          />
          <div className="sidebar-text">
            <h1>{company.name}</h1>
            <p>{company.city}</p>
          </div>
        </div>

        <div className="sidebar-menu">
          <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "menu-item active" : "menu-item"} onClick={closeMenu}>
            <img src={page1} alt="Dashboard" />
            <span className="menu-link">Dashboard</span>
          </NavLink>

          <NavLink to="companyprofil" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"} onClick={closeMenu}>
            <img src={page2} alt="MyCompany" />
            <span className="menu-link">My company</span>
          </NavLink>

          <NavLink to="myjobs" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"} onClick={closeMenu}>
            <img src={page3} alt="myJobs" />
            <span className="menu-link">My jobs</span>
          </NavLink>

          <NavLink to="talents" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"} onClick={closeMenu}>
            <img src={page4} alt="Talents" />
            <span className="menu-link">Talents</span>
          </NavLink>

          <NavLink to="faq" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"} onClick={closeMenu}>
            <img src={page5} alt="Faq" />
            <span className="menu-link">FAQ</span>
          </NavLink>

          <NavLink to="contacts" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"} onClick={closeMenu}>
            <Contact size={22} />
            <span className="menu-link">Contacts</span>
          </NavLink>

          <button onClick={handleLogoutClick} className="menu-item logout-btn" style={{ background: "none", border: "none", padding: "12px 20px", cursor: "pointer", width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: "12px" }}>
            <LogOut size={22} color="red" />
            <span className="menu-link" style={{ color: "red" }}>Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>

      {showLogoutModal && (
        <div className="custom-modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Chiqishni tasdiqlaysizmi?</h3>
            <p>Haqiqatan ham profilingizdan chiqmoqchimisiz?</p>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowLogoutModal(false)}>
                Bekor qilish
              </button>
              <button className="modal-btn confirm" onClick={confirmLogout}>
                Ha, chiqish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;