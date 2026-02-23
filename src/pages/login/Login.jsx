import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";
import Swal from "sweetalert2";

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
      const response = await fetch(
        "https://workifyback-production.up.railway.app/register/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors({
          password: data.message || "Email yoki parol noto'g'ri",
        });
        return;
      }

      // Ma'lumotlarni saqlash
      localStorage.setItem("email", formData.email);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Remember Me logikasi
      if (formData.rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // Muvaffaqiyatli kirish xabari
      Swal.fire({
        title: "Muvaffaqiyatli!",
        text: "Tizimga muvaffaqiyatli kirdingiz",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#0f2f4f",
      }).then(() => {
        navigate("/dashboard");
      });

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
    <div className="flex flex-col min-h-screen bg-[#f6f4ef]">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full max-w-[420px] bg-white rounded-[24px] p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <h1 className="text-[26px] font-semibold text-[#0f2f4f] text-center mb-8">
            Login
          </h1>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl p-3 mb-6 text-sm text-center font-medium">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Group */}
            <div className="space-y-2">
              <label className="text-[15px] font-medium text-[#333] block">
                Email
              </label>
              <div
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0f2f4f]/10 ${
                  errors.email
                    ? "border-red-500"
                    : "border-[#dcdcdc] focus-within:border-[#0f2f4f]"
                }`}
              >
                <MdEmail className="text-xl text-[#0f2f4f] shrink-0" />
                <input
                  type="email"
                  name="email"
                  placeholder="example@mail.com"
                  className="w-full text-sm outline-none bg-transparent text-[#333] placeholder:text-gray-400"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-xs font-medium ml-1">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password Group */}
            <div className="space-y-2">
              <label className="text-[15px] font-medium text-[#333] block">
                Password
              </label>
              <div
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0f2f4f]/10 ${
                  errors.password
                    ? "border-red-500"
                    : "border-[#dcdcdc] focus-within:border-[#0f2f4f]"
                }`}
              >
                <IoIosLock className="text-xl text-[#0f2f4f] shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full text-sm outline-none bg-transparent text-[#333] placeholder:text-gray-400"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="text-xl text-gray-400 hover:text-[#0f2f4f] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs font-medium ml-1">
                  {errors.password}
                </span>
              )}
            </div>

            {/* Options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600 select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  className="w-4 h-4 accent-[#0f2f4f] cursor-pointer"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                Remember me
              </label>
              <span
                className="text-[#0f2f4f] font-medium cursor-pointer hover:underline"
                onClick={() => navigate("/forget")}
              >
                Forgot password?
              </span>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-[211px] py-3.5 bg-[#0f2f4f] text-white font-semibold rounded-2xl hover:bg-[#0c253f] hover:-translate-y-0.5 hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Have no account?{" "}
            <span
              className="text-[#0f2f4f] font-bold cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Register
            </span>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;