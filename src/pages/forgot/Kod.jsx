import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import click from "../../assets/click.png";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";
import Swal from "sweetalert2";

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
          text: data.message || "Siz kiritgan kod noto‘g‘ri yoki muddati o‘tgan! ❌",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (err) {
      console.error("Xatolik tafsiloti:", err);
      Swal.fire({
        icon: "warning",
        title: "Aloqa uzildi",
        text: "Server bilan bog‘lanishda muammo yuz berdi.",
        confirmButtonColor: "#f59e0b",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-[450px] w-full bg-white p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Start our Telegram bot to continue
          </h1>

          <button 
            className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white font-semibold py-4 rounded-xl transition duration-300 transform active:scale-95 mb-8 shadow-lg shadow-blue-100"
            onClick={handleClickHere}
          >
            Click here!
          </button>

          <div className="flex justify-center mb-8">
            <div className="relative w-40 h-40 bg-blue-50 rounded-full flex items-center justify-center">
              <img src={click} alt="preview" className="w-24 h-24 object-contain" />
            </div>
          </div>

          {/* Hidden input for handling typing */}
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            maxLength={6}
            onKeyDown={handleKeyDown}
            className="absolute opacity-0 pointer-events-none"
            autoFocus
          />

          {/* Visual code boxes */}
          <div 
            className="flex gap-3 justify-center mb-10 cursor-text" 
            onClick={() => inputRef.current.focus()}
          >
            {code.map((d, i) => (
              <div 
                key={i} 
                className={`w-12 h-16 flex items-center justify-center text-2xl font-bold border-2 rounded-xl transition-all duration-200 
                  ${d ? "border-blue-500 bg-blue-50 text-blue-600 ring-4 ring-blue-50" : "border-gray-200 text-gray-400"}`}
              >
                {d || "•"}
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button 
              className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition duration-200" 
              onClick={() => navigate("/signup")}
            >
              Back
            </button>

            <button 
              className={`flex-1 py-4 font-bold rounded-xl transition duration-200 shadow-md 
                ${code.join("").length === 6 
                  ? "bg-gray-900 text-white hover:bg-black shadow-gray-200" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"}`} 
              onClick={handleNext}
              disabled={code.join("").length < 6}
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

export default Kod;