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

import FAQ from "./pages/dashboard/FAQ";
import Contacts from "./pages/dashboard/Contacts";

import Talentss from "./pages/dashboard/Talents";
import Login from "./pages/login/Login";
import Kod from "./pages/forgot/Kod";
import Forget from "./pages/forgot/Forget";
import Setpassword from "./pages/setpassword/Setpassword";

import { ThemeProvider } from "./context/ThemeContext";
const App = () => {
  return (
    <div>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Workify />} />
          <Route path="/talents" element={<Talents />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<Register />} />
          <Route path="/congratulation" element={<Conguratulation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/setpassword" element={<Setpassword />} />
          <Route path="/kod" element={<Kod />} />

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
      </ThemeProvider>
    </div>
  );
};

export default App;
