import React from "react";
import { Routes, Route } from "react-router-dom";

// 2. CSS importi
import "./index.css";

// 3. Sahifalar va Komponentlar importi
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
import TalentDashboard from "./pages/talentDashboard/Dashbord";
import Sidebar from "./pages/talentDashboard/Sidebar.jsx";
import JobAlerts from "./pages/talentDashboard/JobAlerts.jsx";
import MyProfile from "./pages/talentDashboard/MyProfile.jsx";
import MainLoyaut from "./pages/talentDashboard/MainLayout.jsx";
import JobMatches from "./pages/talentDashboard/JobMatches.jsx";
import Setting from "./pages/talentDashboard/Setting.jsx";
import Theme from "./pages/talentDashboard/Theme.jsx";
import Faq from "./pages/talentDashboard/Faq.jsx";
import Contact from "./pages/talentDashboard/Contact.jsx";
import Reactions from "./pages/talentDashboard/Reactions.jsx";
import FAQ from "./pages/dashboard/FAQ";
import Contacts from "./pages/dashboard/Contacts";
import Talentss from "./pages/dashboard/Talents";
import Login from "./pages/login/Login";
import Kod from "./pages/forgot/Kod";
import Forget from "./pages/forgot/Forget";
import Setpassword from "./pages/setpassword/Setpassword";
import VerifyForget from "./pages/forgot/VerifyForget";

import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        {/* 1. UMUMIY SAHIFALAR */}
        <Route path="/" element={<Workify />} />
        <Route path="/talents" element={<Talents />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/congratulation" element={<Conguratulation />} />

        {/* Talent Registration flow */}
        <Route path="/talentsignup" element={<TalentSignup />} />
        <Route path="/talentsignup2" element={<TalentSignup2 />} />
        <Route path="/talentsignup3" element={<TalentSignup3 />} />
        <Route
          path="/talentCongratulation"
          element={<TalentCongratulation />}
        />
        <Route path="/talentVerifyCode" element={<TalentVerifyCode />} />

        {/* Password recovery flow */}
        <Route path="/forget" element={<Forget />} />
        <Route path="/kod" element={<Kod />} />
        <Route path="/setpassword" element={<Setpassword />} />
        <Route path="/verify-forget" element={<VerifyForget />} />

        {/* 2. TALENT DASHBOARD (Nested Routes) */}
        <Route element={<MainLoyaut />}>
          <Route path="/talentdashboard" element={<TalentDashboard />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/alerts" element={<JobAlerts />} />
          <Route path="/matches" element={<JobMatches />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/theme" element={<Theme />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/reactions" element={<Reactions />} />
          {/* Sidebar alohida sahifa bo'lsa: */}
          <Route path="/sidebar" element={<Sidebar />} />
        </Route>

        {/* 3. COMPANY DASHBOARD (Nested Routes) */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="companyprofil" element={<CompanyProfile />} />
          <Route path="myjobs" element={<MyJobs />} />
          <Route path="talents" element={<Talentss />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
