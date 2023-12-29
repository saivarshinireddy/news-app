'use client'
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase/config'; // Import your Firestore instance
import { getDoc } from 'firebase/firestore';

const Favorites = ({ user, article}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
   const fetchFavorites = async () => {
      try {
        const favoritesRef = collection(db, 'favorites');
        const q = query(favoritesRef, where('userId', '==', user.uid), where('articleId', '==', article.id));
        const querySnapshot = await getDocs(q);
        setIsFavorite(querySnapshot.size > 0);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [user.uid, article.id]);

  const toggleFavorite = async () => {
    try {
      const favoritesRef = collection(db, 'favorites');
      const favoriteDocRef = doc(favoritesRef, `${user.uid}_${article.id}`);
      const favoriteDoc = await getDoc(favoriteDocRef);
      console.log('userId:', user.uid);
      console.log('articleId:', article.title);
      
      if (favoriteDoc.exists()) {
        await deleteDoc(favoriteDocRef);
      } else {
        await addDoc(favoritesRef, { userId: user.uid, articleId: article.url });
      }
  
      // Toggle the favorite state
      setIsFavorite(!isFavorite);
      fetchFavorites();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  
  return (
    <div>
      <button onClick={toggleFavorite} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
        {/* You can use your HeartIcon component here */}
        {isFavorite ? '❤️' : '🤍'}
      </button>            
    </div>
  );
};


export default Favorites;
