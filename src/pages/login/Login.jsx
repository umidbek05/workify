import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email kiritilishi shart";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email noto'g'ri formatda";
    }

    if (!formData.password) {
      newErrors.password = "Parol kiritilishi shart";
    } else if (formData.password.length < 6) {
      newErrors.password = "Parol kamida 6 ta belgi bo'lishi kerak";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("http://localhost:5000/register/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({
          password: data.message || "Email yoki parol noto'g'ri",
        });
        return;
      }

      // ✅ 1. Emailni saqlash (Boshqa sahifalarda ma'lumotni fetch qilish uchun kerak)
      localStorage.setItem("email", formData.email);

      // ✅ 2. Foydalanuvchi ID va ma'lumotlarini saqlash
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ 3. Remember Me funksiyasi
      if (formData.rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      alert("Muvaffaqiyatli login!");

      // ✅ 4. Dashboardga o'tish
      navigate("/dashboard");
    } catch (err) {
      setErrors({ submit: "Server bilan ulanishda xato yuz berdi" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true,
      }));
    }
  }, []);

  return (
    <div>
      <Header />

      <div className="login-wrapper">
        <div className="login-card">
          <h1 className="title">Login</h1>

          {errors.submit && (
            <p
              className="error-text"
              style={{ color: "red", textAlign: "center" }}
            >
              {errors.submit}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <div className={`input-box ${errors.email ? "error" : ""}`}>
                <MdEmail className="icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className={`input-box ${errors.password ? "error" : ""}`}>
                <IoIosLock className="icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
              </div>
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            <div className="options">
              <label className="remember">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                Remember me
              </label>

              <span className="forgot" onClick={() => navigate("/forget")}>
                Forgot password?
              </span>
            </div>

            <button className="butot" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="footer">
            Have no account?{" "}
            <span onClick={() => navigate("/signup")}>Register</span>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
