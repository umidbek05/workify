import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";
import Swal from "sweetalert2";

const SetNewPassword = () => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleConfirm = async () => {
<<<<<<< HEAD
    // 1. Validatsiya (Logika o'zgarishsiz qoldi)
=======

    // 1. Validatsiya
>>>>>>> 2f9c5f5aa527ba21be34a282a97ef4adf6800393
    if (!password || !confirmPassword) {
      setError("Iltimos, barcha maydonlarni to‘ldiring");
      return;
    }

    if (password !== confirmPassword) {
      setError("Parollar bir-biriga mos kelmadi");
      return;
    }

    if (password.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo‘lishi kerak");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
<<<<<<< HEAD
      const userId =
        localStorage.getItem("userId") || localStorage.getItem("resetUserId");
=======

      // ✅ localStorage'dan ID ni olish
      const userId = localStorage.getItem("userId") || localStorage.getItem("resetUserId");
>>>>>>> 2f9c5f5aa527ba21be34a282a97ef4adf6800393

      if (!userId) {
        setError("Foydalanuvchi seans muddati tugagan. Iltimos, qaytadan urinib ko'ring.");
        setIsLoading(false);
        return;
      }

      // ✅ Railway backend manzili
      const response = await fetch(
        `https://workifyback-production.up.railway.app/register/updateRegister/${userId}`,
        {
          method: "PUT",
<<<<<<< HEAD
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
=======
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ password: password }), 
>>>>>>> 2f9c5f5aa527ba21be34a282a97ef4adf6800393
        }
      );

      const data = await response.json();

      if (response.ok) {
<<<<<<< HEAD
        alert("Parol muvaffaqiyatli yangilandi!");
        localStorage.removeItem("resetUserId");
        navigate("/login");
=======

        // 🔥 Chiroyli alert
        Swal.fire({
          title: "Muvaffaqiyatli!",
          text: "Parol muvaffaqiyatli yangilandi!",
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          localStorage.removeItem("resetUserId");
          navigate("/login");
        });

>>>>>>> 2f9c5f5aa527ba21be34a282a97ef4adf6800393
      } else {
        // Backenddan kelgan xatolik xabari
        setError(data.message || "Xatolik yuz berdi. Backendni tekshiring.");
      }

    } catch (err) {
      setError("Server bilan ulanishda xato: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
<<<<<<< HEAD
      {/* reset-wrapper --> min-h-screen flex justify-center items-center bg-[#f7f4ee] */}
      <div className="min-h-screen flex justify-center items-center bg-[#f7f4ee] p-4 font-sans">
        {/* reset-card --> relative w-full max-w-[420px] bg-white pt-7 px-8 pb-[60px] rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.1)] */}
        <div className="relative w-full max-w-[420px] bg-white pt-7 px-8 pb-[60px] rounded-[14px] shadow-[0_15px_40px_rgba(0,0,0,0.1)]">
          <h2 className="px-3 py-1.5 inline-block mb-5 text-[22px] font-bold text-gray-800">
            Set new password
          </h2>

          {error && (
            <p className="text-red-500 text-center text-sm mb-4">{error}</p>
          )}

          <div className="mb-4 text-left">
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              New password
            </label>
            {/* reset-input --> ring-1 ring-red-400 (rasmdagi qizil ramka uchun) yoki border-gray-300 */}
=======
      <div className="reset-wrapper">
        <div className="reset-card">
          <h2>Yangi parol o'rnatish</h2>

          {error && (
            <p className="error-msg" style={{ color: "#ff4d4d", textAlign: "center", marginBottom: "15px" }}>
              {error}
            </p>
          )}

          <div className="form-group">
            <label>Yangi parol</label>
>>>>>>> 2f9c5f5aa527ba21be34a282a97ef4adf6800393
            <input
              type="password"
              className="w-full p-3 mb-1 border border-gray-300 rounded-md outline-none text-[15px] focus:border-[#0f2a44] transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

<<<<<<< HEAD
          <div className="mb-4 text-left">
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Confirm password
            </label>
=======
          <div className="form-group">
            <label>Parolni tasdiqlang</label>
>>>>>>> 2f9c5f5aa527ba21be34a282a97ef4adf6800393
            <input
              type="password"
              className="w-full p-3 mb-1 border border-gray-300 rounded-md outline-none text-[15px] focus:border-[#0f2a44] transition-all"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          {/* reset-btn --> absolute right-5 bottom-4 */}
          <button
            className="absolute right-5 bottom-4 px-[18px] py-2.5 rounded-md bg-[#0f2a44] text-white font-semibold cursor-pointer hover:bg-[#0b2136] disabled:opacity-50 transition-colors"
            onClick={handleConfirm}
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}
          >
            {isLoading ? "Yangilanmoqda..." : "Tasdiqlash"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SetNewPassword;
