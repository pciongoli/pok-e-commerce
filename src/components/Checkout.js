// src/components/Checkout.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import client, { createCheckout } from "../api/shopify";
import { CartContext } from "../contexts/CartContext";

function Checkout() {
   const { cart } = useContext(CartContext);
   const [email, setEmail] = useState("");
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const lineItems = cart.map((item) => ({
            variantId: item.id,
            quantity: item.quantity,
         }));

         const checkout = await createCheckout(client, {
            email,
            lineItems,
         });

         if (checkout) {
            window.location.assign(checkout.webUrl);
         }
      } catch (err) {
         setError(err.message);
      }
   };

   return (
      <div>
         <h1>Checkout</h1>
         {error && <p>{error}</p>}
         <form onSubmit={handleSubmit}>
            <div>
               <label htmlFor="email">Email:</label>
               <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
            </div>
            <button type="submit">Checkout</button>
         </form>
      </div>
   );
}

export default Checkout;
