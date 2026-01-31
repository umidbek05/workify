import React from "react";
import "../../pages/signup/Conguratulation.css";
import congra from "../../assets/Conguratulation.png";

import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/footer";
import Header from "../../Components/Header/header";

function Congratulation() {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="congrats-wrapper">
        <div className="congrats-card">
          <h1>Congratulations!</h1>
          <p>Registration successful! Welcome to Workify!</p>

          <img src={congra} alt="Congratulations" />

          <button
            className="dashboard-btn"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Congratulation;
