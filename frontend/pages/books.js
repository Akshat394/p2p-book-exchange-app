import React, { useState, useEffect } from 'react';
import Head from 'next/head';
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
    owner: "You",
    location: "Chicago, IL",
    condition: "Very Good",
    genre: "Science Fiction",
    available: false
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    owner: "You",
    location: "Chicago, IL",
    condition: "Good",
    genre: "Classic",
    available: true
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    owner: "David Brown",
    location: "Boston, MA",
    condition: "Like New",
    genre: "Fantasy",
    available: true
  },
  {
    id: 6,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    owner: "You",
    location: "Chicago, IL",
    condition: "Fair",
    genre: "Classic",
    available: true
  },
  {
    id: 7,
    title: "Brave New World",
    author: "Aldous Huxley",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    owner: "Robert Wilson",
    location: "Seattle, WA",
    condition: "Very Good",
    genre: "Science Fiction",
    available: true
  },
  {
    id: 8,
    title: "The Alchemist",
    author: "Paulo Coelho",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    owner: "You",
    location: "Chicago, IL",
    condition: "Good",
    genre: "Fiction",
    available: true
  }
];

const Books = () => {
  const [books, setBooks] = useState(sampleBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genre: 'all',
    condition: 'all',
    availability: 'all'
  });
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Filter and sort books based on current state
    let filteredBooks = [...sampleBooks];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredBooks = filteredBooks.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query)
      );
    }
    
    // Apply filters
    if (filters.genre !== 'all') {
      filteredBooks = filteredBooks.filter(book => book.genre === filters.genre);
    }
    if (filters.condition !== 'all') {
      filteredBooks = filteredBooks.filter(book => book.condition === filters.condition);
    }
    if (filters.availability !== 'all') {
      filteredBooks = filteredBooks.filter(book => 
        filters.availability === 'available' ? book.available : !book.available
      );
    }
    
    // Apply sorting
    filteredBooks.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === 'author') {
        comparison = a.author.localeCompare(b.author);
      } else if (sortBy === 'condition') {
        comparison = a.condition.localeCompare(b.condition);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    setBooks(filteredBooks);
  }, [searchQuery, filters, sortBy, sortOrder]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const toggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Books - P2P Book Exchange</title>
        <meta name="description" content="Browse and exchange books with other readers" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            <Icon name="faBook" /> Available Books
          </h1>
          <p className={styles.heroSubtitle}>
            Browse through our collection of books available for exchange.
          </p>
        </section>

        <div className={styles.filterControls}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={handleSearch}
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>
              <Icon name="faSearch" /> Search
            </button>
          </div>
          
          <div className={styles.sortControls}>
            <select 
              value={sortBy} 
              onChange={handleSortChange}
              className={styles.sortSelect}
            >
              <option value="title">Sort by Title</option>
              <option value="author">Sort by Author</option>
              <option value="condition">Sort by Condition</option>
            </select>
            <button 
              onClick={toggleSortOrder}
              className={styles.sortOrderButton}
            >
              <Icon name={sortOrder === 'asc' ? 'faSortAlphaDown' : 'faSortAlphaUp'} />
            </button>
          </div>
          
          <button 
            onClick={toggleFilters}
            className={styles.filterToggle}
          >
            <Icon name="faFilter" /> {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {showFilters && (
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label htmlFor="genre">Genre</label>
              <select
                id="genre"
                name="genre"
                value={filters.genre}
                onChange={handleFilterChange}
              >
                <option value="all">All Genres</option>
                <option value="Classic">Classic</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Fiction">Fiction</option>
              </select>
            </div>
            
            <div className={styles.filterGroup}>
              <label htmlFor="condition">Condition</label>
              <select
                id="condition"
                name="condition"
                value={filters.condition}
                onChange={handleFilterChange}
              >
                <option value="all">All Conditions</option>
                <option value="Like New">Like New</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
            
            <div className={styles.filterGroup}>
              <label htmlFor="availability">Availability</label>
              <select
                id="availability"
                name="availability"
                value={filters.availability}
                onChange={handleFilterChange}
              >
                <option value="all">All Books</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>
        )}

        {books.length > 0 ? (
          <div className={styles.booksGrid}>
            {books.map(book => (
              <div key={book.id} className={styles.bookCard}>
                <div className={styles.bookImageContainer}>
                  <img
                    src={book.image}
                    alt={book.title}
                    className={styles.bookImage}
                  />
                  {!book.available && (
                    <div className={styles.unavailableBadge}>
                      <Icon name="faTimesCircle" /> Unavailable
                    </div>
                  )}
                </div>
                <div className={styles.bookInfo}>
                  <h3 className={styles.bookTitle}>{book.title}</h3>
                  <p className={styles.bookAuthor}>by {book.author}</p>
                  <div className={styles.bookDetails}>
                    <p>
                      <Icon name="faUser" /> {book.owner}
                    </p>
                    <p>
                      <Icon name="faMapMarkerAlt" /> {book.location}
                    </p>
                    <p>
                      <Icon name="faBook" /> {book.genre}
                    </p>
                    <p>
                      <Icon name="faStar" /> {book.condition}
                    </p>
                  </div>
                  <div className={styles.bookActions}>
                    {book.available && book.owner !== "You" && (
                      <button className={`${styles.actionButton} ${styles.primaryButton}`}>
                        <Icon name="faExchangeAlt" /> Exchange
                      </button>
                    )}
                    <button className={`${styles.actionButton} ${styles.secondaryButton}`}>
                      <Icon name="faBookmark" /> Save
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <Icon name="faExclamationTriangle" size="2x" />
            <p>No books found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Books; 