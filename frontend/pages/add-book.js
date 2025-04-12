import { useState, useEffect, useRef } from "react";
import API from "../utils/api";
import { useRouter } from "next/router";
import styles from "../styles/Form.module.css";
import Navbar from "../components/Navbar";
import Head from "next/head";
import Icon from "../components/Icon";

export default function AddBook() {
  const router = useRouter();
  const { id } = router.query;
  const fileInputRef = useRef(null);
  const isEditMode = Boolean(id);
  
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    condition: "",
    location: "",
    contact: "",
    image: null
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (isEditMode && id) {
      fetchBook();
    }
  }, [isEditMode, id]);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Error parsing user data:", err);
        setError("User data is invalid. Please log in again.");
      }
    } else {
      setError("You must be logged in to add a book.");
    }
  }, []);

  const fetchBook = async () => {
    try {
      const response = await API.get(`/books/${id}`);
      const bookData = response.data;
      setBook(bookData);
      if (bookData.image) {
        setImagePreview(bookData.image);
      }
    } catch (err) {
      setError("Failed to fetch book details");
      console.error("Error fetching book:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size should be less than 2MB");
        return;
      }
      
      // Check file type
      if (!file.type.match(/^image\/(jpeg|png|jpg|gif)$/)) {
        setError("Please upload a valid image file (JPEG, PNG, JPG, GIF)");
        return;
      }
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setBook(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isEditMode && id) {
        await API.put(`/books/${id}`, book);
      } else {
        await API.post("/books", book);
      }
      router.push("/owner-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'add'} book`);
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} book:`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{isEditMode ? 'Edit' : 'Add'} Book - P2P Book Exchange</title>
        <meta name="description" content={`${isEditMode ? 'Edit' : 'Add'} book details`} />
      </Head>
      <Navbar />
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>{isEditMode ? 'Edit' : 'Add'} Book</h2>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <div className={styles.imageUploadContainer}>
            <div 
              className={styles.imagePreview} 
              onClick={handleImageClick}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Book cover preview" />
              ) : (
                <div className={styles.uploadPlaceholder}>
                  <Icon name="faImage" size="2x" />
                  <span>Click to upload book cover</span>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/jpeg,image/png,image/jpg,image/gif"
              style={{ display: 'none' }}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="title">Book Title</label>
            <input 
              id="title"
              name="title" 
              value={book.title}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="author">Author</label>
            <input 
              id="author"
              name="author" 
              value={book.author}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="genre">Genre</label>
            <input 
              id="genre"
              name="genre" 
              value={book.genre}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="condition">Condition</label>
            <select
              id="condition"
              name="condition"
              value={book.condition}
              onChange={handleChange}
              required
            >
              <option value="">Select condition</option>
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Very Good">Very Good</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="location">Location</label>
            <input 
              id="location"
              name="location" 
              value={book.location}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="contact">Contact</label>
            <input 
              id="contact"
              name="contact" 
              value={book.contact}
              onChange={handleChange}
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? (
              <>
                <Icon name="faSpinner" spin style={{ marginRight: '8px' }} />
                {isEditMode ? 'Updating' : 'Adding'} Book...
              </>
            ) : (
              <>
                <Icon name="faSave" style={{ marginRight: '8px' }} />
                {isEditMode ? 'Update' : 'Add'} Book
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
