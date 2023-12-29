'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Favorites from '../../app/favorites';
import { auth } from '../firebase/config';
import { BsGrid, BsList } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [view, setView] = useState('grid');
  const [user, setUser] = useState(null); // Assuming you have a user state
  const [showFavorites, setShowFavorites] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = 'e2b71f38a036473dafab83961c75b56a';
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
        );

        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    // Simulate user authentication
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    fetchNews();

    // Cleanup the subscription
    return () => unsubscribe();
  }, []);

  const switchToGrid = () => {
    setView('grid');
  };

  const switchToList = () => {
    setView('list');
  };
  const navigateToFavoritesList = () => {
    router.push('/favoritelist'); // Navigate to the "/favorites" route
  };


  return (
    <div>
      {/* View Buttons */}
      <div className="flex mb-4">       
        <button
          onClick={switchToGrid}
          className={`bg-blue-500 text-white px-4 py-2 rounded-l-md ${
            view === 'grid' && 'bg-opacity-75'
          }`}
        >
          <BsGrid className="inline-block mr-2" />
          Grid View
        </button>
        <button
          onClick={switchToList}
          className={`bg-blue-500 text-white px-4 py-2 rounded-r-md ${
            view === 'list' && 'bg-opacity-75'
          }`}
        >
          <BsList className="inline-block mr-2" />
          List View
        </button> 
             
        <button onClick={navigateToFavoritesList} className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md">
          Favorites
        </button>
       
        <div className="flex items-center justify-end">
          <button onClick={() => auth.signOut()} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Sign Out
          </button>
        </div>
     
      </div>
      

      {/* News View */}
      <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-8' : ''}>
        {news.map((article) => (
          <div key={article.title} className={view === 'grid' ? 'mb-8' : 'mb-4'}>
            <h2 className={view === 'grid' ? 'text-xl font-semibold mb-2' : 'text-2xl font-semibold mb-4'}>
              {article.title}
            </h2>
            <p className="text-gray-600">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 block"
            >
              Read more
            </a>
            {user && (
              <Favorites user={user} article={article} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;

