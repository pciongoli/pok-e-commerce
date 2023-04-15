// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

function Header({ currentUser }) {
   return (
      <header>
         <nav>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            {currentUser ? (
               <>
                  <Link to="/profile">Profile</Link>
                  <button onClick={() => auth.signOut()}>Sign Out</button>
               </>
            ) : (
               <>
                  <Link to="/signin">Sign In</Link>
                  <Link to="/signup">Sign Up</Link>
               </>
            )}
            <Link to="/cart">Cart</Link>
         </nav>
      </header>
   );
}

export default Header;
