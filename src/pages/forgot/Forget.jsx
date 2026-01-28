import { MdEmail } from "react-icons/md";
import "../../pages/forgot/forget.css";
import { useNavigate } from "react-router-dom";
const Forget = () => {

  const navigate = useNavigate();
  return (
    <div className="forget-wrapper">
      <div className="forget-card">

        <div className="input-box">
          <MdEmail className="icon" />
          <input type="email" placeholder="Email" />
        </div>

        <button className="forget-btn send">
          Send password
        </button>

        <button onClick={() => navigate("/kod")} className="forget-btn next">
          Next
        </button>

      </div>
    </div>
  );
};

export default Forget;
