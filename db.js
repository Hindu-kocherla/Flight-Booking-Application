const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",       // 🔒 your MySQL password
  database: "flight_booking",
});

db.connect(err => {
  if (err) {
    console.error("❌ DB connection failed:", err.stack);
    return;
  }
  console.log("✅ Connected to MySQL database.");
});

module.exports = db;
