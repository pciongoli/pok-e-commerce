// src/components/ProductList.js
import React, { useEffect, useState, useContext } from "react";
import client from "../api/shopify";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import "../styles/ProductList.css";

function ProductList() {
   const [products, setProducts] = useState([]);
   const { cart, setCart } = useContext(CartContext);

   useEffect(() => {
      const fetchProducts = async () => {
         const query = `
    query {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

         try {
            const response = await client.request(query);
            setProducts(response.products.edges.map((edge) => edge.node));
         } catch (error) {
            console.error("Error fetching products:", error);
         }
      };

      fetchProducts();
   }, []);

   const addToCart = (product) => {
      const existingItem = cart.find(
         (item) => item.id === product.variants[0].id
      );
      if (existingItem) {
         setCart(
            cart.map((item) =>
               item.id === product.variants[0].id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
            )
         );
      } else {
         setCart([
            ...cart,
            {
               id: product.variants[0].id,
               title: product.title,
               price: parseFloat(product.variants[0].priceV2.amount),
               quantity: 1,
            },
         ]);
      }
   };

   return (
      <div className="product-list">
         <h1>Product List</h1>
         <div className="product-list-grid">
            {products.map((product) => {
               console.log("Rendering product:", product);
               return (
                  <div key={product.id} className="product-card">
                     <img
                        src={product.images[0]?.src}
                        alt={product.title}
                        width="200"
                        height="200"
                     />
                     <h2>{product.title}</h2>
                     <p>{product.description.substr(0, 100)}...</p>
                     <p>
                        Price: {product.variants[0]?.priceV2.currencyCode}{" "}
                        {product.variants[0]?.priceV2.amount}
                     </p>
                     <button onClick={() => addToCart(product)}>
                        Add to Cart
                     </button>
                     <Link
                        to={`/product/${product.id}`}
                        className="view-more-btn"
                     >
                        View More
                     </Link>
                  </div>
               );
            })}
         </div>
      </div>
   );
}

export default ProductList;
