import "./MyJobs.css";

const MyJobs = () => {
  return (
    <div className="myjobs-container">
      {/* Top Navigation Bar */}
      <div className="top-nav">
        <h1 className="nav-title">Dashboard</h1>
        <div className="nav-actions">
          <button className="post-job-btn">Post a Job</button>
        </div>
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
