// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
const port = 3001;

// MySQL database connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'user_registration_db',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
    return;
  }
  console.log('Connected to the database');
});

// Middleware
app.use(bodyParser.json());
app.use(cors()); 
// Route for user registration
app.post('/register', (req, res) => {
  const { name, email, password, balance } = req.body;

  const sql = 'INSERT INTO users (name, email, password, balance) VALUES (?, ?, ?, ?)';
  const values = [name, email, password, balance];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error registering user: ', err);
      return res.status(500).json({ message: 'Error registering user' });
    }
    return res.status(200).json({ message: 'User registered successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
