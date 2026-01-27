import { Link } from "react-router-dom";
import { useState } from "react";
import "../Header/header.css";
import "../../Components/Header/header"
import Vector from "../../assets/Vector.png";
import Base from "../../assets/Base.png";

export default function Header() {
  const [language, setLanguage] = useState("EN"); 

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
      <div className="header">
        <div className="head">
        <Link to="/">Workify</Link>
        </div>
        <div className="header1">
          <img src={Vector} alt="" />
          <Link to="/talents">Talents</Link>
          <img src={Base} alt="" />
          <Link to="/jobs">Jobs</Link>
          </div>
          <div className="header2">
          <button>SignIn</button>
          <button><Link to="/signup" className="linkk">Join now</Link></button>
          
          <select
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="EN">Eng</option>
            <option value="Ru">Rus</option>
            <option value="UZ">Uzb</option>
          </select>
          </div>
      </div>
      
    
    
  );
}
