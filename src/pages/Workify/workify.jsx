import { useEffect } from "react";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";
import Group from "../../assets/Group.png";
import Mask from "../../assets/Mask.png";
import Person from "../../assets/person.png";
import Message from "../../assets/message.png";
import Search from "../../assets/search.png";

export default function Workify() {
  useEffect(() => {
    window.scrollTo(0, 0);
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <div className="bg-[#fcfcfc] overflow-x-hidden">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full max-w-[1440px] mx-auto mb-[60px] min-h-[600px] flex items-center overflow-hidden font-['Montserrat',sans-serif] px-5 md:px-0 flex-col md:flex-row md:text-left text-center">
        {/* Hero Background Image (Person) */}
        <img
          src={Group}
          alt="hero background"
          className="absolute hidden md:block right-0 top-1/2 -translate-y-1/2 w-1/2 h-auto max-h-[90%] object-contain z-[1]"
        />

        {/* Mobile-only Image handling (Rasm va Gul tartibi) */}
        <div className="relative md:hidden w-full max-w-[320px] mx-auto mt-10 order-1">
          <img
            src={Group}
            alt="hero background mobile"
            className="w-full h-auto relative z-[1]"
          />
          {/* Gul tuvagi - Mobile */}
          <div className="absolute left-[10%] bottom-[15px] z-[2]">
            {/* Agar gul tuvagi alohida rasm bo'lsa shu yerga qo'yiladi, hozircha CSS mantiqingiz saqlandi */}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-[3] md:pl-[5%] w-full max-w-[650px] order-2 mt-8 md:mt-0">
          <h1 className="font-semibold text-[36px] md:text-[50px] leading-[1.2] md:leading-[55px] text-[#343c44] mb-[25px]">
            Find aspiring talents
            <br className="hidden md:block" />
            and great employers
          </h1>
          <p className="text-[17px] md:text-[18px] leading-[1.5] md:leading-[1.6] text-[#555] mb-[40px] max-w-[90%] md:max-w-full mx-auto md:mx-0">
            Finding the best candidate is always hard. Tell us what{" "}
            <br className="hidden md:block" />
            you are looking for and choose one from among the best.
          </p>
        </div>
      </section>

      {/* --- CARDS SECTION --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] w-[90%] mx-auto pb-[50px]">
        {/* Card 1 */}
        <div className="group bg-white p-[30px] rounded-[20px] transition-all duration-400 border border-transparent flex flex-col items-start text-left hover:-translate-y-[10px] hover:border-[#163d5c] hover:shadow-[0_15px_35px_rgba(22,61,92,0.1)]">
          <img
            src={Mask}
            alt="Recruiter"
            className="w-[45px] h-auto mb-5 transition-transform duration-300 group-hover:scale-110"
          />
          <h1 className="text-[22px] font-bold text-[#163d5c] mb-[15px]">
            Professional <br /> recruiter
          </h1>
          <p className="text-[#555] text-[15px] leading-relaxed">
            Finding the best candidate <br /> is always hard.
          </p>
        </div>

        {/* Card 2 */}
        <div className="group bg-white p-[30px] rounded-[20px] transition-all duration-400 border border-transparent flex flex-col items-start text-left hover:-translate-y-[10px] hover:border-[#163d5c] hover:shadow-[0_15px_35px_rgba(22,61,92,0.1)]">
          <img
            src={Person}
            alt="Jobs"
            className="w-[45px] h-auto mb-5 transition-transform duration-300 group-hover:scale-110"
          />
          <h1 className="text-[22px] font-bold text-[#163d5c] mb-[15px]">
            Find the right <br /> job you want fast
          </h1>
          <p className="text-[#555] text-[15px] leading-relaxed">
            Launch your career <br /> on Workify.
          </p>
        </div>

        {/* Card 3 */}
        <div className="group bg-white p-[30px] rounded-[20px] transition-all duration-400 border border-transparent flex flex-col items-start text-left hover:-translate-y-[10px] hover:border-[#163d5c] hover:shadow-[0_15px_35px_rgba(22,61,92,0.1)]">
          <img
            src={Message}
            alt="Help"
            className="w-[45px] h-auto mb-5 transition-transform duration-300 group-hover:scale-110"
          />
          <h1 className="text-[22px] font-bold text-[#163d5c] mb-[15px]">
            All rofessionals <br /> need some help
          </h1>
          <p className="text-[#555] text-[15px] leading-relaxed">
            As a pro recruiter, you need <br /> various skills to hire <br /> a
            great talent.
          </p>
        </div>

        {/* Card 4 */}
        <div className="group bg-white p-[30px] rounded-[20px] transition-all duration-400 border border-transparent flex flex-col items-start text-left hover:-translate-y-[10px] hover:border-[#163d5c] hover:shadow-[0_15px_35px_rgba(22,61,92,0.1)]">
          <img
            src={Search}
            alt="Searching"
            className="w-[45px] h-auto mb-5 transition-transform duration-300 group-hover:scale-110"
          />
          <h1 className="text-[22px] font-bold text-[#163d5c] mb-[15px]">
            Searching a job may <br /> be long and boring
          </h1>
          <p className="text-[#555] text-[15px] leading-relaxed">
            Landing a good gig can be <br /> hard, when you have a <br /> strong
            competition.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
