import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/SignIn.css";

function SignIn() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await signInWithEmailAndPassword(auth, email, password);
         alert("Logged in successfully");
      } catch (error) {
         alert(error.message);
      }
   };

   return (
      <div>
         <h1>Login Page</h1>
         <form onSubmit={handleSubmit}>
            <input
               type="email"
               placeholder="Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <input
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
         </form>
      </div>
   );
}

export default SignIn;
