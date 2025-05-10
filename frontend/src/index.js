import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/index.css"
// Import Ant Design CSS directly in JavaScript instead
//import "antd/dist/antd.css" // For Ant Design v4
// If you're using Ant Design v5, use this instead:
import "antd/dist/reset.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
