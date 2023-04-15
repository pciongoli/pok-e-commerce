// src/components/UserProfile.js
import React, { useState, useEffect } from "react";
import { auth, firestore } from "../firebase";

function UserProfile() {
   const [profileData, setProfileData] = useState(null);

   useEffect(() => {
      const fetchUserProfile = async () => {
         const user = auth.currentUser;
         if (user) {
            const docRef = firestore.collection("user_profiles").doc(user.uid);
            const doc = await docRef.get();
            if (doc.exists) {
               setProfileData(doc.data());
            } else {
               console.log("No profile data found");
            }
         } else {
            console.log("No user is signed in");
         }
      };

      fetchUserProfile();
   }, []);

   return (
      <div>
         <h1>User Profile</h1>
         {profileData ? (
            <div>
               <h2>{profileData.displayName}</h2>
               <p>Email: {profileData.email}</p>
               <p>Joined: {profileData.joined.toDate().toLocaleDateString()}</p>
            </div>
         ) : (
            <p>Loading profile data...</p>
         )}
      </div>
   );
}

export default UserProfile;
