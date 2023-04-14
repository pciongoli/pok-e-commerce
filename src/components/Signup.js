import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Signup() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await createUserWithEmailAndPassword(auth, email, password);
         alert("Account created successfully");
      } catch (error) {
         alert(error.message);
      }
   };

   return (
      <div>
         <h1>Signup Page</h1>
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
            <button type="submit">Signup</button>
         </form>
      </div>
   );
}

export default Signup;
