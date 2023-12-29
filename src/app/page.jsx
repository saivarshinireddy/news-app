'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';
import NavBar from './nav';

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = typeof window !== 'undefined' ? sessionStorage.getItem('user') : null;

  console.log({user})
 
 // if (!user && !userSession){
 //   router.push('/signup')
 // }
  

  return (
   
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-gray-100 dark:bg-gray-800">
    <Link href="/nav"></Link>
    <div className="w-full max-w-3xl mx-auto mb-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-4">
        Welcome to Your News Reader App
      </h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400">
        Stay updated with the latest news from around the world.
      </p>
    </div>

    {/* Display News Content */}
    {/* You can add your news components or sections here */}
    <div className="w-full max-w-3xl mx-auto">
      {/* Add your news components or sections here */}
    </div>

    {/* Allow users to choose between Sign In and Sign Up */}
    {!user && !userSession && (
      <div className="flex space-x-4">
        <Link href="/signin">
          <span className="text-blue-500 hover:underline">Sign In</span>
        </Link>
        <span className="text-gray-500">or</span>
        <Link href="/signup">
          <span className="text-green-500 hover:underline">Sign Up</span>
        </Link>
      </div>
    )}
    {user && (
          
              <button onClick={() => auth.signOut()}>Sign Out</button>
            
        )}
  </main>

  )
}