import "./footer.css";
import Insta from "../../assets/insta.png";
import Face from "../../assets/face.png";
import Youtube from "../../assets/youtube.png";
import Telegram from "../../assets/telegram.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h1>workify</h1>
          <p>Job posting platform</p>
          <button>
            <a href="">Contacts</a>
          </button>
        </div>

        <div className="footer-links">
          <div className="link-column">
            <h3>General</h3>
            <ul>
              <a href="/signup">Sign up</a> <br />
              <a href="">Contacts</a> <br />
              <a href="">About</a> <br />
            </ul>
          </div>

          <div className="link-column">
            <h3>Company</h3>
            <ul>
              <a href="">Post a job</a> <br />
              <a href="">Search talents</a> <br />
              <a href="">Company login</a> <br />
            </ul>
          </div>

          <div className="link-column">
            <h3>Talents</h3>
            <ul>
              <a href="">Search jobs</a> <br />
              <a href="">Talent login</a> <br />
            </ul>
          </div>
        </div>
      </div>

      <div className="foot">
        <div className="footer-bottom">
          <p>All rights reserved 2021</p>
        </div>

        <div className="img">
          <img src={Insta} alt="muhiddin_ks" />
          <img src={Face} alt="Facebook" />
          <img src={Youtube} alt="YouTube" />
          <img src={Telegram} alt="Telegram" />
        </div>
      </div>
    </footer>
  );
}
