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
    // 1. Validatsiya
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
      // ✅ LocalStorage-dan ID-ni qidirish
      // Forgot Password jarayonida ID 'resetUserId' yoki 'userId' nomida saqlangan bo'lishi kerak
      const userId = localStorage.getItem("resetUserId") || localStorage.getItem("userId");

      if (!userId) {
        setError("Foydalanuvchi seans muddati tugagan. Iltimos, qaytadan urinib ko'ring.");
        setIsLoading(false);
        return;
      }

      // ✅ Backendga so'rov yuborish
      const response = await fetch(
        `https://workifyback-production.up.railway.app/register/updateRegister/${userId}`,
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          // Backend aynan 'password' kalitini kutyapti
          body: JSON.stringify({ password: password.trim() }), 
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Muvaffaqiyatli xabar
        Swal.fire({
          title: "Muvaffaqiyatli!",
          text: "Parolingiz yangilandi. Endi yangi parol bilan tizimga kiring.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#0f2a44",
        }).then(() => {
          // Tozalash va Login sahifasiga o'tish
          localStorage.removeItem("resetUserId");
          navigate("/login");
        });
      } else {
        // Backenddan kelgan xatolikni ko'rsatish
        setError(data.message || "Xatolik yuz berdi. Backendni tekshiring.");
      }

    } catch (err) {
      setError("Server bilan ulanishda xato yuz berdi.");
      console.error("Update error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex justify-center items-center bg-[#f7f4ee] p-4 font-sans">
        <div className="relative w-full max-w-[420px] bg-white pt-7 px-8 pb-[60px] rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.1)]">
          <h2 className="text-[24px] font-bold text-[#0f2a44] text-center mb-6">
            Set new password
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl p-3 mb-4 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="text-left">
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                New password
              </label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-[#0f2a44] transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            <div className="text-left mb-6">
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Confirm password
              </label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-[#0f2a44] transition-all"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            className="w-full mt-6 py-3.5 bg-[#0f2a44] text-white font-semibold rounded-xl hover:bg-[#0b2136] disabled:opacity-50 transition-all cursor-pointer"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Yangilanmoqda..." : "Tasdiqlash"}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SetNewPassword;