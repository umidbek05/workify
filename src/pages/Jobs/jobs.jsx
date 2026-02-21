import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";
import { LocateIcon } from "lucide-react";
import Logo from "../../assets/Logo.png";
import Star from "../../assets/Star 1.png";
import Star1 from "../../assets/Star 2.png";
import { BiDislike } from "react-icons/bi";

export default function Jobs() {
  return (
    <div className="bg-[#f2f2f2]/40 min-h-screen">
      <Header />

      <section className="pb-20">
        {/* Sarlavha qismi */}
        <div className="max-w-[1440px] mx-auto px-4">
          <h1 className="pt-[60px] text-2xl font-semibold leading-none text-[#404040] lg:ml-[208px] md:ml-[5%] text-center md:text-left">
            1.256 jobs
          </h1>
          <hr className="mt-2.5 w-full lg:w-[1030px] lg:ml-[200px] border-0 border-b-[0.2px] border-[#56657f]/10" />
        </div>

        {/* Kartochkalar ro'yxati */}
        <div className="flex flex-col items-center gap-[30px] w-full mt-[30px] px-4">
          {/* Card - Map qilish uchun tayyor (3 tasi ko'rsatilgan) */}
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="w-full max-w-[1100px] min-h-[500px] h-auto bg-white rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.15)] p-[30px] box-border"
            >
              {/* Header: Logo, Company info va Location */}
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-5 md:gap-0">
                <div className="flex gap-3.5 items-start md:items-center">
                  <img src={Logo} alt="Logo" className="w-auto h-auto" />
                  <div>
                    <h3 className="text-2xl font-bold text-[#343c44]">
                      TechCells
                    </h3>
                    <p className="text-2xl font-normal text-[#263238] pt-2.5 md:pt-0">
                      Computer Software
                    </p>
                    {/* Stars */}
                    <div className="flex items-center pt-2.5">
                      <img src={Star} alt="Star" className="w-4 h-4" />
                      <img src={Star} alt="Star" className="w-4 h-4" />
                      <img src={Star} alt="Star" className="w-4 h-4" />
                      <img src={Star} alt="Star" className="w-4 h-4" />
                      <img src={Star1} alt="Star" className="w-4 h-4" />
                      <span className="pl-2.5 text-sm text-[#666]">(4.0)</span>
                      <span className="pl-2.5 text-sm text-[#666]">
                        1K reviews
                      </span>
                    </div>
                  </div>
                </div>

                {/* Location side */}
                <div className="flex flex-col items-center md:items-end text-center md:text-right">
                  <h4 className="text-[18px] font-bold text-[#56657f] flex items-center gap-1">
                    <LocateIcon size={18} /> Tashkent, Uzbekistan
                  </h4>
                  <h3 className="text-[18px] font-semibold text-[#56657f] pt-2.5">
                    4 days ago
                  </h3>
                  <button className="w-[120px] h-[30px] bg-[#50c594] text-white font-bold rounded-[10px] mt-4 hover:bg-[#45b385] transition-colors">
                    Now hiring
                  </button>
                </div>
              </div>

              {/* Title va Narx */}
              <div className="flex flex-col md:flex-row items-center md:items-end justify-between mt-10 md:mt-0">
                <h3 className="md:pt-[76px] text-2xl font-bold text-[#343c44]">
                  UX / UI Designer
                </h3>
                <h4 className="text-2xl font-bold text-[#343c44] mt-2 md:mt-0">
                  $400-1.000
                </h4>
              </div>

              {/* About text */}
              <p className="font-medium text-base leading-[22px] text-[#343c44] pt-[30px]">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The
                <br className="hidden md:block" />
                point of using Lorem Ipsum is that it has a more-or-less normal
                distribution of letters, as...more
              </p>

              {/* Required Skills */}
              <div className="pt-6">
                <h4 className="text-[18px] font-bold text-[#343c44]">
                  Required skills:
                </h4>
                <div className="flex flex-wrap gap-2.5 pt-5">
                  <button className="bg-[#eef2f8] text-[#404040] font-medium text-base px-[15px] py-2.5 rounded-[10px]">
                    Figma (2 years)
                  </button>
                  <button className="bg-[#eef2f8] text-[#404040] font-medium text-base px-[15px] py-2.5 rounded-[10px]">
                    Adobe Photoshop (1 years)
                  </button>
                  <button className="bg-[#eef2f8] text-[#404040] font-medium text-base px-[15px] py-2.5 rounded-[10px]">
                    Responsive UX/UI (6 years)
                  </button>
                  <button className="bg-[#eef2f8] text-[#404040] font-medium text-base px-[15px] py-2.5 rounded-[10px]">
                    Adobe XD (1 year)
                  </button>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="pt-7.5 mt-8 flex flex-col lg:flex-row justify-end items-center lg:items-center gap-[15px] w-full">
                <button className="p-0 border-none bg-transparent cursor-pointer flex items-center">
                  <BiDislike className="text-[30px] text-[#c7c7c7] hover:text-red-400 transition-colors" />
                </button>

                {/* Apply va View tugmalari */}
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                  <button className="w-full sm:w-[200px] lg:w-auto lg:px-8 h-[50px] bg-[#163d5c] text-white font-bold text-xl rounded-[10px] hover:bg-[#1a4a6e] transition-colors">
                    Quick apply
                  </button>
                  <button className="w-full sm:w-[160px] lg:w-auto lg:px-6 h-[50px] border border-[#163d5c] text-[#163d5c] font-bold text-xl rounded-[10px] bg-white hover:bg-[#163d5c] hover:text-white transition-all duration-300">
                    View job post
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
