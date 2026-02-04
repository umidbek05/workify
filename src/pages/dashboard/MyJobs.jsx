import "./MyJobs.css";

const MyJobs = () => {
  return (
    <div className="myjobs-container">
      <div className="dashboard-big">
        <div className="dashboard-h1">
          <h1>Dashboard</h1>
        </div>
          <button>Post a Job</button>
      </div>

      {/* Search Bar */}
      <div className="jobs-search">
        <input type="text" placeholder="Search" className="search-input" />
        <button className="search-btn">Search</button>
      </div>
    </div>
  );
};

export default MyJobs;
