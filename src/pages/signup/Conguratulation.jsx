import React from "react";
import congra from "../../assets/Conguratulation.png";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/footer";
import Header from "../../Components/Header/header";

function Congratulation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />

      <main className="flex-grow flex items-center justify-center p-5 md:p-10">
        <div className="w-full max-w-[480px] bg-white p-6 md:p-10 lg:p-[40px_50px] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] text-center transition-all">
          <h1 className="text-[22px] sm:text-[26px] md:text-[32px] font-bold text-[#1f2937] mb-2.5">
            Congratulations!
          </h1>

          <p className="text-[15px] md:text-[16px] text-[#6b7280] mb-6">
            Registration successful! Welcome to Workify!
          </p>

          <div className="flex justify-center my-5">
            <img
              src={congra}
              alt="Congratulations"
              className="w-full max-w-[200px] md:max-w-[280px] object-contain block"
            />
          </div>

          <button
            className="w-full sm:w-auto mt-6 bg-[#22c55e] hover:bg-[#16a34a] text-white py-3 md:py-3.5 px-7 rounded-lg text-[15px] md:text-[16px] font-semibold transition-all duration-300 active:scale-95 shadow-md"
            onClick={() => {
              const role = localStorage.getItem("userRole");
              navigate(role === 'company' ? "/dashboard" : "/talent-home");
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Congratulation;
