import { useEffect } from "react";
import "../../pages/Workify/workify.css";
import Header from "../../Components/Header/header";
import Group from "../../assets/Group.png";
import Footer from "../../Components/Footer/footer";
import Mask from "../../assets/Mask.png";
import Person from "../../assets/person.png";
import Message from "../../assets/message.png";
import Search from "../../assets/search.png";

export default function Workify() {
  
  // Sahifa yangilanganda yoki kirilganda har doim tepadan boshlanishi uchun
  useEffect(() => {
    // 1. Scrollni darhol tepaga qaytarish
    window.scrollTo(0, 0);

    // 2. Ba'zi brauzerlarda refreshdan keyin scrollni eslab qolish xususiyati bor, 
    // uni o'chirib qo'yamiz (ixtiyoriy lekin foydali)
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <>
      <Header />
      <section className="hero">
        <div className="herofoto"></div>

        <img src={Group} alt="hero background" className="hero-bg" />

        <div className="hero-content">
          <h1>
            Find aspiring talents
            <br />
            and great employers
          </h1>
          <p>
            Finding the best candidate is always hard. Tell us what <br />
            you are looking for and choose one from among the best.
          </p>
        </div>
      </section>

      <div className="Card">
        <div className="first">
          <img src={Mask} alt="" />

          <h1>
            Professional <br /> recruiter
          </h1>
          <p>
            Finding the best candidate <br /> is always hard.
          </p>
        </div>

        <div className="thirst">
          <img src={Person} alt="" />
          <h1>
            Find the right <br /> job you want fast
          </h1>
          <p>
            Launch your career <br /> on Workify.
          </p>
        </div>

        <div className="second">
          <img src={Message} alt="" />
          <h1>
            All rofessionals <br /> need some help
          </h1>
          <p>
            As a pro recruiter, you need <br /> various skills to hire <br /> a
            great talent.
          </p>
        </div>

        <div className="fourth">
          <img src={Search} alt="" />
          <h1>
            Searching a job may <br /> be long and boring
          </h1>
          <p>
            Landing a good gig can be <br /> hard, when you have a <br /> strong
            competition.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}