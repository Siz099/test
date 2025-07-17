import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';

// Add this for debugging
console.log("Starting application");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Remove StrictMode as it can cause double renders which might interfere with navigation
  <App />
);
