const express = require('express');
const cors = require('cors');
const pool = require('./database/db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// HEALTH CHECK
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ROUTES
app.use('/api/auth', require('./routes/AuthRoute'));

// TEST DB CONNECTION ON STARTUP
pool.connect()
  .then(() => console.log('PostgreSQL Connected Successfully'))
  .catch(err => console.error('PostgreSQL connection error:', err));

app.listen(5000, () => console.log('Server running at http://localhost:5000'));