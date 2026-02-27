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
  const [role, setRole] = useState('talent'); // Standart 'talent'

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors.submit) setErrors({});
  };

// handleSubmit funksiyasini quyidagiga almashtiring:
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setErrors({});

  try {
    const response = await fetch(
      "https://workifyback-production.up.railway.app/register/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      setErrors({ submit: data.message || "Email yoki parol noto'g'ri" });
      setIsLoading(false);
      return;
    }

    const backendRole = data.user?.role || data.role || data.user?.type;
    const actualRole = backendRole?.toLowerCase().trim();
    const selectedRole = role.toLowerCase().trim();

    if (actualRole !== selectedRole) {
      setErrors({
        submit: `Siz ${actualRole === 'talent' ? 'Talent' : 'Company'} bo'limiga tegishlisiz. Iltimos, bo'limni to'g'ri tanlang!`
      });
      setIsLoading(false);
      return;
    }

    // MA'LUMOTLARNI SAQLASH
    localStorage.setItem("token", data.token);
    localStorage.setItem("userRole", actualRole);
    localStorage.setItem("userId", data.user?.id || data.id);
    localStorage.setItem("email", formData.email);
    if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

    if (formData.rememberMe) {
      localStorage.setItem("rememberedEmail", formData.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    Swal.fire({
      title: "Muvaffaqiyatli!",
      text: "Tizimga muvaffaqiyatli kirdingiz",
      icon: "success",
      confirmButtonColor: "#0f2f4f",
    }).then(() => {
      // ROLGA QARAB TO'G'RI YO'NALTIRISH
      if (actualRole === 'company') {
        navigate("/dashboard");
      } else {
        navigate("/talent-home");
      }
    });

  } catch (err) {
    setErrors({ submit: "Server bilan bog'lanishda xato!" });
  } finally {
    setIsLoading(false);
  }
};



  return (
    <div className="flex flex-col min-h-screen bg-[#f6f4ef]">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[420px] bg-white rounded-[24px] p-8 md:p-10 shadow-lg">
          <h1 className="text-[26px] font-semibold text-[#0f2f4f] text-center mb-6">Login</h1>

          {/* Role Switcher */}
          <div className="flex p-1 bg-gray-100 rounded-2xl mb-8 relative h-12">
            <button
              type="button"
              onClick={() => setRole('talent')}
              className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all duration-300 z-10 ${role === 'talent' ? 'text-white' : 'text-gray-500'}`}
            >
              Talent
            </button>
            <button
              type="button"
              onClick={() => setRole('company')}
              className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all duration-300 z-10 ${role === 'company' ? 'text-white' : 'text-gray-500'}`}
            >
              Company
            </button>
            <div
              className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-[#0f2f4f] rounded-xl transition-transform duration-300 ${role === 'company' ? 'translate-x-full' : 'translate-x-0'}`}
            />
          </div>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl p-3 mb-6 text-sm text-center">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[15px] font-medium text-[#333] block">
                {role === 'talent' ? 'Email' : 'Company Email'}
              </label>
              <div className="flex items-center gap-3 border rounded-xl px-4 py-3 border-[#dcdcdc] focus-within:border-[#0f2f4f]">
                <MdEmail className="text-xl text-[#0f2f4f]" />
                <input
                  type="email"
                  name="email"
                  className="w-full text-sm outline-none bg-transparent"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[15px] font-medium text-[#333] block">Password</label>
              <div className="flex items-center gap-3 border rounded-xl px-4 py-3 border-[#dcdcdc] focus-within:border-[#0f2f4f]">
                <IoIosLock className="text-xl text-[#0f2f4f]" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full text-sm outline-none bg-transparent"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none text-gray-600">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#0f2f4f]"
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#0f2f4f] text-white font-semibold rounded-2xl hover:bg-[#0c253f] transition-all disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : `Sign in as ${role === 'talent' ? 'Talent' : 'Company'}`}
            </button>
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