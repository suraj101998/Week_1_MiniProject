const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Apply the cors middleware to allow requests from the frontend domain
app.use(cors());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
