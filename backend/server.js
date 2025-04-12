const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8000;

// Ensure data directory exists
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to P2P Book Exchange API",
    endpoints: {
      auth: "/api/auth",
      books: "/api/books",
      exchanges: "/api/exchanges"
    }
  });
});

// Routes
console.log("Registering routes...");
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));
app.use("/api/exchanges", require("./routes/exchanges"));
console.log("Routes registered successfully");

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Handle 404 routes
app.use((req, res) => {
  console.log(`404: Route not found - ${req.method} ${req.url}`);
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
});
