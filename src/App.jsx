import React from "react";
import { Routes, Route } from "react-router-dom";



// 2. CSS importi
import "./index.css";

// 3. Sahifalar va Komponentlar importi
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Workify from "./pages/Workify/workify";
import Talents from "./pages/Talents/talents";
import Jobs from "./pages/Jobs/jobs";
import Register from "./pages/signup/Register";
import Conguratulation from "./pages/signup/Conguratulation";
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

const App = () => {
  return (
   
      <Routes>
        {/* Talent Dashboard qismi (Nested Routes) */}
        <Route element={<MainLoyaut />}>
          <Route path="/talentdashboard" element={<TalentDashboard />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/alerts" element={<JobAlerts />} />
          <Route path="/mainLoyaut" element={<MainLoyaut />} />
          <Route path="/matches" element={<JobMatches />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/theme" element={<Theme />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/reactions" element={<Reactions />} />
        </Route>

        {/* Umumiy sahifalar */}
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
        <Route path="/verify-forget" element={<VerifyForget />} />

        {/* Company Dashboard qismi (Nested Routes) */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="companyprofil" element={<CompanyProfile />} />
          <Route path="myjobs" element={<MyJobs />} />
          <Route path="talents" element={<Talentss />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
      </Routes>
  );
};

export default App;