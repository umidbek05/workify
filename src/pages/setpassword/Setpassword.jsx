import "../../pages/setpassword/setpassword.css";

const SetNewPassword = () => {
  return (
    <div className="reset-wrapper">
      <div className="reset-card">
        <h2>Set new password</h2>

        <label>New password</label>
        <input
          type="password"
          placeholder="New password"
          className="reset-input"
        />

        <input
          type="password"
          placeholder="Confirm password"
          className="reset-input"
        />

        <button className="reset-btn">Confirm</button>
      </div>
    </div>
  );
};

export default SetNewPassword;
