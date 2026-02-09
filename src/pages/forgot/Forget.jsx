import { useState } from "react";
import { MdEmail, MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";
import "./Forget.css";

const Forget = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleNext = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Iltimos, email manzilingizni kiriting!");
      return;
    }

    // Emailni keyingi sahifaga uzatish
    // 1. LocalStorage-ga saqlaymiz (ehtiyot shart)
    localStorage.setItem("resetEmail", email);

    // 2. Navigate orqali 'state' ichida yuboramiz (VerifyForget sahifasi uchun)
    navigate("/verify-forget", { state: { email: email } });
  };

  return (
    <div className="forget-page-container">
      <Header />
      <div className="forget-wrapper">
        <div className="forget-card">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <MdArrowBackIosNew /> Back
          </button>

          <div className="forget-header">
            <h2>Forgot Password?</h2>
            <p>Enter your email address to receive a verification code.</p>
          </div>

          <form onSubmit={handleNext}>
            <div className="input-group">
              <div className="input-box">
                <MdEmail className="icon" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="forget-btn next">
              Send Code
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Forget;
