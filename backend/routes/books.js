const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Define the path to the data directory and books.json file
const dataDir = path.join(__dirname, "..", "data");
const booksFile = path.join(dataDir, "books.json");

// Ensure the data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure the books.json file exists
if (!fs.existsSync(booksFile)) {
  fs.writeFileSync(booksFile, JSON.stringify([], null, 2));
}

// Helper functions
const getBooks = () => {
  try {
    return JSON.parse(fs.readFileSync(booksFile));
  } catch (error) {
    console.error("Error reading books file:", error);
    return [];
  }
};

const saveBooks = (books) => {
  try {
    fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));
    return true;
  } catch (error) {
    console.error("Error saving books:", error);
    return false;
  }
};

// Routes

// Get all books - this must come before /:id to avoid conflicts
router.get("/", (req, res) => {
  try {
    const books = getBooks();
    res.json({ books });
  } catch (error) {
    console.error("Error in GET /:", error);
    res.status(500).json({ message: "Error fetching books" });
  }
});

// Get books by owner ID - this must come before /:id to avoid conflicts
router.get("/owner/:ownerId", (req, res) => {
  try {
    const books = getBooks();
    const ownerBooks = books.filter(book => book.ownerId === req.params.ownerId);
    res.json({ books: ownerBooks });
  } catch (error) {
    console.error("Error in GET /owner/:ownerId:", error);
    res.status(500).json({ message: "Error fetching owner books" });
  }
});

// Get a specific book by ID
router.get("/:id", (req, res) => {
  try {
    const books = getBooks();
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ book });
  } catch (error) {
    console.error("Error in GET /:id:", error);
    res.status(500).json({ message: "Error fetching book" });
  }
});

// Add a new book
router.post("/", (req, res) => {
  try {
    console.log("Received request to add book:", req.body);
    
    const { title, author, genre, ownerId, ownerName } = req.body;

    if (!title || !author || !ownerId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const books = getBooks();
    const newBook = {
      id: Date.now().toString(),
      title,
      author,
      genre: genre || "Uncategorized",
      ownerId,
      ownerName,
      available: true,
      createdAt: new Date().toISOString(),
      image: null
    };

    books.push(newBook);
    if (!saveBooks(books)) {
      return res.status(500).json({ message: "Error saving book" });
    }

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Error in POST /:", error);
    res.status(500).json({ message: "Error adding book" });
  }
});

// Toggle book availability status
router.post("/:id/toggle-status", (req, res) => {
  try {
    const books = getBooks();
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.available = !book.available;
    if (!saveBooks(books)) {
      return res.status(500).json({ message: "Error updating book status" });
    }

    res.json({ message: "Book status updated successfully", book });
  } catch (error) {
    console.error("Error in POST /:id/toggle-status:", error);
    res.status(500).json({ message: "Error updating book status" });
  }
});

// Delete a book
router.delete("/:id", (req, res) => {
  try {
    const books = getBooks();
    const bookIndex = books.findIndex(b => b.id === req.params.id);

    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found" });
    }

    const deletedBook = books.splice(bookIndex, 1)[0];
    if (!saveBooks(books)) {
      return res.status(500).json({ message: "Error deleting book" });
    }

    res.json({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    console.error("Error in DELETE /:id:", error);
    res.status(500).json({ message: "Error deleting book" });
  }
});

module.exports = router;
