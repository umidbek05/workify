import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import click from "../../assets/click.png";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function TalentVerifyCode() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Foydalanuvchi ID sini aniqlash
  const USER_ID = location.state?.userId || 25;
  const activeIndex = code.findIndex((c) => c === "");

  // 1-FUNKSIYA: Telegram botdan kelgan kodni avtomatik tekshirish
  const triggerVerify = async (enteredCode) => {
    Swal.fire({
      title: "Kod tekshirilmoqda...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch("https://workifybot-production.up.railway.app/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          user_id: Number(USER_ID), 
          code: String(enteredCode) 
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.valid) {
        Swal.fire({
          icon: "success",
          title: "Tasdiqlandi!",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => navigate("/talentCongratulation"));
      } else {
        Swal.fire({
          icon: "error",
          title: "Xatolik",
          text: data.message || data.error || "Kod noto‘g‘ri yoki muddati o‘tgan! ❌",
        });
      }
    } catch (err) {
      console.error("Verify Error:", err);
      Swal.fire({ icon: "warning", title: "Aloqa uzildi", text: "Server bilan bog‘lanishda xato." });
    }
  };

  // 2-FUNKSIYA: "Next" tugmasi bosilganda ro'yxatdan o'tishni yakunlash
  const handleNext = async () => {
    const finalCode = code.join("");
    if (finalCode.length < 6) {
      toast.warning("Iltimos, 6 xonali kodni to'liq kiriting");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://workifybot-production.up.railway.app/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: USER_ID, code: finalCode }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz! 🎉");
        setTimeout(() => navigate("/congratulation"), 1500);
      } else {
        // "Backend error: undefined" xatosini oldini olish mantiqi
        const serverError = data.message || data.error || "Server ma'lumotni qabul qilmadi.";
        throw new Error(serverError);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(`Xatolik: ${error.message || "Ulanish muammosi"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Input boshqaruvi (Klaviatura)
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

    if (index === 5) {
      const fullCode = newCode.join("");
      setTimeout(() => triggerVerify(fullCode), 200);
    }
  };

  // Nusxa olish (Paste)
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").trim();
    const digitsOnly = pasteData.replace(/\D/g, "").slice(0, 6);
    if (digitsOnly.length > 0) {
      const newCode = ["", "", "", "", "", ""];
      digitsOnly.split("").forEach((digit, i) => { newCode[i] = digit; });
      setCode(newCode);
      if (digitsOnly.length === 6) triggerVerify(digitsOnly);
    }
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f4ef]">
      <Header />
      <main className="flex-grow flex items-center justify-center p-5">
        <div className="w-full max-w-[520px] bg-white p-8 md:p-10 rounded-[24px] shadow-sm text-center">
          <h1 className="text-[18px] md:text-[20px] font-semibold text-gray-800 mb-6">
            Start our Telegram bot to continue
          </h1>

          <button
            type="button"
            className="bg-[#58b97c] text-white px-6 py-2.5 rounded-lg text-sm font-semibold mb-7 hover:bg-[#4a9f6a] transition-all"
            onClick={() => window.open(`https://t.me/workifyBot_bot?start=${USER_ID}`, "_blank")}
          >
            Click here!
          </button>

          <div className="flex justify-center mb-7">
            <img src={click} alt="click icon" className="w-[200px] md:w-[260px] object-contain" />
          </div>

          <input
            ref={inputRef}
            id="talent-auth-code"
            name="authCode"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            className="absolute opacity-0 pointer-events-none"
            autoFocus
          />

          <div className="flex justify-center gap-2 md:gap-3.5 mb-8 cursor-text" onClick={() => inputRef.current.focus()}>
            {code.map((d, i) => (
              <div
                key={i}
                className={`w-10 h-12 md:w-[52px] md:h-[52px] rounded-xl flex items-center justify-center text-xl font-bold transition-all border-2
                  ${d ? "bg-[#f1f3f6] border-[#58b97c] text-gray-700" : 
                    (i === activeIndex || (activeIndex === -1 && i === 5)) ? "bg-white border-[#58b97c] shadow-sm" : 
                    "bg-white border-gray-200"}`}
              >
                {d}
              </div>
            ))}
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-center gap-4">
            <button
              type="button"
              className="w-full sm:w-[120px] h-11 rounded-xl border border-gray-300 bg-white"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              className="w-full sm:w-[120px] h-11 rounded-xl bg-[#0f2a44] text-white font-semibold disabled:opacity-50"
              onClick={handleNext}
            >
              {isSubmitting ? "Wait..." : "Next"}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default TalentVerifyCode;