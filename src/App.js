// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth } from "./firebase";
import { CartContext } from "../src/contexts/CartContext";

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
   const [cart, setCart] = useState([]);

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
         <CartContext.Provider value={{ cart, setCart }}>
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
         </CartContext.Provider>
      </Router>
   );
}

export default App;
