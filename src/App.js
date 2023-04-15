// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import client from "./api/shopify";
import { auth } from "./firebase";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductCard from "./components/ProductCard";
import ShoppingCart from "./components/ShoppingCart";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserProfile from "./components/UserProfile";
import Checkout from "./components/Checkout";

function App() {
   const [currentUser, setCurrentUser] = useState(null);

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
         setCurrentUser(user);
      });

      // Cleanup function to avoid memory leaks
      return () => {
         unsubscribe();
      };
   }, []);

   return (
      <Router>
         <div className="App">
            <Header currentUser={currentUser} />
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/products" element={<ProductList />} />
               <Route path="/product/:id" element={<ProductCard />} />
               <Route path="/cart" element={<ShoppingCart />} />
               <Route path="/signin" element={<SignIn />} />
               <Route path="/signup" element={<SignUp />} />
               <Route path="/profile" element={<UserProfile />} />
               <Route path="/checkout" element={<Checkout />} />
            </Routes>
            <Footer />
         </div>
      </Router>
   );
}

export default App;
