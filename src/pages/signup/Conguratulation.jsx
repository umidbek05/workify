import React from "react";
import "../../pages/signup/Conguratulation.css";
import congra from "../../assets/Conguratulation.png";

function Congratulation() {
  return (
    <div className="congrats-wrapper">
      <div className="congrats-card">
        <h1>Congratulations!</h1>
        <p>Registration successful! Welcome to Workify!</p>

        <img src={congra} alt="Congratulations" />

        <button className="dashboard-btn">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Congratulation;
