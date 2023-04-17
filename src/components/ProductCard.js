// src/components/ProductCard.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import client from "../api/shopify";
import "../styles/ProductCard.css";

function ProductCard() {
   const { id } = useParams();
   const [product, setProduct] = useState(null);

   useEffect(() => {
      const fetchProduct = async () => {
         const response = await client.product.fetch(id);
         if (response) {
            setProduct(response);
         } else {
            console.log("No product found");
         }
      };

      fetchProduct();
   }, [id]);

   return (
      <div>
         <h1>Product Card</h1>
         {product ? (
            <div>
               <img
                  src={product.images[0]?.src}
                  alt={product.title}
                  width="300"
                  height="300"
               />
               <h2>{product.title}</h2>
               <p>{product.description}</p>
               <p>
                  Price: {product.variants[0]?.priceV2.currencyCode}{" "}
                  {product.variants[0]?.priceV2.amount}
               </p>
            </div>
         ) : (
            <p>Loading product details...</p>
         )}
      </div>
   );
}

export default ProductCard;
