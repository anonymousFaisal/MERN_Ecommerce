import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import ProductByBrand from "./pages/ProductByBrand";
import ProductByCategory from "./pages/ProductByCategory";
import ProductBySearch from "./pages/ProductBySearch";
import ProductDetails from "./pages/ProductDetails";

// Main App component

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/by-brand/:brandID" element={<ProductByBrand/>} />
        <Route path="/by-category/:categoryID" element={<ProductByCategory/>} />
        <Route path="/by-search/:searchQuery" element={<ProductBySearch/>} />
        <Route path="/details/:productID" element={<ProductDetails/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
