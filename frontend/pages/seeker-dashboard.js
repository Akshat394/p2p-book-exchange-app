import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Icon from '../components/Icon';
import styles from '../styles/Home.module.css';

// Sample book data for demonstration
const sampleBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    owner: "John Doe",
    location: "New York, NY",
    condition: "Like New",
    genre: "Classic",
    available: true
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    owner: "Jane Smith",
    location: "Los Angeles, CA",
    condition: "Good",
    genre: "Classic",
    available: true
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    owner: "David Brown",
    location: "Boston, MA",
    condition: "Very Good",
    genre: "Science Fiction",
    available: true
  }
];

const SeekerDashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('saved-books');

  useEffect(() => {
    // Check if user is logged in and is a seeker
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'seeker') {
      router.push('/login');
      return;
    }

    setUser(parsedUser);
    // Fetch saved books for this user
    fetchSavedBooks(parsedUser.id);
  }, []);

  const fetchSavedBooks = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/books/saved/${userId}`);
      const data = await response.json();
      setSavedBooks(data.books || []);
    } catch (error) {
      console.error('Error fetching saved books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleExchangeRequest = (bookId) => {
    // In a real app, this would send an exchange request
    alert(`Exchange request for book ${bookId} would be sent here`);
  };
  
  const handleRemoveSaved = (bookId) => {
    setSavedBooks(savedBooks.filter(book => book.id !== bookId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Seeker Dashboard - P2P Book Exchange</title>
        <meta name="description" content="Manage your saved books and exchanges" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.welcomeSection}>
          <h1 className={styles.title}>Welcome, {user?.name || 'Book Seeker'}! 📚</h1>
          <p className={styles.subtitle}>Find and save books you're interested in</p>
        </div>

        <section className={styles.dashboardSection}>
          <div className={styles.statsCard}>
            <h3>Saved Books</h3>
            <p className={styles.statNumber}>{savedBooks.length}</p>
          </div>

          <div className={styles.booksGrid}>
            {savedBooks.map((book) => (
              <div key={book.id} className={styles.bookCard}>
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Owner: {book.ownerName}</p>
                <p>Status: {book.available ? 'Available' : 'Not Available'}</p>
                <div className={styles.bookActions}>
                  <button onClick={() => router.push(`/books/${book.id}`)}>
                    View Details
                  </button>
                  <button onClick={() => handleRemoveSaved(book.id)}>
                    Remove from Saved
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className={styles.searchButton} onClick={() => router.push('/books')}>
            Browse All Books
          </button>
        </section>
      </main>
    </div>
  );
};

export default SeekerDashboard;
