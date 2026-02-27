import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import TalentSignup from "./pages/signup/TalentSignup";
import TalentSignup2 from "./pages/signup/TalentSignup2";
import TalentSignup3 from "./pages/signup/TalentSignup3";
import Dashboard from "./pages/dashboard/Dashboard";
import Workify from "./pages/Workify/workify";
import Talents from "./pages/Talents/talents";
import Jobs from "./pages/Jobs/jobs";
import Register from "./pages/signup/Register";
import Conguratulation from "./pages/signup/Conguratulation";
import TalentCongratulation from "./pages/signup/TalentCongratulation";
import TalentVerifyCode from "./pages/signup/TalentVerifyCode";
import MyJobs from "./pages/dashboard/MyJobs";
import DashboardHome from "./pages/dashboard/DashboardHome";
import CompanyProfile from "./pages/dashboard/CompanyProfile";
import "./index.css";

import FAQ from "./pages/dashboard/FAQ";
import Contacts from "./pages/dashboard/Contacts";

import Talentss from "./pages/dashboard/Talents";
import Login from "./pages/login/Login";
import Kod from "./pages/forgot/Kod";
import Forget from "./pages/forgot/Forget";
import Setpassword from "./pages/setpassword/Setpassword";

import { ThemeProvider } from "./context/ThemeContext";
import VerifyForget from "./pages/forgot/VerifyForget";
const App = () => {
  return (
    <div>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Workify />} />
          <Route path="/talents" element={<Talents />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/talentsignup" element={<TalentSignup />} />
          <Route path="/talentsignup2" element={<TalentSignup2 />} />
          <Route path="/talentsignup3" element={<TalentSignup3 />} />
          <Route path="/talentCongratulation" element={<TalentCongratulation />} />
          <Route path="/talentVerifyCode" element={<TalentVerifyCode />} />
          <Route path="/register" element={<Register />} />
          <Route path="/congratulation" element={<Conguratulation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/setpassword" element={<Setpassword />} />
          <Route path="/kod" element={<Kod />} />
          <Route path="/verify-forget" element={<VerifyForget />} />

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
