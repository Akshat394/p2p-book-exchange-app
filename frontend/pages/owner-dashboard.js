import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Dashboard.module.css';

export default function OwnerDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [books, setBooks] = useState([]);
  const [exchanges, setExchanges] = useState([]);
  const [activeTab, setActiveTab] = useState('books');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user?.role !== 'owner') {
      router.push('/seeker-dashboard');
      return;
    }

    if (user?.id) {
      fetchOwnerData();
    }
  }, [isAuthenticated, isLoading, user]);

  const fetchOwnerData = async () => {
    if (!user?.id) {
      setError('User ID not found. Please log in again.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Fetch owner's books
      const booksResponse = await fetch(`http://localhost:8000/api/books/owner/${user.id}`);
      if (!booksResponse.ok) {
        const booksData = await booksResponse.json();
        throw new Error(booksData.message || 'Failed to fetch books');
      }
      const booksData = await booksResponse.json();
      setBooks(booksData.books || []);

      // Fetch owner's exchanges
      const exchangesResponse = await fetch(`http://localhost:8000/api/exchanges/owner/${user.id}`);
      if (!exchangesResponse.ok) {
        const exchangesData = await exchangesResponse.json();
        throw new Error(exchangesData.message || 'Failed to fetch exchanges');
      }
      const exchangesData = await exchangesResponse.json();
      setExchanges(exchangesData.exchanges || []);
    } catch (err) {
      console.error('Error fetching owner data:', err);
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = () => {
    router.push('/add-book');
  };

  const handleEditBook = async (bookId) => {
    router.push(`/edit-book/${bookId}`);
  };

  const handleDeleteBook = async (bookId) => {
    if (!confirm('Are you sure you want to delete this book?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/books/${bookId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete book');
      }

      setBooks(books.filter(book => book.id !== bookId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleAvailability = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/books/${bookId}/toggle-status`, {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Failed to update book status');
      }

      setBooks(books.map(book => 
        book.id === bookId 
          ? { ...book, available: !book.available }
          : book
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading || loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Owner Dashboard - P2P Book Exchange</title>
        <meta name="description" content="Manage your books and exchanges" />
      </Head>
      <Navbar />
      <main className={styles.dashboard}>
        <div className={styles.header}>
          <h1>Welcome, {user?.name}!</h1>
          <p>Manage your books and exchanges here</p>
        </div>

        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'books' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('books')}
          >
            <Icon name="faBook" /> My Books
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'exchanges' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('exchanges')}
          >
            <Icon name="faExchangeAlt" /> Exchanges
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        {activeTab === 'books' && (
          <div className={styles.booksSection}>
            <div className={styles.sectionHeader}>
              <h2>My Books ({books.length})</h2>
              <button className={styles.addButton} onClick={handleAddBook}>
                <Icon name="faPlus" /> Add New Book
              </button>
            </div>

            <div className={styles.booksGrid}>
              {books.map(book => (
                <div key={book.id} className={styles.bookCard}>
                  <div className={styles.bookImage}>
                    {book.image ? (
                      <img src={book.image} alt={book.title} />
                    ) : (
                      <div className={styles.placeholderImage}>
                        <Icon name="faBook" />
                      </div>
                    )}
                    {!book.available && (
                      <div className={styles.unavailableBadge}>
                        Not Available
                      </div>
                    )}
                  </div>
                  <div className={styles.bookInfo}>
                    <h3>{book.title}</h3>
                    <p className={styles.author}>by {book.author}</p>
                    <p className={styles.genre}>{book.genre}</p>
                    <div className={styles.actions}>
                      <button onClick={() => handleEditBook(book.id)}>
                        <Icon name="faEdit" /> Edit
                      </button>
                      <button onClick={() => handleToggleAvailability(book.id)}>
                        <Icon name={book.available ? "faTimes" : "faCheck"} />
                        {book.available ? 'Mark Unavailable' : 'Mark Available'}
                      </button>
                      <button onClick={() => handleDeleteBook(book.id)}>
                        <Icon name="faTrash" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'exchanges' && (
          <div className={styles.exchangesSection}>
            <h2>Book Exchanges</h2>
            {exchanges.length === 0 ? (
              <p className={styles.noData}>No exchanges yet</p>
            ) : (
              <div className={styles.exchangesList}>
                {exchanges.map(exchange => (
                  <div key={exchange.id} className={styles.exchangeCard}>
                    <div className={styles.exchangeHeader}>
                      <span className={styles.date}>
                        <Icon name="faCalendar" />
                        {new Date(exchange.createdAt).toLocaleDateString()}
                      </span>
                      <span className={`${styles.status} ${styles[exchange.status]}`}>
                        {exchange.status}
                      </span>
                    </div>
                    <div className={styles.exchangeDetails}>
                      <div className={styles.book}>
                        <h4>Requested Book</h4>
                        <p>{exchange.book.title}</p>
                      </div>
                      <div className={styles.requester}>
                        <h4>Requested By</h4>
                        <p>{exchange.requester.name}</p>
                        <p>{exchange.requester.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}
