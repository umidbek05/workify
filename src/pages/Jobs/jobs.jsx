import "../../pages/Jobs/jobs.css";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";
import { LocateIcon, Stars, StarsIcon } from "lucide-react";
import Logo from "../../assets/Logo.png";
import Star from "../../assets/Star 1.png";
import Star1 from "../../assets/Star 2.png";
import { BiDislike } from "react-icons/bi";
export default function Jobs() {
  return (
    <>
      <Header />
      <section className="jobs-card">
        <h1>1.256 jobs</h1>
        <hr />
        <div className="all-jobs-cards">
          <div className="cards-job">
            <div className="items-job">
              <div className="jobs">
                <img src={Logo} alt="" />
                <h3>
                  TechCells
                  <p>Computer Software</p>
                  <div className="stars">
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star1} alt="" />
                    <p className="rating">(4.0)</p>
                    <p className="rating">1K reviews</p>
                  </div>
                </h3>
              </div>
              <div className="location-job">
                <h4>
                  {" "}
                  <LocateIcon /> Tashkent, Uzbekistan
                </h4>
                <h3>4 days ago</h3>

                <button>Now hiring</button>
              </div>
            </div>
            <div className="dizayn-title">
              <h3 className="dizayn">UX / UI Designer</h3>
              <h4 className="dizayn">$400-1.000</h4>
            </div>
            <p className="about">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The{" "}
              <br />
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as...more
            </p>

            <div className="skills-job">
              <h4>Required skills:</h4>

              <div className="skills-button">
                <button>Figma (2 years)</button>
                <button>Adobe Photoshop (1 years)</button>
              </div>
              <div className="skills-button">
                <button>Responsive UX/UI (6 years)</button>
                <button>Adobe XD (1 year)</button>
              </div>
            </div>
            <div className="view-profile-job">
              <button className="dislikee">
                <BiDislike className="dislake" />
              </button>

              <button className="view">Quick apply</button>
              <button className="resume">View job post</button>
            </div>
          </div>

          <div className="cards-job">
            <div className="items-job">
              <div className="jobs">
                <img src={Logo} alt="" />
                <h3>
                  TechCells
                  <p>Computer Software</p>
                  <div className="stars">
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star1} alt="" />
                    <p className="rating">(4.0)</p>
                    <p className="rating">1K reviews</p>
                  </div>
                </h3>
              </div>
              <div className="location-job">
                <h4>
                  {" "}
                  <LocateIcon /> Tashkent, Uzbekistan
                </h4>
                <h3>4 days ago</h3>

                <button>Now hiring</button>
              </div>
            </div>
            <div className="dizayn-title">
              <h3 className="dizayn">UX / UI Designer</h3>
              <h4 className="dizayn">$400-1.000</h4>
            </div>
            <p className="about">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The{" "}
              <br />
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as...more
            </p>

            <div className="skills-job">
              <h4>Required skills:</h4>

              <div className="skills-button">
                <button>Figma (2 years)</button>
                <button>Adobe Photoshop (1 years)</button>
              </div>
              <div className="skills-button">
                <button>Responsive UX/UI (6 years)</button>
                <button>Adobe XD (1 year)</button>
              </div>
            </div>
            <div className="view-profile-job">
              <button className="dislikee">
                <BiDislike className="dislake" />
              </button>

              <button className="view">Quick apply</button>
              <button className="resume">View job post</button>
            </div>
          </div>

          <div className="cards-job">
            <div className="items-job">
              <div className="jobs">
                <img src={Logo} alt="" />
                <h3>
                  TechCells
                  <p>Computer Software</p>
                  <div className="stars">
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star1} alt="" />
                    <p className="rating">(4.0)</p>
                    <p className="rating">1K reviews</p>
                  </div>
                </h3>
              </div>
              <div className="location-job">
                <h4>
                  {" "}
                  <LocateIcon /> Tashkent, Uzbekistan
                </h4>
                <h3>4 days ago</h3>

                <button>Now hiring</button>
              </div>
            </div>
            <div className="dizayn-title">
              <h3 className="dizayn">UX / UI Designer</h3>
              <h4 className="dizayn">$400-1.000</h4>
            </div>
            <p className="about">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The{" "}
              <br />
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as...more
            </p>

            <div className="skills-job">
              <h4>Required skills:</h4>

              <div className="skills-button">
                <button>Figma (2 years)</button>
                <button>Adobe Photoshop (1 years)</button>
              </div>
              <div className="skills-button">
                <button>Responsive UX/UI (6 years)</button>
                <button>Adobe XD (1 year)</button>
              </div>
            </div>
            <div className="view-profile-job">
              <button className="dislikee">
                <BiDislike className="dislake" />
              </button>

              <button className="view">Quick apply</button>
              <button className="resume">View job post</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
