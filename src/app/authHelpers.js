// authHelpers.js

import { signOut } from 'firebase/auth';
import { auth } from '../app/firebase/config'; // Adjust the path based on your project structure

export const handleSignOut = async (router) => {
  try {
    await signOut(auth);
    // Redirect to the home page or any other page after sign out
    router.push('/');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
