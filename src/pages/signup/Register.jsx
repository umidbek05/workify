import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../pages/signup/Register.css";
import click from "../../assets/click.png";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";
import Swal from "sweetalert2";

function Register() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const USER_ID = location.state?.userId || 25;

  // Keyingi bo'sh katak indeksini aniqlash (vizual fokus uchun)
  const activeIndex = code.findIndex((c) => c === "");

  // Tasdiqlash funksiyasi
  const triggerVerify = async (enteredCode) => {
    Swal.fire({
      title: "Tekshirilmoqda...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await fetch(
        "https://workifybot-production.up.railway.app/verify-code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: USER_ID, code: enteredCode }),
        }
      );

      const data = await res.json();

      if (res.ok && data.valid) {
        Swal.fire({
          icon: "success",
          title: "Tasdiqlandi!",
          text: "Kod to‘g‘ri, xush kelibsiz!",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/congratulation");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Xatolik",
          text: data.message || "Siz kiritgan kod noto‘g‘ri! ❌",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "warning",
        title: "Aloqa uzildi",
        text: "Server bilan bog‘lanishda muammo yuz berdi.",
        confirmButtonColor: "#f39c12",
      });
    }
  };

  // Nusxa ko'chirib qo'yish mantiqi
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").trim();
    const digitsOnly = pasteData.replace(/\D/g, "").slice(0, 6);

    if (digitsOnly.length > 0) {
      const newCode = ["", "", "", "", "", ""];
      digitsOnly.split("").forEach((digit, index) => {
        newCode[index] = digit;
      });
      setCode(newCode);

      if (digitsOnly.length === 6) {
        setTimeout(() => triggerVerify(digitsOnly), 100);
      }
    }
    e.preventDefault();
  };

  const handleKeyDown = (e) => {
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

    if (!/^[0-9]$/.test(e.key)) return;

    const index = code.findIndex((c) => c === "");
    if (index === -1) return;

    const newCode = [...code];
    newCode[index] = e.key;
    setCode(newCode);
  };

  const handleNext = () => {
    const enteredCode = code.join("");
    if (enteredCode.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Diqqat!",
        text: "Iltimos, 6 xonali kodni to‘liq kiriting.",
      });
      return;
    }
    triggerVerify(enteredCode);
  };

  const handleClickHere = () => {
    window.open(`https://t.me/workifyBot_bot?start=${USER_ID}`, "_blank");
  };

  return (
    <div>
      <Header />
      <div className="page">
        <div className="card">
          <h1>Start our Telegram bot to continue</h1>

          <button className="primary" onClick={handleClickHere}>
            Click here!
          </button>

          <div className="image-box">
            <img src={click} alt="preview" />
          </div>

          {/* Yashirin input */}
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            maxLength={6}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            className="hidden-input"
            autoFocus
            style={{ opacity: 0, position: "absolute", zIndex: -1 }}
          />

          {/* Vizual kataklar */}
          <div className="digits" onClick={() => inputRef.current.focus()}>
            {code.map((d, i) => (
              <div 
                key={i} 
                className={`
                  ${d ? "filled" : "empty"} 
                  ${i === activeIndex ? "active-cell" : ""}
                `}
              >
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

export default Register;