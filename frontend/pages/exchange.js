import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Icon from '../components/Icon';
import styles from '../styles/Home.module.css';

// Sample exchange data for demonstration
const sampleExchanges = [
  {
    id: 1,
    status: "pending",
    requestedBook: {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      owner: "John Doe",
    },
    offeredBook: {
      id: 3,
      title: "1984",
      author: "George Orwell",
      image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      owner: "You",
    },
    date: "2023-04-10",
    message: "I've been looking for this book for a while. Would love to exchange!",
  },
  {
    id: 2,
    status: "accepted",
    requestedBook: {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      owner: "Jane Smith",
    },
    offeredBook: {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      owner: "You",
    },
    date: "2023-04-05",
    message: "Great book! Looking forward to the exchange.",
  },
  {
    id: 3,
    status: "rejected",
    requestedBook: {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      owner: "David Brown",
    },
    offeredBook: {
      id: 6,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      owner: "You",
    },
    date: "2023-04-01",
    message: "Sorry, I've already read this book.",
  },
  {
    id: 4,
    status: "completed",
    requestedBook: {
      id: 7,
      title: "Brave New World",
      author: "Aldous Huxley",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      owner: "Robert Wilson",
    },
    offeredBook: {
      id: 8,
      title: "The Alchemist",
      author: "Paulo Coelho",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      owner: "You",
    },
    date: "2023-03-25",
    message: "Great exchange! The book was in perfect condition.",
  },
];

export default function Exchange() {
  const [exchanges, setExchanges] = useState(sampleExchanges);
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("received");
  
  // Filter exchanges based on status and tab
  const filteredExchanges = exchanges.filter(exchange => {
    if (filter === "all") return true;
    return exchange.status === filter;
  });
  
  // Separate exchanges into received and sent
  const receivedExchanges = filteredExchanges.filter(exchange => 
    exchange.offeredBook.owner === "You"
  );
  
  const sentExchanges = filteredExchanges.filter(exchange => 
    exchange.requestedBook.owner === "You"
  );
  
  // Get exchanges based on active tab
  const displayExchanges = activeTab === "received" ? receivedExchanges : sentExchanges;
  
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleAction = (id, action) => {
    setExchanges(prevExchanges => 
      prevExchanges.map(exchange => 
        exchange.id === id 
          ? { ...exchange, status: action } 
          : exchange
      )
    );
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending": return styles.pendingBadge;
      case "accepted": return styles.acceptedBadge;
      case "rejected": return styles.rejectedBadge;
      case "completed": return styles.completedBadge;
      default: return "";
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending": return "faClock";
      case "accepted": return "faCheck";
      case "rejected": return "faTimes";
      case "completed": return "faCheckDouble";
      default: return "faQuestion";
    }
  };
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Exchange - P2P Book Exchange</title>
        <meta name="description" content="Manage your book exchanges" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            <Icon name="faExchangeAlt" /> Book Exchanges
          </h1>
          <p className={styles.heroSubtitle}>
            Manage your book exchange requests and offers.
          </p>
        </section>
        
        <div className={styles.exchangeControls}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === "received" ? styles.activeTab : ""}`}
              onClick={() => handleTabChange("received")}
            >
              <Icon name="faInbox" /> Received
            </button>
            <button 
              className={`${styles.tab} ${activeTab === "sent" ? styles.activeTab : ""}`}
              onClick={() => handleTabChange("sent")}
            >
              <Icon name="faPaperPlane" /> Sent
            </button>
          </div>
          
          <div className={styles.filterControls}>
            <select 
              value={filter} 
              onChange={handleFilterChange}
              className={styles.filterSelect}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        
        {displayExchanges.length > 0 ? (
          <div className={styles.exchangesList}>
            {displayExchanges.map((exchange) => (
              <div key={exchange.id} className={styles.exchangeCard}>
                <div className={styles.exchangeHeader}>
                  <div className={styles.exchangeDate}>
                    <Icon name="faCalendar" /> {new Date(exchange.date).toLocaleDateString()}
                  </div>
                  <div className={`${styles.statusBadge} ${getStatusBadgeClass(exchange.status)}`}>
                    <Icon name={getStatusIcon(exchange.status)} /> 
                    {exchange.status.charAt(0).toUpperCase() + exchange.status.slice(1)}
                  </div>
                </div>
                
                <div className={styles.exchangeContent}>
                  <div className={styles.bookExchange}>
                    <div className={styles.bookColumn}>
                      <h3 className={styles.bookColumnTitle}>
                        {activeTab === "received" ? "Requested Book" : "Your Book"}
                      </h3>
                      <div className={styles.bookCard}>
                        <img
                          src={activeTab === "received" ? exchange.requestedBook.image : exchange.offeredBook.image}
                          alt={activeTab === "received" ? exchange.requestedBook.title : exchange.offeredBook.title}
                          className={styles.bookImage}
                        />
                        <div className={styles.bookInfo}>
                          <h3 className={styles.bookTitle}>
                            {activeTab === "received" ? exchange.requestedBook.title : exchange.offeredBook.title}
                          </h3>
                          <p className={styles.bookAuthor}>
                            by {activeTab === "received" ? exchange.requestedBook.author : exchange.offeredBook.author}
                          </p>
                          <p>
                            <Icon name="faUser" /> {activeTab === "received" ? exchange.requestedBook.owner : exchange.offeredBook.owner}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.exchangeArrow}>
                      <Icon name="faExchangeAlt" />
                    </div>
                    
                    <div className={styles.bookColumn}>
                      <h3 className={styles.bookColumnTitle}>
                        {activeTab === "received" ? "Your Book" : "Requested Book"}
                      </h3>
                      <div className={styles.bookCard}>
                        <img
                          src={activeTab === "received" ? exchange.offeredBook.image : exchange.requestedBook.image}
                          alt={activeTab === "received" ? exchange.offeredBook.title : exchange.requestedBook.title}
                          className={styles.bookImage}
                        />
                        <div className={styles.bookInfo}>
                          <h3 className={styles.bookTitle}>
                            {activeTab === "received" ? exchange.offeredBook.title : exchange.requestedBook.title}
                          </h3>
                          <p className={styles.bookAuthor}>
                            by {activeTab === "received" ? exchange.offeredBook.author : exchange.requestedBook.author}
                          </p>
                          <p>
                            <Icon name="faUser" /> {activeTab === "received" ? exchange.offeredBook.owner : exchange.requestedBook.owner}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.exchangeMessage}>
                    <h4>Message:</h4>
                    <p>{exchange.message}</p>
                  </div>
                  
                  {exchange.status === "pending" && activeTab === "received" && (
                    <div className={styles.exchangeActions}>
                      <button 
                        className={`${styles.actionButton} ${styles.acceptButton}`}
                        onClick={() => handleAction(exchange.id, "accepted")}
                      >
                        <Icon name="faCheck" /> Accept
                      </button>
                      <button 
                        className={`${styles.actionButton} ${styles.rejectButton}`}
                        onClick={() => handleAction(exchange.id, "rejected")}
                      >
                        <Icon name="faTimes" /> Reject
                      </button>
                    </div>
                  )}
                  
                  {exchange.status === "accepted" && (
                    <div className={styles.exchangeActions}>
                      <button 
                        className={`${styles.actionButton} ${styles.primaryButton}`}
                        onClick={() => handleAction(exchange.id, "completed")}
                      >
                        <Icon name="faCheckDouble" /> Mark as Completed
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <Icon name="faExclamationTriangle" size="2x" />
            <p>No exchanges found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
} 