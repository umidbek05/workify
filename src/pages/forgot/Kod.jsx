import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Kod.css";

function Kod() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleNext = () => {
    const finalCode = code.join("");

    // agar xohlasang bu yerda API tekshiruv bo‘ladi
    console.log("Kiritilgan kod:", finalCode);

    navigate("/setpassword"); // 🔥 shu yerda o‘tadi
  };

  const isComplete = code.every((item) => item !== "");

  return (
    <div className="kod-wrapper">
      <h2>Kodni kiriting</h2>

      <div className="kod-box">
        {code.map((item, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength="1"
            value={item}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      <button
        className="next-btn"
        disabled={!isComplete}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
}

export default Kod;
