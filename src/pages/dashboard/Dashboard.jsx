import { useState, useEffect } from "react";
import "./Dashboard.css";
import C from "../dashboard/C.png"; // Bu default rasm bo'lib qoladi
import page1 from "./page1.png";
import page2 from "./page2.png";
import page3 from "./page3.png";
import page4 from "./page4.png";
import page5 from "./page5.png";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { Contact, LogOut } from "lucide-react";

const Dashboard = () => {
  const [company, setCompany] = useState({
    name: "Loading...", // Yuklanish holati uchun
    city: "",
  });

  const [logo, setLogo] = useState(localStorage.getItem("companyLogo") || C);

  useEffect(() => {
    const currentUserEmail = localStorage.getItem("email");

    if (!currentUserEmail) return;

    fetch("http://localhost:5000/register/getRegister")
      .then((res) => res.json())
      .then((resp) => {
        const data = resp.data || resp;

        if (Array.isArray(data)) {
          // Emaili mos keladigan oxirgi ro'yxatdan o'tgan ma'lumotni olamiz
          const myData = data
            .filter(
              (c) => c.email?.toLowerCase() === currentUserEmail?.toLowerCase()
            )
            .pop(); // Eng oxirgi qo'shilgan ma'lumotni olish

          if (myData) {
            setCompany({
              // Bu yerda bazadagi ustun nomi 'companyName' ekanligiga e'tibor bering
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

  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Tizimdan chiqishni xohlaysizmi?")) {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/", { replace: true });
    } 
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="company-info">
          {/* 3. Bu yerda statik 'C' emas, 'logo' statini ishlatamiz */}
          <img
            src={logo}
            alt="Company logo"
            className="sidebar-logo"
            onError={(e) => (e.target.src = C)} // Rasm yuklanmasa default rasmga qaytadi
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
          >
            <img src={page1} alt="Dashboard" />
            <span className="menu-link">Dashboard</span>
          </NavLink>

          <NavLink
            to="companyprofil"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <img src={page2} alt="MyCompany" />
            <span className="menu-link">My company</span>
          </NavLink>

          <NavLink
            to="myjobs"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <img src={page3} alt="myJobs" />
            <span className="menu-link">My jobs</span>
          </NavLink>

          <NavLink
            to="talents"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <img src={page4} alt="Talents" />
            <span className="menu-link">Talents</span>
          </NavLink>

          <NavLink
            to="faq"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <img src={page5} alt="Faq" />
            <span className="menu-link">FAQ</span>
          </NavLink>

          <NavLink to="contacts" className="menu-item">
            <Contact />
            <span className="menu-link">Contacts</span>
          </NavLink>

          {/* Logout tugmasini ham qo'shib qo'ydim */}
          <button
            onClick={handleLogout}
            className="menu-item logout-btn"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
            }}
          >
            <span className="menu-link" style={{ color: "red" }}>
              Logout
              <LogOut className="logg" />
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
