import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import { UserSessionProvider } from "./context/UserSessionContext";

// Add this for debugging
console.log("Starting application");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserSessionProvider>
    <App />
  </UserSessionProvider>
);
