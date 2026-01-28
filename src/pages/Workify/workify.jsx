import "../../pages/Workify/workify.css";
import Header from "../../Components/Header/header";
import Group from "../../assets/Group.png";
import Footer from "../../Components/Footer/footer";
import Diplomat from "../../assets/diplomat.png";
import Gul from "../../assets/Gul.png";
import Mask from "../../assets/Mask.png";
import Person from "../../assets/person.png";
import Message from "../../assets/message.png";
import Search from "../../assets/search.png";
import Rectangle from "../../assets/Rectangle.png";
export default function Workify() {
  return (
    <>
      <Header />
      <section className="hero">
        <div className="herofoto">
          <img src={Gul} alt="" />
        </div>
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
          <div className="Texta">
            <div className="texta1">
              <h2>Hire a talent</h2>
            </div>
            <div className="texta2">
              <h3>Find a job</h3>
            </div>
          </div>
          <div className="search">
            <img src={Diplomat} alt="" />
            <input placeholder="Who are you looking for?" />
            <p></p>
            <img src={Diplomat} alt="" />
            <input placeholder="What job are you looking for?" />
            <button>Search</button>
          </div>
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
