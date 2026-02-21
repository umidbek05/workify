import { Link, useNavigate } from "react-router-dom";
import Vector from "../../assets/Vector.png";
import { FiBriefcase } from "react-icons/fi";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-[1000] mx-auto flex h-auto min-h-[70px] w-full max-w-[1440px] flex-wrap items-center justify-between bg-white px-[5%] py-4 shadow-md md:h-[70px] md:py-0">
      {/* Logotip qismi */}
      <div className="head">
        <Link
          to="/"
          className="text-[22px] font-semibold leading-none text-[#404040] sm:text-[30px]"
        >
          workify
        </Link>
      </div>

      {/* Navigatsiya linklari */}
      <div className="header1 order-3 mt-4 flex w-full items-center justify-center gap-[15px] border-t border-[#f1f1f1] pt-[10px] md:order-none md:mt-0 md:w-auto md:border-none md:pt-0 lg:gap-[25px]">
        <img src={Vector} alt="" className="h-auto w-auto" />
        <Link
          to="/talents"
          className="flex items-center gap-[5px] text-[14px] font-medium text-[#64748b] transition-all duration-300 hover:text-[#38bdf8] sm:text-base"
        >
          Talents
        </Link>
        <FiBriefcase className="text-[#64748b]" />
        <Link
          to="/jobs"
          className="flex items-center gap-[5px] text-[14px] font-medium text-[#64748b] transition-all duration-300 hover:text-[#38bdf8] sm:text-base"
        >
          Jobs
        </Link>
      </div>

      {/* Tugmalar qismi */}
      <div className="header2 flex items-center gap-2 sm:gap-[15px]">
        <button
          onClick={() => navigate("/login")}
          className="cursor-pointer rounded-lg border-2 border-[#163d5c] bg-transparent px-[10px] py-[6px] text-[14px] font-semibold text-[#163d5c] transition-all duration-300 hover:opacity-80 sm:px-5 sm:py-[10px] sm:text-base"
        >
          Sign in
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="cursor-pointer rounded-lg border-2 border-[#163d5c] bg-[#163d5c] px-[10px] py-[6px] text-[14px] font-semibold text-white transition-all duration-300 hover:opacity-80 sm:px-5 sm:py-[10px] sm:text-base"
        >
          Join now
        </button>
      </div>
    </header>
  );
}
