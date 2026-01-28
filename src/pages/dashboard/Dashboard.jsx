import { useState, useEffect } from "react";
import "./Dashboard.css";
import C from "../dashboard/C.png";
import page1 from "./page1.png";
import page2 from "./page2.png";
import page3 from "./page3.png";
import page4 from "./page4.png";
import page5 from "./page5.png";
import page6 from "./page6.png";
import { NavLink, Outlet } from "react-router-dom";
import { Contact, Instagram, LogOut } from "lucide-react";

const Dashboard = () => {
  const [company, setCompany] = useState({
    name: "",
    city: "",
  });

  useEffect(() => {
    // LocalStorage dan joriy foydalanuvchi emailini olamiz
    const currentUserEmail = localStorage.getItem("email");

    fetch("http://localhost:5000/register/getRegister")
      .then((res) => res.json())
      .then((resp) => {
        // Backend ma'lumotni 'data' obyektida yoki to'g'ridan-to'g'ri massivda qaytarishi mumkin
        const data = resp.data || resp;

        if (Array.isArray(data)) {
          // Faqat joriy foydalanuvchiga tegishli kompaniyani qidiramiz
          const myData = data.find(
            (c) => c.email?.toLowerCase() === currentUserEmail?.toLowerCase()
          );

          if (myData) {
            setCompany({
              name: myData.companyName || "Company Name",
              city: myData.city || "City",
            });
          }
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="company-info">
          <img src={C} alt="Company logo" />
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

          <NavLink to="/" className="menu-item logout">
            <span className="">
              Log Out
              <LogOut />
            </span>
          </NavLink>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
