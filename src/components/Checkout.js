// src/components/Checkout.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import client, { createCheckout } from "../api/shopify";

function Checkout() {
   const [email, setEmail] = useState("");
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const checkout = await createCheckout(client, {
            email,
            lineItems: [
               // Add the line items from your cart here
               // Example: { variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8x', quantity: 2 }
            ],
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
