import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';

const NavBar = () => {
  const [user] = useAuthState(auth);

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        {!user && (
          <>
            <li>
              <Link href="/signin">
                <a>Sign In</a>
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <a>Sign Up</a>
              </Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <Link href="/newslist">
                <a>Favorites</a>
              </Link>
            </li>
            <li>
              <button onClick={() => auth.signOut()}>Sign Out</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
