import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// Providerlarni import qilish
import { ThemeProvider } from "./Context/ThemeContext.jsx"; 
import { JobReactionsProvider } from "./Context/JobReactionsContext.jsx";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      {/* Ma'lumotlar zanjiri: Theme -> Reactions -> App */}
      <ThemeProvider>
        <JobReactionsProvider>
          <App />
        </JobReactionsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);