import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../../pages/signup/Register.css";
import click from "../../assets/click.png";

function Register() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      const lastIndex = code
        .map((c, i) => (c !== "" ? i : null))
        .filter((i) => i !== null)
        .pop();

      if (lastIndex !== undefined) {
        const newCode = [...code];
        newCode[lastIndex] = "";
        setCode(newCode);
      }
      return;
    }

    if (!/^[0-9]$/.test(e.key)) return;

    const index = code.findIndex((c) => c === "");
    if (index === -1) return;

    const newCode = [...code];
    newCode[index] = e.key;
    setCode(newCode);
  };


    const location = useLocation();
const realCode = location.state?.code;
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="card">
        <h1>
          Start our Telegram bot to be notified when we find the best talent for
          you!
        </h1>

        <button
  className="primary"
  onClick={() => {
    window.open("https://t.me/workfy_login_bot?start=25", "_blank");
  }}
>
  Click here!
</button>

        <div className="image-box">
          <img src={click} alt="preview" />
        </div>

        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          maxLength={6}
          onKeyDown={handleKeyDown}
          className="hidden-input"
          autoFocus
        />

        <div className="digits" onClick={() => inputRef.current.focus()}>
          {code.map((d, i) => (
            <div key={i} className={d ? "filled" : "empty"}>
              {d}
            </div>
          ))}
        </div>

        <div className="nav-buttons">
          <button className="back" onClick={() => navigate("/signup")}>Back</button>
<button
  className="next"
  onClick={() =>  {navigate("/congratulation")}}>Next
</button>
        </div>  
      </div>
    </div>
  );
}

export default Register;
