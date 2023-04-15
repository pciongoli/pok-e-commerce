// src/components/ProductList.js
import React, { useEffect, useState } from "react";
import client from "../api/shopify";
import { Link } from "react-router-dom";

function ProductList() {
   const [products, setProducts] = useState([]);

   useEffect(() => {
      const fetchProducts = async () => {
         const response = await client.product.fetchAll();
         setProducts(response);
      };

      fetchProducts();
   }, []);

   return (
      <div>
         <h1>Product List</h1>
         <ul>
            {products.map((product) => (
               <li key={product.id}>
                  <Link to={`/product/${product.id}`}>{product.title}</Link>
               </li>
            ))}
         </ul>
      </div>
   );
}

export default ProductList;
