// src/components/Checkout.js
import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { createCheckout } from "../api/shopify";
import "../styles/Checkout.css";

const Checkout = () => {
   const { cart } = useContext(CartContext);

   const handleCheckout = async () => {
      if (cart.length === 0) {
         alert("Your cart is empty!");
         return;
      }

      const checkout = await createCheckout();

      if (checkout) {
         window.location.assign(checkout.webUrl);
      } else {
         alert(
            "There was an error processing your checkout. Please try again."
         );
      }
   };

   return (
      <div className="checkout">
         <h1>Checkout</h1>
         <button onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
   );
};

export default Checkout;
