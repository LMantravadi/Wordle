import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import WordleContextProvider from "./context/AppSlice.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WordleContextProvider>
      <App />
    </WordleContextProvider>
  </StrictMode>
);
