import "../../pages/Talents/talents.css";
import Footer from "../../Components/Footer/footer";
import Header from "../../Components/Header/header";
import Stefan from "../../assets/stefan.png";
import { LocateIcon } from "lucide-react";

export default function Talents() {
  return (
    <>
      <Header />

      <section className="talent-card">
        <h1>1.256 talents</h1>
        <hr />
        <div className="all-cards">
          <div className="cards">
            <div className="items">
              <div className="talent">
                <img src={Stefan} alt="" />
                <h3>
                  UX / UI Designer <p>Abrorbek Ibrokhimov</p>
                </h3>
              </div>
              <div className="location">
                <h4>
                  {" "}
                  <LocateIcon /> Ferghana, Uzbeksitan
                </h4>
                <h3>$1.250.00</h3>
              </div>
            </div>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content
            </p>

            <div className="skills">
              <h4>Required skills</h4>

              <div className="skills-button">
                <button>Figma (2 years)</button>
                <button>Adobe Photoshop (1 years)</button>
                <button>Adobe Photoshop (1 years)</button>
                <button>Adobe XD (1 year)</button>
              </div>
            </div>
            <div className="view-profile">
              <button className="view">View profile</button>
              <button className="resume">Resume</button>
            </div>
          </div>

          <div className="cards">
            <div className="items">
              <div className="talent">
                <img src={Stefan} alt="" />
                <h3>
                  UX / UI Designer <p>Abrorbek Ibrokhimov</p>
                </h3>
              </div>
              <div className="location">
                <h4>
                  {" "}
                  <LocateIcon /> Ferghana, Uzbeksitan
                </h4>
                <h3>$1.250.00</h3>
              </div>
            </div>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content
            </p>

            <div className="skills">
              <h4>Required skills</h4>

              <div className="skills-button">
                <button>Figma (2 years)</button>
                <button>Adobe Photoshop (1 years)</button>
                <button>Adobe Photoshop (1 years)</button>
                <button>Adobe XD (1 year)</button>
              </div>
            </div>
            <div className="view-profile">
              <button className="view">View profile</button>
              <button className="resume">Resume</button>
            </div>
          </div>

          <div className="cards">
            <div className="items">
              <div className="talent">
                <img src={Stefan} alt="" />
                <h3>
                  UX / UI Designer <p>Abrorbek Ibrokhimov</p>
                </h3>
              </div>
              <div className="location">
                <h4>
                  {" "}
                  <LocateIcon /> Ferghana, Uzbeksitan
                </h4>
                <h3>$1.250.00</h3>
              </div>
            </div>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content
            </p>

            <div className="skills">
              <h4>Required skills</h4>

              <div className="skills-button">
                <button>Figma (2 years)</button>
                <button>Adobe Photoshop (1 years)</button>
                <button>Adobe Photoshop (1 years)</button>
                <button>Adobe XD (1 year)</button>
              </div>
            </div>
            <div className="view-profile">
              <button className="view">View profile</button>
              <button className="resume">Resume</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
