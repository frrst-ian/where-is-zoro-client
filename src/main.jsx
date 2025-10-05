import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import {UserProvider} from "../src/context/UserContext";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
