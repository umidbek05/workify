import { Routes, Route } from "react-router-dom";
import Signup from './pages/signup/Signup';
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/login/Login";
import Forget from "./pages/forgot/Forget";
import SetNewPassword from "./pages/setpassword/Setpassword";
import CompanyProfile from "./pages/dashboard/CompanyProfile";
import Kod from "./pages/forgot/kod";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h2>home page</h2>} />
        <Route path="/about" element={<h2>about page</h2>} />
        <Route path="/signup" element= {<Signup />} />
        <Route path="/dashboard" element= {<Dashboard />} />
        <Route path="/login" element= {<Login/>} />
        <Route path="/forget" element={<Forget/>} />
        <Route path="/kod" element={<Kod/>} />
        <Route path="/setpassword" element={<SetNewPassword/>} />
        <Route path="/company-profile" element={<CompanyProfile/>} />
      </Routes>
    </div>
  );
};

export default App;
