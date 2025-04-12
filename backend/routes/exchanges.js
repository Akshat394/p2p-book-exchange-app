const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const exchangesFile = path.join(__dirname, "../data/exchanges.json");

// Ensure the data directory exists
const dataDir = path.join(__dirname, "../data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure the exchanges.json file exists
if (!fs.existsSync(exchangesFile)) {
  fs.writeFileSync(exchangesFile, JSON.stringify([], null, 2));
}

const getExchanges = () => {
  try {
    const data = fs.readFileSync(exchangesFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading exchanges:", error);
    return [];
  }
};

const saveExchanges = (exchanges) => {
  try {
    fs.writeFileSync(exchangesFile, JSON.stringify(exchanges, null, 2));
    return true;
  } catch (error) {
    console.error("Error saving exchanges:", error);
    throw error;
  }
};

// Get all exchanges
router.get("/", (req, res) => {
  try {
    const exchanges = getExchanges();
    res.json({ exchanges });
  } catch (error) {
    res.status(500).json({ message: "Error fetching exchanges" });
  }
});

// Get exchanges by owner ID
router.get("/owner/:ownerId", (req, res) => {
  try {
    const exchanges = getExchanges();
    const ownerExchanges = exchanges.filter(exchange => exchange.ownerId === req.params.ownerId);
    res.json({ exchanges: ownerExchanges });
  } catch (error) {
    res.status(500).json({ message: "Error fetching owner exchanges" });
  }
});

// Get exchanges by requester ID
router.get("/requester/:requesterId", (req, res) => {
  try {
    const exchanges = getExchanges();
    const requesterExchanges = exchanges.filter(exchange => exchange.requesterId === req.params.requesterId);
    res.json({ exchanges: requesterExchanges });
  } catch (error) {
    res.status(500).json({ message: "Error fetching requester exchanges" });
  }
});

// Create new exchange
router.post("/", (req, res) => {
  try {
    const { ownerId, requesterId, requestedBookId, offeredBookId, message } = req.body;

    if (!ownerId || !requesterId || !requestedBookId || !offeredBookId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exchanges = getExchanges();
    const newExchange = {
      id: Date.now().toString(),
      ownerId,
      requesterId,
      requestedBookId,
      offeredBookId,
      message: message || "",
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    exchanges.push(newExchange);
    saveExchanges(exchanges);

    res.status(201).json({ message: "Exchange created successfully", exchange: newExchange });
  } catch (error) {
    res.status(500).json({ message: "Error creating exchange" });
  }
});

// Update exchange status
router.put("/:id/status", (req, res) => {
  try {
    const { status } = req.body;
    
    if (!["pending", "accepted", "rejected", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const exchanges = getExchanges();
    const exchangeIndex = exchanges.findIndex(e => e.id === req.params.id);

    if (exchangeIndex === -1) {
      return res.status(404).json({ message: "Exchange not found" });
    }

    exchanges[exchangeIndex].status = status;
    exchanges[exchangeIndex].updatedAt = new Date().toISOString();
    saveExchanges(exchanges);

    res.json({ message: "Exchange status updated successfully", exchange: exchanges[exchangeIndex] });
  } catch (error) {
    res.status(500).json({ message: "Error updating exchange status" });
  }
});

// Delete exchange
router.delete("/:id", (req, res) => {
  try {
    const exchanges = getExchanges();
    const exchangeIndex = exchanges.findIndex(e => e.id === req.params.id);

    if (exchangeIndex === -1) {
      return res.status(404).json({ message: "Exchange not found" });
    }

    const deletedExchange = exchanges.splice(exchangeIndex, 1)[0];
    saveExchanges(exchanges);

    res.json({ message: "Exchange deleted successfully", exchange: deletedExchange });
  } catch (error) {
    res.status(500).json({ message: "Error deleting exchange" });
  }
});

module.exports = router; 