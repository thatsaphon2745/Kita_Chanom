// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./client/StartPage";
import MenuPage from "./client/MenuPage";
import CustomPage from "./client/CustomPage";
import CartPage  from "./client/CartPage";
import QrcodePage from "./client/QrcodePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/custom" element={<CustomPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/qrcode" element={<QrcodePage />} />
      </Routes>
    </Router>
  );
}

export default App;