import { useState, useEffect } from "react";
import "./Dashboard.css";
import C from "../dashboard/C.png"; // Bu default rasm bo'lib qoladi
import page1 from "./page1.png";
import page2 from "./page2.png";
import page3 from "./page3.png";
import page4 from "./page4.png";
import page5 from "./page5.png";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { Contact, LogOut, Menu, X } from "lucide-react"; // Menu va X qo'shildi

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menyu holati uchun
  const [company, setCompany] = useState({
    name: "Loading...",
    city: "",
  });

  const [logo, setLogo] = useState(localStorage.getItem("companyLogo") || C);
  const navigate = useNavigate();

  // Menyu ochish/yopish funksiyalari
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const currentUserEmail = localStorage.getItem("email");
    if (!currentUserEmail) return;

    fetch("https://workifyback-production.up.railway.app/register/getRegister")
      .then((res) => res.json())
      .then((resp) => {
        const data = resp.data || resp;
        if (Array.isArray(data)) {
          const myData = data
            .filter(
              (c) => c.email?.toLowerCase() === currentUserEmail?.toLowerCase()
            )
            .pop();

          if (myData) {
            setCompany({
              name: myData.companyName || "No Company Name",
              city: myData.city || "No City",
            });

            if (myData.logo) {
              setLogo(myData.logo);
              localStorage.setItem("companyLogo", myData.logo);
            }
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setCompany({ name: "Error loading", city: "" });
      });
  }, []);

  const handleLogout = () => {
    if (window.confirm("Tizimdan chiqishni xohlaysizmi?")) {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="dashboard">
      {/* Mobil qurilmalar uchun tepa qism (Header) */}
      <header className="mobile-nav">
        <div
          className="mobile-logo"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <img
            src={logo}
            alt="logo"
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span style={{ fontWeight: "600", fontSize: "14px" }}>
            {company.name !== "Loading..." ? company.name : ""}
          </span>
        </div>
        <button
          className="hamburger-btn"
          onClick={toggleMenu}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {isMenuOpen ? (
            <X size={28} color="#1d3f61" />
          ) : (
            <Menu size={28} color="#1d3f61" />
          )}
        </button>
      </header>

      {/* Menyu ochilganda orqa fonni yopish (Overlay) */}
      {isMenuOpen && (
        <div className="sidebar-overlay" onClick={closeMenu}></div>
      )}

      {/* Sidebar - isMenuOpen holatiga qarab 'open' klassi qo'shiladi */}
      <aside className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <div className="company-info">
          <img
            src={logo}
            alt="Company logo"
            className="sidebar-logo"
            onError={(e) => (e.target.src = C)}
          />
          <div className="sidebar-text">
            <h1>{company.name}</h1>
            <p>{company.city}</p>
          </div>
        </div>

        <div className="sidebar-menu">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={closeMenu} // Bosilganda menyu yopiladi
          >
            <img src={page1} alt="Dashboard" />
            <span className="menu-link">Dashboard</span>
          </NavLink>

          <NavLink
            to="companyprofil"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={closeMenu}
          >
            <img src={page2} alt="MyCompany" />
            <span className="menu-link">My company</span>
          </NavLink>

          <NavLink
            to="myjobs"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={closeMenu}
          >
            <img src={page3} alt="myJobs" />
            <span className="menu-link">My jobs</span>
          </NavLink>

          <NavLink
            to="talents"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={closeMenu}
          >
            <img src={page4} alt="Talents" />
            <span className="menu-link">Talents</span>
          </NavLink>

          <NavLink
            to="faq"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={closeMenu}
          >
            <img src={page5} alt="Faq" />
            <span className="menu-link">FAQ</span>
          </NavLink>

          <NavLink
            to="contacts"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={closeMenu}
          >
            <Contact size={22} />
            <span className="menu-link">Contacts</span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="menu-item logout-btn"
            style={{
              background: "none",
              border: "none",
              padding: "12px 20px",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <LogOut size={22} color="red" />
            <span className="menu-link" style={{ color: "red" }}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
