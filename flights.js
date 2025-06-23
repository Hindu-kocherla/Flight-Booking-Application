const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const { source, destination, date } = req.query;

  if (!source || !destination || !date) {
    return res.status(400).json({ error: "Missing source, destination, or date." });
  }

  const query = `
    SELECT * FROM flights 
    WHERE LOWER(source) = LOWER(?) AND LOWER(destination) = LOWER(?) AND date = ?
  `;

  db.query(query, [source, destination, date], (err, results) => {
    if (err) {
      console.error("❌ Query error:", err);
      return res.status(500).json({ error: "Database error." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No flights found." });
    }

    res.json(results);
  });
});

module.exports = router;
console.log("Source:", source, "Destination:", destination, "Date:", date);
