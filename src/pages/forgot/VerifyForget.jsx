import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import click from "../../assets/click.png";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";
import Swal from "sweetalert2";

function VerifyForget() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const USER_ID = location.state?.userId || 25;
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

  const handleClickHere = () => {
    window.open(`https://t.me/workifyBot_bot?start=${USER_ID}`, "_blank");
    Swal.fire({
      icon: "info",
      title: "Telegram ochildi",
      text: "Botga ulaning va tasdiqlash kodini oling.",
      confirmButtonColor: "#3b82f6",
    });
  };

  const handleNext = async () => {
    const enteredCode = code.join("");

    if (enteredCode.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Diqqat!",
        text: "Iltimos, 6 xonali kodni to‘liq kiriting.",
        confirmButtonColor: "#3b82f6",
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
          navigate("/setpassword", { state: { email: userEmail } });
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Xatolik",
          text: data.message || "Siz kiritgan kod noto‘g‘ri yoki muddati o‘tgan! ❌",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (err) {
      console.error("Xatolik:", err);
      Swal.fire({
        icon: "warning",
        title: "Aloqa uzildi",
        text: "Server bilan bog‘lanishda muammo yuz berdi.",
        confirmButtonColor: "#f59e0b",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Start our Telegram bot to continue
          </h1>

          <button 
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 transform active:scale-95 mb-6 flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
            onClick={handleClickHere}
          >
            <span>Click here!</span>
          </button>

          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center p-4">
              <img src={click} alt="preview" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Yashirin input */}
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            maxLength={6}
            onKeyDown={handleKeyDown}
            className="absolute opacity-0 pointer-events-none"
            autoFocus
          />

          {/* Kod katakchalari */}
          <div 
            className="flex justify-between gap-2 mb-8 cursor-text" 
            onClick={() => inputRef.current.focus()}
          >
            {code.map((d, i) => (
              <div 
                key={i} 
                className={`w-12 h-14 border-2 flex items-center justify-center text-xl font-bold rounded-lg transition-all duration-200 
                  ${d ? "border-blue-500 bg-blue-50 text-blue-600 shadow-md ring-2 ring-blue-100" : "border-gray-200 text-gray-400"}`}
              >
                {d || "•"}
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button 
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition duration-200" 
              onClick={() => navigate(-1)}
            >
              Back
            </button>

            <button 
              className="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition duration-200 shadow-lg shadow-emerald-100 disabled:opacity-50" 
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default VerifyForget;  