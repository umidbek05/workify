import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h2>home page</h2>} />
        <Route path="/about" element={<h2>about page</h2>} />
      </Routes>
    </div>
  );
};

export default App;
