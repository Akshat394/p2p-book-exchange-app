import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Icon from "../components/Icon";
import styles from "../styles/Home.module.css";

// Sample book data for demonstration
const sampleBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    owner: "John Doe",
    location: "New York, NY",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    owner: "Jane Smith",
    location: "Los Angeles, CA",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    owner: "Mike Johnson",
    location: "Chicago, IL",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    owner: "Sarah Williams",
    location: "Boston, MA",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState(sampleBooks);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setBooks(sampleBooks);
      return;
    }
    
    const filteredBooks = sampleBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setBooks(filteredBooks);
  };
  
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            <Icon name="faBook" /> P2P Book Exchange
          </h1>
          <p className={styles.heroSubtitle}>
            Connect with book lovers in your area. Exchange, share, and discover new stories.
          </p>
        </section>
        
        <section className={styles.searchSection}>
          <form className={styles.searchBar} onSubmit={handleSearch}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className={styles.searchButton}>
              <Icon name="faSearch" /> Search
            </button>
          </form>
        </section>
        
        {books.length > 0 ? (
          <div className={styles.booksGrid}>
            {books.map((book) => (
              <div key={book.id} className={styles.bookCard}>
                <img
                  src={book.image}
                  alt={book.title}
                  className={styles.bookImage}
                />
                <div className={styles.bookInfo}>
                  <h3 className={styles.bookTitle}>{book.title}</h3>
                  <p className={styles.bookAuthor}>by {book.author}</p>
                  <p>
                    <Icon name="faUser" /> {book.owner}
                  </p>
                  <p>
                    <Icon name="faMapMarkerAlt" /> {book.location}
                  </p>
                  <div className={styles.bookActions}>
                    <button className={`${styles.actionButton} ${styles.primaryButton}`}>
                      <Icon name="faExchangeAlt" /> Exchange
                    </button>
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
            <p>No books found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
}
