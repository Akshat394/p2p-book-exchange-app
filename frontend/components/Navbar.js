import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';
import Icon from './Icon';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Icon name="faBook" /> P2P Book Exchange
        </Link>
      </div>
      
      <div className={styles.links}>
        <Link href="/books" className={router.pathname === '/books' ? styles.active : ''}>
          Browse Books
        </Link>

        {isAuthenticated ? (
          <>
            <Link 
              href={user.role === 'owner' ? '/owner-dashboard' : '/seeker-dashboard'} 
              className={router.pathname.includes('dashboard') ? styles.active : ''}
            >
              Dashboard
            </Link>
            <Link href="/exchange" className={router.pathname === '/exchange' ? styles.active : ''}>
              Exchanges
            </Link>
            <button onClick={logout} className={styles.logoutButton}>
              <Icon name="faSignOutAlt" /> Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className={router.pathname === '/login' ? styles.active : ''}>
              Login
            </Link>
            <Link href="/register" className={styles.registerButton}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
