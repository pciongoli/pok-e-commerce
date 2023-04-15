// src/components/ShoppingCart.js
import React, { useState } from "react";

function ShoppingCart() {
   const [cart, setCart] = useState([
      // Sample cart items, replace with your actual cart items
      {
         id: "1",
         title: "Product 1",
         price: 10,
         quantity: 1,
      },
      {
         id: "2",
         title: "Product 2",
         price: 20,
         quantity: 2,
      },
   ]);

   const handleQuantityChange = (id, newQuantity) => {
      setCart((prevCart) =>
         prevCart.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
         )
      );
   };

   const handleRemoveItem = (id) => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
   };

   const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
   );

   return (
      <div>
         <h1>Shopping Cart</h1>
         <ul>
            {cart.map((item) => (
               <li key={item.id}>
                  <h2>{item.title}</h2>
                  <p>Price: ${item.price}</p>
                  <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                  <input
                     type="number"
                     id={`quantity-${item.id}`}
                     value={item.quantity}
                     min="1"
                     onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                     }
                  />
                  <button onClick={() => handleRemoveItem(item.id)}>
                     Remove
                  </button>
               </li>
            ))}
         </ul>
         <p>Total Price: ${totalPrice}</p>
      </div>
   );
}

export default ShoppingCart;
