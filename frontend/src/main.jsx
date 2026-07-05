import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/header.css";
import "./styles/footer.css";
import "./styles/home.css";
import "./styles/gendersection.css";
import "./styles/newarrival.css";
import "./styles/bestseller.css";
import "./styles/productdetail.css";
import "./styles/youmayalsolike.css";
import "./styles/featureproduct.css";
import "./styles/loginregister.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);