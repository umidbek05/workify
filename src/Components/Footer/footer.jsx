import { useState } from "react";
import Insta from "../../assets/insta.png";
import Face from "../../assets/face.png";
import Youtube from "../../assets/youtube.png";
import Telegram from "../../assets/telegram.png";

export default function Footer() {
  // Qaysi bo'lim ochiqligini saqlash uchun state
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionName) => {
    // Mobilda ochilib-yopilish mantiqi
    setOpenSection(openSection === sectionName ? null : sectionName);
  };

  return (
    <footer className="w-full bg-[rgb(22,61,92)] pt-[60px] pb-[30px]">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between px-5 mb-10 gap-10 md:gap-0 text-center md:text-left items-center md:items-start">
        {/* 1. Logo Section */}
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-[28px] text-white font-bold mb-2">workify</h1>
          <p className="text-white text-sm">Job posting platform</p>
          <button className="w-[170px] h-[35px] bg-white rounded-lg mt-5 cursor-pointer hover:bg-gray-100 transition-colors">
            <a
              href="#"
              className="no-underline text-black text-[15px] flex items-center justify-center w-full h-full"
            >
              Contacts
            </a>
          </button>
        </div>

        {/* 2. Links Section */}
        <div className="flex flex-col md:flex-row w-full md:w-auto gap-0 md:gap-[100px] xl:gap-[200px]">
          {/* General Section */}
          <div className="w-full md:w-auto">
            <h3
              onClick={() => toggleSection("general")}
              className="text-lg font-semibold text-white mb-0 md:mb-5 py-5 md:py-0 px-5 md:px-0 cursor-pointer md:cursor-default flex justify-between items-center border-b border-white/10 md:border-none"
            >
              General
              {/* Chevron ^ ikonkasi faqat mobilda ko'rinadi */}
              <span
                className={`md:hidden inline-block w-2 h-2 border-r-2 border-b-2 border-white transition-transform duration-300 mr-2 ${
                  openSection === "general" ? "rotate-[-135deg]" : "rotate-45"
                }`}
              ></span>
            </h3>
            <ul
              className={`flex-col gap-2.5 px-5 md:px-0 pt-4 md:pt-0 pb-5 md:pb-0 text-left ${
                openSection === "general" ? "flex" : "hidden md:flex"
              }`}
            >
              <li>
                <a
                  href="/signup"
                  className="text-white text-sm no-underline hover:opacity-80 transition-opacity"
                >
                  Sign up
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-sm no-underline hover:opacity-80 transition-opacity"
                >
                  Contacts
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-sm no-underline hover:opacity-80 transition-opacity"
                >
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="w-full md:w-auto">
            <h3
              onClick={() => toggleSection("company")}
              className="text-lg font-semibold text-white mb-0 md:mb-5 py-5 md:py-0 px-5 md:px-0 cursor-pointer md:cursor-default flex justify-between items-center border-b border-white/10 md:border-none"
            >
              Company
              <span
                className={`md:hidden inline-block w-2 h-2 border-r-2 border-b-2 border-white transition-transform duration-300 mr-2 ${
                  openSection === "company" ? "rotate-[-135deg]" : "rotate-45"
                }`}
              ></span>
            </h3>
            <ul
              className={`flex-col gap-2.5 px-5 md:px-0 pt-4 md:pt-0 pb-5 md:pb-0 text-left ${
                openSection === "company" ? "flex" : "hidden md:flex"
              }`}
            >
              <li>
                <a
                  href="#"
                  className="text-white text-sm no-underline hover:opacity-80 transition-opacity"
                >
                  Post a job
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-sm no-underline hover:opacity-80 transition-opacity"
                >
                  Search talents
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-sm no-underline hover:opacity-80 transition-opacity"
                >
                  Company login
                </a>
              </li>
            </ul>
          </div>

          {/* Talents Section */}
          <div className="w-full md:w-auto">
            <h3
              onClick={() => toggleSection("talents")}
              className="text-lg font-semibold text-white mb-0 md:mb-5 py-5 md:py-0 px-5 md:px-0 cursor-pointer md:cursor-default flex justify-between items-center border-b border-white/10 md:border-none"
            >
              Talents
              <span
                className={`md:hidden inline-block w-2 h-2 border-r-2 border-b-2 border-white transition-transform duration-300 mr-2 ${
                  openSection === "talents" ? "rotate-[-135deg]" : "rotate-45"
                }`}
              ></span>
            </h3>
            <ul
              className={`flex-col gap-2.5 px-5 md:px-0 pt-4 md:pt-0 pb-5 md:pb-0 text-left ${
                openSection === "talents" ? "flex" : "hidden md:flex"
              }`}
            >
              <li>
                <a
                  href="#"
                  className="text-white text-sm no-underline hover:opacity-80 transition-opacity"
                >
                  Search jobs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-sm no-underline hover:opacity-80 transition-opacity"
                >
                  Talent login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Bottom Footer */}
      <div className="max-w-[1200px] mx-auto pt-5 px-5 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-5 text-white">
        <p className="text-sm opacity-90">All rights reserved 2021</p>

        <div className="flex gap-5 items-center">
          <img
            src={Insta}
            alt="Instagram"
            className="w-6 h-auto cursor-pointer hover:scale-110 transition-transform duration-200"
          />
          <img
            src={Face}
            alt="Facebook"
            className="w-6 h-auto cursor-pointer hover:scale-110 transition-transform duration-200"
          />
          <img
            src={Youtube}
            alt="YouTube"
            className="w-6 h-auto cursor-pointer hover:scale-110 transition-transform duration-200"
          />
          <img
            src={Telegram}
            alt="Telegram"
            className="w-6 h-auto cursor-pointer hover:scale-110 transition-transform duration-200"
          />
        </div>
      </div>
    </footer>
  );
}
