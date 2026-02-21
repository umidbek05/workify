import { useState } from "react";
import { MdEmail, MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";

const Forget = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleNext = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Iltimos, email manzilingizni kiriting!");
      return;
    }

    localStorage.setItem("resetEmail", email);
    navigate("/verify-forget", { state: { email: email } });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />

      {/* forget-wrapper */}
      <div className="flex-1 flex justify-center items-center bg-[#f4f7fe] p-5">
        {/* forget-card */}
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] w-full max-w-[400px] relative transition-transform duration-300">
          <button
            className="flex items-center gap-1.5 bg-none border-none text-[#6b7280] cursor-pointer text-sm mb-5 p-0 hover:text-[#1d3f61] transition-colors"
            onClick={() => navigate(-1)}
          >
            <MdArrowBackIosNew /> Back
          </button>

          <div className="text-center mb-[30px]">
            <h2 className="text-2xl text-[#111827] mb-2.5 font-bold">
              Forgot Password?
            </h2>
            <p className="text-sm text-[#6b7280] leading-relaxed">
              Enter your email address to receive a verification code.
            </p>
          </div>

          <form onSubmit={handleNext}>
            <div className="mb-[25px]">
              {/* input-box with focus-within logic */}
              <div className="flex items-center bg-[#f9fafb] border border-[#e5e7eb] rounded-lg px-[15px] py-3 transition-all duration-300 focus-within:border-[#1d3f61] focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(29,63,97,0.1)]">
                <MdEmail className="text-[#9ca3af] text-xl mr-3" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="border-none outline-none bg-transparent w-full text-base text-[#1f2937]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1d3f61] text-white border-none p-3.5 rounded-lg text-base font-semibold cursor-pointer hover:bg-[#152e46] transition-all duration-300"
            >
              Send Code
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Forget;
