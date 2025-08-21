import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductByBrand from "./pages/ProductByBrand";
import ProductByCategory from "./pages/ProductByCategory";
import ProductBySearch from "./pages/ProductBySearch";
import ProductDetails from "./pages/ProductDetails";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import AboutPage from "./pages/AboutPage";
import RefundPage from "./pages/RefundPage";
import HowToBuyPage from "./pages/HowToBuyPage";
import ContactPage from "./pages/ContactPage";
import ComplainPage from "./pages/ComplainPage";

// Main App component

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/by-brand/:brandID" element={<ProductByBrand />} />
        <Route path="/by-category/:categoryID" element={<ProductByCategory />} />
        <Route path="/by-search/:searchQuery" element={<ProductBySearch />} />
        <Route path="/details/:productID" element={<ProductDetails />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="/how-to-buy" element={<HowToBuyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/complain" element={<ComplainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
