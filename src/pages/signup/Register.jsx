import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

  // Telegramdan nusxa olingan kodni paste qilish (vositachi input orqali)
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasteData)) {
      setCode(pasteData.split(""));
    }
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
          text:
            data.message ||
            "Siz kiritgan kod noto‘g‘ri yoki muddati o‘tgan! ❌",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      console.error("Xatolik tafsiloti:", err);
      Swal.fire({
        icon: "warning",
        title: "Aloqa uzildi",
        text: "Server bilan bog‘lanishda muammo yuz berdi.",
        confirmButtonColor: "#f39c12",
      });
    }
  };

  // Faol katakni aniqlash (border yonishi uchun)
  const activeIndex = code.findIndex((c) => c === "");

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f4ef]">
      <Header />

      <main className="flex-grow flex items-center justify-center p-5">
        <div className="w-full max-w-[520px] bg-white p-8 md:p-10 rounded-[24px] shadow-sm text-center">
          <h1 className="text-[18px] md:text-[20px] font-semibold text-gray-800 mb-6 leading-relaxed">
            Start our Telegram bot to continue
          </h1>

          <button
            type="button"
            className="bg-[#58b97c] text-white px-6 py-2.5 rounded-lg text-sm font-semibold mb-7 hover:bg-[#4a9f6a] transition-colors active:scale-95"
            onClick={handleClickHere}
          >
            Click here!
          </button>

          <div className="flex justify-center mb-7">
            <img
              src={click}
              alt="preview"
              className="w-[200px] md:w-[260px] object-contain"
            />
          </div>

          {/* Hidden Input for Keyboard and Paste */}
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            className="absolute opacity-0 pointer-events-none"
            autoFocus
          />

          {/* Verification Code Digits */}
          <div
            className="flex justify-center gap-2 md:gap-3.5 mb-8 cursor-text"
            onClick={() => inputRef.current.focus()}
          >
            {code.map((d, i) => {
              // Katak qachon yonishi kerak:
              // 1. Agar u birinchi bo'sh katak bo'lsa
              // 2. Agar hamma katak to'la bo'lsa va bu oxirgi katak bo'lsa
              const isActive =
                i === activeIndex || (activeIndex === -1 && i === 5);

              return (
                <div
                  key={i}
                  className={`w-10 h-12 md:w-[52px] md:h-[52px] rounded-xl flex items-center justify-center text-xl font-bold transition-all border-2
                    ${
                      d
                        ? "bg-[#f1f3f6] border-[#58b97c] text-gray-700" // To'lgan katak
                        : isActive
                        ? "bg-white border-[#58b97c] shadow-[0_0_8px_rgba(88,185,124,0.4)]" // Faol katak (yonishi)
                        : "bg-white border-gray-200 text-gray-400" // Bo'sh katak
                    }`}
                >
                  {d}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-center gap-4">
            <button
              type="button"
              className="w-full sm:w-[120px] h-11 rounded-xl border border-gray-300 bg-white text-gray-600 font-semibold hover:bg-gray-50 transition-all active:scale-95"
              onClick={() => navigate(-1)}
            >
              Back
            </button>

            <button
              type="button"
              className="w-full sm:w-[120px] h-11 rounded-xl bg-[#0f2a44] text-white font-semibold hover:bg-[#1a3a5a] transition-all active:scale-95 shadow-md shadow-[#0f2a44]/10"
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

export default Register;
