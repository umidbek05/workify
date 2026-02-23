import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../pages/forgot/Kod.css";
import click from "../../assets/click.png";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";

function Kod() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const USER_ID = 25;

  const handleKeyDown = (e) => {
    if (!/^[0-9]$/.test(e.key) && e.key !== "Backspace") return;

    if (e.key === "Backspace") {
      const newCode = [...code];
      for (let i = 5; i >= 0; i--) {
        if (newCode[i]) {
          newCode[i] = "";
          break;
        }
      }
      setCode(newCode);
      return;
    }

    const index = code.findIndex((c) => c === "");
    if (index === -1) return;

    const newCode = [...code];
    newCode[index] = e.key;
    setCode(newCode);
  };

  // Telegram ochish
  const handleClickHere = () => {
    window.open(`https://t.me/workifyBot_bot?start=${USER_ID}`, "_blank");
    alert("Telegram ochildi! 🔐 Botga ulaning va code ni oling.");
  };

  // Next tugma → code verify
  const handleNext = async () => {
    const enteredCode = code.join("");
    try {
      




      const res = await fetch("http://localhost:3000/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: USER_ID, code: enteredCode }),
      });

      const data = await res.json();

      if (data.valid) {
        navigate("/congratulation");
      } else {
        alert("❌ Kod noto‘g‘ri");
      }
    } catch (err) {
      console.error(err);
      alert("Server bilan bog‘lanib bo‘lmadi");
    }
  };

  return (
    <div>
      <Header /> 
      <div className="page">
        <div className="card">
          <h1>Start our Telegram bot to continue</h1>

          <button className="primary" onClick={handleClickHere}>
            Click here
          </button>

          <div className="image-box">
            <img src={click} alt="preview" />
          </div>

          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            maxLength={6}
            onKeyDown={handleKeyDown}
            className="hidden-input"
            autoFocus
          />

          <div className="digits" onClick={() => inputRef.current.focus()}>
            {code.map((d, i) => (
              <div key={i} className={d ? "filled" : "empty"}>
                {d}
              </div>
            ))}
          </div>

          <div className="nav-buttons">
            <button className="back" onClick={() => navigate("/signup")}>
              Back
            </button>

            <button className="next" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Kod;
