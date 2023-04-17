// src/components/Header.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import "../styles/Header.css";

const Header = () => {
   const [currentUser, setCurrentUser] = useState(null);
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
         setCurrentUser(user);
      });

      return () => {
         unsubscribe();
      };
   }, []);

   const handleLogout = async () => {
      try {
         await auth.signOut();
      } catch (error) {
         console.error("Failed to log out:", error);
      }
   };

   const handleLinkClick = () => {
      setIsMenuOpen(false);
   };

   return (
      <header className="header-container">
         <h1>
            <Link to="/" onClick={handleLinkClick}>
               PokéDegens
            </Link>
         </h1>
         <nav className={`nav-links ${isMenuOpen ? "show" : ""}`}>
            <Link to="/products" onClick={handleLinkClick}>
               Products
            </Link>
            <Link to="/cart" onClick={handleLinkClick}>
               Cart
            </Link>
            {!currentUser && (
               <>
                  <Link to="/signin" onClick={handleLinkClick}>
                     Sign In
                  </Link>
                  <Link to="/signup" onClick={handleLinkClick}>
                     Sign Up
                  </Link>
               </>
            )}
            {currentUser && (
               <>
                  <Link to="/profile" onClick={handleLinkClick}>
                     Profile
                  </Link>
                  <Link to="/" onClick={handleLogout}>
                     Logout
                  </Link>
               </>
            )}
         </nav>
         <button
            className="hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
         >
            <span></span>
            <span></span>
            <span></span>
         </button>
      </header>
   );
};

export default Header;
