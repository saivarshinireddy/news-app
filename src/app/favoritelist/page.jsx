'use client';
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase/config'; // Import your Firestore instance
import Favorites from '../favorites';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'next/router';
import NavBar from '../nav';
const FavoritesList = () => {
  const [user, loading, error] = useAuthState(auth);
  const [favorites, setFavorites] = useState([]);
    useEffect(() => {
    console.log('Inside useEffect. User:', user);
    const fetchUserFavorites = async () => {
      try {
        const favoritesRef = collection(db, 'favorites');        
        const q = query(favoritesRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const userFavorites = querySnapshot.docs.map((doc) => doc.data());
        setFavorites(userFavorites);
        console.log(userFavorites);
      } catch (error) {
        console.error('Error fetching user favorites:', error);
      }
    };

   if (user) {      
      fetchUserFavorites();      
    }
  }, [user]);

  return (
    
    <div className="favorites-list">
      
      {user && (
        <div className="flex items-center justify-end">         
          <button onClick={() => router.push('/newslist')} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Home
          </button>
        </div>
      )} 
      <h3 style={{ fontWeight: 'bold', color: 'black',fontSize: '24px' }}>Your Favorites</h3>       
      {favorites.map((favorite, index) => (
        <div key={index} className="favorite-item">
          {/* Update the field name based on your Firestore structure */}
          <h3>{favorite.articleId}</h3>
          {/* Additional details or actions for each favorite */}
        </div>
      ))}
      
    </div>
  );
};

export default FavoritesList;
