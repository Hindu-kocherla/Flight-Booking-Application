const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "flight_booking"
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection error:", err);
    return;
  }
  console.log("✅ Connected to MySQL database.");
});

// Signup endpoint
app.post("/api/signup", (req, res) => {
  const { username, password } = req.body;
  db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err) => {
    if (err) return res.status(500).json({ success: false, message: "Signup failed." });
    res.json({ success: true, message: "Signup successful!" });
  });
});

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }
    res.json({ success: true, message: "Login successful." });
  });
});


app.post("/api/book", (req, res) => {
  const { flightNumber, passengerName, mobile, email } = req.body;
  db.query(
    "INSERT INTO bookings (flightNumber, passengerName, mobile, email) VALUES (?, ?, ?, ?)",
    [flightNumber, passengerName, mobile, email],
    (err) => {
      if (err) return res.status(500).json({ success: false, message: "Database error." });
      res.json({ success: true, message: "Booking saved to database." });
    }
  );
});


// Get flights
app.get("/api/flights", (req, res) => {
  const { source, destination, date } = req.query;
  db.query("SELECT * FROM flights WHERE source = ? AND destination = ? AND date = ?", [source, destination, date], (err, results) => {
    if (err) return res.status(500).json({ error: "Internal error" });
    res.json(results);
  });
});

// Book flight
app.post("/api/book", (req, res) => {
  const { flightNumber, passengerName } = req.body;
  db.query("INSERT INTO bookings (flightNumber, passengerName) VALUES (?, ?)", [flightNumber, passengerName], (err) => {
    if (err) return res.status(500).json({ success: false, message: "Database error." });
    res.json({ success: true, message: "Booking saved to database." });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
