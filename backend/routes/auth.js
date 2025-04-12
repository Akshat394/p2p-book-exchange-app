const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const usersFile = path.join(__dirname, "../data/users.json");

// Ensure the data directory exists
const dataDir = path.join(__dirname, "../data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure the users.json file exists
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify([], null, 2));
}

const getUsers = () => {
  try {
    return JSON.parse(fs.readFileSync(usersFile));
  } catch (error) {
    console.error("Error reading users file:", error);
    return [];
  }
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateMobile = (mobile) => {
  const re = /^[0-9]{10}$/;
  return re.test(mobile);
};

router.post("/register", (req, res) => {
  try {
    const users = getUsers();
    const { name, email, mobile, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate mobile number if provided
    if (mobile && !validateMobile(mobile)) {
      return res.status(400).json({ message: "Invalid mobile number format" });
    }

    // Validate role
    if (!["owner", "seeker"].includes(role.toLowerCase())) {
      return res.status(400).json({ message: "Invalid role. Must be 'owner' or 'seeker'" });
    }

    // Check if user already exists
    if (users.find((u) => u.email === email)) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user with ID
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      mobile: mobile || "",
      password,
      role: role.toLowerCase(),
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    // Don't send password in response
    const { password: _, ...userWithoutPassword } = newUser;
    
    // Log the user data for debugging
    console.log("Registration successful, user data:", userWithoutPassword);
    
    res.status(201).json({ message: "Registered successfully", user: userWithoutPassword });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    
    const users = getUsers();
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Don't send the password back to the client
    const { password: _, ...userWithoutPassword } = user;
    
    // Log the user data for debugging
    console.log("Login successful, user data:", userWithoutPassword);
    
    res.json({ 
      message: "Login successful",
      user: userWithoutPassword 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
