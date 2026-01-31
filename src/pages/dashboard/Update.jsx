import "./update.css";

// setOpen funksiyasini prop sifatida qabul qilamiz
const Update = ({ setOpen }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {/* Tugma bosilganda setOpen(false) bo'ladi va oyna yopiladi */}
        <button className="close-btn" onClick={() => setOpen(false)}>
          ×
        </button>

        <h2>Edit Company details</h2>

        <div className="form-grid">
          <input placeholder="Company name" />
          <input placeholder="Phone" />
          <input placeholder="Website" />
          <input placeholder="Industry" />
          <input placeholder="Country" />
          <input placeholder="City" />
        </div>

        <textarea placeholder="About"></textarea>

        <button className="save-btn">Save</button>
      </div>
    </div>
  );
};

export default Update;
