import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Providerlarni import qilish

import { JobReactionsProvider } from "./Context/JobReactionsContext.jsx";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      {/* Ma'lumotlar zanjiri: Theme -> Reactions -> App */}

      <JobReactionsProvider>
        <Toaster position="top-right" />
        <App />
      </JobReactionsProvider>
    </BrowserRouter>
  </StrictMode>
);
