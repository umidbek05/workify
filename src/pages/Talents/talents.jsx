import Footer from "../../Components/Footer/footer";
import Header from "../../Components/Header/header";
import Stefan from "../../assets/stefan.png";
import { LocateIcon } from "lucide-react";

export default function Talents() {
  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Sarlavha qismi */}
      <section className="bg-gray-400/10 min-h-screen">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="pt-[60px] text-2xl font-semibold leading-none text-[#404040] lg:ml-[208px] md:ml-[5%] text-center md:text-left">
            1.256 talents
          </h1>
          <hr className="mt-[10px] w-full lg:w-[1030px] lg:ml-[200px] border-0 border-b-[0.2px] border-[#56657f]/10" />
        </div>

        {/* Kartochkalar konteyneri */}
        <div className="flex flex-col items-center gap-[30px] w-full pb-20 px-4">
          {/* Card - Map qilsangiz bo'ladi, hozircha 3 tasi statik */}
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="w-full max-w-[1100px] bg-white rounded-lg mt-[30px] shadow-[0_10px_25px_rgba(0,0,0,0.15)] p-[30px]"
            >
              {/* Items Section */}
              <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-0">
                {/* Talent info */}
                <div className="flex flex-col md:flex-row gap-5 items-center md:items-start text-center md:text-left">
                  <img src={Stefan} alt="Stefan" className="w-auto h-auto" />
                  <div className="pt-0 md:pt-[15px]">
                    <h3 className="font-bold text-2xl leading-none text-[#343c44]">
                      UX / UI Designer
                    </h3>
                    <p className="font-semibold text-lg leading-none text-[#263238] pt-2.5">
                      Abrorbek Ibrokhimov
                    </p>
                  </div>
                </div>

                {/* Location and Price */}
                <div className="text-center md:text-left">
                  <h4 className="font-semibold text-base leading-none text-[#343c44] flex items-center justify-center md:justify-start gap-1">
                    <LocateIcon size={18} /> Ferghana, Uzbeksitan
                  </h4>
                  <h3 className="font-bold text-2xl leading-none text-[#263238] pt-[13px] md:ml-[75px]">
                    $1.250.00
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="font-medium text-base md:text-lg leading-[140%] text-[#343c44] pt-5 md:pt-10">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
              </p>

              {/* Skills */}
              <div className="pt-[30px] md:pt-[60px]">
                <h4 className="font-medium text-lg leading-none text-[#686868]">
                  Required skills
                </h4>
                <div className="flex flex-wrap gap-[11px] pt-5">
                  <button className="rounded-[10px] bg-[#eef2f8] font-medium text-sm md:text-base text-[#404040] px-2.5 py-2.5 cursor-pointer">
                    Figma (2 years)
                  </button>
                  <button className="rounded-[10px] bg-[#eef2f8] font-medium text-sm md:text-base text-[#404040] px-2.5 py-2.5 cursor-pointer">
                    Adobe Photoshop (1 years)
                  </button>
                  <button className="rounded-[10px] bg-[#eef2f8] font-medium text-sm md:text-base text-[#404040] px-2.5 py-2.5 cursor-pointer">
                    Adobe Photoshop (1 years)
                  </button>
                  <button className="rounded-[10px] bg-[#eef2f8] font-medium text-sm md:text-base text-[#404040] px-2.5 py-2.5 cursor-pointer">
                    Adobe XD (1 year)
                  </button>
                </div>
              </div>

              {/* View Profile / Buttons */}
              <div className="pt-10 md:pt-5 flex flex-col sm:flex-row gap-[10px] justify-end items-center sm:items-stretch">
                <button className="w-full sm:w-[198px] h-12 font-bold text-xl tracking-[0.3px] text-white rounded-[10px] bg-[#163d5c] hover:bg-[#1a4a6e] transition-colors">
                  View profile
                </button>
                <button className="w-full sm:w-[129px] h-12 font-bold text-xl tracking-[0.3px] text-[#163d5c] border border-[#163d5c] rounded-[10px] bg-white hover:bg-[#163d5c] hover:text-white transition-all">
                  Resume
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
