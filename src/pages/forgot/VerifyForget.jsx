import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../pages/signup/Register.css";
import click from "../../assets/click.png";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";
import Swal from "sweetalert2";

function VerifyForget() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Signup yoki Forget sahifasidan kelgan userId ni olamiz, default 25
  const USER_ID = location.state?.userId || 25;
  // Emailni ham statsdan yoki localStoragedan olamiz
  const userEmail = location.state?.email || localStorage.getItem("resetEmail");

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

  // BOT MANZILI ENDI REGISTER BILAN BIR XIL
  const handleClickHere = () => {
    window.open(`https://t.me/workifyBot_bot?start=${USER_ID}`, "_blank");
    Swal.fire({
      icon: "info",
      title: "Telegram ochildi",
      text: "Botga ulaning va tasdiqlash kodini oling.",
      confirmButtonColor: "#3085d6",
    });
  };

  const handleNext = async () => {
    const enteredCode = code.join("");

    if (enteredCode.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Diqqat!",
        text: "Iltimos, 6 xonali kodni to‘liq kiriting.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

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
          // Yuborilayotgan ma'lumot ham bir xil (user_id bo'yicha)
          body: JSON.stringify({ user_id: USER_ID, code: enteredCode }),
        }
      );

      const data = await res.json();

      if (res.ok && data.valid) {
        Swal.fire({
          icon: "success",
          title: "Tasdiqlandi!",
          text: "Kod to‘g‘ri, endi yangi parol o‘rnating!",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          // FARQI: Forget bo'lgani uchun parolni o'zgartirishga o'tadi
          navigate("/setpassword", { state: { email: userEmail } });
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Xatolik",
          text:
            data.message ||
            "Siz kiritgan kod noto‘g‘ri yoki muddati o‘tgan! ❌",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      console.error("Xatolik:", err);
      Swal.fire({
        icon: "warning",
        title: "Aloqa uzildi",
        text: "Server bilan bog‘lanishda muammo yuz berdi.",
        confirmButtonColor: "#f39c12",
      });
    }
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

          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            maxLength={6}
            onKeyDown={handleKeyDown}
            className="hidden-input"
            autoFocus
            style={{ opacity: 0, position: "absolute", zIndex: -1 }}
          />

          <div className="digits" onClick={() => inputRef.current.focus()}>
            {code.map((d, i) => (
              <div key={i} className={d ? "filled" : "empty"}>
                {d}
              </div>
            ))}
          </div>

          <div className="nav-buttons">
            <button className="back" onClick={() => navigate(-1)}>
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

export default VerifyForget;
