import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/dashboard";
import Workify from "./pages/Workify/workify"
import Talents from "./pages/Talents/talents";
import Jobs from "./pages/Jobs/jobs";
import Register from "./pages/signup/Register";
import Conguratulation from "./pages/signup/Conguratulation";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Workify/>} />
        <Route path="/talents" element={<Talents/>} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/signup" element= {<Signup />} />
        <Route path="/dashboard" element= {<Dashboard />} />
        <Route path="/register" element= {<Register />} />
        <Route path="/congratulation" element= {<Conguratulation />} />
      </Routes>
    </div>
  );
};

export default App;
