// src/components/Footer.js
import React from "react";
import "../styles/Footer.css";

const Footer = () => {
   return (
      <footer>
         <p>
            &copy; {new Date().getFullYear()} Pokémon Card Marketplace. All
            rights reserved.
         </p>
      </footer>
   );
};

export default Footer;
