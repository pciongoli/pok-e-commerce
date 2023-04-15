import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
   return (
      <div>
         <div>
            <h1>Welcome to PokéDegens</h1>
            <p>
               Find the best Pokémon cards to buy and sell.
               <Link to="/products">Browse our selection</Link>.
            </p>
         </div>
      </div>
   );
};

export default Home;
