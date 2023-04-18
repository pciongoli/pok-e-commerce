// src/index.js
import React from "react";
import { createRoot } from "react-dom";
import App from "./App";
import "./index.css";

import { CartProvider } from "../src/contexts/CartContext";
import reportWebVitals from "./reportWebVitals";

createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <CartProvider>
         <App />
      </CartProvider>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
