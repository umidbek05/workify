import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Workify from "./pages/Workify/workify";
import Talents from "./pages/Talents/talents";
import Jobs from "./pages/Jobs/jobs";
import Register from "./pages/signup/Register";
import Conguratulation from "./pages/signup/Conguratulation";
import MyJobs from "./pages/dashboard/MyJobs";
import DashboardHome from "./pages/dashboard/DashboardHome";
import CompanyProfile from "./pages/dashboard/MyCompany";
import FAQ from "../src/pages/dashboard/FAQ";
import Contacts from "../src/pages/dashboard/Contacts";
import Talentss from "./pages/dashboard/Talents";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Workify />} />
        <Route path="/talents" element={<Talents />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/congratulation" element={<Conguratulation />} />
        <Route path="/dashboard" element={<Dashboard />}>
          {/* DEFAULT PAGE */}
          <Route index element={<DashboardHome />} />

          {/* SIDEBAR PAGES */}
          <Route path="companyprofil" element={<CompanyProfile />} />
          <Route path="myjobs" element={<MyJobs />} />
          <Route path="talents" element={<Talentss />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
