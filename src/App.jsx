// src/App.jsx
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import CartPage from "./components/CartPage";
import { CartProvider } from "./context/CartContext";  
import ProductListingPage from "./components/ProductListingPage"; 
import Profile from './components/Profile'; 
import ControlPanel from './components/ControlPanel';  
import { ProductProvider } from './context/ProductContext'; 

const App = () => {
  return (
    <CartProvider>
      <ProductProvider>  {/* Wrap the app with ProductProvider */}
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/control-panel" element={<ControlPanel />} />
          </Routes>
        </Router>
      </ProductProvider>
    </CartProvider>
  );
};

export default App;
