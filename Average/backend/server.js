require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 9876;
const WINDOW_SIZE = 10;

// Middleware
app.use(cors());
app.use(express.json());

let numberWindow = [];

const API_URLS = {
  p: "http://20.244.56.144/test/primes",
  f: "http://20.244.56.144/test/fibo",
  e: "http://20.244.56.144/test/even",
  r: "http://20.244.56.144/test/rand",
};

// Fetch numbers from the external API
const fetchNumbers = async (type) => {
  if (!API_URLS[type]) throw new Error("Invalid number type");

  try {
    const response = await axios.get(API_URLS[type], { timeout: 500 });
    return response.data.numbers;
  } catch (error) {
    console.error(`Error fetching ${type} numbers:`, error.message);
    return [];
  }
};

// Calculate the average
const calculateAverage = (arr) => {
  if (arr.length === 0) return 0;
  return (arr.reduce((acc, num) => acc + num, 0) / arr.length).toFixed(2);
};

// API Endpoint
app.get("/numbers/:numberid", async (req, res) => {
  const { numberid } = req.params;

  try {
    const newNumbers = await fetchNumbers(numberid);

    // Remove duplicates
    const uniqueNumbers = newNumbers.filter((num) => !numberWindow.includes(num));

    // Update sliding window
    numberWindow.push(...uniqueNumbers);
    if (numberWindow.length > WINDOW_SIZE) {
      numberWindow = numberWindow.slice(-WINDOW_SIZE); // Keep the last 10 numbers
    }

    // Calculate average
    const avg = calculateAverage(numberWindow);

    res.json({
      windowPrevState: numberWindow.slice(0, -uniqueNumbers.length), // Before update
      windowCurrState: numberWindow, // After update
      numbers: newNumbers,
      avg: parseFloat(avg),
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to process request" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});