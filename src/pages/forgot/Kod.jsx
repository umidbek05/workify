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
        text: "Server bilan bog‘lanishda muammo yuz berdi. Backend ishlayotganini tekshiring.",
        confirmButtonColor: "#f39c12",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />

      {/* page wrapper --> min-h-[80vh] flex items-center justify-center bg-[#f9fafb] */}
      <div className="flex-1 flex items-center justify-center bg-[#f9fafb] p-5">
        {/* card container --> max-w-[450px] w-full bg-white p-10 rounded-2xl shadow-sm text-center */}
        <div className="max-w-[450px] w-full bg-white p-10 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] text-center">
          <h1 className="text-[22px] text-[#1a202c] mb-6 font-bold">
            Start our Telegram bot to continue
          </h1>

          <button
            className="bg-[#0088cc] hover:bg-[#0077b5] text-white px-[30px] py-3 rounded-lg text-base cursor-pointer transition-colors duration-300 mb-5"
            onClick={handleClickHere}
          >
            Click here!
          </button>

          <div className="my-5 flex justify-center">
            <img
              src={click}
              alt="preview"
              className="w-full max-w-[250px] rounded-lg"
            />
          </div>

          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            maxLength={6}
            onKeyDown={handleKeyDown}
            className="absolute opacity-0 z-[-1]"
            autoFocus
          />

          {/* Code input boxes */}
          <div
            className="flex gap-2.5 justify-center my-8 cursor-pointer"
            onClick={() => inputRef.current.focus()}
          >
            {code.map((d, i) => (
              <div
                key={i}
                className={`w-[45px] h-[55px] flex items-center justify-center text-2xl font-bold border-2 rounded-[10px] transition-all duration-200 
                  ${
                    d
                      ? "border-[#0088cc] bg-[#f0f9ff]"
                      : "border-[#e2e8f0] bg-white"
                  }`}
              >
                {d}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-[30px]">
            <button
              className="px-[25px] py-3 bg-[#edf2f7] text-[#4a5568] rounded-lg font-semibold hover:bg-[#e2e8f0] transition-colors"
              onClick={() => navigate("/signup")}
            >
              Back
            </button>

            <button
              className="px-[25px] py-3 bg-[#1a202c] text-white rounded-lg font-semibold hover:opacity-90 disabled:bg-[#cbd5e0] disabled:cursor-not-allowed transition-all"
              onClick={handleNext}
              disabled={code.join("").length < 6}
            >
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
