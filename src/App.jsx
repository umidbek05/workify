import { Routes, Route } from "react-router-dom";
import Signup from './pages/signup/Signup';
import Dashboard from "./pages/dashboard/dashboard";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h2>home page</h2>} />
        <Route path="/about" element={<h2>about page</h2>} />
        <Route path="/signup" element= {<Signup />} />
        <Route path="/dashboard" element= {<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
