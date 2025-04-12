import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/BookCard.module.css';
import Icon from './Icon';

const BookCard = ({ book, onDelete, onToggleStatus }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/edit-book?id=${book.id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {book.image ? (
          <img 
            src={book.image} 
            alt={book.title} 
            className={styles.bookImage}
          />
        ) : (
          <div className={styles.placeholderImage}>
            <Icon name="book" size={40} />
          </div>
        )}
        <div className={styles.statusBadge}>
          {book.availability === 'available' ? 'Available' : 'Not Available'}
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>by {book.author}</p>
        <div className={styles.details}>
          <span className={styles.condition}>
            <Icon name="star" size={16} /> {book.condition}
          </span>
          <span className={styles.genre}>
            <Icon name="tag" size={16} /> {book.genre}
          </span>
        </div>
        <div className={styles.actions}>
          <button 
            className={`${styles.actionButton} ${styles.editButton}`}
            onClick={handleEdit}
          >
            <Icon name="edit" size={16} /> Edit
          </button>
          <button 
            className={`${styles.actionButton} ${styles.deleteButton}`}
            onClick={() => onDelete(book.id)}
          >
            <Icon name="trash" size={16} /> Delete
          </button>
          <button 
            className={`${styles.actionButton} ${styles.toggleButton}`}
            onClick={() => onToggleStatus(book.id)}
          >
            <Icon 
              name={book.availability === 'available' ? 'check' : 'x'} 
              size={16} 
            />
            {book.availability === 'available' ? 'Mark as Unavailable' : 'Mark as Available'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
