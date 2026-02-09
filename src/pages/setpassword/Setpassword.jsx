import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Setpassword.css";
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

      // ✅ localStorage'dan ID ni olish
      const userId = localStorage.getItem("userId") || localStorage.getItem("resetUserId");

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
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ password: password }), 
        }
      );

      const data = await response.json();

      if (response.ok) {

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
            <input
              type="password"
              className="reset-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label>Parolni tasdiqlang</label>
            <input
              type="password"
              className="reset-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <button
            className="reset-btn"
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
