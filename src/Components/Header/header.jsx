import { Link, useNavigate } from "react-router-dom";
import "../Header/header.css";
import "../../Components/Header/header";
import Vector from "../../assets/Vector.png";

import { FiBriefcase } from "react-icons/fi";
export default function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <div className="head">
        <Link to="/">Workify</Link>
      </div>
      <div className="header1">
        <img src={Vector} alt="" />
        <Link to="/talents">Talents</Link>
        <FiBriefcase />
        <Link to="/jobs">Jobs</Link>
      </div>
      <div className="header2">
        <button onClick={() => navigate("/login")}>Sign in</button>
        <button
          onClick={() => {
            navigate("/signup");
          }}
        >
          Join now
        </button>
      </div>
    </header>
  );
}
