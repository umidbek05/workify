import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Setpassword.css";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";

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
      // ✅ ID ni Login yoki Forgot Password'dan olamiz
      const userId =
        localStorage.getItem("userId") || localStorage.getItem("resetUserId");

      if (!userId) {
        setError("Foydalanuvchi aniqlanmadi. Iltimos, qaytadan login qiling.");
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        `http://localhost:5000/register/updateRegister/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }), // Faqat yangi parolni yuboramiz
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Parol muvaffaqiyatli yangilandi!");
        // ✅ Xavfsizlik uchun vaqtinchalik ID larni o'chiramiz
        localStorage.removeItem("resetUserId");
        navigate("/login");
      } else {
        setError(data.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      setError("Server bilan ulanishda xato yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="reset-wrapper">
        <div className="reset-card">
          <h2>Set new password</h2>

          {error && (
            <p
              className="error-msg"
              style={{ color: "red", textAlign: "center" }}
            >
              {error}
            </p>
          )}

          <div className="form-group">
            <label>New password</label>
            <input
              type="password"
              className="reset-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className="form-group">
            <label>Confirm password</label>
            <input
              type="password"
              className="reset-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            className="reset-btn"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Confirm"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SetNewPassword;
